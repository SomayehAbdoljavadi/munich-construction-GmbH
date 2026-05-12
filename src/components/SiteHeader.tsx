import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";
import { useT, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/projects", key: "nav.projects" },
  { to: "/contact", key: "nav.contact" },
  { to: "/imprint", key: "nav.imprint" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 text-foreground border-b border-border backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-5 md:px-8 py-4">
        <Link to="/" className="text-foreground">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-sans text-[12px] tracking-[0.18em] uppercase">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/65 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LangSwitch lang={lang} setLang={setLang} />
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-ink px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-foreground hover:text-background transition-colors"
          >
            {t("nav.cta")}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-foreground"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="px-5 py-6 flex flex-col gap-4 text-sm tracking-[0.2em] uppercase">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-foreground/80 hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center bg-gold text-ink px-5 py-3 text-[11px] font-semibold"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="size-9 grid place-items-center border border-border text-foreground/80 hover:border-gold hover:text-gold transition-colors"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center font-mono text-[11px] tracking-widest border border-border">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 uppercase transition-colors ${
            lang === l ? "bg-gold text-ink" : "text-foreground/60 hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
