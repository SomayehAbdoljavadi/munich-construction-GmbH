import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useT } from "@/lib/i18n";
import { NONE, OPTIONAL_CATEGORIES, useConsent, type Categories, type OptionalCategory } from "@/lib/consent";

const COPY = {
  title: { de: "Wir respektieren Ihre Privatsphäre", en: "We respect your privacy" },
  body: {
    de: "Wir verwenden notwendige Cookies, um die grundlegenden Funktionen und die Sicherheit dieser Website zu gewährleisten. Mit Ihrer Einwilligung verwenden wir außerdem optionale Cookies und externe Dienste für Präferenzen, Statistiken, Marketing und externe Medien. Sie können Ihre Auswahl jederzeit ändern oder widerrufen.",
    en: "We use necessary cookies to provide the basic functionality and security of this website. With your consent, we also use optional cookies and external services for preferences, statistics, marketing, and external media. You can change or withdraw your choice at any time.",
  },
  acceptAll: { de: "Alle akzeptieren", en: "Accept all" },
  necessaryOnly: { de: "Nur notwendige", en: "Necessary only" },
  settings: { de: "Einstellungen", en: "Settings" },
  save: { de: "Auswahl speichern", en: "Save selection" },
  privacy: { de: "Datenschutzerklärung", en: "Privacy Policy" },
  imprint: { de: "Impressum", en: "Legal Notice" },
  modalTitle: { de: "Cookie-Einstellungen", en: "Cookie settings" },
  modalIntro: {
    de: "Wählen Sie, welche Kategorien Sie zulassen möchten. Optionale Dienste werden erst nach Ihrer ausdrücklichen Einwilligung geladen.",
    en: "Choose which categories you want to allow. Optional services are only loaded after your explicit consent.",
  },
  always: { de: "Immer aktiv", en: "Always active" },
  withdraw: { de: "Einwilligung widerrufen", en: "Withdraw consent" },
  necessary: {
    label: { de: "Notwendig", en: "Necessary" },
    desc: {
      de: "Erforderlich für die Kernfunktionen, die Sicherheit der Website und die Speicherung Ihrer Cookie-Einstellungen.",
      en: "Required for the website's core functionality, security and storage of your cookie preferences.",
    },
  },
  preferences: {
    label: { de: "Präferenzen", en: "Preferences" },
    desc: {
      de: "Speichert optionale Einstellungen wie Sprache, Darstellung oder andere personalisierte Auswahlmöglichkeiten der Website.",
      en: "Stores optional settings such as language, display preferences or other personalized website choices.",
    },
  },
  statistics: {
    label: { de: "Statistiken", en: "Statistics" },
    desc: {
      de: "Hilft uns zu verstehen, wie Besucher die Website nutzen, zum Beispiel über Analyse-Tools.",
      en: "Helps us understand how visitors use the website, for example through analytics tools.",
    },
  },
  marketing: {
    label: { de: "Marketing", en: "Marketing" },
    desc: {
      de: "Wird verwendet, um Werbekampagnen zu messen und relevante Werbung anzuzeigen.",
      en: "Used to measure advertising campaigns and display relevant advertisements.",
    },
  },
  externalMedia: {
    label: { de: "Externe Medien", en: "External Media" },
    desc: {
      de: "Erlaubt das Laden externer Inhalte wie Karten, YouTube-Videos, Terminbuchungs-Tools oder anderer Widgets von Drittanbietern.",
      en: "Allows external content such as maps, YouTube videos, appointment-booking tools or other third-party widgets to be loaded.",
    },
  },
} as const;

type L = { de: string; en: string };

export function CookieConsent() {
  const { lang } = useT();
  const l = (v: L) => v[lang];
  const { bannerOpen, settingsOpen, openSettings, closeSettings, acceptAll, rejectAll, save, revoke, consent } =
    useConsent();

  const [draft, setDraft] = useState<Categories>({ ...NONE });

  useEffect(() => {
    if (settingsOpen) setDraft({ ...NONE, ...(consent?.categories ?? {}) });
  }, [settingsOpen, consent]);

  return (
    <>
      {bannerOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/30 bg-ink text-white shadow-2xl"
        >
          <div className="container-wide py-6 md:py-7 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                <Cookie className="h-3.5 w-3.5" aria-hidden /> Cookies
              </p>
              <h2 id="cookie-banner-title" className="font-display text-2xl md:text-3xl mt-3">
                {l(COPY.title)}
              </h2>
              <p id="cookie-banner-desc" className="mt-3 text-sm leading-relaxed text-white/70">
                {l(COPY.body)}
              </p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
                <Link to="/datenschutz" className="text-gold underline underline-offset-4 hover:opacity-80">
                  {l(COPY.privacy)}
                </Link>
                <Link to="/imprint" className="text-gold underline underline-offset-4 hover:opacity-80">
                  {l(COPY.imprint)}
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:min-w-[300px]">
              <button
                type="button"
                onClick={acceptAll}
                className="flex-1 bg-gold text-ink px-6 py-3 text-sm font-semibold hover:opacity-90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {l(COPY.acceptAll)}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="flex-1 bg-white text-ink px-6 py-3 text-sm font-semibold hover:opacity-90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {l(COPY.necessaryOnly)}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="flex-1 border border-white/40 px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {l(COPY.settings)}
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={(open) => (open ? openSettings() : closeSettings())}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-ink text-white border-gold/30">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl md:text-3xl text-white">{l(COPY.modalTitle)}</DialogTitle>
            <DialogDescription className="text-white/60 text-sm">{l(COPY.modalIntro)}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="border border-white/15 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-sm">{l(COPY.necessary.label)}</p>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-gold shrink-0">
                  <Lock className="h-3 w-3" aria-hidden /> {l(COPY.always)}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">{l(COPY.necessary.desc)}</p>
            </div>

            {OPTIONAL_CATEGORIES.map((key: OptionalCategory) => (
              <div key={key} className="border border-white/15 p-4">
                <div className="flex items-start justify-between gap-4">
                  <label htmlFor={`consent-${key}`} className="font-semibold text-sm cursor-pointer">
                    {l(COPY[key].label)}
                  </label>
                  <Switch
                    id={`consent-${key}`}
                    checked={draft[key]}
                    onCheckedChange={(checked) => setDraft((d) => ({ ...d, [key]: checked }))}
                    aria-label={l(COPY[key].label)}
                  />
                </div>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{l(COPY[key].desc)}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => save(draft)}
              className="flex-1 bg-gold text-ink px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              {l(COPY.save)}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 bg-white text-ink px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              {l(COPY.acceptAll)}
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className="flex-1 border border-white/40 px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition"
            >
              {l(COPY.necessaryOnly)}
            </button>
          </div>

          {consent && (
            <button
              type="button"
              onClick={revoke}
              className="mt-1 text-xs text-white/50 underline underline-offset-4 hover:text-gold self-start"
            >
              {l(COPY.withdraw)}
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export const CONSENT_COPY = COPY;
