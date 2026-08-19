import { createFileRoute } from "@tanstack/react-router";
import { escapeHtml, formatSlot, json, mailer } from "@/lib/consultation.server";

// Public cron endpoint: sends a reminder email ~24h before each confirmed
// consultation. Idempotent — each booking is reminded at most once.

export const Route = createFileRoute("/api/public/consultation-reminders")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const now = Date.now();
        const windowEnd = new Date(now + 24 * 60 * 60 * 1000).toISOString();

        const { data: bookings, error } = await supabaseAdmin
          .from("consultation_bookings")
          .select("id, slot_start, first_name, last_name, email, phone, lang, cancel_token")
          .eq("status", "confirmed")
          .is("reminder_sent_at", null)
          .gt("slot_start", new Date(now).toISOString())
          .lte("slot_start", windowEnd)
          .order("slot_start", { ascending: true })
          .limit(50);

        if (error) {
          console.error("[consultation] reminder lookup failed");
          return json({ error: "lookup_failed" }, 500);
        }

        const mail = mailer();
        if (!mail) {
          console.error("[consultation] email service not configured: RESEND_API_KEY missing");
          return json({ error: "email_not_configured" }, 503);
        }

        const origin = "https://www.munichconstruction.de";
        let sent = 0;

        for (const b of bookings ?? []) {
          const lang = b.lang === "en" ? "en" : "de";
          const fmt = formatSlot(new Date(b.slot_start).toISOString(), lang);
          const name = `${b.first_name} ${b.last_name}`;
          const manageUrl = `${origin}/termin?id=${b.id}&token=${b.cancel_token}`;

          const html =
            lang === "en"
              ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                   <p>Dear ${escapeHtml(name)},</p>
                   <p>a friendly reminder of your free initial consultation with Munich Construction GmbH.</p>
                   <p><strong>${escapeHtml(fmt.day)}, ${escapeHtml(fmt.time)}</strong><br/>
                   We will call you on ${escapeHtml(b.phone)}.</p>
                   <p>Need a different time? You can <a href="${escapeHtml(manageUrl)}">reschedule or cancel here</a>.</p>
                   <p>Kind regards,<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                 </div>`
              : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                   <p>Guten Tag ${escapeHtml(name)},</p>
                   <p>eine kurze Erinnerung an Ihr kostenloses Erstgespräch mit der Munich Construction GmbH.</p>
                   <p><strong>${escapeHtml(fmt.day)}, ${escapeHtml(fmt.time)} Uhr</strong><br/>
                   Wir rufen Sie unter ${escapeHtml(b.phone)} an.</p>
                   <p>Passt der Termin nicht mehr? Sie können ihn <a href="${escapeHtml(manageUrl)}">hier verschieben oder stornieren</a>.</p>
                   <p>Mit freundlichen Grüßen<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                 </div>`;

          try {
            await mail.send({
              from: mail.from,
              to: [b.email],
              reply_to: mail.to,
              subject:
                lang === "en"
                  ? `Reminder: your consultation on ${fmt.day} at ${fmt.time}`
                  : `Erinnerung: Ihr Beratungstermin am ${fmt.day} um ${fmt.time} Uhr`,
              html,
            });
            await supabaseAdmin
              .from("consultation_bookings")
              .update({ reminder_sent_at: new Date().toISOString() })
              .eq("id", b.id);
            sent += 1;
          } catch {
            console.error("[consultation] reminder delivery failed for one booking");
          }
        }

        return json({ ok: true, sent, candidates: (bookings ?? []).length }, 200);
      },
    },
  },
});
