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

export function mailer() {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["CAREERS_TO_EMAIL"] || "info@munichconstruction.de";
  const from = process.env["CAREERS_FROM_EMAIL"] || "Munich Construction GmbH <info@munichconstruction.de>";
  if (!apiKey) return null;

  const gatewayKey = process.env["LOVABLE_API_KEY"];
  const endpoint = gatewayKey
    ? "https://connector-gateway.lovable.dev/resend/emails"
    : "https://api.resend.com/emails";

  const send = async (payload: Record<string, unknown>) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: gatewayKey
        ? { authorization: `Bearer ${gatewayKey}`, "X-Connection-Api-Key": apiKey, "content-type": "application/json" }
        : { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`[consultation] email delivery failed with status ${res.status}`);
      throw new Error(`email_failed_${res.status}`);
    }
  };

  return { to, from, send };
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
