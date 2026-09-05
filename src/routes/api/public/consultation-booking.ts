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
  publicSupabase,
  rateLimited,
  table,
} from "@/lib/consultation.server";
import { calendarNote, icsAttachment } from "@/lib/consultation-ics.server";

// Public endpoint: books a consultation slot (double-booking safe) and sends
// confirmation emails. All credentials stay server-side.

export const Route = createFileRoute("/api/public/consultation-booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          return await handleBooking(request);
        } catch (error) {
          console.error("[consultation] booking crashed", error);
          return json({ error: "booking_failed" }, 500);
        }
      },
    },
  },
});

async function handleBooking(request: Request) {
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

        // Abuse protection runs only on well-formed booking attempts so that
        // ordinary visitors correcting a form field are never blocked.
        if (rateLimited(clientIp(request), 20)) return json({ error: "rate_limited" }, 429);


        const db = await publicSupabase();
        if (!db) {
          console.error("[consultation] booking: Supabase configuration missing");
          return json({ error: "booking_failed" }, 500);
        }

        const origin = (() => {
          try {
            return new URL(request.url).origin;
          } catch {
            return "https://www.munichconstruction.de";
          }
        })();

        // Atomic, double-booking-safe reservation inside the database.
        const { data: rows, error: bookError } = await db.rpc("consultation_book_slot", {
          p_slot_start: slotDate.toISOString(),
          p_first_name: firstName,
          p_last_name: lastName,
          p_phone: phone,
          p_email: email,
          p_contact_method: contactMethod,
          p_project_type: projectTypeLabel,
          p_postal_code: postalCode || null,
          p_city: city || null,
          p_project_start: projectStart || null,
          p_budget: budget || null,
          p_description: description || null,
          p_lang: lang,
        });

        if (bookError) {
          console.error("[consultation] booking rpc failed", bookError.message);
          return json({ error: "booking_failed" }, 500);
        }

        const result = (rows ?? [])[0] as
          | { booking_id: string | null; cancel_token: string | null; outcome: string; customer_email_status: string | null }
          | undefined;

        if (!result || result.outcome === "slot_unavailable" || !result.booking_id || !result.cancel_token) {
          return json({ error: "slot_unavailable" }, 409);
        }

        const booking = { id: result.booking_id, cancel_token: result.cancel_token };
        const slotMinutes = 15;

        if (result.outcome === "duplicate") {
          return json(
            {
              ok: true,
              id: booking.id,
              cancelToken: booking.cancel_token,
              manageUrl: `${origin}/termin?id=${booking.id}&token=${booking.cancel_token}`,
              emailPending: result.customer_email_status !== "sent",
              duplicate: true,
            },
            200,
          );
        }

        const fmt = formatSlot(slotDate.toISOString(), lang);
        const manageUrl = `${origin}/termin?id=${booking.id}&token=${booking.cancel_token}`;
        const mail = mailer();
        const name = `${firstName} ${lastName}`;
        // Calendar invitation built from the saved booking record only.
        // A failure here must never discard the appointment that is already saved.
        let invite: { filename: string; content: string; content_type?: string } | null = null;
        try {
          invite = icsAttachment({
            bookingId: booking.id,
            start: slotDate,
            durationMinutes: slotMinutes,
            sequence: 0,
            method: "REQUEST",
            lang,
            name,
            email,
            phone,
            projectType: projectTypeLabel,
            manageUrl,
          });
        } catch {
          console.error("[consultation] calendar invitation could not be generated");
        }
        let internalStatus = "failed";
        let customerStatus = "failed";
        let emailError: string | null = mail ? null : "resend_not_configured";

        if (mail) {
          try {
            await mail.send({
              from: mail.from,
              to: [INTERNAL_TO],
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
                ${calendarNote(lang)}
              </div>`,
              attachments: invite ? [...files.attachments, invite] : files.attachments,
            });
            internalStatus = "sent";
          } catch {
            console.error("[consultation] internal notification failed");
            emailError = "internal_notification_failed";
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
              html: html + calendarNote(lang),
              attachments: invite ? [invite] : [],
            });
            customerStatus = "sent";
          } catch {
            console.error("[consultation] customer confirmation failed");
            emailError = emailError ? `${emailError},confirmation_failed` : "confirmation_failed";
          }
        } else {
          console.error("[consultation] email service not configured: RESEND_API_KEY missing");
        }

        try {
          await db.rpc("consultation_mark_email_status", {
            p_booking_id: booking.id,
            p_cancel_token: booking.cancel_token,
            p_internal_status: internalStatus,
            p_customer_status: customerStatus,
            p_email_error: emailError,
          });
        } catch {
          console.error("[consultation] email status could not be recorded");
        }

        return json(
          {
            ok: true,
            id: booking.id,
            cancelToken: booking.cancel_token,
            manageUrl,
            emailPending: customerStatus !== "sent",
          },
          200,
        );
}
