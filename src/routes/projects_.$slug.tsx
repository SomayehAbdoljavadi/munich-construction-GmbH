import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getProjectPage, projectCopy, PROJECT_PAGES } from "@/lib/project-pages";
import { useT } from "@/lib/i18n";
import { breadcrumb, ldScript, url, ORG_ID, SITE_NAME } from "@/lib/seo";

export const Route = createFileRoute("/projects_/$slug")({
  head: ({ params }) => {
    const p = getProjectPage(params.slug);
    const pageUrl = url(`/projects/${params.slug}`);
    if (!p) {
      return {
        meta: [
          { title: "Projekt | Munich Construction GmbH" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }
    const copy = projectCopy(p, "de");
    const title = `${copy.title} | ${SITE_NAME}`;
    const description = copy.intro.slice(0, 158);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: pageUrl },
        { property: "og:type", content: "article" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [
        ldScript({
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: copy.title,
          description: copy.intro,
          url: pageUrl,
          creator: { "@id": ORG_ID },
          locationCreated: {
            "@type": "Place",
            name: p.location,
            address: {
              "@type": "PostalAddress",
              streetAddress: p.location,
              addressLocality: p.city,
              addressCountry: "DE",
            },
          },
          about: p.services.map((s) => ({ "@type": "Service", name: s.title.de })),
        }),
        ldScript(
          breadcrumb([
            { name: "Start", path: "/" },
            { name: "Projekte", path: "/projects" },
            { name: p.name, path: `/projects/${params.slug}` },
          ]),
        ),
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ProjectDetailPage,
});

function NotFound() {
  const { lang } = useT();
  return (
    <div className="container-wide py-32 text-center">
      <h1 className="font-display text-4xl mb-4">
        {lang === "de" ? "Projekt nicht gefunden" : "Project not found"}
      </h1>
      <Link to="/projects" className="text-gold underline">
        {lang === "de" ? "Zur Projektübersicht" : "To all projects"}
      </Link>
    </div>
  );
}

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const { lang } = useT();
  const p = getProjectPage(slug);
  if (!p) return <NotFound />;
  const copy = projectCopy(p, lang);
  const others = PROJECT_PAGES.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  {lang === "de" ? "Start" : "Home"}
                </Link>
              </li>
              <li aria-hidden className="text-gold">/</li>
              <li>
                <Link to="/projects" className="hover:text-gold transition-colors">
                  {lang === "de" ? "Projekte" : "Projects"}
                </Link>
              </li>
              <li aria-hidden className="text-gold">/</li>
              <li className="text-gold">{p.name}</li>
            </ol>
          </nav>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">{copy.title}</h1>
          <div className="gold-divider w-24 mt-6" />
          <p className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            <MapPin size={14} className="text-gold" />
            {p.location}
          </p>
          <p className="text-white/70 text-lg mt-6 max-w-3xl leading-relaxed">{copy.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {p.services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="border border-gold/40 text-gold px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
              >
                {s.title[lang]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <article>
            <h2 className="font-display text-2xl md:text-3xl">
              {lang === "de" ? "Ausgangssituation" : "Initial situation"}
            </h2>
            <div className="gold-divider w-12 mt-4 mb-5" />
            <p className="text-muted-foreground leading-relaxed">{copy.situation}</p>
          </article>
          <article>
            <h2 className="font-display text-2xl md:text-3xl">
              {lang === "de" ? "Ausführung" : "Execution"}
            </h2>
            <div className="gold-divider w-12 mt-4 mb-5" />
            <p className="text-muted-foreground leading-relaxed">{copy.execution}</p>
          </article>
          <article>
            <h2 className="font-display text-2xl md:text-3xl">
              {lang === "de" ? "Ergebnis" : "Result"}
            </h2>
            <div className="gold-divider w-12 mt-4 mb-5" />
            <p className="text-muted-foreground leading-relaxed">{copy.result}</p>
          </article>
        </div>
      </section>

      {/* IMAGES */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "de" ? "Baudokumentation" : "Construction documentation"}
          </h2>
          <div className="gold-divider w-24 mt-6 mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.images.map((src, i) => (
              <figure key={src} className="bg-ink aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={copy.alt(i)}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-contain"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* MORE PROJECTS + CTA */}
      <section className="bg-ink text-white py-20 md:py-24">
        <div className="container-wide">
          <h2 className="font-display text-3xl md:text-4xl">
            {lang === "de" ? "Weitere Referenzprojekte" : "More reference projects"}
          </h2>
          <div className="gold-divider w-24 mt-6 mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/projects/$slug"
                params={{ slug: o.slug }}
                className="bg-ink p-8 group hover:bg-white/5 transition-colors"
              >
                <h3 className="font-display text-xl group-hover:text-gold transition-colors">
                  {o.name}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {o.location}
                </p>
              </Link>
            ))}
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-12 bg-gold text-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            {lang === "de" ? "Projekt anfragen" : "Request a project"}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
