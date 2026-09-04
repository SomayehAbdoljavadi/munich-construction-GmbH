/** Shared client + server validation rules so both sides stay consistent. */

export const MAX_EMAIL_LENGTH = 254;

const EMAIL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

/** Trimmed, lower-cased-domain-safe email. Returns null when invalid. */
export function normalizeEmail(raw: unknown): string | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;
  if (value.length > MAX_EMAIL_LENGTH) return null;
  if (/\s/.test(value)) return null;
  if ((value.match(/@/g) ?? []).length !== 1) return null;
  if (value.includes("..")) return null;
  if (!EMAIL_RE.test(value)) return null;
  return value;
}

export function isValidEmail(raw: unknown): boolean {
  return normalizeEmail(raw) !== null;
}

/**
 * Practical international phone validation: optional leading "+",
 * spaces / hyphens / parentheses / dots allowed as formatting,
 * 7–15 digits after formatting is stripped.
 */
export function normalizePhone(raw: unknown): string | null {
  const value = String(raw ?? "").trim().replace(/\s+/g, " ");
  if (!value) return null;
  if (value.length > 40) return null;
  if (!/^\+?[\d\s()./-]+$/.test(value)) return null;
  if (value.lastIndexOf("+") > 0) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  return value;
}

export function isValidPhone(raw: unknown): boolean {
  return normalizePhone(raw) !== null;
}
