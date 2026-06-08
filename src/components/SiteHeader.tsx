import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useT, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { HOME_SERVICES_I18N } from "@/lib/services-data";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services", hasDropdown: true },
  { to: "/projects", key: "nav.projects" },
  { to: "/contact", key: "nav.contact" },
  { to: "/imprint", key: "nav.imprint" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const root = document.documentElement;
    const updateHeaderHeight = () => {
      root.style.setProperty("--header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
    };

    updateHeaderHeight();
    const animationFrame = window.requestAnimationFrame(updateHeaderHeight);
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
      root.style.removeProperty("--header-height");
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-background/95 text-foreground border-b border-border backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container-wide flex items-center justify-between gap-6 py-4">
        <Link to="/" className="text-foreground">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-sans text-[12px] tracking-[0.18em] uppercase">
          {links.map((l) =>
            "hasDropdown" in l && l.hasDropdown ? (
              <div key={l.to} className="relative group">
                <Link
                  to={l.to}
                  className="inline-flex items-center gap-1 text-foreground/65 hover:text-gold transition-colors"
                  activeProps={{ className: "text-gold" }}
                >
                  {t(l.key)}
                  <ChevronDown size={12} className="opacity-70 group-hover:rotate-180 transition-transform" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-200">
                  <div className="min-w-[280px] bg-background border border-border shadow-premium">
                    <div className="h-px bg-gold" />
                    <ul className="py-2">
                      {HOME_SERVICES_I18N.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="block px-5 py-3 text-[11px] tracking-[0.18em] text-foreground/75 hover:bg-secondary hover:text-gold transition-colors"
                            activeProps={{ className: "text-gold bg-secondary" }}
                          >
                            {s.title[lang]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="text-foreground/65 hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {t(l.key)}
              </Link>
            ),
          )}
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
            {links.map((l) =>
              "hasDropdown" in l && l.hasDropdown ? (
                <div key={l.to} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="text-foreground/80 hover:text-gold"
                      activeProps={{ className: "text-gold" }}
                    >
                      {t(l.key)}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle services menu"
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className="p-1 text-foreground/60 hover:text-gold"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {mobileServicesOpen && (
                    <ul className="mt-3 ml-3 pl-4 border-l border-border flex flex-col gap-3">
                      {HOME_SERVICES_I18N.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            onClick={() => setOpen(false)}
                            className="block text-[12px] tracking-[0.18em] text-foreground/70 hover:text-gold"
                            activeProps={{ className: "text-gold" }}
                          >
                            {s.title[lang]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
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
              ),
            )}
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
