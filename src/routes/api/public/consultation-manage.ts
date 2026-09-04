import { createFileRoute } from "@tanstack/react-router";
import { clean, clientIp, escapeHtml, formatSlot, json, mailer, rateLimited, table } from "@/lib/consultation.server";

// Public endpoint: lets a customer load, reschedule or cancel their own
// consultation booking using the secret cancel_token issued at booking time.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Action = "load" | "reschedule" | "cancel";

export const Route = createFileRoute("/api/public/consultation-manage")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (rateLimited(clientIp(request), 30)) return json({ error: "rate_limited" }, 429);

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return json({ error: "invalid_request" }, 400);
        }

        const id = clean(body["id"], 40);
        const token = clean(body["token"], 40);
        const action = clean(body["action"], 20) as Action;
        if (!UUID.test(id) || !UUID.test(token) || !["load", "reschedule", "cancel"].includes(action)) {
          return json({ error: "invalid_request" }, 400);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: booking, error: loadError } = await supabaseAdmin
          .from("consultation_bookings")
          .select("id, slot_start, slot_end, first_name, last_name, email, phone, project_type, lang, status")
          .eq("id", id)
          .eq("cancel_token", token)
          .maybeSingle();

        if (loadError) {
          console.error("[consultation] manage lookup failed");
          return json({ error: "unavailable" }, 503);
        }
        if (!booking) return json({ error: "not_found" }, 404);

        const lang: "de" | "en" = booking.lang === "en" ? "en" : "de";
        const name = `${booking.first_name} ${booking.last_name}`;
        const mail = mailer();

        const view = (b: { slot_start: string; status: string; project_type: string }) => ({
          slotStart: b.slot_start,
          status: b.status,
          projectType: b.project_type,
          firstName: booking.first_name,
          lastName: booking.last_name,
          lang,
        });

        if (action === "load") return json({ ok: true, booking: view(booking) }, 200);

        if (!["confirmed", "rescheduled"].includes(booking.status)) return json({ error: "already_cancelled" }, 409);
        // Past appointments can no longer be changed by the customer.
        if (new Date(booking.slot_start).getTime() < Date.now()) return json({ error: "too_late" }, 409);

        if (action === "cancel") {
          const { error: cancelError } = await supabaseAdmin
            .from("consultation_bookings")
            .update({ status: "cancelled", updated_at: new Date().toISOString() })
            .eq("id", id)
            .eq("cancel_token", token)
            .in("status", ["confirmed", "rescheduled"]);
          if (cancelError) {
            console.error("[consultation] cancel failed");
            return json({ error: "cancel_failed" }, 500);
          }

          const old = formatSlot(booking.slot_start, lang);
          if (mail) {
            try {
              await mail.send({
                from: mail.from,
                to: [mail.to],
                subject: `Beratungstermin storniert – ${old.day} ${old.time} – ${name}`,
                html: `<div style="font-family:Arial,sans-serif;color:#111"><h2 style="margin:0 0 16px">Termin storniert</h2>${table(
                  [
                    ["Datum", old.day],
                    ["Uhrzeit", old.time],
                    ["Name", name],
                    ["Telefon", booking.phone],
                    ["E-Mail", booking.email],
                    ["Projektart", booking.project_type],
                  ],
                )}</div>`,
              });
              await mail.send({
                from: mail.from,
                to: [booking.email],
                reply_to: mail.to,
                subject:
                  lang === "en"
                    ? `Your consultation on ${old.day} has been cancelled`
                    : `Ihr Beratungstermin am ${old.day} wurde storniert`,
                html:
                  lang === "en"
                    ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Dear ${escapeHtml(name)},</p><p>your consultation on <strong>${escapeHtml(old.day)}, ${escapeHtml(old.time)}</strong> has been cancelled.</p><p>You are welcome to book a new appointment at any time.</p><p>Kind regards,<br/>Munich Construction GmbH</p></div>`
                    : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Guten Tag ${escapeHtml(name)},</p><p>Ihr Beratungstermin am <strong>${escapeHtml(old.day)}, ${escapeHtml(old.time)} Uhr</strong> wurde storniert.</p><p>Gerne können Sie jederzeit einen neuen Termin buchen.</p><p>Mit freundlichen Grüßen<br/>Munich Construction GmbH</p></div>`,
              });
            } catch {
              console.error("[consultation] cancel notification failed");
            }
          }

          return json({ ok: true, booking: { ...view(booking), status: "cancelled" } }, 200);
        }

        // --- reschedule ---
        const slotStart = clean(body["slotStart"], 40);
        const slotDate = new Date(slotStart);
        if (Number.isNaN(slotDate.getTime()) || slotDate.getTime() < Date.now()) {
          return json({ error: "invalid_input" }, 400);
        }

        const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(slotDate);
        const { data: freeSlots, error: slotError } = await supabaseAdmin.rpc("consultation_free_slots", {
          target_date: day,
        });
        if (slotError) {
          console.error("[consultation] availability lookup failed");
          return json({ error: "unavailable" }, 503);
        }
        const isFree = (freeSlots ?? []).some(
          (s: { slot_start: string }) => new Date(s.slot_start).getTime() === slotDate.getTime(),
        );
        if (!isFree) return json({ error: "slot_unavailable" }, 409);

        const durationMs = new Date(booking.slot_end).getTime() - new Date(booking.slot_start).getTime();
        const slotEnd = new Date(slotDate.getTime() + (durationMs > 0 ? durationMs : 15 * 60_000));

        const { data: updated, error: updateError } = await supabaseAdmin
          .from("consultation_bookings")
          .update({
            slot_start: slotDate.toISOString(),
            slot_end: slotEnd.toISOString(),
            status: "rescheduled",
            duration_minutes: Math.max(1, Math.round((durationMs > 0 ? durationMs : 15 * 60_000) / 60_000)),
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .eq("cancel_token", token)
          .in("status", ["confirmed", "rescheduled"])
          .select("slot_start, status, project_type")
          .single();

        if (updateError || !updated) {
          if (updateError?.code === "23505") return json({ error: "slot_unavailable" }, 409);
          console.error("[consultation] reschedule failed");
          return json({ error: "reschedule_failed" }, 500);
        }

        const from = formatSlot(booking.slot_start, lang);
        const to = formatSlot(updated.slot_start, lang);
        if (mail) {
          try {
            await mail.send({
              from: mail.from,
              to: [mail.to],
              subject: `Beratungstermin verschoben – ${to.day} ${to.time} – ${name}`,
              html: `<div style="font-family:Arial,sans-serif;color:#111"><h2 style="margin:0 0 16px">Termin verschoben</h2>${table(
                [
                  ["Alter Termin", `${from.day} ${from.time}`],
                  ["Neuer Termin", `${to.day} ${to.time}`],
                  ["Name", name],
                  ["Telefon", booking.phone],
                  ["E-Mail", booking.email],
                  ["Projektart", booking.project_type],
                ],
              )}</div>`,
            });
            await mail.send({
              from: mail.from,
              to: [booking.email],
              reply_to: mail.to,
              subject:
                lang === "en"
                  ? `Your consultation is now on ${to.day} at ${to.time}`
                  : `Ihr Beratungstermin ist jetzt am ${to.day} um ${to.time} Uhr`,
              html:
                lang === "en"
                  ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Dear ${escapeHtml(name)},</p><p>your consultation has been moved to <strong>${escapeHtml(to.day)}, ${escapeHtml(to.time)}</strong>.</p><p>We will call you on ${escapeHtml(booking.phone)}.</p><p>Kind regards,<br/>Munich Construction GmbH</p></div>`
                  : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Guten Tag ${escapeHtml(name)},</p><p>Ihr Beratungstermin wurde auf <strong>${escapeHtml(to.day)}, ${escapeHtml(to.time)} Uhr</strong> verschoben.</p><p>Wir rufen Sie unter ${escapeHtml(booking.phone)} an.</p><p>Mit freundlichen Grüßen<br/>Munich Construction GmbH</p></div>`,
            });
          } catch {
            console.error("[consultation] reschedule notification failed");
          }
        }

        return json({ ok: true, booking: view(updated) }, 200);
      },
    },
  },
});
