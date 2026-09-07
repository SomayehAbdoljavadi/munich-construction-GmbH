ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS consultation_languages text[];

CREATE OR REPLACE FUNCTION public.consultation_book_slot(
  p_slot_start timestamp with time zone,
  p_first_name text,
  p_last_name text,
  p_phone text,
  p_email text,
  p_contact_method text,
  p_project_type text,
  p_postal_code text DEFAULT NULL::text,
  p_city text DEFAULT NULL::text,
  p_project_start text DEFAULT NULL::text,
  p_budget text DEFAULT NULL::text,
  p_description text DEFAULT NULL::text,
  p_lang text DEFAULT 'de'::text,
  p_consultation_languages text[] DEFAULT NULL::text[]
)
 RETURNS TABLE(booking_id uuid, cancel_token uuid, outcome text, customer_email_status text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_minutes integer;
  v_free boolean;
  v_day date;
  v_existing record;
  v_langs text[];
BEGIN
  SELECT slot_minutes INTO v_minutes FROM public.consultation_settings LIMIT 1;
  v_minutes := COALESCE(v_minutes, 15);
  v_day := (p_slot_start AT TIME ZONE 'Europe/Berlin')::date;

  SELECT ARRAY(
    SELECT DISTINCT x FROM unnest(COALESCE(p_consultation_languages, ARRAY[]::text[])) AS x
    WHERE x IN ('de','fa')
  ) INTO v_langs;
  IF array_length(v_langs, 1) IS NULL THEN
    v_langs := NULL;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.consultation_free_slots(v_day) f WHERE f.slot_start = p_slot_start
  ) INTO v_free;

  IF NOT v_free THEN
    SELECT b.id, b.cancel_token, b.customer_email_status INTO v_existing
    FROM public.consultation_bookings b
    WHERE b.slot_start = p_slot_start
      AND lower(b.email) = lower(p_email)
      AND b.status IN ('confirmed', 'rescheduled')
    LIMIT 1;
    IF FOUND THEN
      RETURN QUERY SELECT v_existing.id, v_existing.cancel_token, 'duplicate'::text, v_existing.customer_email_status;
    ELSE
      RETURN QUERY SELECT NULL::uuid, NULL::uuid, 'slot_unavailable'::text, NULL::text;
    END IF;
    RETURN;
  END IF;

  BEGIN
    RETURN QUERY
    INSERT INTO public.consultation_bookings (
      slot_start, slot_end, timezone, duration_minutes,
      first_name, last_name, phone, email, contact_method, project_type,
      postal_code, city, project_start, budget, project_description, lang, consent,
      consultation_languages
    ) VALUES (
      p_slot_start, p_slot_start + make_interval(mins => v_minutes), 'Europe/Berlin', v_minutes,
      p_first_name, p_last_name, p_phone, p_email,
      CASE WHEN p_contact_method = 'whatsapp' THEN 'whatsapp' ELSE 'phone' END,
      p_project_type, p_postal_code, p_city, p_project_start, p_budget, p_description,
      CASE WHEN p_lang = 'en' THEN 'en' ELSE 'de' END, true,
      v_langs
    )
    RETURNING consultation_bookings.id, consultation_bookings.cancel_token, 'created'::text, consultation_bookings.customer_email_status;
  EXCEPTION WHEN unique_violation THEN
    SELECT b.id, b.cancel_token, b.customer_email_status INTO v_existing
    FROM public.consultation_bookings b
    WHERE b.slot_start = p_slot_start
      AND lower(b.email) = lower(p_email)
      AND b.status IN ('confirmed', 'rescheduled')
    LIMIT 1;
    IF FOUND THEN
      RETURN QUERY SELECT v_existing.id, v_existing.cancel_token, 'duplicate'::text, v_existing.customer_email_status;
    ELSE
      RETURN QUERY SELECT NULL::uuid, NULL::uuid, 'slot_unavailable'::text, NULL::text;
    END IF;
  END;
END;
$function$;

DROP FUNCTION IF EXISTS public.consultation_manage_booking(uuid, uuid, text, timestamp with time zone);

CREATE FUNCTION public.consultation_manage_booking(p_id uuid, p_token uuid, p_action text, p_slot_start timestamp with time zone DEFAULT NULL::timestamp with time zone)
 RETURNS TABLE(outcome text, slot_start timestamp with time zone, old_slot_start timestamp with time zone, status text, project_type text, first_name text, last_name text, email text, phone text, lang text, consultation_languages text[])
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  b record;
  v_free boolean;
  v_duration interval;
BEGIN
  SELECT * INTO b FROM public.consultation_bookings
  WHERE id = p_id AND cancel_token = p_token;

  IF NOT FOUND THEN
    RETURN QUERY SELECT 'not_found'::text, NULL::timestamptz, NULL::timestamptz, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text, NULL::text[];
    RETURN;
  END IF;

  IF p_action = 'load' THEN
    RETURN QUERY SELECT 'ok'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
    RETURN;
  END IF;

  IF b.status NOT IN ('confirmed', 'rescheduled') THEN
    RETURN QUERY SELECT 'already_cancelled'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
    RETURN;
  END IF;

  IF b.slot_start < now() THEN
    RETURN QUERY SELECT 'too_late'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
    RETURN;
  END IF;

  IF p_action = 'cancel' THEN
    UPDATE public.consultation_bookings
    SET status = 'cancelled', updated_at = now()
    WHERE id = p_id AND cancel_token = p_token;
    RETURN QUERY SELECT 'cancelled'::text, b.slot_start, b.slot_start, 'cancelled'::text, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
    RETURN;
  END IF;

  IF p_action = 'reschedule' THEN
    IF p_slot_start IS NULL OR p_slot_start < now() THEN
      RETURN QUERY SELECT 'invalid_input'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
      RETURN;
    END IF;

    SELECT EXISTS (
      SELECT 1 FROM public.consultation_free_slots((p_slot_start AT TIME ZONE 'Europe/Berlin')::date) f
      WHERE f.slot_start = p_slot_start
    ) INTO v_free;

    IF NOT v_free THEN
      RETURN QUERY SELECT 'slot_unavailable'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
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
      RETURN QUERY SELECT 'slot_unavailable'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
      RETURN;
    END;

    RETURN QUERY SELECT 'rescheduled'::text, p_slot_start, b.slot_start, 'rescheduled'::text, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
    RETURN;
  END IF;

  RETURN QUERY SELECT 'invalid_input'::text, b.slot_start, b.slot_start, b.status, b.project_type, b.first_name, b.last_name, b.email, b.phone, b.lang, b.consultation_languages;
END;
$function$;