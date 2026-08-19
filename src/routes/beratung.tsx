import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Compass,
  Euro,
  FileText,
  Hammer,
  KeyRound,
  Layers,
  LayoutGrid,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useT, type Lang } from "@/lib/i18n";
import { breadcrumb, ldScript, ORG_ID, url } from "@/lib/seo";
import {
  BERATUNG,
  BERATUNG_FAQ,
  CONSULTATION_TOPICS,
  CONTACT,
  HOW_STEPS,
  MANAGE,
  PREQUAL_QUESTIONS,
  PROJECT_PHASES,
  PROJECT_TYPES,
  photoLink,
  type L,
} from "@/lib/consultation-data";

export const Route = createFileRoute("/beratung")({
  head: () => ({
    meta: [
      { title: "Kostenlose Renovierungsberatung München | Munich Construction" },
      {
        name: "description",
        content:
          "Kostenloses Erstgespräch für Renovierung, Umbau und Sanierung in München. Termin online buchen oder Rückruf anfordern — unverbindlich und persönlich.",
      },
      { property: "og:title", content: "Beratung — Munich Construction GmbH" },
      {
        property: "og:description",
        content: "Kostenloses telefonisches Erstgespräch für Ihr Bau- oder Renovierungsprojekt in München.",
      },
      { property: "og:url", content: url("/beratung") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Beratung — Munich Construction GmbH" },
      { name: "twitter:description", content: "Kostenloses Erstgespräch zu Ihrem Projekt — Termin online buchen." },
    ],
    links: [{ rel: "canonical", href: url("/beratung") }],
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Kostenlose Bau- und Renovierungsberatung",
        serviceType: "Renovierungsberatung",
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: "München" },
        url: url("/beratung"),
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      }),
      ldScript({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: BERATUNG_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q.de,
          acceptedAnswer: { "@type": "Answer", text: f.a.de },
        })),
      }),
      ldScript(
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Beratung", path: "/beratung" },
        ]),
      ),
    ],
  }),
  component: BeratungPage,
});

const ICONS: Record<string, typeof Hammer> = {
  Hammer,
  Compass,
  Euro,
  LayoutGrid,
  Building2,
  Layers,
  CalendarClock,
  KeyRound,
  FileText,
  Rocket,
};

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

type Slot = { slot_start: string };

function useCopy() {
  const { lang } = useT();
  const l = (value: L) => value[lang];
  return { lang: lang as Lang, l };
}

function isoDay(date: Date) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(date);
}

