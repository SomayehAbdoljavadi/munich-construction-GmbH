-- Appointment records: richer audit fields + active-status model
ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS timezone text NOT NULL DEFAULT 'Europe/Berlin',
  ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 15,
  ADD COLUMN IF NOT EXISTS internal_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS customer_email_status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_error text;

ALTER TABLE public.consultation_bookings
  DROP CONSTRAINT IF EXISTS consultation_bookings_status_check;
ALTER TABLE public.consultation_bookings
  ADD CONSTRAINT consultation_bookings_status_check
  CHECK (status IN ('confirmed', 'cancelled', 'rescheduled'));

-- Atomic double-booking protection: at most one ACTIVE booking per start time.
DROP INDEX IF EXISTS consultation_bookings_active_slot_idx;
CREATE UNIQUE INDEX consultation_bookings_active_slot_idx
  ON public.consultation_bookings (slot_start)
  WHERE status IN ('confirmed', 'rescheduled');

-- Availability must exclude every active (confirmed or rescheduled) booking.
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
          WHERE b.status IN ('confirmed', 'rescheduled')
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
