CREATE OR REPLACE FUNCTION public.consultation_book_slot(
  p_slot_start timestamptz,
  p_first_name text,
  p_last_name text,
  p_phone text,
  p_email text,
  p_contact_method text,
  p_project_type text,
  p_postal_code text DEFAULT NULL,
  p_city text DEFAULT NULL,
  p_project_start text DEFAULT NULL,
  p_budget text DEFAULT NULL,
  p_description text DEFAULT NULL,
  p_lang text DEFAULT 'de'
)
RETURNS TABLE(booking_id uuid, cancel_token uuid, outcome text, customer_email_status text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_minutes integer;
  v_free boolean;
  v_day date;
  v_existing record;
BEGIN
  SELECT slot_minutes INTO v_minutes FROM public.consultation_settings LIMIT 1;
  v_minutes := COALESCE(v_minutes, 15);
  v_day := (p_slot_start AT TIME ZONE 'Europe/Berlin')::date;

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
      postal_code, city, project_start, budget, project_description, lang, consent
    ) VALUES (
      p_slot_start, p_slot_start + make_interval(mins => v_minutes), 'Europe/Berlin', v_minutes,
      p_first_name, p_last_name, p_phone, p_email,
      CASE WHEN p_contact_method = 'whatsapp' THEN 'whatsapp' ELSE 'phone' END,
      p_project_type, p_postal_code, p_city, p_project_start, p_budget, p_description,
      CASE WHEN p_lang = 'en' THEN 'en' ELSE 'de' END, true
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
$$;

REVOKE ALL ON FUNCTION public.consultation_book_slot(timestamptz, text, text, text, text, text, text, text, text, text, text, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.consultation_book_slot(timestamptz, text, text, text, text, text, text, text, text, text, text, text, text) TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.consultation_mark_email_status(
  p_booking_id uuid,
  p_cancel_token uuid,
  p_internal_status text,
  p_customer_status text,
  p_email_error text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.consultation_bookings
  SET internal_email_status = p_internal_status,
      customer_email_status = p_customer_status,
      email_error = p_email_error,
      updated_at = now()
  WHERE id = p_booking_id AND cancel_token = p_cancel_token;
END;
$$;

REVOKE ALL ON FUNCTION public.consultation_mark_email_status(uuid, uuid, text, text, text) FROM public;
GRANT EXECUTE ON FUNCTION public.consultation_mark_email_status(uuid, uuid, text, text, text) TO anon, authenticated, service_role;