import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Hammer, Wrench, Flame, FileCheck2, Ruler, Check } from "lucide-react";
import { useT, type TranslationKey } from "@/lib/i18n";
import { breadcrumb, ldScript, url, BASE_URL } from "@/lib/seo";
import { ALL_SERVICES_I18N } from "@/lib/services-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Bauleistungen in München | Munich Construction GmbH" },
      { name: "description", content: "Bauleistungen in München und Bayern: Neubau, Renovierung, Sanierung, Brandschutz, Trockenbau, Injektion, Fenster und Türen, Genehmigungs- und Werkplanung." },
      { property: "og:title", content: "Bauleistungen in München | Munich Construction GmbH" },
      { property: "og:description", content: "Neubau, Renovierung, Sanierung, Brandschutz, Trockenbau, Fenster und Türen sowie Genehmigungs- und Werkplanung aus einer Hand." },
      { property: "og:url", content: url("/services") },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Bauleistungen in München | Munich Construction GmbH" },
      { name: "twitter:description", content: "Bauleistungen in München und Bayern aus einer Hand." },
    ],
    links: [{ rel: "canonical", href: url("/services") }],
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Bauleistungen — Munich Construction GmbH",
        itemListElement: ALL_SERVICES_I18N.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${BASE_URL}/services/${s.slug}`,
          name: s.title.de,
        })),
      }),
      ldScript(breadcrumb([
        { name: "Start", path: "/" },
        { name: "Leistungen", path: "/services" },
      ])),
    ],
  }),
  component: ServicesPage,
});

interface ServiceDef {
  id: string;
  icon: typeof Building2;
  titleKey: TranslationKey;
  textKey: TranslationKey;
  benefitsDe: string[];
  benefitsEn: string[];
  includedDe: string[];
  includedEn: string[];
  /** Slug of the dedicated detail page. */
  detail: string;
}

const SERVICES: ServiceDef[] = [
  {
    id: "neubau",
    detail: "neubau",
    icon: Building2,
    titleKey: "service.neubau.title",
    textKey: "service.neubau.text",
    benefitsDe: ["Schlüsselfertige Übergabe", "Festpreisgarantie", "Termintreue"],
    benefitsEn: ["Turn-key handover", "Fixed-price guarantee", "On-time delivery"],
    includedDe: ["Rohbau & Ausbau", "Haustechnik-Koordination", "Qualitätsmanagement"],
    includedEn: ["Shell & finishing", "Building services coordination", "Quality management"],
  },
  {
    id: "renovierung",
    detail: "renovierung",
    icon: Hammer,
    titleKey: "service.renovierung.title",
    textKey: "service.renovierung.text",
    benefitsDe: ["Wertsteigerung", "Modernisierung im Bestand", "Geringe Eingriffe"],
    benefitsEn: ["Value increase", "Modernisation in existing buildings", "Minimal disruption"],
    includedDe: ["Aufmaß & Bestandsanalyse", "Innenausbau", "Fassaden- und Fensterarbeiten"],
    includedEn: ["Survey & condition analysis", "Interior fit-out", "Facade and window works"],
  },
  {
    id: "sanierung",
    detail: "sanierung",
    icon: Wrench,
    titleKey: "service.sanierung.title",
    textKey: "service.sanierung.text",
    benefitsDe: ["Energieeffizienz", "Substanzerhalt", "Förderfähigkeit"],
    benefitsEn: ["Energy efficiency", "Preservation of substance", "Eligible for subsidies"],
    includedDe: ["Energetische Sanierung", "Statische Ertüchtigung", "Schadstoffsanierung"],
    includedEn: ["Energetic refurbishment", "Structural reinforcement", "Hazardous-material remediation"],
  },
  {
    id: "brandschutz",
    detail: "brandschutz",
    icon: Flame,
    titleKey: "service.brandschutz.title",
    textKey: "service.brandschutz.text",
    benefitsDe: ["Normgerechte Konzepte", "Behördenkonform", "Versicherungsrelevant"],
    benefitsEn: ["Code-compliant concepts", "Authority-approved", "Insurance-relevant"],
    includedDe: ["Brandschutzkonzept", "Bauteilanforderungen", "Umsetzung & Dokumentation"],
    includedEn: ["Fire-protection concept", "Component requirements", "Execution & documentation"],
  },
  {
    id: "genehmigung",
    detail: "genehmigungsplanung",
    icon: FileCheck2,
    titleKey: "service.genehmigung.title",
    textKey: "service.genehmigung.text",
    benefitsDe: ["Schnellere Genehmigung", "Behördenerfahrung", "Vollständige Unterlagen"],
    benefitsEn: ["Faster approval", "Authority experience", "Complete documentation"],
    includedDe: ["Bauantrag & Genehmigungsplanung", "Statik-Koordination", "Behördenkommunikation"],
    includedEn: ["Permit application & planning", "Structural coordination", "Authority liaison"],
  },
  {
    id: "werkplanung",
    detail: "werkplanung",
    icon: Ruler,
    titleKey: "service.werkplanung.title",
    textKey: "service.werkplanung.text",
    benefitsDe: ["Reibungslose Bauabläufe", "Geringere Kostenrisiken", "Klare Schnittstellen"],
    benefitsEn: ["Smooth construction flow", "Lower cost risk", "Clear interfaces"],
    includedDe: ["Detail- und Ausführungspläne", "Materialspezifikationen", "Schnittstellenkoordination"],
    includedEn: ["Detail & execution drawings", "Material specifications", "Interface coordination"],
  },
];

function ServicesPage() {
  const { t, lang } = useT();
  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {t("services.eyebrow")}
          </p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">
            {t("services.title")}
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">{t("services.lede")}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide space-y-24">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.id}
                id={s.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 scroll-mt-28"
              >
                <div className="lg:col-span-4">
                  <div className="size-14 grid place-items-center border border-gold text-gold mb-6">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
                    {String(i + 1).padStart(2, "0")} / {t("services.eyebrow")}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl mb-4">{t(s.titleKey)}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t(s.textKey)}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.detail }}
                      className="inline-block px-7 py-3 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
                    >
                      {lang === "de" ? "Mehr erfahren" : "Learn more"}
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-block px-7 py-3 border border-border text-xs font-bold uppercase tracking-[0.2em] hover:bg-muted transition-colors"
                    >
                      {t("service.cta")}
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
                  <Block title={t("service.benefits")}>
                    {(lang === "de" ? s.benefitsDe : s.benefitsEn).map((b) => (
                      <Item key={b}>{b}</Item>
                    ))}
                  </Block>
                  <Block title={t("service.included")}>
                    {(lang === "de" ? s.includedDe : s.includedEn).map((b) => (
                      <Item key={b}>{b}</Item>
                    ))}
                  </Block>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-20">
        <div className="container-wide">
          <h2 className="font-display text-2xl md:text-3xl">
            {lang === "de" ? "Alle Leistungsseiten im Überblick" : "All service pages at a glance"}
          </h2>
          <div className="gold-divider w-16 mt-5 mb-8" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {ALL_SERVICES_I18N.map((svc) => (
              <li key={svc.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: svc.slug }}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors"
                >
                  {svc.h1[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-background p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-5">{title}</p>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <Check size={16} className="text-gold mt-0.5 shrink-0" />
      <span>{children}</span>
    </li>
  );
}
