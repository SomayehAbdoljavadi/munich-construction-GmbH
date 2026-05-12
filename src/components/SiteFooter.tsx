import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4 md:col-span-2">
          <div className="font-display text-2xl">STEINER &amp; CO.</div>
          <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-sm">
            Bauunternehmen mit Sitz in München. Seit 1954 realisieren wir
            anspruchsvolle Hochbau-, Holzbau- und Sanierungsprojekte in Bayern.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground leading-loose">
            Prinzregentenstraße 1<br />
            80538 München, Bayern<br />
            +49 (0) 89 234 567 890
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Navigation
          </p>
          <ul className="space-y-2 font-sans text-sm">
            <li><Link to="/projekte" className="hover:text-primary">Projekte</Link></li>
            <li><Link to="/leistungen" className="hover:text-primary">Leistungen</Link></li>
            <li><Link to="/ueber-uns" className="hover:text-primary">Über uns</Link></li>
            <li><Link to="/kontakt" className="hover:text-primary">Kontakt</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            Rechtliches
          </p>
          <ul className="space-y-2 font-sans text-sm">
            <li><a href="#" className="hover:text-primary">Impressum</a></li>
            <li><a href="#" className="hover:text-primary">Datenschutz</a></li>
            <li><a href="#" className="hover:text-primary">AGB</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          <span>© {new Date().getFullYear()} Steiner &amp; Co. GmbH</span>
          <span>Bau · Präzision · Vertrauen</span>
        </div>
      </div>
    </footer>
  );
}
