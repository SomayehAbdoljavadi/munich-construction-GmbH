import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Hammer, Wrench, Flame, FileCheck2, Ruler, Check } from "lucide-react";
import { useT, type TranslationKey } from "@/lib/i18n";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Munich Construction GmbH" },
      { name: "description", content: "Six services from one source: new construction, renovation, refurbishment, fire protection, permitting, and execution planning in Munich." },
      { property: "og:title", content: "Services — Munich Construction GmbH" },
      { property: "og:description", content: "New construction, renovation, refurbishment, fire protection, permitting, execution planning." },
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
}

const SERVICES: ServiceDef[] = [
  {
    id: "neubau",
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
                  <Link
                    to="/contact"
                    className="inline-block mt-8 px-7 py-3 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
                  >
                    {t("service.cta")}
                  </Link>
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
