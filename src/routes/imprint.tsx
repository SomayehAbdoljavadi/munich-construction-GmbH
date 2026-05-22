import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/imprint")({
  head: () => ({
    meta: [
      { title: "Impressum — Munich Construction GmbH" },
      { name: "description", content: "Impressum / Imprint — Munich Construction GmbH, Theresienstraße 93, 80333 München. Geschäftsführer: Mehdi Mardi." },
      { property: "og:title", content: "Impressum — Munich Construction GmbH" },
      { property: "og:description", content: "Legal information for Munich Construction GmbH." },
    ],
    links: [{ rel: "canonical", href: "/imprint" }],
  }),
  component: ImprintPage,
});

function ImprintPage() {
  const { t } = useT();
  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            Legal · Munich Construction GmbH
          </p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">{t("imprint.title")}</h1>
          <div className="gold-divider w-24 mt-8" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-12">
          <Section title={t("imprint.responsible")}>
            <p>Munich Construction GmbH</p>
            <p>Theresienstraße 93<br />80333 München<br />Deutschland</p>
          </Section>

          <Section title={t("imprint.contact")}>
            <p>Telefon: +49 (0) 89 57 84 3675</p>
            <p>Mobil: +49 (176) 3235 4815</p>
            <p>E-Mail: info@munichconstruction.de</p>
            <p>Web: www.munichconstruction.de</p>
          </Section>

          <Section title={t("imprint.represented")}>
            <p>Mehdi Mardi, Dipl.-Ing. (Bauingenieurwesen)</p>
            <p className="text-muted-foreground text-sm">Geschäftsführer | Hochbau</p>
          </Section>

          <Section title={t("imprint.register")}>
            <p>{t("imprint.register.body")}</p>
          </Section>

          <Section title={t("imprint.vat")}>
            <p>{t("imprint.vat.body")}</p>
          </Section>

          <Section title={t("imprint.responsible.content")}>
            <p>Mehdi Mardi · Theresienstraße 93 · 80333 München</p>
          </Section>

          <Section title={t("imprint.disclaimer")}>
            <p className="text-muted-foreground leading-relaxed">{t("imprint.disclaimer.body")}</p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-4">{title}</p>
      <div className="space-y-2 leading-relaxed">{children}</div>
    </div>
  );
}