function BeratungPage() {
  const { lang, l } = useCopy();

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">{l(BERATUNG.eyebrow)}</p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">{l(BERATUNG.heroTitle)}</h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg leading-relaxed">{l(BERATUNG.heroSubtitle)}</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">{l(BERATUNG.heroTrust)}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#termin"
              className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 text-sm font-medium tracking-wide hover:opacity-90 transition"
            >
              <CalendarClock className="h-4 w-4" />
              {l(BERATUNG.ctaBook)}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition"
            >
              <Phone className="h-4 w-4" />
              {l(BERATUNG.ctaCall)}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm text-white/50">{l(BERATUNG.heroNote)}</p>
        </div>
      </section>

      {/* Topics */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <h2 className="font-display h-fluid-section max-w-3xl">{l(BERATUNG.topicsTitle)}</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{l(BERATUNG.topicsIntro)}</p>

          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border border-border">
            {CONSULTATION_TOPICS.map((topic) => {
              const Icon = ICONS[topic.icon] ?? Compass;
              return (
                <div key={topic.id} className="bg-background p-7 group">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
                  <h3 className="mt-5 font-display text-xl">{l(topic.title)}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l(topic.text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink text-white py-20 md:py-24">
        <div className="container-wide">
          <h2 className="font-display h-fluid-section">{l(BERATUNG.howTitle)}</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {HOW_STEPS.map((step, i) => (
              <li key={i}>
                <span className="font-mono text-gold text-sm tracking-[0.3em]">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl">{l(step.title)}</h3>
                <p className="mt-3 text-white/65 leading-relaxed">{l(step.text)}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a
              href="#termin"
              className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 text-sm font-medium hover:opacity-90 transition"
            >
              <CalendarClock className="h-4 w-4" />
              {l(BERATUNG.ctaBookLong)}
            </a>
          </div>
        </div>
      </section>

      {/* Pre-qualification */}
      <section className="py-20 md:py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.1fr] items-start">
          <div>
            <h2 className="font-display h-fluid-section">{l(BERATUNG.prequalTitle)}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{l(BERATUNG.prequalIntro)}</p>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {PREQUAL_QUESTIONS.map((q, i) => (
              <li key={i} className="flex items-start gap-4 py-5">
                <span className="font-mono text-xs text-gold pt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base">{l(q)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Booking */}
      <BookingSection lang={lang} l={l} />

      {/* Callback form */}
      <CallbackSection lang={lang} l={l} />

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="container-wide">
          <h2 className="font-display h-fluid-section max-w-3xl">{l(BERATUNG.processTitle)}</h2>
          <p className="mt-5 max-w-3xl text-muted-foreground leading-relaxed">{l(BERATUNG.processIntro)}</p>

          <ol className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 border border-border">
            {PROJECT_PHASES.map((phase, i) => (
              <li key={i} className="bg-background p-7">
                <span className="font-mono text-xs tracking-[0.3em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl">{l(phase.title)}</h3>
                <p className="mt-1 text-sm text-gold/80">{l(phase.subtitle)}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l(phase.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container-wide">
          <h2 className="font-display h-fluid-section">{l(BERATUNG.faqTitle)}</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {BERATUNG_FAQ.map((f, i) => (
              <details key={i} className="group py-5">
                <summary className="cursor-pointer list-none font-display text-lg flex items-start justify-between gap-6">
                  {l(f.q)}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">{l(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink text-white py-20 md:py-24">
        <div className="container-wide">
          <h2 className="font-display h-fluid-section max-w-3xl">{l(BERATUNG.finalTitle)}</h2>
          <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">{l(BERATUNG.finalText)}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#termin"
              className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 text-sm font-medium hover:opacity-90 transition"
            >
              <CalendarClock className="h-4 w-4" />
              {l(BERATUNG.ctaBookLong)}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-medium hover:border-gold hover:text-gold transition"
            >
              <Phone className="h-4 w-4" />
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-medium hover:border-gold hover:text-gold transition"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            {(() => {
              const photo = photoLink(lang);
              const isWa = photo.channel === "whatsapp";
              return (
                <a
                  href={photo.href}
                  {...(photo.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-sm font-medium hover:border-gold hover:text-gold transition"
                >
                  {isWa ? <MessageCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  {l(BERATUNG.ctaPhotos)}
                </a>
              );
            })()}
          </div>
          <p className="mt-4 text-sm text-white/50">{l(BERATUNG.ctaPhotosHint)}</p>


          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">{l(BERATUNG.linksTitle)}</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <Link to="/services" className="hover:text-gold">
                Services
              </Link>
              <Link to="/projects" className="hover:text-gold">
                Projects
              </Link>
              <Link to="/about" className="hover:text-gold">
                About
              </Link>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 md:hidden border-t border-white/10">
        <a href="#termin" className="bg-gold text-ink py-4 text-center text-sm font-medium">
          {l(BERATUNG.ctaMobileBook)}
        </a>
        <a href={CONTACT.phoneHref} className="bg-ink text-white py-4 text-center text-sm font-medium">
          {l(BERATUNG.ctaMobileCall)}
        </a>
      </div>
      <div className="h-14 md:hidden" aria-hidden />
    </>
  );
}

/* ------------------------------- Booking ------------------------------- */

const inputClass =
  "w-full bg-transparent border border-border px-4 py-3 text-sm outline-none focus:border-gold transition";
const labelClass = "block font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2";
const star = <span className="text-gold text-lg align-middle">*</span>;

function BookingSection({ lang, l }: { lang: Lang; l: (v: L) => string }) {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<"phone" | "whatsapp">("phone");
  const [consent, setConsent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [manageUrl, setManageUrl] = useState("");
  const sectionRef = useRef<HTMLElement | null>(null);

  const days = useMemo(() => {
    const list: Array<{ iso: string; date: Date }> = [];
    const now = new Date();
    for (let i = 0; i < 28; i += 1) {
      const d = new Date(now.getTime() + i * 86_400_000);
      list.push({ iso: isoDay(d), date: d });
    }
    return list;
  }, []);

  useEffect(() => {
    if (!day) return;
    let active = true;
    setLoadingSlots(true);
    setSlots([]);
    supabase
      .rpc("consultation_free_slots", { target_date: day })
      .then(({ data, error: rpcError }) => {
        if (!active) return;
        if (rpcError) console.error("[beratung] slots", rpcError.message);
        setSlots((data as Slot[] | null) ?? []);
        setLoadingSlots(false);
      });
    return () => {
      active = false;
    };
  }, [day]);

  const typeLabel = PROJECT_TYPES.find((t) => t.id === projectType);
  const slotLabel = slot
    ? new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "de-DE", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(slot))
    : "";
  const dayLabel = day
    ? new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(`${day}T12:00:00Z`))
    : "";

  const scrollTop = () => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const go = (next: number) => {
    setError(null);
    if (next === 1 && !projectType) return setError(l(BERATUNG.required));
    if (next === 2 && !slot) return setError(l(BERATUNG.required));
    if (next === 3) {
      if (!firstName.trim() || !lastName.trim()) return setError(l(BERATUNG.required));
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return setError(l(BERATUNG.invalidEmail));
      if (!/^[+]?[\d\s()./-]{6,25}$/.test(phone)) return setError(l(BERATUNG.invalidPhone));
      if (!consent) return setError(l(BERATUNG.consentRequired));
    }
    setStep(next);
    scrollTop();
  };

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list);
    if (picked.length > MAX_FILES || picked.some((f) => f.size > MAX_FILE_BYTES)) {
      setError(l(BERATUNG.fileError));
      return;
    }
    setError(null);
    setFiles(picked);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("slotStart", slot);
      fd.set("firstName", firstName);
      fd.set("lastName", lastName);
      fd.set("email", email);
      fd.set("phone", phone);
      fd.set("projectType", projectType);
      fd.set("projectTypeLabel", typeLabel ? typeLabel.label[lang] : projectType);
      fd.set("postalCode", postalCode);
      fd.set("city", city);
      fd.set("projectStart", projectStart);
      fd.set("budget", budget);
      fd.set("description", description);
      fd.set("contactMethod", contactMethod);
      fd.set("lang", lang);
      fd.set("consent", String(consent));
      files.forEach((f) => fd.append("files", f));

      const res = await fetch("/api/public/consultation-booking", { method: "POST", body: fd });
      const payload = (await res.json().catch(() => ({}))) as { error?: string; manageUrl?: string };
      if (res.status === 409 || payload.error === "slot_taken") {
        setError(l(BERATUNG.slotTaken));
        setSlot("");
        setStep(1);
        scrollTop();
        return;
      }
      if (!res.ok) throw new Error(payload.error ?? "failed");
      setManageUrl(payload.manageUrl ?? "");
      setDone(true);
      scrollTop();
    } catch {
      setError(l(BERATUNG.failure));
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [BERATUNG.stepProject, BERATUNG.stepDate, BERATUNG.stepContact, BERATUNG.stepConfirm];

  return (
    <section id="termin" ref={sectionRef} className="bg-muted/40 py-20 md:py-28 scroll-mt-[var(--header-height,80px)]">
      <div className="container-wide max-w-4xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-4">{l(BERATUNG.bookingBadge)}</p>
        <h2 className="font-display h-fluid-section">{l(BERATUNG.bookingTitle)}</h2>
        <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">{l(BERATUNG.bookingIntro)}</p>

        {done ? (
          <div className="mt-10 border border-gold/40 bg-background p-8 md:p-10">
            <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.4} />
            <h3 className="mt-5 font-display text-2xl md:text-3xl">{l(BERATUNG.bookedTitle)}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{l(BERATUNG.bookedText)}</p>
            <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className={labelClass}>{l(BERATUNG.summaryDate)}</dt>
                <dd>{dayLabel}</dd>
              </div>
              <div>
                <dt className={labelClass}>{l(BERATUNG.summaryTime)}</dt>
                <dd className="tabular-nums">{slotLabel}</dd>
              </div>
              <div>
                <dt className={labelClass}>{l(BERATUNG.summaryDuration)}</dt>
                <dd>{l(BERATUNG.summaryDurationValue)}</dd>
              </div>
              <div>
                <dt className={labelClass}>{l(BERATUNG.summaryContact)}</dt>
                <dd>{l(BERATUNG.summaryContactValue)}</dd>
              </div>
            </dl>
            {manageUrl && (
              <a
                href={manageUrl}
                className="mt-8 inline-block border border-border px-6 py-3 text-sm hover:border-gold transition"
              >
                {l(MANAGE.manageLink)}
              </a>
            )}
          </div>
        ) : (
          <div className="mt-10 border border-border bg-background">
            {/* Step indicator */}
            <ol className="grid grid-cols-4 border-b border-border">
              {steps.map((s, i) => (
                <li
                  key={i}
                  className={`px-3 py-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] ${
                    i === step ? "bg-ink text-gold" : i < step ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {l(s)}
                </li>
              ))}
            </ol>

            <div className="p-6 md:p-10">
              {step === 0 && (
                <div className="space-y-8">
                  <div>
                    <span className={labelClass}>
                      {l(BERATUNG.q1)} {star}
                    </span>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {PROJECT_TYPES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setProjectType(t.id)}
                          className={`border px-4 py-3 text-left text-sm transition ${
                            projectType === t.id
                              ? "border-gold bg-gold/10 text-foreground"
                              : "border-border hover:border-gold/60"
                          }`}
                        >
                          {t.label[lang]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className={labelClass}>{l(BERATUNG.q2)}</span>
                    <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
                      <input
                        className={inputClass}
                        placeholder={l(BERATUNG.postalCode)}
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        maxLength={12}
                      />
                      <input
                        className={inputClass}
                        placeholder={l(BERATUNG.city)}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        maxLength={80}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="b-start">
                        {l(BERATUNG.projectStart)}
                      </label>
                      <input
                        id="b-start"
                        className={inputClass}
                        value={projectStart}
                        onChange={(e) => setProjectStart(e.target.value)}
                        maxLength={80}
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="b-budget">
                        {l(BERATUNG.budget)}
                      </label>
                      <input
                        id="b-budget"
                        className={inputClass}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        maxLength={80}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <span className={labelClass}>
                      {l(BERATUNG.qDate)} {star}
                    </span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {days.map((d) => {
                        const label = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "de-DE", {
                          timeZone: "Europe/Berlin",
                          weekday: "short",
                          day: "2-digit",
                          month: "2-digit",
                        }).format(d.date);
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            onClick={() => {
                              setDay(d.iso);
                              setSlot("");
                            }}
                            className={`shrink-0 border px-4 py-3 text-xs whitespace-nowrap transition ${
                              day === d.iso ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {day && (
                    <div>
                      <span className={labelClass}>
                        {l(BERATUNG.qTime)} {star}
                      </span>
                      {loadingSlots ? (
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="h-4 w-4 animate-spin" /> {l(BERATUNG.loadingSlots)}
                        </p>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-muted-foreground">{l(BERATUNG.noSlots)}</p>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {slots.map((s) => {
                            const label = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "de-DE", {
                              timeZone: "Europe/Berlin",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(s.slot_start));
                            return (
                              <button
                                key={s.slot_start}
                                type="button"
                                onClick={() => setSlot(s.slot_start)}
                                className={`border px-2 py-3 text-sm tabular-nums transition ${
                                  slot === s.slot_start
                                    ? "border-gold bg-gold/10"
                                    : "border-border hover:border-gold/60"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">{l(BERATUNG.callNotice)}</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass} htmlFor="b-first">
                        {l(BERATUNG.firstName)} {star}
                      </label>
                      <input
                        id="b-first"
                        className={inputClass}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        maxLength={80}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="b-last">
                        {l(BERATUNG.lastName)} {star}
                      </label>
                      <input
                        id="b-last"
                        className={inputClass}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        maxLength={80}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="b-phone">
                        {l(BERATUNG.phone)} {star}
                      </label>
                      <input
                        id="b-phone"
                        type="tel"
                        className={inputClass}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={40}
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="b-email">
                        {l(BERATUNG.email)} {star}
                      </label>
                      <input
                        id="b-email"
                        type="email"
                        className={inputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={200}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <span className={labelClass}>{l(BERATUNG.reachLabel)}</span>
                    <div className="flex gap-2">
                      {(["phone", "whatsapp"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setContactMethod(m)}
                          className={`border px-5 py-3 text-sm transition ${
                            contactMethod === m ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
                          }`}
                        >
                          {m === "phone" ? l(BERATUNG.reachPhone) : l(BERATUNG.reachWhatsapp)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="b-desc">
                      {l(BERATUNG.qProjectInfo)}
                    </label>
                    <textarea
                      id="b-desc"
                      rows={4}
                      className={inputClass}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={3000}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="b-files">
                      {l(BERATUNG.files)}
                    </label>
                    <input
                      id="b-files"
                      type="file"
                      multiple
                      accept="image/*,application/pdf"
                      onChange={(e) => onFiles(e.target.files)}
                      className="block w-full text-sm file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:text-sm"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">{l(BERATUNG.filesHint)}</p>
                  </div>

                  <label className="flex items-start gap-3 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[color:var(--gold,#c9a227)]"
                    />
                    <span>
                      {l(BERATUNG.consent)}{" "}
                      <Link to="/imprint" className="text-gold underline underline-offset-2">
                        {l(BERATUNG.consentLink)}
                      </Link>
                      . {star}
                    </span>
                  </label>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="font-display text-2xl">{l(BERATUNG.summaryTitle)}</h3>
                  <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.summaryDate)}</dt>
                      <dd>{dayLabel}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.summaryTime)}</dt>
                      <dd className="tabular-nums">{slotLabel}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.summaryDuration)}</dt>
                      <dd>{l(BERATUNG.summaryDurationValue)}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.summaryContact)}</dt>
                      <dd>{l(BERATUNG.summaryContactValue)}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.summaryProject)}</dt>
                      <dd>{typeLabel ? typeLabel.label[lang] : "—"}</dd>
                    </div>
                    <div>
                      <dt className={labelClass}>{l(BERATUNG.phone)}</dt>
                      <dd className="tabular-nums">{phone}</dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="mt-6 text-sm text-gold underline underline-offset-4"
                  >
                    {l(BERATUNG.edit)}
                  </button>
                </div>
              )}

              {error && <p className="mt-6 text-sm text-destructive">{error}</p>}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep(step - 1);
                      scrollTop();
                    }}
                    className="border border-border px-6 py-3 text-sm hover:border-gold transition"
                  >
                    {l(BERATUNG.back)}
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => go(step + 1)}
                    className="bg-gold text-ink px-7 py-3 text-sm font-medium hover:opacity-90 transition"
                  >
                    {l(BERATUNG.next)}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {submitting ? l(BERATUNG.booking) : l(BERATUNG.bookCta)}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------ Callback ------------------------------- */

function CallbackSection({ lang, l }: { lang: Lang; l: (v: L) => string }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");

    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return setError(l(BERATUNG.invalidEmail));
    if (!/^[+]?[\d\s()./-]{6,25}$/.test(phone)) return setError(l(BERATUNG.invalidPhone));
    if (!consent) return setError(l(BERATUNG.consentRequired));

    const files = fd.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
    if (files.length > MAX_FILES || files.some((f) => f.size > MAX_FILE_BYTES)) {
      return setError(l(BERATUNG.fileError));
    }

    fd.set("lang", lang);
    fd.set("consent", "true");
    const typeId = String(fd.get("projectType") ?? "");
    const type = PROJECT_TYPES.find((t) => t.id === typeId);
    if (type) fd.set("projectTypeLabel", type.label[lang]);

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/public/consultation-callback", { method: "POST", body: fd });
      if (!res.ok) throw new Error("failed");
      setSent(true);
      form.reset();
    } catch {
      setError(l(BERATUNG.failure));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rueckruf" className="py-20 md:py-24 scroll-mt-[var(--header-height,80px)]">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
        <div>
          <h2 className="font-display h-fluid-section">{l(BERATUNG.callbackTitle)}</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">{l(BERATUNG.callbackIntro)}</p>
          <div className="mt-8 space-y-3 text-sm">
            <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-gold">
              <Phone className="h-4 w-4 text-gold" /> <span className="tabular-nums">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-gold"
            >
              <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-gold">
              <Mail className="h-4 w-4 text-gold" /> {CONTACT.email}
            </a>
          </div>
        </div>

        {sent ? (
          <div className="border border-gold/40 p-8">
            <CheckCircle2 className="h-8 w-8 text-gold" strokeWidth={1.4} />
            <p className="mt-4 leading-relaxed">{l(BERATUNG.callbackSuccess)}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} suppressHydrationWarning className="border border-border p-6 md:p-8 space-y-5">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="c-first">
                  {l(BERATUNG.firstName)} {star}
                </label>
                <input id="c-first" name="firstName" required maxLength={80} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="c-last">
                  {l(BERATUNG.lastName)} {star}
                </label>
                <input id="c-last" name="lastName" required maxLength={80} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="c-phone">
                  {l(BERATUNG.phone)} {star}
                </label>
                <input id="c-phone" name="phone" type="tel" required maxLength={40} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="c-email">
                  {l(BERATUNG.email)} {star}
                </label>
                <input id="c-email" name="email" type="email" required maxLength={200} className={inputClass} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="c-type">
                  {l(BERATUNG.projectType)}
                </label>
                <select id="c-type" name="projectType" className={inputClass} defaultValue="">
                  <option value="">—</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label[lang]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="c-loc">
                  {l(BERATUNG.location)}
                </label>
                <input id="c-loc" name="location" maxLength={120} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="c-start">
                {l(BERATUNG.projectStart)}
              </label>
              <input id="c-start" name="projectStart" maxLength={80} className={inputClass} />
            </div>

            <div>
              <label className={labelClass} htmlFor="c-desc">
                {l(BERATUNG.description)}
              </label>
              <textarea id="c-desc" name="description" rows={4} maxLength={3000} className={inputClass} />
            </div>

            <div>
              <label className={labelClass} htmlFor="c-files">
                {l(BERATUNG.files)}
              </label>
              <input
                id="c-files"
                name="files"
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="block w-full text-sm file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:text-sm"
              />
              <p className="mt-2 text-xs text-muted-foreground">{l(BERATUNG.filesHint)}</p>
            </div>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <span>
                {l(BERATUNG.consent)}{" "}
                <Link to="/imprint" className="text-gold underline underline-offset-2">
                  {l(BERATUNG.consentLink)}
                </Link>
                . {star}
              </span>
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {l(BERATUNG.ctaCallback)}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
