import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="bg-surface-inverse text-surface-inverse-foreground/80">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-6">
          <Logo />
          <p className="text-sm leading-relaxed text-white/60 max-w-sm">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3">
            <SocialLink href="https://wa.me/491763235481 5" label="WhatsApp">
              <WhatsAppIcon />
            </SocialLink>
            <SocialLink href="https://instagram.com" label="Instagram">
              <Instagram size={16} />
            </SocialLink>
            <SocialLink href="https://youtube.com" label="YouTube">
              <Youtube size={16} />
            </SocialLink>
            <SocialLink href="mailto:m.mardi@munichconstruction.de" label="Email">
              <Mail size={16} />
            </SocialLink>
          </div>
        </div>

        <div className="md:col-span-3 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            {t("footer.quicklinks")}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-gold">{t("nav.home")}</Link></li>
            <li><Link to="/about" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/services" className="hover:text-gold">{t("nav.services")}</Link></li>
            <li><Link to="/projects" className="hover:text-gold">{t("nav.projects")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
            <li><Link to="/imprint" className="hover:text-gold">{t("nav.imprint")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            {t("footer.contact")}
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={16} className="mt-0.5 text-gold shrink-0" />
              <span>Theresienstraße 93<br />80333 München</span>
            </li>
            <li className="flex gap-3">
              <Phone size={16} className="mt-0.5 text-gold shrink-0" />
              <a href="tel:+498957843675" className="hover:text-gold">+49 (0) 89 57 84 3675</a>
            </li>
            <li className="flex gap-3">
              <Mail size={16} className="mt-0.5 text-gold shrink-0" />
              <a href="mailto:m.mardi@munichconstruction.de" className="hover:text-gold break-all">
                m.mardi@munichconstruction.de
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-white/40 font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Munich Construction GmbH · {t("footer.rights")}</span>
          <span>www.munichconstruction.de</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="size-9 grid place-items-center border border-white/15 text-white/70 hover:bg-gold hover:text-ink hover:border-gold transition-colors"
    >
      {children}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
    </svg>
  );
}
