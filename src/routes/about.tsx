import { createFileRoute, Link } from "@tanstack/react-router";
import { useT, type TranslationKey } from "@/lib/i18n";
import aboutImg from "@/assets/mc-about.jpg";
import { breadcrumb, ldScript, url } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Munich Construction GmbH — Munich-based General Contractor" },
      { name: "description", content: "Munich Construction GmbH — an engineering-led construction company in Munich, Germany. End-to-end service from planning to handover, led by Dipl.-Ing. Mehdi Mardi." },
      { property: "og:title", content: "About Munich Construction GmbH" },
      { property: "og:description", content: "Engineering-led construction in Munich, Germany." },
      { property: "og:url", content: url("/about") },
      { property: "og:image", content: aboutImg },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About Munich Construction GmbH" },
      { name: "twitter:description", content: "Engineering-led construction in Munich, Germany." },
    ],
    links: [{ rel: "canonical", href: url("/about") }],
    scripts: [
      ldScript(breadcrumb([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ])),
    ],
  }),
  component: AboutPage,
});

const values: Array<{ tKey: TranslationKey; bKey: TranslationKey }> = [
  { tKey: "about.value1.t", bKey: "about.value1.b" },
  { tKey: "about.value2.t", bKey: "about.value2.b" },
  { tKey: "about.value3.t", bKey: "about.value3.b" },
  { tKey: "about.value4.t", bKey: "about.value4.b" },
];

function AboutPage() {
  const { t } = useT();
  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {t("about.eyebrow")}
          </p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">
            {t("about.title")}
          </h1>
          <div className="gold-divider w-24 mt-8" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <img
              src={aboutImg}
              alt="Munich Construction GmbH — Bauprojekt im Bau"
              width={1600}
              height={1100}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl text-foreground leading-relaxed">{t("about.lede")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.body1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.body2")}</p>

            <div className="pt-6 border-t border-border">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">Geschäftsführer</p>
              <p className="font-display text-2xl">Mehdi Mardi</p>
              <p className="text-sm text-muted-foreground">Dipl.-Ing. (Bauingenieurwesen) · Hochbau</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {values.map((v) => (
              <div key={v.tKey} className="bg-background p-10">
                <div className="size-1.5 bg-gold mb-6" />
                <h3 className="font-display text-2xl mb-3">{t(v.tKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(v.bKey)}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
