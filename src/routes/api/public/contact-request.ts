import { createFileRoute } from "@tanstack/react-router";
import {
  clean,
  clientIp,
  emailValid,
  json,
  mailer,
  rateLimited,
  table,
} from "@/lib/consultation.server";

// Public endpoint: contact form -> info@munichconstruction.de

export const Route = createFileRoute("/api/public/contact-request")({
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

        const name = clean(form.get("name"), 100);
        const email = clean(form.get("email"), 255);
        const phone = clean(form.get("phone"), 50);
        const subject = clean(form.get("subject"), 150);
        const message = clean(form.get("message"), 2000);
        const lang = clean(form.get("lang"), 2) === "en" ? "en" : "de";
        const pageUrl = clean(form.get("pageUrl"), 300) || clean(request.headers.get("referer"), 300);

        if (!name || !emailValid(email) || !subject || !message) {
          return json({ error: "invalid_input" }, 400);
        }

        const mail = mailer();
        if (!mail) {
          console.error("[contact] email service not configured: RESEND_API_KEY missing");
          return json({ error: "email_not_configured" }, 503);
        }

        const submittedAt = new Intl.DateTimeFormat("de-DE", {
          timeZone: "Europe/Berlin",
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date());

        let messageId: string | null = null;
        try {
          messageId = await mail.send({
            from: mail.from,
            to: [mail.to],
            reply_to: email,
            subject: `New Contact Request – ${name}`,
            html: `<div style="font-family:Arial,sans-serif;color:#111">
              <h2 style="margin:0 0 16px">Neue Kontaktanfrage / New contact request</h2>
              ${table([
                ["Formular / Form type", "Contact form"],
                ["Name", name],
                ["E-Mail", email],
                ["Telefon", phone],
                ["Betreff", subject],
                ["Nachricht", message],
                ["Eingegangen am", `${submittedAt} (Europe/Berlin)`],
                ["Seite", pageUrl],
                ["Sprache", lang.toUpperCase()],
              ])}
            </div>`,
          });
        } catch {
          return json({ error: "delivery_failed" }, 502);
        }

        await mail.sendConfirmation(email, lang as "de" | "en");

        return json({ ok: true, id: messageId }, 200);
      },
    },
  },
});
