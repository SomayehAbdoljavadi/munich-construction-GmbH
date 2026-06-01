import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BASE_URL } from "@/lib/seo";
import { HOME_SERVICES_I18N } from "@/lib/services-data";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Array<{ path: string; priority: string; changefreq?: string }> = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/about", priority: "0.8", changefreq: "monthly" },
          { path: "/services", priority: "0.9", changefreq: "monthly" },
          { path: "/projects", priority: "0.9", changefreq: "weekly" },
          { path: "/contact", priority: "0.8", changefreq: "monthly" },
          { path: "/imprint", priority: "0.3", changefreq: "yearly" },
          ...HOME_SERVICES_I18N.map((s) => ({
            path: `/services/${s.slug}`,
            priority: "0.85",
            changefreq: "monthly",
          })),
        ];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq ?? "weekly"}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
