import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Compass, Loader2, MessageCircle, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { ALL_SERVICES_I18N } from "@/lib/services-data";

type Rec = {
  serviceSlug: string;
  alternativeSlug: string | null;
  consultationPath: "termin" | "rueckruf" | "whatsapp";
  summary: string;
  reasons: string[];
  nextSteps: string[];
};

const COPY = {
  eyebrow: { de: "KI-Projektberater", en: "AI project advisor" },
  title: { de: "Beschreiben Sie Ihr Projekt – wir zeigen Ihnen den passenden Weg", en: "Describe your project – we'll show you the right path" },
  text: {
    de: "Schildern Sie kurz, was gebaut, saniert oder geplant werden soll. Unser KI-Berater empfiehlt die passende Leistung und die beste Art der Beratung.",
    en: "Briefly describe what should be built, refurbished or planned. Our AI advisor recommends the most relevant service and the best way to consult with us.",
  },
  placeholder: {
    de: "z. B. Altbauwohnung in Augsburg, 85 m², Risse in der Kellerwand und feuchte Stellen, Bad soll erneuert werden …",
    en: "e.g. Period apartment in Augsburg, 85 m², cracks in the basement wall and damp patches, bathroom needs renewing …",
  },
  submit: { de: "Empfehlung erhalten", en: "Get recommendation" },
  loading: { de: "Analysiere Ihr Projekt …", en: "Analysing your project …" },
  recommended: { de: "Empfohlene Leistung", en: "Recommended service" },
  alternative: { de: "Ebenfalls relevant", en: "Also relevant" },
  why: { de: "Warum", en: "Why" },
  next: { de: "Nächste Schritte", en: "Next steps" },
  path: { de: "Empfohlener Beratungsweg", en: "Recommended consultation path" },
  view: { de: "Leistung ansehen", en: "View service" },
  disclaimer: {
    de: "Automatisch erstellte Ersteinschätzung – ersetzt keine persönliche Beratung. Bitte keine sensiblen persönlichen Daten eingeben.",
    en: "Automated first assessment – not a substitute for personal advice. Please don't enter sensitive personal data.",
  },
  tooShort: { de: "Bitte beschreiben Sie Ihr Projekt etwas ausführlicher.", en: "Please describe your project in a little more detail." },
  error: { de: "Die Empfehlung konnte gerade nicht erstellt werden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.", en: "The recommendation couldn't be created right now. Please try again later or contact us directly." },
  limit: { de: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.", en: "Too many requests. Please try again later." },
} as const;

const PATHS = {
  termin: { icon: CalendarClock, href: "#termin", label: { de: "Kostenlosen Beratungstermin buchen", en: "Book a free consultation" } },
  rueckruf: { icon: Phone, href: "#rueckruf", label: { de: "Rückruf anfordern", en: "Request a callback" } },
  whatsapp: { icon: MessageCircle, href: "https://wa.me/4915256176906", label: { de: "Projektfotos per WhatsApp senden", en: "Send project photos via WhatsApp" } },
} as const;

export function ProjectAdvisor({ whatsappHref }: { whatsappHref?: string }) {
  const { lang } = useT();
  const l = (v: { de: string; en: string }) => v[lang];
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rec, setRec] = useState<Rec | null>(null);

  const title = (slug: string) => ALL_SERVICES_I18N.find((s) => s.slug === slug)?.title[lang] ?? slug;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 15) return setError(l(COPY.tooShort));
    setLoading(true);
    setError(null);
    setRec(null);
    try {
      const res = await fetch("/api/public/project-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error === "rate_limited" ? l(COPY.limit) : data.error === "too_short" ? l(COPY.tooShort) : l(COPY.error));
      } else setRec(data as Rec);
    } catch {
      setError(l(COPY.error));
    } finally {
      setLoading(false);
    }
  }

  const path = rec ? PATHS[rec.consultationPath] : null;
  const pathHref = rec?.consultationPath === "whatsapp" && whatsappHref ? whatsappHref : path?.href;

  return (
    <section id="projektberater" className="py-20 md:py-24 border-b border-border scroll-mt-[var(--header-height,80px)]">
      <div className="container-wide grid lg:grid-cols-2 gap-12">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5 inline-flex items-center gap-2">
            <Compass className="h-4 w-4" /> {l(COPY.eyebrow)}
          </p>
          <h2 className="font-display h-fluid-section max-w-xl text-balance">{l(COPY.title)}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">{l(COPY.text)}</p>
          <form onSubmit={submit} className="mt-8">
            <label htmlFor="advisor-text" className="sr-only">{l(COPY.title)}</label>
            <textarea
              id="advisor-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              rows={6}
              placeholder={l(COPY.placeholder)}
              className="w-full border border-border bg-background p-4 text-sm leading-relaxed focus:outline-none focus:border-gold resize-y"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>{l(COPY.disclaimer)}</span>
              <span className="font-mono shrink-0 ml-4">{text.length}/2000</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 text-sm font-medium tracking-wide hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {loading ? l(COPY.loading) : l(COPY.submit)}
            </button>
            {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
          </form>
        </div>

        <div aria-live="polite">
          {loading && (
            <div className="h-full min-h-[280px] border border-dashed border-border grid place-items-center text-muted-foreground text-sm">
              <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{l(COPY.loading)}</span>
            </div>
          )}
          {!loading && !rec && (
            <div className="h-full min-h-[280px] border border-dashed border-border grid place-items-center p-8 text-center text-muted-foreground text-sm">
              {l(COPY.text)}
            </div>
          )}
          {rec && path && (
            <div className="border border-border bg-card animate-fade-in">
              <div className="h-px bg-gold" />
              <div className="p-7 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{l(COPY.recommended)}</p>
                <h3 className="font-display text-3xl mt-2">{title(rec.serviceSlug)}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{rec.summary}</p>
                <Link to="/services/$slug" params={{ slug: rec.serviceSlug }} className="mt-3 inline-flex items-center gap-1 text-sm text-gold hover:underline">
                  {l(COPY.view)} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                {rec.alternativeSlug && (
                  <p className="mt-4 text-sm">
                    <span className="text-muted-foreground">{l(COPY.alternative)}: </span>
                    <Link to="/services/$slug" params={{ slug: rec.alternativeSlug }} className="text-gold hover:underline">{title(rec.alternativeSlug)}</Link>
                  </p>
                )}
                {rec.reasons.length > 0 && (
                  <>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{l(COPY.why)}</p>
                    <ul className="mt-2 space-y-1.5 text-sm list-disc pl-5">{rec.reasons.map((r, i) => <li key={i}>{r}</li>)}</ul>
                  </>
                )}
                {rec.nextSteps.length > 0 && (
                  <>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{l(COPY.next)}</p>
                    <ol className="mt-2 space-y-1.5 text-sm list-decimal pl-5">{rec.nextSteps.map((r, i) => <li key={i}>{r}</li>)}</ol>
                  </>
                )}
                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{l(COPY.path)}</p>
                <a
                  href={pathHref}
                  {...(rec.consultationPath === "whatsapp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-3 inline-flex items-center gap-2 bg-gold text-ink px-6 py-3 text-sm font-medium tracking-wide hover:opacity-90 transition"
                >
                  <path.icon className="h-4 w-4" /> {l(path.label)}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
