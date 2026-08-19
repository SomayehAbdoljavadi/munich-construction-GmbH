-- Settings (single row, admin-configurable)
CREATE TABLE public.consultation_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  slot_minutes integer NOT NULL DEFAULT 15,
  buffer_minutes integer NOT NULL DEFAULT 15,
  lead_time_hours integer NOT NULL DEFAULT 12,
  horizon_days integer NOT NULL DEFAULT 45,
  timezone text NOT NULL DEFAULT 'Europe/Berlin',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultation_settings TO anon, authenticated;
GRANT ALL ON public.consultation_settings TO service_role;
ALTER TABLE public.consultation_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are publicly readable" ON public.consultation_settings FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.consultation_settings (id) VALUES (true);

-- Weekly availability windows
CREATE TABLE public.consultation_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6), -- 0 = Sunday
  start_time time NOT NULL,
  end_time time NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultation_availability TO anon, authenticated;
GRANT ALL ON public.consultation_availability TO service_role;
ALTER TABLE public.consultation_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Availability is publicly readable" ON public.consultation_availability FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.consultation_availability (weekday, start_time, end_time) VALUES
  (1, '08:00', '17:00'),
  (2, '08:00', '17:00'),
  (3, '08:00', '17:00'),
  (4, '08:00', '17:00'),
  (5, '08:00', '15:00');

-- Blocked dates / ranges
CREATE TABLE public.consultation_blocked_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date date NOT NULL,
  start_time time,
  end_time time,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.consultation_blocked_slots TO anon, authenticated;
GRANT ALL ON public.consultation_blocked_slots TO service_role;
ALTER TABLE public.consultation_blocked_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blocked slots are publicly readable" ON public.consultation_blocked_slots FOR SELECT TO anon, authenticated USING (true);

-- Bookings
CREATE TABLE public.consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_start timestamptz NOT NULL,
  slot_end timestamptz NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  contact_method text NOT NULL DEFAULT 'phone',
  project_type text NOT NULL,
  postal_code text,
  city text,
  project_start text,
  budget text,
  project_description text,
  lang text NOT NULL DEFAULT 'de',
  consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'confirmed',
  cancel_token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX consultation_bookings_active_slot_idx
  ON public.consultation_bookings (slot_start)
  WHERE status = 'confirmed';
GRANT ALL ON public.consultation_bookings TO service_role;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Callback requests
CREATE TABLE public.consultation_callbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  project_type text,
  location text,
  project_start text,
  project_description text,
  lang text NOT NULL DEFAULT 'de',
  consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.consultation_callbacks TO service_role;
ALTER TABLE public.consultation_callbacks ENABLE ROW LEVEL SECURITY;

-- Public availability function: returns only free slot start times for a date.
CREATE OR REPLACE FUNCTION public.consultation_free_slots(target_date date)
RETURNS TABLE (slot_start timestamptz)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cfg public.consultation_settings%ROWTYPE;
  win RECORD;
  step interval;
  duration interval;
  cursor_ts timestamptz;
  window_end timestamptz;
BEGIN
  SELECT * INTO cfg FROM public.consultation_settings WHERE id LIMIT 1;
  IF cfg IS NULL THEN RETURN; END IF;

  IF target_date < (now() AT TIME ZONE cfg.timezone)::date
     OR target_date > ((now() AT TIME ZONE cfg.timezone)::date + cfg.horizon_days) THEN
    RETURN;
  END IF;

  duration := make_interval(mins => cfg.slot_minutes);
  step := make_interval(mins => cfg.slot_minutes + cfg.buffer_minutes);

  FOR win IN
    SELECT a.start_time, a.end_time
    FROM public.consultation_availability a
    WHERE a.active
      AND a.weekday = EXTRACT(dow FROM target_date)::smallint
    ORDER BY a.start_time
  LOOP
    cursor_ts := timezone(cfg.timezone, (target_date + win.start_time)::timestamp);
    window_end := timezone(cfg.timezone, (target_date + win.end_time)::timestamp);

    WHILE cursor_ts + duration <= window_end LOOP
      IF cursor_ts >= now() + make_interval(hours => cfg.lead_time_hours)
        AND NOT EXISTS (
          SELECT 1 FROM public.consultation_bookings b
          WHERE b.status = 'confirmed'
            AND b.slot_start < cursor_ts + duration
            AND b.slot_end > cursor_ts
        )
        AND NOT EXISTS (
          SELECT 1 FROM public.consultation_blocked_slots x
          WHERE x.blocked_date = target_date
            AND (
              x.start_time IS NULL
              OR (timezone(cfg.timezone, (target_date + x.start_time)::timestamp) < cursor_ts + duration
                  AND timezone(cfg.timezone, (target_date + coalesce(x.end_time, '23:59'::time))::timestamp) > cursor_ts)
            )
        )
      THEN
        slot_start := cursor_ts;
        RETURN NEXT;
      END IF;
      cursor_ts := cursor_ts + step;
    END LOOP;
  END LOOP;
END;
$$;

GRANT EXECUTE ON FUNCTION public.consultation_free_slots(date) TO anon, authenticated, service_role;