import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LOCATIONS } from "@/lib/locations-data";
import { breadcrumb, ldScript, url, webPage } from "@/lib/seo";

const TITLE = "Standorte in Bayern | Munich Construction";
const DESC =
  "Bauunternehmen mit Sitz in München – tätig in ganz Bayern: Bauleistungen in München, Nürnberg, Regensburg und Augsburg.";

export const Route = createFileRoute("/standorte")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: url("/standorte") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: url("/standorte") }],
    scripts: [
      ldScript(webPage({ path: "/standorte", name: TITLE, description: DESC, type: "CollectionPage" })),
      ldScript(breadcrumb([{ name: "Home", path: "/" }, { name: "Standorte", path: "/standorte" }])),
    ],
  }),
  component: StandortePage,
});

function StandortePage() {
  const { lang } = useT();
  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {lang === "de" ? "Standorte" : "Locations"}
          </p>
          <h1 className="font-display h-fluid-page text-balance">
            {lang === "de" ? "Bauleistungen in ganz Bayern" : "Construction services throughout Bavaria"}
          </h1>
          <div className="gold-divider w-24 mt-6" />
          <p className="text-white/75 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
            {lang === "de"
              ? "Bauunternehmen mit Sitz in München – tätig in ganz Bayern."
              : "Construction company based in Munich – working throughout Bavaria."}
          </p>
        </div>
      </section>
      <section className="bg-background py-20 md:py-28">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {LOCATIONS.map((l) => (
            <Link
              key={l.slug}
              to="/standorte/$city"
              params={{ city: l.slug }}
              className="bg-background p-8 md:p-10 group hover:bg-card transition-colors"
            >
              <MapPin className="text-gold mb-4" size={22} strokeWidth={1.5} />
              <h2 className="font-display text-2xl md:text-3xl group-hover:text-gold transition-colors">
                {l.city[lang]}
              </h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                {l.region[lang]}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {lang === "de" ? "Mehr erfahren" : "Learn more"} <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
