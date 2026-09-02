import { createFileRoute } from "@tanstack/react-router";
import {
  clean,
  clientIp,
  collectAttachments,
  emailValid,
  escapeHtml,
  formatSlot,
  json,
  mailer,
  phoneValid,
  rateLimited,
  table,
} from "@/lib/consultation.server";

// Public endpoint: books a consultation slot (double-booking safe) and sends
// confirmation emails. All credentials stay server-side.

export const Route = createFileRoute("/api/public/consultation-booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (rateLimited(clientIp(request))) return json({ error: "rate_limited" }, 429);

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json({ error: "invalid_request" }, 400);
        }

        if (clean(form.get("company"), 100)) return json({ ok: true }, 200); // honeypot

        const slotStart = clean(form.get("slotStart"), 40);
        const firstName = clean(form.get("firstName"), 80);
        const lastName = clean(form.get("lastName"), 80);
        const email = clean(form.get("email"), 200);
        const phone = clean(form.get("phone"), 40);
        const projectType = clean(form.get("projectType"), 80);
        const projectTypeLabel = clean(form.get("projectTypeLabel"), 120) || projectType;
        const postalCode = clean(form.get("postalCode"), 12);
        const city = clean(form.get("city"), 80);
        const projectStart = clean(form.get("projectStart"), 80);
        const budget = clean(form.get("budget"), 80);
        const description = clean(form.get("description"), 3000);
        const contactMethod = clean(form.get("contactMethod"), 20) === "whatsapp" ? "whatsapp" : "phone";
        const lang = clean(form.get("lang"), 2) === "en" ? "en" : "de";
        const consent = clean(form.get("consent"), 10) === "true";

        const slotDate = new Date(slotStart);
        if (
          !firstName ||
          !lastName ||
          !emailValid(email) ||
          !phoneValid(phone) ||
          !projectType ||
          !consent ||
          Number.isNaN(slotDate.getTime()) ||
          slotDate.getTime() < Date.now()
        ) {
          return json({ error: "invalid_input" }, 400);
        }

        const files = await collectAttachments(form);
        if ("error" in files) return json({ error: files.error }, 400);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // The slot must still be offered by the availability engine.
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
        if (!isFree) return json({ error: "slot_taken" }, 409);

        const { data: settings } = await supabaseAdmin
          .from("consultation_settings")
          .select("slot_minutes")
          .maybeSingle();
        const slotMinutes = settings?.slot_minutes ?? 15;
        const slotEnd = new Date(slotDate.getTime() + slotMinutes * 60_000);

        const { data: booking, error: insertError } = await supabaseAdmin
          .from("consultation_bookings")
          .insert({
            slot_start: slotDate.toISOString(),
            slot_end: slotEnd.toISOString(),
            first_name: firstName,
            last_name: lastName,
            phone,
            email,
            contact_method: contactMethod,
            project_type: projectTypeLabel,
            postal_code: postalCode || null,
            city: city || null,
            project_start: projectStart || null,
            budget: budget || null,
            project_description: description || null,
            lang,
            consent,
          })
          .select("id, cancel_token")
          .single();

        if (insertError) {
          if (insertError.code === "23505") return json({ error: "slot_taken" }, 409);
          console.error("[consultation] booking insert failed");
          return json({ error: "booking_failed" }, 500);
        }

        const fmt = formatSlot(slotDate.toISOString(), lang);
        const origin = (() => {
          try {
            return new URL(request.url).origin;
          } catch {
            return "https://www.munichconstruction.de";
          }
        })();
        const manageUrl = `${origin}/termin?id=${booking.id}&token=${booking.cancel_token}`;
        const mail = mailer();
        const name = `${firstName} ${lastName}`;

        if (mail) {
          try {
            await mail.send({
              from: mail.from,
              to: [mail.to],
              reply_to: email,
              subject: `New Consultation Request – ${name} – ${fmt.day} ${fmt.time}`,
              html: `<div style="font-family:Arial,sans-serif;color:#111">
                <h2 style="margin:0 0 16px">Neuer Beratungstermin</h2>
                ${table([
                  ["Datum", fmt.day],
                  ["Uhrzeit", `${fmt.time} (Europe/Berlin)`],
                  ["Dauer", `${slotMinutes} Min.`],
                  ["Name", name],
                  ["Telefon", phone],
                  ["E-Mail", email],
                  ["Bevorzugter Kontakt", contactMethod],
                  ["Projektart", projectTypeLabel],
                  ["Ort", [postalCode, city].filter(Boolean).join(" ")],
                  ["Projektstart", projectStart],
                  ["Budget", budget],
                  ["Beschreibung", description],
                  ["Sprache", lang.toUpperCase()],
                  ["Verwaltungslink", manageUrl],
                  ["Eingegangen am", new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })],
                  ["Seite", clean(request.headers.get("referer"), 300)],
                ])}
              </div>`,
              attachments: files.attachments,
            });
          } catch {
            console.error("[consultation] internal notification failed");
          }

          try {
            const html =
              lang === "en"
                ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                     <p>Dear ${escapeHtml(name)},</p>
                     <p>thank you for booking a free initial consultation with Munich Construction GmbH.</p>
                     <p><strong>${escapeHtml(fmt.day)}, ${escapeHtml(fmt.time)}</strong> (approx. ${slotMinutes} minutes)<br/>
                     We will call you on ${escapeHtml(phone)}.</p>
                     <p>Need a different time? You can <a href="${escapeHtml(manageUrl)}">reschedule or cancel your appointment here</a>.</p>
                     <p>Kind regards,<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                   </div>`
                : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                     <p>Guten Tag ${escapeHtml(name)},</p>
                     <p>vielen Dank für die Buchung Ihres kostenlosen Erstgesprächs bei der Munich Construction GmbH.</p>
                     <p><strong>${escapeHtml(fmt.day)}, ${escapeHtml(fmt.time)} Uhr</strong> (ca. ${slotMinutes} Minuten)<br/>
                     Wir rufen Sie unter ${escapeHtml(phone)} an.</p>
                     <p>Sollte Ihnen der Termin nicht mehr passen, können Sie ihn <a href="${escapeHtml(manageUrl)}">hier verschieben oder stornieren</a>.</p>
                     <p>Mit freundlichen Grüßen<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                   </div>`;
            await mail.send({
              from: mail.from,
              to: [email],
              reply_to: mail.to,
              subject:
                lang === "en"
                  ? `Your consultation on ${fmt.day} at ${fmt.time}`
                  : `Ihr Beratungstermin am ${fmt.day} um ${fmt.time} Uhr`,
              html,
            });
          } catch {
            console.error("[consultation] customer confirmation failed");
          }
        } else {
          console.error("[consultation] email service not configured: RESEND_API_KEY missing");
        }

        return json({ ok: true, id: booking.id, cancelToken: booking.cancel_token, manageUrl }, 200);
      },
    },
  },
});
