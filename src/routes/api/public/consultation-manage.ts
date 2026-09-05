import { createFileRoute } from "@tanstack/react-router";
import {
  clean,
  clientIp,
  escapeHtml,
  formatSlot,
  INTERNAL_TO,
  json,
  mailer,
  publicSupabase,
  rateLimited,
  table,
} from "@/lib/consultation.server";
import { calendarNote, icsAttachment, icsDownloadButton, icsFallbackAttachment } from "@/lib/consultation-ics.server";

// Public endpoint: lets a customer load, reschedule or cancel their own
// consultation booking using the secret cancel_token issued at booking time.
// All database work runs through a SECURITY DEFINER RPC, so the endpoint needs
// no service-role credentials and RLS still blocks direct table access.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Action = "load" | "reschedule" | "cancel";

type ManageRow = {
  outcome: string;
  slot_start: string | null;
  old_slot_start: string | null;
  status: string | null;
  project_type: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  lang: string | null;
};

export const Route = createFileRoute("/api/public/consultation-manage")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          return await handleManage(request);
        } catch (error) {
          console.error("[consultation] manage crashed", error);
          return json({ error: "unavailable" }, 503);
        }
      },
    },
  },
});

async function handleManage(request: Request) {
  if (rateLimited(clientIp(request), 30)) return json({ error: "rate_limited" }, 429);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  const id = clean(body["id"], 40);
  const token = clean(body["token"], 40);
  const action = clean(body["action"], 20) as Action;
  if (!UUID.test(id) || !UUID.test(token) || !["load", "reschedule", "cancel"].includes(action)) {
    return json({ error: "invalid_request" }, 400);
  }

  let slotIso: string | null = null;
  if (action === "reschedule") {
    const slotDate = new Date(clean(body["slotStart"], 40));
    if (Number.isNaN(slotDate.getTime()) || slotDate.getTime() < Date.now()) {
      return json({ error: "invalid_input" }, 400);
    }
    slotIso = slotDate.toISOString();
  }

  const db = await publicSupabase();
  if (!db) {
    console.error("[consultation] manage: Supabase configuration missing");
    return json({ error: "unavailable" }, 503);
  }

  const { data, error } = await db.rpc("consultation_manage_booking", {
    p_id: id,
    p_token: token,
    p_action: action,
    p_slot_start: slotIso,
  });

  if (error) {
    console.error("[consultation] manage lookup failed", error.message);
    return json({ error: "unavailable" }, 503);
  }

  const row = ((data ?? []) as ManageRow[])[0];
  if (!row || row.outcome === "not_found") return json({ error: "not_found" }, 404);

  const lang: "de" | "en" = row.lang === "en" ? "en" : "de";
  const name = `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim();
  const view = {
    slotStart: row.slot_start ?? "",
    status: row.status ?? "",
    projectType: row.project_type ?? "",
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    lang,
  };

  if (row.outcome === "already_cancelled") return json({ error: "already_cancelled" }, 409);
  if (row.outcome === "too_late") return json({ error: "too_late" }, 409);
  if (row.outcome === "slot_unavailable") return json({ error: "slot_unavailable" }, 409);
  if (row.outcome === "invalid_input") return json({ error: "invalid_input" }, 400);
  if (row.outcome === "ok") return json({ ok: true, booking: view }, 200);

  const mail = mailer();

  // Same UID, incremented SEQUENCE so calendar clients update instead of duplicating.
  const { data: seqData } = await db.rpc("consultation_bump_calendar_sequence", { p_id: id, p_token: token });
  const sequence = typeof seqData === "number" ? seqData : 1;
  const origin = (() => {
    try {
      return new URL(request.url).origin;
    } catch {
      return "https://munichconstruction.de";
    }
  })();
  const manageUrl = `${origin}/termin?id=${id}&token=${token}`;
  const icsUrl = `${origin}/api/public/consultation-ics?id=${id}&token=${token}`;

  if (row.outcome === "cancelled") {
    const oldIso = row.old_slot_start ?? row.slot_start ?? "";
    const old = formatSlot(oldIso, lang);
    const cancelInvite = icsAttachment({
      bookingId: id,
      start: new Date(oldIso),
      sequence,
      method: "CANCEL",
      lang,
      name,
      email: row.email ?? "",
      phone: row.phone ?? "",
      projectType: row.project_type ?? "",
    });
    const cancelFallback = icsFallbackAttachment({
      bookingId: id,
      start: new Date(oldIso),
      sequence,
      method: "CANCEL",
      lang,
      name,
      email: row.email ?? "",
      phone: row.phone ?? "",
      projectType: row.project_type ?? "",
    });
    if (mail) {
      try {
        await mail.send({
          from: mail.from,
          to: [INTERNAL_TO],
          reply_to: row.email ?? undefined,
          subject: `Beratungstermin storniert – ${old.day} ${old.time} – ${name}`,
          html: `<div style="font-family:Arial,sans-serif;color:#111"><h2 style="margin:0 0 16px">Termin storniert</h2>${table([
            ["Datum", old.day],
            ["Uhrzeit", old.time],
            ["Name", name],
            ["Telefon", row.phone ?? ""],
            ["E-Mail", row.email ?? ""],
            ["Projektart", row.project_type ?? ""],
          ])}${icsDownloadButton(icsUrl, true)}${calendarNote("de", true)}</div>`,
          attachments: [cancelInvite, cancelFallback],
        });
        if (row.email) {
          await mail.send({
            from: mail.from,
            to: [row.email],
            reply_to: INTERNAL_TO,
            subject:
              lang === "en"
                ? `Your consultation on ${old.day} has been cancelled`
                : `Ihr Beratungstermin am ${old.day} wurde storniert`,
            html:
              lang === "en"
                ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Dear ${escapeHtml(name)},</p><p>your consultation on <strong>${escapeHtml(old.day)}, ${escapeHtml(old.time)}</strong> has been cancelled.</p><p>You are welcome to book a new appointment at any time.</p><p>Kind regards,<br/>Munich Construction GmbH</p></div>`
                : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Guten Tag ${escapeHtml(name)},</p><p>Ihr Beratungstermin am <strong>${escapeHtml(old.day)}, ${escapeHtml(old.time)} Uhr</strong> wurde storniert.</p><p>Gerne können Sie jederzeit einen neuen Termin buchen.</p><p>Mit freundlichen Grüßen<br/>Munich Construction GmbH</p>${calendarNote(lang, true)}</div>`,
            attachments: [cancelInvite],
          });
        }
      } catch {
        console.error("[consultation] cancel notification failed");
      }
    }
    return json({ ok: true, booking: { ...view, status: "cancelled" } }, 200);
  }

  // rescheduled
  const from = formatSlot(row.old_slot_start ?? "", lang);
  const to = formatSlot(row.slot_start ?? "", lang);
  const updateInvite = icsAttachment({
    bookingId: id,
    start: new Date(row.slot_start ?? ""),
    sequence,
    method: "REQUEST",
    lang,
    name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    projectType: row.project_type ?? "",
    manageUrl,
  });
  const updateFallback = icsFallbackAttachment({
    bookingId: id,
    start: new Date(row.slot_start ?? ""),
    sequence,
    method: "REQUEST",
    lang,
    name,
    email: row.email ?? "",
    phone: row.phone ?? "",
    projectType: row.project_type ?? "",
    manageUrl,
  });
  if (mail) {
    try {
      await mail.send({
        from: mail.from,
        to: [INTERNAL_TO],
        reply_to: row.email ?? undefined,
        subject: `Beratungstermin verschoben – ${to.day} ${to.time} – ${name}`,
        html: `<div style="font-family:Arial,sans-serif;color:#111"><h2 style="margin:0 0 16px">Termin verschoben</h2>${table([
          ["Alter Termin", `${from.day} ${from.time}`],
          ["Neuer Termin", `${to.day} ${to.time}`],
          ["Name", name],
          ["Telefon", row.phone ?? ""],
          ["E-Mail", row.email ?? ""],
          ["Projektart", row.project_type ?? ""],
        ])}${icsDownloadButton(icsUrl)}${calendarNote("de")}</div>`,
        attachments: [updateInvite, updateFallback],
      });
      if (row.email) {
        await mail.send({
          from: mail.from,
          to: [row.email],
          reply_to: INTERNAL_TO,
          subject:
            lang === "en"
              ? `Your consultation is now on ${to.day} at ${to.time}`
              : `Ihr Beratungstermin ist jetzt am ${to.day} um ${to.time} Uhr`,
          html:
            lang === "en"
              ? `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Dear ${escapeHtml(name)},</p><p>your consultation has been moved to <strong>${escapeHtml(to.day)}, ${escapeHtml(to.time)}</strong>.</p><p>We will call you on ${escapeHtml(row.phone ?? "")}.</p><p>Kind regards,<br/>Munich Construction GmbH</p></div>`
              : `<div style="font-family:Arial,sans-serif;color:#111;line-height:1.6"><p>Guten Tag ${escapeHtml(name)},</p><p>Ihr Beratungstermin wurde auf <strong>${escapeHtml(to.day)}, ${escapeHtml(to.time)} Uhr</strong> verschoben.</p><p>Wir rufen Sie unter ${escapeHtml(row.phone ?? "")} an.</p><p>Mit freundlichen Grüßen<br/>Munich Construction GmbH</p>${calendarNote(lang)}</div>`,
          attachments: [updateInvite],
        });
      }
    } catch {
      console.error("[consultation] reschedule notification failed");
    }
  }

  return json({ ok: true, booking: view }, 200);
}
