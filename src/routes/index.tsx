import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  HardHat,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { HeroSkylineArt } from "@/components/HeroSkylineArt";
import { SiteFooter } from "@/components/SiteFooter";
import { LocationMap } from "@/components/LocationMap";
import { HEITERWANGER_MAPS_URL, THERESIENSTRASSE_MAPS_URL } from "@/lib/mapLinks";
import { HOME_SERVICES_I18N, localizeService } from "@/lib/services-data";
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


function HomePage() {
  const { t } = useT();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.scrollSnapType;
    const prevBody = body.style.scrollSnapType;
    html.style.scrollSnapType = "y mandatory";
    body.style.scrollSnapType = "y mandatory";
    return () => {
      html.style.scrollSnapType = prevHtml;
      body.style.scrollSnapType = prevBody;
    };
  }, []);

  return (
    <>
      {/* SLIDE 1: HERO */}
      <section className="homepage-section relative bg-ink text-white overflow-hidden min-h-screen flex items-center [scroll-snap-align:start]">
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

        <div className="relative homepage-wide pt-16 md:pt-24 pb-24 md:pb-32 grid grid-cols-1 lg:[grid-template-columns:minmax(0,1.04fr)_minmax(min(44vw,760px),0.96fr)] gap-10 xl:gap-[clamp(4rem,6vw,9rem)] items-center">
          <div className="relative z-10 min-w-0 space-y-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold animate-fade-up">
              {t("hero.eyebrow")}
            </p>
            <h1 className="font-display leading-[1.02] text-balance animate-fade-up [animation-delay:100ms] min-w-0">
              <span className="block gold-text text-[clamp(2rem,4.6vw,5.25rem)] leading-[1.02]">{t("hero.titleBrand")}</span>
              <span className="block mt-3 text-white text-[clamp(1rem,1.6vw,2rem)] leading-[1.15]">{t("hero.titleRest")}</span>
            </h1>
            <div className="gold-divider w-32 animate-scale-line [animation-delay:300ms]" />
            <p className="text-fluid-lead text-white/70 max-w-[60ch] animate-fade-up [animation-delay:400ms]">
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

          <div className="min-w-0 relative z-0 animate-fade-in [animation-delay:300ms] mt-12 md:mt-20 lg:mt-0 lg:-mr-[clamp(1rem,3vw,5rem)]">
            <div className="mx-auto w-full max-w-none aspect-[8/5] flex items-center justify-center scale-100 sm:scale-105 lg:scale-115 xl:scale-125 2xl:scale-[1.35] origin-center transition-transform">

              <HeroSkylineArt />
            </div>
          </div>
        </div>

        {/* gold border accent */}
        <div className="absolute bottom-0 left-0 right-0 gold-divider" />
      </section>

      {/* SLIDE 2: SERVICES */}
      <section className="homepage-section bg-background py-[clamp(3.4rem,7vh,7rem)] min-h-screen flex items-center [scroll-snap-align:start]">
        <div className="homepage-wide w-full flex flex-col justify-center">
          <div className="max-w-none mb-[clamp(1.7rem,4.3vh,3.5rem)]">
            <p className="font-mono text-[18px] uppercase tracking-[0.3em] text-gold mb-4">
              {t("services.eyebrow")}
            </p>
            <h2 className="font-display text-[clamp(2.2rem,3.5vw,3.9rem)] leading-tight">
              {t("services.title.line1")}<br />
              {t("services.title.line2")}
            </h2>
            <div className="gold-divider w-32 mt-6" />
            <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-[70ch]">
              {t("services.lede")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-border border border-border">
            {HOME_SERVICES_I18N.map((raw, i) => {
              const s = localizeService(raw, lang);
              const Icon = s.icon;
              const isDark = i % 2 === 1;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={`group relative p-[clamp(1.7rem,2.4vw,2.6rem)] min-h-[clamp(15.5rem,29vh,24rem)] transition-all hover:shadow-premium ${
                    isDark ? "bg-ink text-white hover:bg-ink-soft" : "bg-card text-foreground hover:bg-secondary"
                  }`}
                >
                  <div className={`size-14 grid place-items-center mb-6 border ${isDark ? "border-gold/30 text-gold" : "border-gold text-gold"}`}>
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl xl:text-3xl mb-3 leading-tight">{s.title}</h3>
                  <p className={`text-base xl:text-lg leading-snug line-clamp-4 ${isDark ? "text-white/65" : "text-muted-foreground"}`}>
                    {s.intro}
                  </p>
                  <ArrowUpRight
                    size={24}
                    className="absolute top-6 right-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-gold"
                  />
                </Link>
              );
            })}

            {/* Final CTA card */}
            <div className="bg-ink text-white p-[clamp(1.7rem,2.4vw,2.6rem)] min-h-[clamp(15.5rem,29vh,24rem)] flex flex-col justify-between relative overflow-hidden">
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }} />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                  Individuelle Anfrage
                </p>
                <p className="font-display text-xl xl:text-2xl leading-snug text-white text-balance">
                  Für weitere Bauleistungen und individuelle Anfragen kontaktieren Sie uns gerne.
                </p>
              </div>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 mt-6 bg-gold text-ink px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors w-fit"
              >
                Kontakt aufnehmen
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 3: CONTACT + FOOTER */}
      <section className="homepage-section bg-ink text-white relative overflow-hidden min-h-screen flex flex-col [scroll-snap-align:start]">
        <div className="flex-1 py-[clamp(5rem,7vh,8rem)] flex items-center relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative homepage-wide grid grid-cols-1 lg:[grid-template-columns:minmax(0,0.9fr)_minmax(520px,1.1fr)] gap-12 xl:gap-[clamp(4rem,6vw,8rem)] items-center">
          <div className="space-y-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
                {t("contact.eyebrow")}
              </p>
              <h2 className="font-display h-fluid-section">
                {t("contact.title")}
              </h2>
              <div className="gold-divider w-24 mt-8" />
              <p className="text-fluid-lead text-white/70 mt-8 max-w-[55ch]">
                {t("contact.lede")}
              </p>
            </div>

            <div className="space-y-6">
              <ContactRow icon={<HardHat size={18} />} label="Mehdi Mardi · Dipl.-Ing.">
                Geschäftsführer | Hochbau
              </ContactRow>
              <ContactRow icon={<MapPin size={18} />} label={t("contact.office")}>
                <a
                  href={THERESIENSTRASSE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-gold hover:underline transition-colors"
                >
                  Theresienstraße 93, 80333 München
                </a>
                <a
                  href={HEITERWANGER_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-gold hover:underline transition-colors mt-1"
                >
                  Heiterwanger Straße 30, 81373 München
                </a>
              </ContactRow>
              <ContactRow icon={<Phone size={18} />} label={t("contact.phone")}>
                <a href="tel:+498957843675" className="block hover:text-gold">+49 (0) 89 57 84 3675</a>
                <a href="tel:+4917632354815" className="block hover:text-gold mt-1">+49 (176) 3235 4815</a>
              </ContactRow>
              <ContactRow icon={<Mail size={18} />} label={t("contact.email")}>
                <a href="mailto:info@munichconstruction.de" className="hover:text-gold break-all">
                  info@munichconstruction.de
                </a>
              </ContactRow>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="https://wa.me/4917632354815" target="_blank" rel="noreferrer" className="px-6 py-3 bg-gold text-ink text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors">
                WhatsApp
              </a>
              <a href="mailto:info@munichconstruction.de" className="px-6 py-3 border border-white/30 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-ink transition-colors">
                Email
              </a>
            </div>
          </div>

          <div className="border border-white/10 min-h-[clamp(26rem,48vh,42rem)] h-[clamp(26rem,48vh,42rem)]">
            <LocationMap />
          </div>
        </div>
        </div>
        <div className="relative z-20">
          <SiteFooter />
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
