import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Star } from "lucide-react";
import { getServiceBySlug, HOME_SERVICES } from "@/lib/services-data";
import { SiteFooter } from "@/components/SiteFooter";
import { ServiceGallery } from "@/components/ServiceGallery";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = getServiceBySlug(params.slug);
    const title = s ? `${s.title} — Munich Construction GmbH` : "Service — Munich Construction GmbH";
    const description = s?.intro ?? "Bauleistungen von Munich Construction GmbH.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-wide py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Service nicht gefunden</h1>
      <Link to="/services" className="text-gold underline">Zur Leistungsübersicht</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-wide py-32 text-center">
      <h1 className="font-display text-4xl mb-4">Etwas ist schiefgelaufen</h1>
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = getServiceBySlug(slug);
  if (!service) {
    return (
      <div className="container-wide py-32 text-center">
        <h1 className="font-display text-4xl mb-4">Service nicht gefunden</h1>
        <Link to="/services" className="text-gold underline">Zur Leistungsübersicht</Link>
      </div>
    );
  }
  const Icon = service.icon;


  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white py-20 md:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container-wide relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            Leistung
          </p>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="size-16 grid place-items-center border border-gold/40 text-gold shrink-0">
              <Icon size={30} strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display h-fluid-page text-balance">{service.title}</h1>
              <div className="gold-divider w-24 mt-6" />
              <p className="text-white/70 text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
                {service.subtitle}
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 mt-10 bg-gold text-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                Kontakt aufnehmen
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO PARAGRAPH */}
      <section className="bg-background py-20 md:py-28 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-gold/[0.04] blur-3xl" />
        <div className="container-wide relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">
                Über diese Leistung
              </p>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] text-balance">
                Unser Ansatz für{" "}
                <span className="text-gold">{service.title}</span>
              </h2>
              <div className="gold-divider w-16 mt-6" />
            </div>
            <div className="lg:col-span-8">
              <div className="relative pl-6 md:pl-10 border-l border-gold/40">
                <span aria-hidden className="absolute -left-[7px] top-0 size-3 bg-gold rotate-45" />
                <p className="font-serif text-xl md:text-[1.6rem] leading-[1.55] text-foreground first-letter:font-display first-letter:text-5xl md:first-letter:text-6xl first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:leading-[0.9] first-letter:mt-1">
                  {service.paragraph}
                </p>
                <div className="mt-10 pt-6 border-t border-border flex items-center gap-3">
                  <span className="h-px w-10 bg-gold" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Munich Construction GmbH · Qualität nach deutschen Standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-background pb-20 md:pb-28">
        <div className="container-wide">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
                Referenzprojekte
              </p>
              <h2 className="font-display text-3xl md:text-4xl">Ausgewählte Arbeiten</h2>
            </div>
          </div>
          <ServiceGallery slides={service.gallery} />
        </div>
      </section>

      {/* WAS WIR LEISTEN + IHRE VORTEILE */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          <DetailBlock title="Was wir leisten" items={service.includes} variant="light" />
          <DetailBlock title="Ihre Vorteile" items={service.benefits} variant="dark" />
        </div>
      </section>

      {/* WARUM MUNICH CONSTRUCTION */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-4">
              Warum wir
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-balance">
              Warum Munich Construction GmbH?
            </h2>
            <div className="gold-divider w-24 mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {service.whyUs.map((point: string) => (
              <div key={point} className="bg-background p-8 group hover:bg-card transition-colors">
                <Star size={20} className="text-gold mb-5" strokeWidth={1.5} />
                <p className="text-foreground leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white py-20 md:py-24">
        <div className="container-wide max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            Kontakt
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance">
            Sie planen ein Bauprojekt oder benötigen Unterstützung bei diesem Service?
          </h2>
          <div className="gold-divider w-24 mx-auto mt-8" />
          <p className="text-white/70 mt-8 max-w-2xl mx-auto">
            Sprechen Sie uns an – wir beraten Sie persönlich und erstellen ein individuelles Angebot.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-10 bg-gold text-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            Kontakt aufnehmen
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function DetailBlock({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div className={`${isDark ? "bg-ink text-white" : "bg-card text-foreground"} p-8 md:p-12`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-6">{title}</p>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <Check size={18} className="text-gold mt-0.5 shrink-0" />
            <span className={`leading-relaxed ${isDark ? "text-white/85" : "text-foreground"}`}>
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const _allSlugs = HOME_SERVICES.map((s) => s.slug);
