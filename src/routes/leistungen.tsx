import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen — Steiner & Co. Bauunternehmen München" },
      {
        name: "description",
        content:
          "Hochbau, Hybrid- & Holzbau, Sanierung und schlüsselfertige Projektentwicklung — die Leistungen von Steiner & Co. in München.",
      },
      { property: "og:title", content: "Leistungen — Steiner & Co." },
    ],
  }),
  component: LeistungenPage,
});

const leistungen = [
  {
    no: "01",
    title: "Hochbau & Betonbau",
    text: "Tragwerke, Sichtbeton-Fassaden und komplexe Untergeschosse. Wir liefern den Rohbau, der Ihr Projekt definiert.",
    bullets: ["Stahlbetonbau", "Sichtbeton-Architektur", "Spezialgründungen", "Wasserdichte Untergeschosse"],
  },
  {
    no: "02",
    title: "Hybrid- & Holzbau",
    text: "CO₂-arme Bauweise, die Statik von Stahlbeton mit der Wohnqualität von Holz verbindet. Vorgefertigt in unserem Werk in Holzkirchen.",
    bullets: ["Brettsperrholz-Konstruktionen", "Hybriddecken", "Modulare Vorfertigung", "Energieeffizienz KfW 40+"],
  },
  {
    no: "03",
    title: "Sanierung & Denkmal",
    text: "Vom Stuckdetail bis zur Gesamtkernsanierung. Wir arbeiten mit Münchens Denkmalbehörden seit über vier Jahrzehnten zusammen.",
    bullets: ["Denkmalpflege", "Energetische Sanierung", "Fassadenrestaurierung", "Statische Ertüchtigung"],
  },
  {
    no: "04",
    title: "Schlüsselfertigbau",
    text: "Eine Hand, ein Vertrag, ein Termin. Vom ersten Spatenstich bis zur Schlüsselübergabe begleiten wir Ihr Projekt vollständig.",
    bullets: ["Generalunternehmer", "Festpreisgarantie", "Terminbindende Zusagen", "Gewerkekoordination"],
  },
];

function LeistungenPage() {
  return (
    <>
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-6">
            Vier Disziplinen · ein Anspruch
          </p>
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-balance max-w-4xl">
            Was wir <span className="italic">können</span>.
          </h1>
          <div className="h-px w-full bg-foreground/20 mt-12 animate-scale-line" />
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {leistungen.map((l) => (
            <div key={l.title} className="bg-background p-10 md:p-12 flex flex-col">
              <span className="font-mono text-xs text-primary tracking-widest mb-6">{l.no}</span>
              <h2 className="font-display text-3xl md:text-4xl mb-4">{l.title}</h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-8">{l.text}</p>
              <ul className="space-y-2 mt-auto pt-6 border-t border-border">
                {l.bullets.map((b) => (
                  <li key={b} className="font-sans text-sm flex items-start gap-3">
                    <span className="font-mono text-primary mt-1">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 py-24 bg-stone-warm border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Ein Projekt im Kopf? <span className="italic">Sprechen wir.</span>
          </h2>
          <Link
            to="/kontakt"
            className="inline-block px-12 py-5 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
          >
            Erstgespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
