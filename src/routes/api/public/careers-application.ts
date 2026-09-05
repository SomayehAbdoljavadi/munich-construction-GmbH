import { createFileRoute } from "@tanstack/react-router";
import { mailer, NOTIFY_FROM, INTERNAL_TO } from "@/lib/consultation.server";
import { normalizeEmail, normalizePhone } from "@/lib/validation";

// Public endpoint: receives career applications (multipart/form-data with PDF
// attachments) and delivers them by email. All credentials are server-side.

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const PDF_MAGIC = "%PDF-";

const CATEGORY_BY_POSITION: Record<string, { de: string; en: string; title: { de: string; en: string } }> = {
  brandschutzmonteur: {
    de: "Baustelle & Handwerk",
    en: "Construction & Skilled Trades",
    title: { de: "Brandschutzmonteur", en: "Fire Protection Installer" },
  },
  trockenbauer: {
    de: "Baustelle & Handwerk",
    en: "Construction & Skilled Trades",
    title: { de: "Trockenbauer", en: "Drywall Installer" },
  },
  "injektion-bauwerksabdichtung": {
    de: "Baustelle & Handwerk",
    en: "Construction & Skilled Trades",
    title: {
      de: "Fachkraft für Injektion und Bauwerksabdichtung",
      en: "Injection and Structural Waterproofing Specialist",
    },
  },
  "fenster-tueren-monteur": {
    de: "Baustelle & Handwerk",
    en: "Construction & Skilled Trades",
    title: { de: "Fenster- und Türenmonteur", en: "Window and Door Installer" },
  },
  bauhelfer: {
    de: "Baustelle & Handwerk",
    en: "Construction & Skilled Trades",
    title: { de: "Bauhelfer", en: "Construction Assistant" },
  },
  "bauzeichner-werkplaner": {
    de: "Engineering & Planung",
    en: "Engineering & Planning",
    title: { de: "Bauzeichner / Werkplaner", en: "Construction Draftsperson / Detailed Design Planner" },
  },
  "bauleiter-projektleiter": {
    de: "Projektmanagement",
    en: "Project Management",
    title: { de: "Bauleiter / Projektleiter", en: "Construction Manager / Project Manager" },
  },
  "initiativbewerbung-office-business": {
    de: "Office & Business",
    en: "Office & Business",
    title: { de: "Initiativbewerbung – Office & Business", en: "Open Application – Office & Business" },
  },
  initiativbewerbung: {
    de: "Initiativbewerbung",
    en: "Open Application",
    title: { de: "Initiativbewerbung", en: "Open Application" },
  },
};

// Best-effort in-memory rate limiting + duplicate suppression (per worker instance).
const hits = new Map<string, number[]>();
const recentSubmissions = new Map<string, number>();

function rateLimited(ip: string) {
  const now = Date.now();
  const window = 60 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < window);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

function isDuplicate(key: string) {
  const now = Date.now();
  for (const [k, t] of recentSubmissions) if (now - t > 5 * 60 * 1000) recentSubmissions.delete(k);
  if (recentSubmissions.has(key)) return true;
  recentSubmissions.set(key, now);
  return false;
}

/** Strip control characters / CR-LF to prevent header injection, and clamp length. */
function clean(value: unknown, max: number) {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeName(value: string) {
  return value.replace(/[^A-Za-z0-9-]/g, "_").slice(0, 40) || "Applicant";
}

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

// Browsers report inconsistent MIME types for PDFs (empty, octet-stream,
// x-pdf) depending on OS/file associations. The magic bytes stay the
// authoritative check; the declared type only rejects clearly wrong formats.
const NEUTRAL_TYPES = new Set(["", "application/pdf", "application/x-pdf", "application/octet-stream", "binary/octet-stream"]);

async function validatePdf(file: File) {
  if (file.size === 0) return "empty";
  if (file.size > MAX_FILE_BYTES) return "size";
  if (!NEUTRAL_TYPES.has((file.type || "").toLowerCase())) return "type";
  const head = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  const magic = String.fromCharCode(...head);
  if (magic !== PDF_MAGIC) return "type";
  return null;
}


function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const CAREERS_ENDPOINT = "/api/public/careers-application";
const ALLOWED_ORIGINS = new Set([
  "https://munichconstruction.de",
  "https://www.munichconstruction.de",
  "https://munich-builds-happily.lovable.app",
]);

function requestId() {
  return crypto.randomUUID();
}

function corsHeaders(request: Request, id: string) {
  const origin = request.headers.get("origin");
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-request-id": id,
    vary: "Origin",
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) headers["access-control-allow-origin"] = origin;
  return headers;
}

