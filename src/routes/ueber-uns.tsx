import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Steiner & Co. Bauunternehmen München" },
      {
        name: "description",
        content:
          "Steiner & Co. — ein Münchner Familienbetrieb seit 1954. 84 Mitarbeiter, drei Generationen, ein Anspruch: Bauen für Generationen.",
      },
      { property: "og:title", content: "Über uns — Steiner & Co." },
      { property: "og:image", content: aboutImg },
    ],
  }),
  component: UeberUnsPage,
});

const milestones = [
  { jahr: "1954", text: "Gründung als Maurerbetrieb in München-Bogenhausen durch Sebastian Steiner." },
  { jahr: "1978", text: "Übernahme durch die zweite Generation, Erweiterung um Ingenieurbau." },
  { jahr: "1995", text: "Eröffnung des Zimmerei-Werks in Holzkirchen. Spezialisierung auf Holzbau." },
  { jahr: "2012", text: "Erste DGNB-Platin-Zertifizierung. Aufbau des Denkmalpflege-Teams." },
  { jahr: "2024", text: "84 Mitarbeiter, über 600 realisierte Projekte in Bayern." },
];

const values = [
  {
    title: "Handwerk",
    text: "Jedes Detail ist eine Frage der Haltung. Unsere Meister bilden seit drei Generationen aus.",
  },
  {
    title: "Verbindlichkeit",
    text: "Was wir zusagen, halten wir. Termin, Budget und Qualität sind keine Verhandlungsmasse.",
  },
  {
    title: "Verantwortung",
    text: "Wir bauen für die nächsten 100 Jahre — ökologisch, ressourcenschonend, regional.",
  },
];

function UeberUnsPage() {
  return (
    <>
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-6">
            Seit 1954 · München
          </p>
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-balance max-w-4xl">
            Drei Generationen, <span className="italic">ein Anspruch</span>.
          </h1>
          <div className="h-px w-full bg-foreground/20 mt-12 animate-scale-line" />
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <img
            src={aboutImg}
            alt="Rohbau-Inneres mit Sichtbeton und Holzkonstruktion"
            width={1600}
            height={1100}
            loading="lazy"
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      </section>

      <section className="px-6 md:px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl">Unser Weg</h2>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              Was 1954 als Familien-Maurerbetrieb begann, ist heute eines der
              etabliertesten Bauunternehmen im Großraum München. Über 600 realisierte
              Projekte, 84 Mitarbeiter und ein eigenes Holzbauwerk in Holzkirchen.
              Geführt in dritter Generation — geprägt von einer Haltung, die sich
              nicht ändert: Wir bauen für Generationen.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-12">
            Chronik
          </p>
          <div className="space-y-0">
            {milestones.map((m) => (
              <div
                key={m.jahr}
                className="grid grid-cols-12 gap-8 py-8 border-t border-border last:border-b"
              >
                <div className="col-span-12 md:col-span-3">
                  <span className="font-display text-4xl">{m.jahr}</span>
                </div>
                <p className="col-span-12 md:col-span-9 font-sans text-lg text-muted-foreground leading-relaxed pt-2">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="px-6 md:px-8 py-24 md:py-32 bg-foreground text-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl mb-16">
            Werte, die <span className="italic">tragen</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v, i) => (
              <div key={v.title}>
                <span className="font-mono text-xs opacity-50 tracking-widest">
                  0{i + 1}
                </span>
                <h3 className="font-display text-3xl mt-4 mb-4">{v.title}</h3>
                <p className="font-sans text-background/70 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
