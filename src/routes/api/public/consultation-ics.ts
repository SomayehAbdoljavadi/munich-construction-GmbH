import { createFileRoute } from "@tanstack/react-router";
import { clean, clientIp, publicSupabase, rateLimited } from "@/lib/consultation.server";
import { buildIcs } from "@/lib/consultation-ics.server";

// Public download endpoint: serves the booking's calendar invitation as a
// forced-download .ics file. Unguessable URL — requires the booking id plus
// the secret cancel_token issued at booking time (both random UUIDs).
// Used as the guaranteed manual fallback when a mail client (Outlook/IONOS)
// hides or consumes text/calendar attachments.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type LoadRow = {
  outcome: string;
  slot_start: string | null;
  status: string | null;
  project_type: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  lang: string | null;
};

export const Route = createFileRoute("/api/public/consultation-ics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          if (rateLimited(clientIp(request), 30)) return new Response("rate_limited", { status: 429 });

          const url = new URL(request.url);
          const id = clean(url.searchParams.get("id"), 40);
          const token = clean(url.searchParams.get("token"), 40);
          if (!UUID.test(id) || !UUID.test(token)) return new Response("not_found", { status: 404 });

          const db = await publicSupabase();
          if (!db) return new Response("unavailable", { status: 503 });

          const { data, error } = await db.rpc("consultation_manage_booking", {
            p_id: id,
            p_token: token,
            p_action: "load",
            p_slot_start: null,
          });
          if (error) return new Response("unavailable", { status: 503 });

          const row = ((data ?? []) as LoadRow[])[0];
          if (!row || row.outcome !== "ok" || !row.slot_start) return new Response("not_found", { status: 404 });

          const cancelled = row.status === "cancelled";
          const origin = url.origin;
          const ics = buildIcs({
            bookingId: id,
            start: new Date(row.slot_start),
            method: cancelled ? "CANCEL" : "REQUEST",
            lang: row.lang === "en" ? "en" : "de",
            name: `${row.first_name ?? ""} ${row.last_name ?? ""}`.trim(),
            email: row.email ?? "",
            phone: row.phone ?? "",
            projectType: row.project_type ?? "",
            manageUrl: `${origin}/termin?id=${id}&token=${token}`,
          });

          return new Response(ics, {
            status: 200,
            headers: {
              "content-type": "application/octet-stream",
              "content-disposition": `attachment; filename="${cancelled ? "termin-absage-download.ics" : "termin-download.ics"}"`,
              "cache-control": "no-store",
            },
          });
        } catch (err) {
          console.error("[consultation] ics download crashed", err);
          return new Response("unavailable", { status: 503 });
        }
      },
    },
  },
});