function result(request: Request, id: string, body: unknown, status: number, category: string) {
  console.info(`[careers-request] id=${id} endpoint=${CAREERS_ENDPOINT} status=${status} category=${category}`);
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request, id) });
}

export const Route = createFileRoute("/api/public/careers-application")({
  server: {
    handlers: {
      OPTIONS: async ({ request }) => {
        const id = requestId();
        const origin = request.headers.get("origin");
        if (!origin || !ALLOWED_ORIGINS.has(origin)) {
          return result(request, id, { error: "origin_not_allowed" }, 403, "origin_rejected");
        }
        return new Response(null, {
          status: 204,
          headers: {
            ...corsHeaders(request, id),
            "access-control-allow-methods": "POST, OPTIONS",
            "access-control-allow-headers": "content-type",
            "access-control-max-age": "86400",
          },
        });
      },
      POST: async ({ request }) => {
        const id = requestId();
        const origin = request.headers.get("origin");
        if (origin && !ALLOWED_ORIGINS.has(origin)) {
          return result(request, id, { error: "origin_not_allowed" }, 403, "origin_rejected");
        }
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";

        if (rateLimited(ip)) return result(request, id, { error: "rate_limited" }, 429, "rate_limited");

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return result(request, id, { error: "invalid_request" }, 400, "multipart_parse_failed");
        }

        // Honeypot — bots fill hidden fields.
        if (clean(form.get("company"), 100)) return result(request, id, { ok: true }, 200, "honeypot");

        const firstName = clean(form.get("firstName"), 80);
        const lastName = clean(form.get("lastName"), 80);
        const email = clean(form.get("email"), 200);
        const phone = clean(form.get("phone"), 40);
        const positionId = clean(form.get("positionId"), 60);
        const lang = clean(form.get("lang"), 2) === "en" ? "en" : "de";
        const consent = clean(form.get("consent"), 10) === "true";

        const mapping = CATEGORY_BY_POSITION[positionId];
        const normalizedEmail = normalizeEmail(email);
        const normalizedPhone = normalizePhone(phone);

        // Structured, field-specific errors — same rules as the client.
        const fields: Record<string, "required" | "invalid"> = {};
        if (!firstName) fields.firstName = "required";
        if (!lastName) fields.lastName = "required";
        if (!email) fields.email = "required";
        else if (!normalizedEmail) fields.email = "invalid";
        if (!phone) fields.phone = "required";
        else if (!normalizedPhone) fields.phone = "invalid";
        if (!mapping) fields.positionId = "required";
        if (!consent) fields.consent = "required";

        if (Object.keys(fields).length > 0 || !mapping || !normalizedEmail || !normalizedPhone) {
          return result(request, id, { error: "invalid_input", fields }, 400, "invalid_input");
        }

        const cv = form.get("cv");
        const cover = form.get("coverLetter");
        if (!(cv instanceof File)) return result(request, id, { error: "cv_required" }, 400, "cv_required");

        const cvError = await validatePdf(cv);
        if (cvError) {
          console.warn(`[careers] rejected cv: ${cvError}`);
          return result(request, id, { error: `cv_${cvError}` }, 400, `cv_${cvError}`);
        }
        if (cover instanceof File && cover.size > 0) {
          const coverError = await validatePdf(cover);
          if (coverError) {
            console.warn(`[careers] rejected cover letter: ${coverError}`);
            return result(request, id, { error: `cover_${coverError}` }, 400, `cover_${coverError}`);
          }
        }


        const mail = mailer();
        const to = INTERNAL_TO;
        const from = NOTIFY_FROM;

        if (!mail) {
          console.error("[careers] email service not configured: RESEND_API_KEY missing");
          return result(request, id, { error: "email_not_configured" }, 503, "email_not_configured");
        }


        if (isDuplicate(`${normalizedEmail}|${positionId}`)) return result(request, id, { ok: true, duplicate: true }, 200, "duplicate_accepted");

        const category = mapping.de;
        const submittedAt = new Date().toISOString();
        const fileBase = `${safeName(firstName)}_${safeName(lastName)}`;

        const hasCover = cover instanceof File && cover.size > 0;

        // Resend requires base64 string content + explicit type.
        const attachments: Array<{ filename: string; content: string; content_type: string }> = [
          {
            filename: `CV_${fileBase}.pdf`,
            content: toBase64(await cv.arrayBuffer()),
            content_type: "application/pdf",
          },
        ];
        if (hasCover) {
          attachments.push({
            filename: `CoverLetter_${fileBase}.pdf`,
            content: toBase64(await (cover as File).arrayBuffer()),
            content_type: "application/pdf",
          });
        }

        const rows: Array<[string, string]> = [
          ["Career category", category],
          ["Position", mapping.title.de],
          ["Position (EN)", mapping.title.en],
          ["First name", firstName],
          ["Last name", lastName],
          ["Phone", normalizedPhone],
          ["Submitted at", submittedAt],
          ["Page URL", clean(request.headers.get("referer"), 300)],
          ["Website language", lang.toUpperCase()],
          ["CV received", `Yes – ${attachments[0].filename} (${Math.round(cv.size / 1024)} KB)`],
          [
            "Cover letter received",
            hasCover ? `Yes – ${attachments[1].filename} (${Math.round((cover as File).size / 1024)} KB)` : "No",
          ],
        ];

        const emailRow = `<tr><td style="border:1px solid #ddd"><strong>Email</strong></td><td style="border:1px solid #ddd"><a href="mailto:${escapeHtml(normalizedEmail)}">${escapeHtml(normalizedEmail)}</a></td></tr>`;

        const notificationHtml = `
          <div style="font-family:Arial,sans-serif;color:#111">
            <h2 style="margin:0 0 16px">Neue Bewerbung / New application</h2>
            <table cellpadding="6" style="border-collapse:collapse">
              ${rows
                .slice(0, 5)
                .map(
                  ([k, v]) =>
                    `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(k)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
                )
                .join("")}
              ${emailRow}
              ${rows
                .slice(5)
                .map(
                  ([k, v]) =>
                    `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(k)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
                )
                .join("")}
            </table>
          </div>`;

        let messageId: string | null = null;
        try {
          messageId = await mail.send({
            from,
            to: [to],
            reply_to: normalizedEmail,
            subject: `Career Application – ${mapping.title.de} – ${firstName} ${lastName}`,
            html: notificationHtml,
            attachments,
          });
        } catch (error) {
          // Category only — never the payload, applicant data or credentials.
          console.error(`[careers] delivery failed: ${error instanceof Error ? error.message : "unknown"}`);
          recentSubmissions.delete(`${normalizedEmail}|${positionId}`);
          return result(request, id, { error: "delivery_failed" }, 502, "internal_delivery_failed");
        }


        // Confirmation to the applicant — never blocks the accepted application.
        await mail.sendConfirmation(normalizedEmail, lang as "de" | "en");

        return result(request, id, { ok: true, id: messageId }, 200, "accepted");

      },
    },
  },
});
