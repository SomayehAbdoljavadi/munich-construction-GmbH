import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/projekte", label: "Projekte" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/ueber-uns", label: "Über uns" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-5">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl font-semibold tracking-tight">STEINER &amp; CO.</span>
          <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Bauunternehmen · München
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-sans text-[11px] font-medium tracking-[0.2em] uppercase">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/kontakt"
            className="text-primary border-b border-primary pb-0.5"
            activeProps={{ className: "text-primary border-b border-primary pb-0.5" }}
          >
            Kontakt
          </Link>
        </div>

        <button
          aria-label="Menü"
          className="md:hidden font-mono text-xs uppercase tracking-widest"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Schließen" : "Menü"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 flex flex-col gap-4 font-sans text-sm tracking-[0.2em] uppercase">
            {[...nav, { to: "/kontakt" as const, label: "Kontakt" }].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
