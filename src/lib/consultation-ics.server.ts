// Server-only RFC 5545 calendar invitation builder for consultation appointments.
// Generated in memory and attached directly to Resend emails — never stored.

// The organizer must match the verified sender domain so Outlook/Exchange
// trusts the invitation and renders the Accept / Add-to-calendar actions.
const ORGANIZER_EMAIL = "website@send.munichconstruction.de";
const ORGANIZER_NAME = "Munich Construction GmbH";
const OFFICE_EMAIL = "office@munichconstruction.de";
const OFFICE_NAME = "Munich Construction Office";
const DOMAIN = "munichconstruction.de";
const TZID = "Europe/Berlin";

export type IcsInput = {
  bookingId: string;
  start: Date;
  durationMinutes?: number;
  sequence?: number;
  method: "REQUEST" | "CANCEL";
  lang: "de" | "en";
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  manageUrl?: string;
};

/** Berlin wall-clock parts for a given instant (DST-safe, no server TZ reliance). */
function berlinParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZID,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${get("year")}${get("month")}${get("day")}T${get("hour")}${get("minute")}${get("second")}`;
}

function utcStamp(date: Date) {
  return `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
}

function esc(value: string) {
  return String(value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function fold(line: string) {
  if (line.length <= 73) return line;
  const chunks: string[] = [];
  let rest = line;
  chunks.push(rest.slice(0, 73));
  rest = rest.slice(73);
  while (rest.length > 72) {
    chunks.push(` ${rest.slice(0, 72)}`);
    rest = rest.slice(72);
  }
  if (rest) chunks.push(` ${rest}`);
  return chunks.join("\r\n");
}

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZID}`,
  "X-LIC-LOCATION:Europe/Berlin",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

export function icsUid(bookingId: string) {
  return `consultation-${bookingId}@${DOMAIN}`;
}

export function buildIcs(input: IcsInput) {
  const duration = input.durationMinutes ?? 15;
  const end = new Date(input.start.getTime() + duration * 60_000);
  const cancelled = input.method === "CANCEL";
  const en = input.lang === "en";

  const summary = en
    ? "Free Initial Consultation – Munich Construction GmbH"
    : "Kostenlose Erstberatung – Munich Construction GmbH";
  const location = en ? "Telephone callback" : "Telefonischer Rückruf";

  const dateLabel = new Intl.DateTimeFormat(en ? "en-GB" : "de-DE", {
    timeZone: TZID,
    dateStyle: "full",
    timeStyle: "short",
  }).format(input.start);

  const descLines = en
    ? [
        `Customer: ${input.name}`,
        input.phone ? `Phone: ${input.phone}` : "",
        input.projectType ? `Project type: ${input.projectType}` : "",
        `Appointment: ${dateLabel} (Europe/Berlin)`,
        input.manageUrl ? `Reschedule or cancel: ${input.manageUrl}` : "",
      ]
    : [
        `Kunde: ${input.name}`,
        input.phone ? `Telefon: ${input.phone}` : "",
        input.projectType ? `Projektart: ${input.projectType}` : "",
        `Termin: ${dateLabel} (Europe/Berlin)`,
        input.manageUrl ? `Termin verschieben oder stornieren: ${input.manageUrl}` : "",
      ];
  const description = descLines.filter(Boolean).join("\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Munich Construction GmbH//Consultation//DE",
    "CALSCALE:GREGORIAN",
    `METHOD:${input.method}`,
    ...VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${icsUid(input.bookingId)}`,
    `SEQUENCE:${Math.max(0, Math.trunc(input.sequence ?? 0))}`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART;TZID=${TZID}:${berlinParts(input.start)}`,
    `DTEND;TZID=${TZID}:${berlinParts(end)}`,
    `SUMMARY:${esc(summary)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(description)}`,
    `STATUS:${cancelled ? "CANCELLED" : "CONFIRMED"}`,
    "TRANSP:OPAQUE",
    `ORGANIZER;CN=${ORGANIZER_NAME}:mailto:${ORGANIZER_EMAIL}`,
    `ATTENDEE;CN=${OFFICE_NAME};ROLE=REQ-PARTICIPANT;PARTSTAT=${cancelled ? "DECLINED" : "NEEDS-ACTION"};RSVP=${cancelled ? "FALSE" : "TRUE"}:mailto:${OFFICE_EMAIL}`,
    `ATTENDEE;CN=${esc(input.name)};ROLE=REQ-PARTICIPANT;PARTSTAT=${cancelled ? "DECLINED" : "NEEDS-ACTION"};RSVP=${cancelled ? "FALSE" : "TRUE"}:mailto:${input.email}`,
  ];

  if (!cancelled) {
    lines.push(
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(summary)}`,
      "TRIGGER:-PT30M",
      "END:VALARM",
    );
  }

  lines.push("END:VEVENT", "END:VCALENDAR");
  return lines.map(fold).join("\r\n") + "\r\n";
}

function base64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}

/** Resend attachment for the invitation (in-memory only). */
export function icsAttachment(input: IcsInput) {
  return {
    filename: input.method === "CANCEL" ? "termin-absage.ics" : "termin.ics",
    content: base64(buildIcs(input)),
    content_type: `text/calendar; method=${input.method}; charset=UTF-8`,
  };
}

/**
 * Visible, manually downloadable copy of the very same invitation for the
 * company mailbox. Sent as a forced-download `application/octet-stream` file:
 * Outlook/IONOS consumes and hides `text/calendar` parts, but always renders
 * an octet-stream attachment as a normal downloadable file.
 */
export function icsFallbackAttachment(input: IcsInput) {
  return {
    filename: input.method === "CANCEL" ? "termin-absage-download.ics" : "termin-download.ics",
    content: base64(buildIcs(input)),
    content_type: "application/octet-stream",
  };
}

/**
 * Prominent download button for the company mailbox. Links to the secure
 * token-protected download endpoint and guarantees the office can save the
 * appointment even when the mail client hides all ICS attachments.
 */
export function icsDownloadButton(url: string, cancelled = false) {
  const label = cancelled ? "Termin-Absage herunterladen (.ics)" : "Zum Kalender hinzufügen (.ics)";
  return `<div style="margin:20px 0">
    <a href="${url}" style="display:inline-block;background:#c9a227;color:#111;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:4px">${label}</a>
  </div>`;
}

/** Bilingual note explaining the attached invitation. */
export function calendarNote(lang: "de" | "en", cancelled = false) {
  const text = cancelled
    ? lang === "en"
      ? "A calendar cancellation is attached. Open it or use your email client's calendar button to remove the appointment."
      : "Eine Kalender-Absage ist angehängt. Öffnen Sie sie oder nutzen Sie die Kalender-Schaltfläche Ihres E-Mail-Programms, um den Termin zu entfernen."
    : lang === "en"
      ? "A calendar invitation (.ics) is attached. Open it or use your email client's \"Add to calendar\" button to save the appointment."
      : "Eine Kalendereinladung (.ics) ist angehängt. Öffnen Sie sie oder nutzen Sie die Schaltfläche \u201eZum Kalender hinzufügen\u201c in Ihrem E-Mail-Programm, um den Termin zu speichern.";
  return `<div style="margin:20px 0;padding:14px 16px;border-left:4px solid #c9a227;background:#faf7ef;font-family:Arial,sans-serif;color:#111;line-height:1.5">
    <strong>${lang === "en" ? "Calendar" : "Kalender"}</strong><br/>${text}
  </div>`;
}
