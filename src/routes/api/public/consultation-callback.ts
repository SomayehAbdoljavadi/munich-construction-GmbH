import { createFileRoute } from "@tanstack/react-router";
import {
  clean,
  clientIp,
  collectAttachments,
  emailValid,
  escapeHtml,
  json,
  mailer,
  phoneValid,
  rateLimited,
  table,
} from "@/lib/consultation.server";

// Public endpoint: stores a callback request and notifies the team by email.

export const Route = createFileRoute("/api/public/consultation-callback")({
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

        const firstName = clean(form.get("firstName"), 80);
        const lastName = clean(form.get("lastName"), 80);
        const email = clean(form.get("email"), 200);
        const phone = clean(form.get("phone"), 40);
        const projectType = clean(form.get("projectTypeLabel"), 120) || clean(form.get("projectType"), 80);
        const location = clean(form.get("location"), 120);
        const projectStart = clean(form.get("projectStart"), 80);
        const description = clean(form.get("description"), 3000);
        const lang = clean(form.get("lang"), 2) === "en" ? "en" : "de";
        const consent = clean(form.get("consent"), 10) === "true";

        if (!firstName || !lastName || !emailValid(email) || !phoneValid(phone) || !consent) {
          return json({ error: "invalid_input" }, 400);
        }

        const files = await collectAttachments(form);
        if ("error" in files) return json({ error: files.error }, 400);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error: insertError } = await supabaseAdmin.from("consultation_callbacks").insert({
          first_name: firstName,
          last_name: lastName,
          phone,
          email,
          project_type: projectType || null,
          location: location || null,
          project_start: projectStart || null,
          project_description: description || null,
          lang,
          consent,
        });
        if (insertError) {
          console.error("[consultation] callback insert failed");
          return json({ error: "request_failed" }, 500);
        }

        const mail = mailer();
        const name = `${firstName} ${lastName}`;
        if (mail) {
          try {
            await mail.send({
              from: mail.from,
              to: [mail.to],
              reply_to: email,
              subject: `New Website Request – Callback – ${name}`,
              html: `<div style="font-family:Arial,sans-serif;color:#111">
                <h2 style="margin:0 0 16px">Neue Rückrufanfrage</h2>
                ${table([
                  ["Name", name],
                  ["Telefon", phone],
                  ["E-Mail", email],
                  ["Projektart", projectType],
                  ["Standort", location],
                  ["Projektstart", projectStart],
                  ["Beschreibung", description],
                  ["Sprache", lang.toUpperCase()],
                  ["Eingegangen am", new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })],
                  ["Seite", clean(request.headers.get("referer"), 300)],
                ])}
              </div>`,
              attachments: files.attachments,
            });
          } catch {
            console.error("[consultation] callback notification failed");
          }

          try {
            await mail.send({
              from: mail.from,
              to: [email],
              reply_to: mail.to,
              subject:
                lang === "en"
                  ? "We have received your request – Munich Construction GmbH"
                  : "Ihre Anfrage ist bei uns eingegangen – Munich Construction GmbH",
              html:
                lang === "en"
                  ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                       <p>Dear ${escapeHtml(name)},</p>
                       <p>thank you for your enquiry. Our team will call you back as soon as possible on ${escapeHtml(phone)}.</p>
                       <p>Kind regards,<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                     </div>`
                  : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6">
                       <p>Guten Tag ${escapeHtml(name)},</p>
                       <p>vielen Dank für Ihre Anfrage. Unser Team meldet sich schnellstmöglich telefonisch unter ${escapeHtml(phone)} bei Ihnen.</p>
                       <p>Mit freundlichen Grüßen<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p>
                     </div>`,
            });
          } catch {
            console.error("[consultation] callback confirmation failed");
          }
        } else {
          console.error("[consultation] email service not configured: RESEND_API_KEY missing");
        }

        return json({ ok: true }, 200);
      },
    },
  },
});
