import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Hammer,
  Wrench,
  Flame,
  FileCheck2,
  Ruler,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useT, type TranslationKey } from "@/lib/i18n";
import { HeroBuildingArt } from "@/components/HeroBuildingArt";
import heroBg from "@/assets/mc-hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Munich Construction GmbH — Hochwertiges Bauen in München" },
      {
        name: "description",
        content:
          "Munich Construction GmbH — Ihr Partner für Neubau, Sanierung, Brandschutz und Werkplanung in München. Alles aus einer Hand.",
      },
      { property: "og:title", content: "Munich Construction GmbH" },
      { property: "og:description", content: "Hochwertiges Bauen in München — alles aus einer Hand." },
      { property: "og:image", content: heroBg },
    ],
  }),
  component: HomePage,
});

const services: Array<{
  icon: typeof Building2;
  titleKey: TranslationKey;
  textKey: TranslationKey;
}> = [
  { icon: Building2, titleKey: "service.neubau.title", textKey: "service.neubau.text" },
  { icon: Hammer, titleKey: "service.renovierung.title", textKey: "service.renovierung.text" },
  { icon: Wrench, titleKey: "service.sanierung.title", textKey: "service.sanierung.text" },
  { icon: Flame, titleKey: "service.brandschutz.title", textKey: "service.brandschutz.text" },
  { icon: FileCheck2, titleKey: "service.genehmigung.title", textKey: "service.genehmigung.text" },
  { icon: Ruler, titleKey: "service.werkplanung.title", textKey: "service.werkplanung.text" },
];

function HomePage() {
  const { t } = useT();

  return (
    <>
      {/* SLIDE 1: HERO */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/80 to-ink" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold animate-fade-up">
              {t("hero.eyebrow")}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance animate-fade-up [animation-delay:100ms]">
              {t("hero.title")}
            </h1>
            <div className="gold-divider w-32 animate-scale-line [animation-delay:300ms]" />
            <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed animate-fade-up [animation-delay:400ms]">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up [animation-delay:500ms]">
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 bg-gold text-ink px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
              >
                {t("hero.cta1")}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition-colors"
              >
                {t("hero.cta2")}
              </Link>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 animate-fade-up [animation-delay:700ms]">
              {(["hero.trust1", "hero.trust2", "hero.trust3", "hero.trust4"] as const).map((k) => (
                <li key={k} className="flex items-start gap-2">
                  <span className="mt-1.5 size-1.5 bg-gold shrink-0" />
                  <span className="text-xs text-white/65 leading-snug">{t(k)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 relative animate-fade-in [animation-delay:300ms]">
            <div className="aspect-square w-full max-w-xl mx-auto">
              <HeroBuildingArt />
            </div>
          </div>
        </div>

        {/* gold border accent */}
        <div className="absolute bottom-0 left-0 right-0 gold-divider" />
      </section>

      {/* SLIDE 2: SERVICES */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
              {t("services.eyebrow")}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              {t("services.title")}
            </h2>
            <div className="gold-divider w-24 mt-8" />
            <p className="text-muted-foreground text-lg mt-8 leading-relaxed">
              {t("services.lede")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isDark = i % 2 === 1;
              return (
                <Link
                  key={s.titleKey}
                  to="/services"
                  className={`group relative p-10 transition-all hover:shadow-premium ${
                    isDark ? "bg-ink text-white hover:bg-ink-soft" : "bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className={`size-12 grid place-items-center mb-8 border ${isDark ? "border-gold/30 text-gold" : "border-gold text-gold"}`}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl mb-3">{t(s.titleKey)}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/65" : "text-muted-foreground"}`}>
                    {t(s.textKey)}
                  </p>
                  <ArrowUpRight
                    size={18}
                    className={`absolute top-8 right-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isDark ? "text-gold" : "text-gold"}`}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SLIDE 3: CONTACT + LOCATION */}
      <section className="bg-ink text-white py-24 md:py-32 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
                {t("contact.eyebrow")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
                {t("contact.title")}
              </h2>
              <div className="gold-divider w-24 mt-8" />
              <p className="text-white/70 text-lg mt-8 leading-relaxed max-w-md">
                {t("contact.lede")}
              </p>
            </div>

            <div className="space-y-6">
              <ContactRow icon={<MapPin size={18} />} label="Mehdi Mardi · Dipl.-Ing.">
                Geschäftsführer | Hochbau
              </ContactRow>
              <ContactRow icon={<MapPin size={18} />} label={t("contact.office")}>
                Theresienstraße 93, 80333 München<br />
                Heiterwanger Straße 30, 81373 München
              </ContactRow>
              <ContactRow icon={<Phone size={18} />} label={t("contact.phone")}>
                <a href="tel:+498957843675" className="hover:text-gold">+49 (0) 89 57 84 3675</a>
                <span className="block text-white/50 text-sm mt-0.5">
                  Mobil: <a href="tel:+4917632354815" className="hover:text-gold">+49 (176) 3235 4815</a>
                </span>
              </ContactRow>
              <ContactRow icon={<Mail size={18} />} label={t("contact.email")}>
                <a href="mailto:m.mardi@munichconstruction.de" className="hover:text-gold break-all">
                  m.mardi@munichconstruction.de
                </a>
              </ContactRow>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="https://wa.me/4917632354815" target="_blank" rel="noreferrer" className="px-6 py-3 bg-gold text-ink text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                WhatsApp
              </a>
              <a href="mailto:m.mardi@munichconstruction.de" className="px-6 py-3 border border-white/30 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition-colors">
                Email
              </a>
            </div>
          </div>

          <div className="border border-white/10">
            <iframe
              title="Munich Construction GmbH map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.5640%2C48.1455%2C11.5760%2C48.1525&amp;layer=mapnik&amp;marker=48.1490%2C11.5700"
              className="w-full aspect-[4/5] grayscale"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="size-10 grid place-items-center border border-gold/30 text-gold shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{label}</p>
        <div className="text-white text-base leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
