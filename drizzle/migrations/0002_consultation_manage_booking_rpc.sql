CREATE OR REPLACE FUNCTION public.consultation_manage_booking(
  p_id uuid,
  p_token uuid,
  p_action text,
  p_slot_start timestamptz DEFAULT NULL
)
RETURNS TABLE(
  outcome text,
  slot_start timestamptz,
  old_slot_start timestamptz,
  status text,
  project_type text,
  first_name text,
  last_name text,
  email text,
  phone text,
  lang text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  b record;
  v_free boolean;
  v_duration interval;
BEGIN
  SELECT * INTO b FROM public.consultation_bookings
  WHERE id = p_id AND cancel_token = p_token;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 'not_found'::text, NULL::timestamptz, NULL::timestamptz, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;

  IF p_action = 'load' THEN
    RETURN QUERY SELECT 'ok'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
    RETURN;
  END IF;

  IF b.status NOT IN ('confirmed', 'rescheduled') THEN
    RETURN QUERY SELECT 'already_cancelled'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
    RETURN;
  END IF;

  IF b.slot_start < now() THEN
    RETURN QUERY SELECT 'too_late'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
    RETURN;
  END IF;

  IF p_action = 'cancel' THEN
    UPDATE public.consultation_bookings
    SET status = 'cancelled', updated_at = now()
    WHERE id = p_id AND cancel_token = p_token;
    RETURN QUERY SELECT 'cancelled'::text, b.slot_start, b.slot_start, 'cancelled'::text, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
    RETURN;
  END IF;

  IF p_action = 'reschedule' THEN
    IF p_slot_start IS NULL OR p_slot_start < now() THEN
      RETURN QUERY SELECT 'invalid_input'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
      RETURN;
    END IF;

    SELECT EXISTS (
      SELECT 1 FROM public.consultation_free_slots((p_slot_start AT TIME ZONE 'Europe/Berlin')::date) f
      WHERE f.slot_start = p_slot_start
    ) INTO v_free;

    IF NOT v_free THEN
      RETURN QUERY SELECT 'slot_unavailable'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
      RETURN;
    END IF;

    v_duration := COALESCE(b.slot_end - b.slot_start, interval '15 minutes');

    BEGIN
      UPDATE public.consultation_bookings
      SET slot_start = p_slot_start,
          slot_end = p_slot_start + v_duration,
          status = 'rescheduled',
          updated_at = now()
      WHERE id = p_id AND cancel_token = p_token;
    EXCEPTION WHEN unique_violation THEN
      RETURN QUERY SELECT 'slot_unavailable'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
      RETURN;
    END;

    RETURN QUERY SELECT 'rescheduled'::text, p_slot_start, b.slot_start, 'rescheduled'::text, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
    RETURN;
  END IF;

  RETURN QUERY SELECT 'invalid_input'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang;
END;
$$;

REVOKE ALL ON FUNCTION public.consultation_manage_booking(uuid, uuid, text, timestamptz) FROM public;
GRANT EXECUTE ON FUNCTION public.consultation_manage_booking(uuid, uuid, text, timestamptz) TO anon, authenticated, service_role;