import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { useT } from "@/lib/i18n";
import { getLocation, projectsInCity } from "@/lib/locations-data";
import { ALL_SERVICES_I18N } from "@/lib/services-data";
import { LANGUAGES } from "@/lib/consultation-data";
import { breadcrumb, ldScript, url, webPage, ORG_ID } from "@/lib/seo";

export const Route = createFileRoute("/standorte_/$city")({
  loader: ({ params }) => {
    if (!getLocation(params.city)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const l = getLocation(params.city);
    if (!l) return { meta: [{ title: "Standort nicht gefunden" }, { name: "robots", content: "noindex, follow" }] };
    const path = `/standorte/${l.slug}`;
    const title = l.isBase
      ? "Bauunternehmen München – Sitz der Munich Construction"
      : `Bauunternehmen für ${l.city.de} | Munich Construction`;
    const desc = l.isBase
      ? "Bauunternehmen mit Sitz in München: Trockenbau, Brandschutz, Renovierung, Sanierung und Planung – Büro in der Maxvorstadt, Projekte in ganz München."
      : `Bauleistungen in ${l.city.de} und ${l.region.de}: ${servicesList(l.services.slice(0, 4))} – vom Bauunternehmen mit Sitz in München.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url(path) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url(path) }],
      scripts: [
        ldScript(webPage({ path, name: title, description: desc })),
        ldScript({
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Bauleistungen ${l.city.de}`,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "AdministrativeArea", name: "Bavaria" },
          url: url(path),
        }),
        ldScript(
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Standorte", path: "/standorte" },
            { name: l.city.de, path },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-wide py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Standort nicht gefunden</h1>
      <Link to="/standorte" className="text-gold underline">Alle Standorte</Link>
    </div>
  ),
  component: CityPage,
});

function servicesList(slugs: string[]) {
  const names = slugs.map((s) => ALL_SERVICES_I18N.find((x) => x.slug === s)?.title.de).filter(Boolean);
  return `${names.slice(0, -1).join(", ")} und ${names.at(-1)}`;
}

function CityPage() {
  const { city } = Route.useParams();
  const { lang } = useT();
  const l = getLocation(city)!;
  const services = l.services
    .map((s) => ALL_SERVICES_I18N.find((x) => x.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const projects = projectsInCity(l);
  const c = l.city[lang];

  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              <li><Link to="/" className="hover:text-gold">{lang === "de" ? "Start" : "Home"}</Link></li>
              <li aria-hidden className="text-gold">/</li>
              <li><Link to="/standorte" className="hover:text-gold">{lang === "de" ? "Standorte" : "Locations"}</Link></li>
              <li aria-hidden className="text-gold">/</li>
              <li className="text-gold">{c}</li>
            </ol>
          </nav>
          <h1 className="font-display h-fluid-page text-balance">
            {l.isBase
              ? lang === "de" ? "Bauunternehmen in München" : "Construction company in Munich"
              : lang === "de" ? `Bauleistungen in ${c}` : `Construction services in ${c}`}
          </h1>
          <div className="gold-divider w-24 mt-6" />
          <p className="text-white/75 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">{l.intro[lang]}</p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
              {lang === "de" ? "Projekt anfragen" : "Request a quote"} <ArrowUpRight size={16} />
            </Link>
            <Link to="/beratung" className="inline-flex items-center gap-3 border border-gold/60 text-gold px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors">
              {lang === "de" ? "Kostenlose Beratung buchen" : "Book a free consultation"}
            </Link>
          </div>
          <p className="text-white/55 text-sm mt-4">{LANGUAGES.short[lang]}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-5xl text-balance">
            {lang === "de" ? `Unsere Leistungen für ${c}` : `Our services for ${c}`}
          </h2>
          <div className="gold-divider w-24 mt-6 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="bg-background p-8 group hover:bg-card transition-colors">
                <h3 className="font-display text-xl group-hover:text-gold transition-colors">{s.title[lang]}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm">{s.subtitle[lang]}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {lang === "de" ? "Zur Leistung" : "View service"} <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-4xl text-balance">
            {lang === "de" ? `Referenzprojekte in ${c}` : `Reference projects in ${c}`}
          </h2>
          <div className="gold-divider w-16 mt-6 mb-8" />
          {projects.length > 0 ? (
            <ul className="space-y-4">
              {projects.map((p) => (
                <li key={p.slug} className="flex items-start gap-3">
                  <Check size={18} className="text-gold mt-0.5 shrink-0" />
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="hover:text-gold underline-offset-4 hover:underline">
                    {p.name} – {p.location}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              {lang === "de"
                ? `Referenzen aus ${c} veröffentlichen wir hier, sobald sie freigegeben sind. Ausgewählte Projekte aus anderen Teilen Bayerns finden Sie in unserer Projektübersicht.`
                : `We will publish references from ${c} here once they are approved. Selected projects from other parts of Bavaria are shown in our project overview.`}
            </p>
          )}
          <Link to="/projects" className="inline-flex items-center gap-2 mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-gold hover:underline">
            {lang === "de" ? "Alle Projekte" : "All projects"} <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
