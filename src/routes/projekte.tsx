import { createFileRoute } from "@tanstack/react-router";
import isarauenImg from "@/assets/project-isarauen.jpg";
import hausAmSeeImg from "@/assets/project-haus-am-see.jpg";
import bueroImg from "@/assets/project-buero.jpg";
import denkmalImg from "@/assets/project-denkmal.jpg";

export const Route = createFileRoute("/projekte")({
  head: () => ({
    meta: [
      { title: "Projekte — Steiner & Co. Bauunternehmen München" },
      {
        name: "description",
        content:
          "Ausgewählte Hochbau-, Holzbau- und Sanierungsprojekte von Steiner & Co. in München, Starnberg und Oberbayern.",
      },
      { property: "og:title", content: "Projekte — Steiner & Co." },
      { property: "og:description", content: "Referenzen aus 70 Jahren Bauerfahrung in Bayern." },
    ],
  }),
  component: ProjektePage,
});

const projects = [
  {
    title: "Büropark Isarauen",
    img: isarauenImg,
    ort: "München",
    jahr: "2023",
    volumen: "14,5 Mio. €",
    typ: "Hochbau",
    text: "Sechsgeschossiger Bürokomplex in Sichtbeton mit Holzfassade und KfW-40-Standard.",
  },
  {
    title: "Haus am See",
    img: hausAmSeeImg,
    ort: "Starnberg",
    jahr: "2022",
    volumen: "2,8 Mio. €",
    typ: "Holzbau",
    text: "Privatresidenz in Hybridbauweise mit sichtbarer Brettsperrholz-Dachkonstruktion.",
  },
  {
    title: "Verwaltungsbau Schwabing",
    img: bueroImg,
    ort: "München",
    jahr: "2024",
    volumen: "22 Mio. €",
    typ: "Hochbau",
    text: "Geschwungene Aluminium-Fassade über fünf Geschossen, DGNB-Gold-Zertifizierung.",
  },
  {
    title: "Sanierung Maxvorstadt",
    img: denkmalImg,
    ort: "München",
    jahr: "2021",
    volumen: "5,4 Mio. €",
    typ: "Denkmalpflege",
    text: "Behutsame Restaurierung einer Gründerzeit-Stuckfassade mit innenliegender Kernsanierung.",
  },
];

function ProjektePage() {
  return (
    <>
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-6">
            Portfolio · 2020 — 2024
          </p>
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-balance">
            Bauten, die <span className="italic">Bestand</span> haben.
          </h1>
          <div className="h-px w-full bg-foreground/20 mt-12 animate-scale-line" />
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto space-y-24 md:space-y-32">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">
                  {String(i + 1).padStart(2, "0")} / {p.typ}
                </p>
                <h2 className="font-display text-4xl md:text-5xl mb-6">{p.title}</h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-8">{p.text}</p>
                <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ort</dt>
                    <dd className="font-sans text-sm mt-1">{p.ort}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Jahr</dt>
                    <dd className="font-sans text-sm mt-1">{p.jahr}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Volumen</dt>
                    <dd className="font-sans text-sm mt-1 font-medium">{p.volumen}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
