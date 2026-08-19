ALTER TABLE public.consultation_bookings
  ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;

CREATE INDEX IF NOT EXISTS consultation_bookings_reminder_idx
  ON public.consultation_bookings (slot_start)
  WHERE status = 'confirmed' AND reminder_sent_at IS NULL;