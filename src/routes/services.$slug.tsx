import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { getServiceBySlug, HOME_SERVICES } from "@/lib/services-data";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
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
  const { service } = Route.useLoaderData();
  const Icon = service.icon;

  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white py-20 md:py-28 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
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
                {service.intro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-background py-20 md:py-28">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          <DetailBlock title="Inklusive Leistungen" items={service.includes} variant="light" />
          <DetailBlock title="Ihre Vorteile" items={service.benefits} variant="dark" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white py-20 md:py-24">
        <div className="container-wide max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            Kontakt
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance">
            Bereit für Ihr Projekt mit Munich Construction GmbH?
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
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            <span className={`leading-relaxed ${isDark ? "text-white/85" : "text-foreground"}`}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const _allSlugs = HOME_SERVICES.map((s) => s.slug);
