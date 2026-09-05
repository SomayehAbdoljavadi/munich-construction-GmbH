import { createFileRoute } from "@tanstack/react-router";

// Temporary diagnostics: reports only presence booleans, never values.
export const Route = createFileRoute("/api/public/consultation-diag")({
  server: {
    handlers: {
      GET: async () => {
        const env = (k: string) => Boolean(process.env[k]);
        let adminOk = false;
        let adminError: string | null = null;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("consultation_settings").select("slot_minutes").limit(1);
          adminOk = !error;
          adminError = error ? error.code ?? "query_error" : null;
        } catch (e) {
          adminError = e instanceof Error ? e.message.slice(0, 120) : "admin_init_failed";
        }
        return new Response(
          JSON.stringify({
            supabaseUrl: env("SUPABASE_URL"),
            serviceRole: env("SUPABASE_SERVICE_ROLE_KEY"),
            publishable: env("SUPABASE_PUBLISHABLE_KEY"),
            resend: env("RESEND_API_KEY"),
            adminOk,
            adminError,
          }),
          { status: 200, headers: { "content-type": "application/json", "cache-control": "no-store" } },
        );
      },
    },
  },
});
