import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import p1 from "@/assets/mc-proj-1.jpg";
import p2 from "@/assets/mc-proj-2.jpg";
import p3 from "@/assets/mc-proj-3.jpg";
import p4 from "@/assets/mc-proj-4.jpg";
import p5 from "@/assets/mc-proj-5.jpg";
import p6 from "@/assets/mc-proj-6.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Munich Construction GmbH" },
      { name: "description", content: "Selected new construction, refurbishment and renovation projects by Munich Construction GmbH in Munich and surroundings." },
      { property: "og:title", content: "Projects — Munich Construction GmbH" },
      { property: "og:description", content: "Selected work in new construction, refurbishment and renovation." },
      { property: "og:image", content: p1 },
    ],
  }),
  component: ProjectsPage,
});

type Cat = "all" | "neubau" | "sanierung" | "renovierung";

const PROJECTS = [
  { img: p1, titleDe: "Wohnhaus Bogenhausen", titleEn: "Residence Bogenhausen", loc: "München · Bogenhausen", year: "2024", cat: "neubau" as const },
  { img: p2, titleDe: "Altbau Maxvorstadt", titleEn: "Old building Maxvorstadt", loc: "München · Maxvorstadt", year: "2023", cat: "renovierung" as const },
  { img: p3, titleDe: "Bürogebäude Schwabing", titleEn: "Office building Schwabing", loc: "München · Schwabing", year: "2024", cat: "neubau" as const },
  { img: p4, titleDe: "Stadthaus Lehel", titleEn: "Townhouse Lehel", loc: "München · Lehel", year: "2022", cat: "sanierung" as const },
  { img: p5, titleDe: "Loft-Umbau Werksviertel", titleEn: "Loft conversion Werksviertel", loc: "München · Werksviertel", year: "2023", cat: "renovierung" as const },
  { img: p6, titleDe: "Villa am Starnberger See", titleEn: "Villa at Lake Starnberg", loc: "Starnberg", year: "2024", cat: "neubau" as const },
];

function ProjectsPage() {
  const { t, lang } = useT();
  const [filter, setFilter] = useState<Cat>("all");

  const cats: Array<{ key: Cat; labelDe: string; labelEn: string }> = [
    { key: "all", labelDe: "Alle", labelEn: "All" },
    { key: "neubau", labelDe: "Neubau", labelEn: "New Construction" },
    { key: "sanierung", labelDe: "Sanierung", labelEn: "Refurbishment" },
    { key: "renovierung", labelDe: "Renovierung", labelEn: "Renovation" },
  ];

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {t("projects.eyebrow")}
          </p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">
            {t("projects.title")}
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">{t("projects.lede")}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 mb-12">
            {cats.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] border transition-colors ${
                  filter === c.key
                    ? "bg-ink text-white border-ink"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {lang === "de" ? c.labelDe : c.labelEn}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((p) => (
              <article key={p.titleEn} className="group">
                <div className="overflow-hidden bg-secondary">
                  <img
                    src={p.img}
                    alt={lang === "de" ? p.titleDe : p.titleEn}
                    width={1600}
                    height={1200}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
                    {p.loc} · {p.year}
                  </p>
                  <h3 className="font-display text-xl">{lang === "de" ? p.titleDe : p.titleEn}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
