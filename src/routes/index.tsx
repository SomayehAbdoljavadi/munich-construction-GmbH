import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import isarauenImg from "@/assets/project-isarauen.jpg";
import hausAmSeeImg from "@/assets/project-haus-am-see.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steiner & Co. — Bauunternehmen aus München seit 1954" },
      {
        name: "description",
        content:
          "Bauunternehmen aus München. Hochbau, Hybrid- & Holzbau, Sanierung und Denkmalpflege mit bayerischer Ingenieurskunst seit 1954.",
      },
      { property: "og:title", content: "Steiner & Co. — Bauunternehmen aus München" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    no: "01 / EXZELLENZ",
    title: "Hochbau & Betonbau",
    text: "Wir beherrschen die gesamte Klaviatur des modernen Massivbaus. Von komplexen Untergeschossen im Grundwasser bis zu filigranen Sichtbeton-Fassaden.",
  },
  {
    no: "02 / NACHHALTIGKEIT",
    title: "Hybrid- & Holzbau",
    text: "Zukunftssicheres Bauen mit ökologischem Fußabdruck. Wir kombinieren die Statik von Stahlbeton mit der Wohnqualität und Effizienz von Holz.",
  },
  {
    no: "03 / PRÄZISION",
    title: "Sanierung & Denkmal",
    text: "Erhalt historischer Bausubstanz in München. Wir sanieren denkmalgeschützte Objekte mit modernster Technik und tiefem Respekt vor dem Bestand.",
  },
];

const featured = [
  {
    title: "Büropark Isarauen",
    img: isarauenImg,
    ort: "München",
    jahr: "2023",
    volumen: "14,5 Mio. €",
  },
  {
    title: "Haus am See",
    img: hausAmSeeImg,
    ort: "Starnberg",
    jahr: "2022",
    volumen: "2,8 Mio. €",
    offset: true,
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-balance animate-fade-up">
                Wir bauen für <span className="italic">Generationen</span>.
              </h1>
              <div className="h-px w-full bg-foreground/20 mt-12 animate-scale-line" />
              <p className="mt-8 font-sans text-lg max-w-xl text-muted-foreground animate-fade-up [animation-delay:200ms]">
                Traditionelles Handwerk trifft auf bayerische Ingenieurskunst. Seit
                1954 realisieren wir anspruchsvolle Hochbau-Projekte im Raum München
                und Oberbayern.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:300ms]">
                <Link
                  to="/projekte"
                  className="px-10 py-4 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
                >
                  Projekte ansehen
                </Link>
                <Link
                  to="/kontakt"
                  className="px-10 py-4 border border-foreground/20 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-colors"
                >
                  Anfrage senden
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <div className="font-mono text-[11px] uppercase tracking-widest leading-loose text-muted-foreground animate-fade-up [animation-delay:400ms]">
                Gegründet 1954<br />
                Sitz in München-Bogenhausen<br />
                84 Mitarbeiter
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <img
            src={heroImg}
            alt="Modernes Wohnhaus aus Sichtbeton und Holz in München"
            width={1920}
            height={1280}
            className="w-full aspect-[16/10] object-cover"
          />
        </div>
      </section>

      {/* Featured projects */}
      <section className="px-6 md:px-8 py-24 md:py-32 bg-foreground text-background mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-12 border-b border-background/20 pb-8">
            <h2 className="font-display text-4xl md:text-5xl">Ausgewählte Projekte</h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-60">
              Portfolio 2020 — 2024
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {featured.map((p) => (
              <article key={p.title} className={`group ${p.offset ? "lg:mt-24" : ""}`}>
                <div className="aspect-[3/4] overflow-hidden bg-background/5">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={1600}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-background/20 pt-6">
                  <div>
                    <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">Ort</p>
                    <p className="font-sans text-sm mt-1">{p.ort}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">Jahr</p>
                    <p className="font-sans text-sm mt-1">{p.jahr}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] opacity-50 uppercase tracking-widest">Volumen</p>
                    <p className="font-sans text-sm mt-1 font-medium">{p.volumen}</p>
                  </div>
                </div>
                <h3 className="font-display text-2xl mt-6">{p.title}</h3>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/projekte"
              className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] border-b border-background/40 pb-1 hover:border-primary hover:text-primary transition-colors"
            >
              Alle Referenzen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Unsere Leistungen</h2>
            <div className="w-12 h-1 bg-primary" />
          </div>
          <div className="col-span-12 lg:col-span-8 space-y-12">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`pb-12 ${i < services.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="font-mono text-xs text-primary mb-4 block tracking-widest">
                  {s.no}
                </span>
                <h3 className="font-display text-3xl mb-4">{s.title}</h3>
                <p className="font-sans text-muted-foreground max-w-lg leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-8 py-24 md:py-32 bg-stone-warm border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-5xl md:text-6xl mb-12">
            Bereit für Ihr nächstes <span className="italic">Fundament?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/kontakt"
              className="px-12 py-5 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
            >
              Anfrage senden
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              +49 (0) 89 234 567 890
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
