ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS calendar_sequence integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.consultation_bump_calendar_sequence(
  p_id uuid,
  p_token uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_seq integer;
BEGIN
  UPDATE public.consultation_bookings
  SET calendar_sequence = calendar_sequence + 1,
      updated_at = now()
  WHERE id = p_id AND cancel_token = p_token
  RETURNING calendar_sequence INTO v_seq;

  RETURN COALESCE(v_seq, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.consultation_bump_calendar_sequence(uuid, uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.consultation_bump_calendar_sequence(uuid, uuid) TO anon, authenticated, service_role;