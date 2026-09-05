// Server-only helpers shared by the consultation booking + callback endpoints.

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_FILES = 5;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/heic"];

const hits = new Map<string, number[]>();

export function rateLimited(ip: string, limit = 8, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  return list.length > limit;
}

/** Strip control characters to prevent header injection, and clamp length. */
export function clean(value: unknown, max: number) {
  return String(value ?? "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export function clientIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
export const phoneValid = (v: string) => /^[+]?[\d\s()./-]{6,25}$/.test(v);

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}

function safeName(value: string) {
  return value.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 60) || "file";
}

export async function collectAttachments(form: FormData) {
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) return { error: "too_many_files" as const };
  const attachments: Array<{ filename: string; content: string }> = [];
  for (const file of files) {
    if (file.size > MAX_FILE_BYTES) return { error: "file_too_large" as const };
    if (file.type && !ALLOWED_TYPES.includes(file.type)) return { error: "file_type" as const };
    attachments.push({ filename: safeName(file.name), content: toBase64(await file.arrayBuffer()) });
  }
  return { attachments };
}

export const NOTIFY_TO = process.env["CAREERS_TO_EMAIL"] || "info@munichconstruction.de";
/** Internal recipient for careers applications and all consultation lifecycle emails. */
export const INTERNAL_TO = process.env["INTERNAL_TO_EMAIL"] || "office@munichconstruction.de";
export const NOTIFY_FROM = "Munich Construction Website <website@send.munichconstruction.de>";
export const CONFIRM_FROM = "Munich Construction GmbH <website@send.munichconstruction.de>";

export const confirmation = (lang: "de" | "en") =>
  lang === "en"
    ? {
        subject: "Thank you for your request – Munich Construction GmbH",
        html: `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Thank you for your request. We have successfully received your message or application and will contact you as soon as possible.</p><p>Kind regards,<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p></div>`,
      }
    : {
        subject: "Vielen Dank für Ihre Anfrage – Munich Construction GmbH",
        html: `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Vielen Dank für Ihre Anfrage. Wir haben Ihre Unterlagen bzw. Nachricht erfolgreich erhalten und werden uns schnellstmöglich bei Ihnen melden.</p><p>Mit freundlichen Grüßen<br/>Munich Construction GmbH<br/>+49 89 57843675<br/>info@munichconstruction.de</p></div>`,
      };

export function mailer() {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return null;

  const send = async (payload: Record<string, unknown>) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = (await res.text().catch(() => "")).slice(0, 300);
      console.error(`[email] delivery failed with status ${res.status}: ${detail}`);
      throw new Error(`email_failed_${res.status}`);
    }
    const body = (await res.json().catch(() => ({}))) as { id?: string };
    return body.id ?? null;
  };

  /** Bilingual confirmation to the submitter. Never throws. */
  const sendConfirmation = async (recipient: string, lang: "de" | "en", replyTo: string = NOTIFY_TO) => {
    try {
      return await send({
        from: CONFIRM_FROM,
        to: [recipient],
        reply_to: replyTo,
        ...confirmation(lang),
      });
    } catch {
      console.error("[email] confirmation could not be delivered");
      return null;
    }
  };

  return { to: NOTIFY_TO, from: NOTIFY_FROM, send, sendConfirmation };
}


export function table(rows: Array<[string, string]>) {
  return `<table cellpadding="6" style="border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="border:1px solid #ddd"><strong>${escapeHtml(k)}</strong></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

export function formatSlot(iso: string, lang: "de" | "en") {
  const date = new Date(iso);
  const locale = lang === "en" ? "en-GB" : "de-DE";
  const day = new Intl.DateTimeFormat(locale, {
    timeZone: "Europe/Berlin",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  return { day, time };
}

/**
 * Publishable-key Supabase client for the public consultation endpoints.
 * Works in deployments where only the build-time public config is available
 * (the service-role key is never inlined). All writes go through
 * SECURITY DEFINER RPCs, so RLS still blocks direct table access.
 */
export async function publicSupabase() {
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
    import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  const url =
    process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
  if (!key || !url) return null;

  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
