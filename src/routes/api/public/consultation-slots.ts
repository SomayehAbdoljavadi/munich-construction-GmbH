import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { clientIp, rateLimited } from "@/lib/consultation.server";

// Public availability endpoint. Returns ONLY free future slot start times for a
// single date, computed server-side from persistent booking data. It never
// exposes any customer information and is never cached.

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function noStore(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      pragma: "no-cache",
    },
  });
}

function fail(error: string, status: number) {
  const requestId = crypto.randomUUID().slice(0, 8);
  return noStore({ ok: false, error, requestId }, status);
}


export const Route = createFileRoute("/api/public/consultation-slots")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (rateLimited(clientIp(request), 240)) return noStore({ error: "rate_limited" }, 429);

        const date = new URL(request.url).searchParams.get("date") ?? "";
        if (!DATE_RE.test(date) || Number.isNaN(new Date(`${date}T12:00:00Z`).getTime())) {
          return noStore({ error: "invalid_date" }, 400);
        }

        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        const url = process.env["SUPABASE_URL"];
        if (!key || !url) {
          console.error("[consultation] availability: Supabase env missing");
          return noStore({ error: "unavailable" }, 503);
        }

        const supabase = createClient<Database>(url, key, {
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const headers = new Headers(init?.headers);
              if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
                headers.delete("Authorization");
              }
              headers.set("apikey", key);
              return fetch(input, { ...init, headers });
            },
          },
        });

        const { data, error } = await supabase.rpc("consultation_free_slots", { target_date: date });
        if (error) {
          console.error("[consultation] availability lookup failed");
          return noStore({ error: "unavailable" }, 503);
        }

        const now = Date.now();
        const slots = (data ?? [])
          .map((row: { slot_start: string }) => row.slot_start)
          .filter((iso: string) => new Date(iso).getTime() > now)
          .sort();

        return noStore({ date, timezone: "Europe/Berlin", slots }, 200);
      },
    },
  },
});
