import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, FileText, Upload, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import {
  CAREERS_COPY as C,
  CAREER_CATEGORIES,
  GENERAL_POSITION,
  ALL_POSITIONS,
} from "@/lib/careers-data";
import { breadcrumb, ldScript, ORG_ID, url } from "@/lib/seo";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Karriere | Munich Construction GmbH" },
      {
        name: "description",
        content:
          "Entdecken Sie offene Stellen bei Munich Construction GmbH in den Bereichen Bau, Handwerk, Planung und Projektmanagement.",
      },
      { property: "og:title", content: "Careers | Munich Construction GmbH" },
      {
        property: "og:description",
        content:
          "Explore career opportunities at Munich Construction GmbH in construction, skilled trades, planning and project management.",
      },
      { property: "og:url", content: url("/careers") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Careers | Munich Construction GmbH" },
      {
        name: "twitter:description",
        content:
          "Explore career opportunities at Munich Construction GmbH in construction, skilled trades, planning and project management.",
      },
    ],
    links: [{ rel: "canonical", href: url("/careers") }],
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: url("/careers"),
        name: "Careers — Munich Construction GmbH",
        about: { "@id": ORG_ID },
      }),
      ldScript(
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]),
      ),
    ],
  }),
  component: CareersPage,
});

const MAX_FILE_BYTES = 10 * 1024 * 1024;

type Errors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "positionId" | "cv" | "coverLetter" | "consent", string>>;

function CareersPage() {
  const { lang } = useT();
  const [positionId, setPositionId] = useState("");
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [cv, setCv] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [highlight, setHighlight] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef<HTMLSelectElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (el: HTMLElement | null) => {
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: "smooth" });
  };

  const applyTo = (id: string) => {
    setPositionId(id);
    setErrors((e) => ({ ...e, positionId: undefined }));
    setStatus((s) => (s === "success" ? "idle" : s));
    scrollTo(formRef.current);
    setHighlight(true);
    window.setTimeout(() => positionRef.current?.focus({ preventScroll: true }), 500);
    window.setTimeout(() => setHighlight(false), 2200);
  };

  const validateFile = (file: File | null, required: boolean): string | undefined => {
    if (!file) return required ? C.cvRequired[lang] : undefined;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return C.fileType[lang];
    if (file.size > MAX_FILE_BYTES) return C.fileSize[lang];
    return undefined;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = C.required[lang];
    if (!values.lastName.trim()) next.lastName = C.required[lang];
    if (!values.email.trim()) next.email = C.required[lang];
    else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(values.email.trim())) next.email = C.invalidEmail[lang];
    if (!values.phone.trim()) next.phone = C.required[lang];
    else if (!/^[+]?[\d\s()./-]{6,25}$/.test(values.phone.trim())) next.phone = C.invalidPhone[lang];
    if (!positionId) next.positionId = C.required[lang];
    next.cv = validateFile(cv, true);
    next.coverLetter = validateFile(coverLetter, false);
    if (!consent) next.consent = C.consentRequired[lang];

    const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v)) as Errors;
    setErrors(cleaned);
    if (Object.keys(cleaned).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("firstName", values.firstName.trim());
      fd.append("lastName", values.lastName.trim());
      fd.append("email", values.email.trim());
      fd.append("phone", values.phone.trim());
      fd.append("positionId", positionId);
      fd.append("lang", lang);
      fd.append("consent", "true");
      fd.append("company", "");
      if (cv) fd.append("cv", cv);
      if (coverLetter) fd.append("coverLetter", coverLetter);

      const res = await fetch("/api/public/careers-application", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`status_${res.status}`);

      setStatus("success");
      setValues({ firstName: "", lastName: "", email: "", phone: "" });
      setPositionId("");
      setCv(null);
      setCoverLetter(null);
      setConsent(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
      if (coverInputRef.current) coverInputRef.current.value = "";
    } catch {
      setStatus("error");
    }
  };

  const field = (name: "firstName" | "lastName" | "email" | "phone", type: string) => ({
    id: name,
    name,
    type,
    value: values[name],
    required: true,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    className:
      "w-full bg-transparent border border-border focus:border-gold focus-visible:outline-2 focus-visible:outline-gold px-4 py-3 font-sans text-base transition-colors",
  });

  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">{C.eyebrow[lang]}</p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">{C.heading[lang]}</h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">{C.lede[lang]}</p>
          <button
            type="button"
            onClick={() => scrollTo(document.getElementById("open-positions"))}
            className="mt-10 inline-flex items-center gap-3 bg-gold text-ink px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
          >
            {C.heroCta[lang]}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section id="open-positions" className="py-20 md:py-28 scroll-mt-[var(--header-height)]">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">{C.positionsEyebrow[lang]}</p>
          <h2 className="font-display text-3xl md:text-4xl">{C.positionsTitle[lang]}</h2>
          <div className="gold-divider w-16 mt-6" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREER_CATEGORIES.map((cat) => {
              return (
                <article
                  key={cat.id}
                  className="border p-8 md:p-10 flex flex-col bg-ink text-white border-white/10"
                >
                  <h3 className="font-display text-2xl">{cat.title[lang]}</h3>
                  <div className="gold-divider w-12 mt-4" />
                  {cat.note && (
                    <p className="mt-6 text-sm leading-relaxed text-white/70">
                      {cat.note[lang]}
                    </p>
                  )}
                  <ul className="mt-6 space-y-4 flex-1">
                    {cat.positions.map((p) => (
                      <li
                        key={p.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-4 border-white/10"
                      >
                        <span className="font-sans text-base">{p.title[lang]}</span>
                        <button
                          type="button"
                          onClick={() => applyTo(p.id)}
                          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] transition-colors bg-gold text-ink hover:bg-white"
                        >
                          {C.apply[lang]}
                        </button>
                      </li>
                    ))}
                  </ul>

                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-6 border border-gold/40 bg-secondary p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl">{C.generalTitle[lang]}</h3>
              <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">{C.generalText[lang]}</p>
            </div>
            <button
              type="button"
              onClick={() => applyTo(GENERAL_POSITION.id)}
              className="shrink-0 inline-flex items-center gap-2 bg-ink text-white px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
            >
              {C.apply[lang]}
            </button>
          </div>
        </div>
      </section>

      <section className="pb-24 scroll-mt-[var(--header-height)]" id="application-form">
        <div className="container-wide">
          <div
            ref={formRef}
            className={`border p-8 md:p-12 transition-all duration-500 ${
              highlight ? "border-gold ring-2 ring-gold/50 shadow-premium" : "border-border"
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-4">{C.formEyebrow[lang]}</p>
            <h2 className="font-display text-3xl">{C.formTitle[lang]}</h2>
            <div className="gold-divider w-16 mt-6 mb-10" />

            {status === "success" ? (
              <div role="status" aria-live="polite" className="border border-gold/40 bg-secondary p-10 text-center">
                <p className="font-display text-xl md:text-2xl">{C.success[lang]}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Wrap label={C.firstName[lang]} htmlFor="firstName" error={errors.firstName}>
                    <input {...field("firstName", "text")} maxLength={80} autoComplete="given-name" />
                  </Wrap>
                  <Wrap label={C.lastName[lang]} htmlFor="lastName" error={errors.lastName}>
                    <input {...field("lastName", "text")} maxLength={80} autoComplete="family-name" />
                  </Wrap>
                  <Wrap label={C.email[lang]} htmlFor="email" error={errors.email}>
                    <input {...field("email", "email")} maxLength={200} autoComplete="email" />
                  </Wrap>
                  <Wrap label={C.phone[lang]} htmlFor="phone" error={errors.phone}>
                    <input {...field("phone", "tel")} maxLength={40} autoComplete="tel" />
                  </Wrap>
                </div>

                <Wrap label={C.position[lang]} htmlFor="positionId" error={errors.positionId}>
                  <select
                    id="positionId"
                    name="positionId"
                    ref={positionRef}
                    required
                    value={positionId}
                    aria-invalid={Boolean(errors.positionId)}
                    aria-describedby={errors.positionId ? "positionId-error" : undefined}
                    onChange={(e) => {
                      setPositionId(e.target.value);
                      setErrors((prev) => ({ ...prev, positionId: undefined }));
                    }}
                    className="w-full bg-transparent border border-border focus:border-gold focus-visible:outline-2 focus-visible:outline-gold px-4 py-3 font-sans text-base transition-colors"
                  >
                    <option value="">{C.positionPlaceholder[lang]}</option>
                    {ALL_POSITIONS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title[lang]} — {p.category[lang]}
                      </option>
                    ))}
                  </select>
                </Wrap>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileField
                    id="cv"
                    label={C.cv[lang]}
                    required
                    hint={C.fileHint[lang]}
                    chooseLabel={C.chooseFile[lang]}
                    removeLabel={C.removeFile[lang]}
                    file={cv}
                    error={errors.cv}
                    inputRef={cvInputRef}
                    onFile={(f) => {
                      setCv(f);
                      setErrors((prev) => ({ ...prev, cv: validateFile(f, true) }));
                    }}
                  />
                  <FileField
                    id="coverLetter"
                    label={C.cover[lang]}
                    hint={C.fileHint[lang]}
                    chooseLabel={C.chooseFile[lang]}
                    removeLabel={C.removeFile[lang]}
                    file={coverLetter}
                    error={errors.coverLetter}
                    inputRef={coverInputRef}
                    onFile={(f) => {
                      setCoverLetter(f);
                      setErrors((prev) => ({ ...prev, coverLetter: validateFile(f, false) }));
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="consent" className="flex items-start gap-3 text-sm leading-relaxed cursor-pointer">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      required
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors((prev) => ({ ...prev, consent: undefined }));
                      }}
                      className="mt-1 size-4 accent-[var(--color-gold,#c8a227)] focus-visible:outline-2 focus-visible:outline-gold"
                    />
                    <span>
                      {C.consent[lang]}{" "}
                      <Link to="/imprint" className="text-gold underline underline-offset-4">
                        {C.consentLink[lang]}
                      </Link>
                    </span>
                  </label>
                  {errors.consent && <FieldError id="consent-error">{errors.consent}</FieldError>}
                </div>

                {/* Honeypot */}
                <div className="hidden" aria-hidden>
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                  <p role="alert" className="border border-destructive/50 bg-destructive/10 text-destructive p-4 text-sm">
                    {C.failure[lang]}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-10 py-4 bg-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? C.submitting[lang] : C.submit[lang]}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Wrap({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-3">
        {label} <span className="text-gold">·</span>
      </label>
      {children}
      {error && <FieldError id={`${htmlFor}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive flex items-start gap-2">
      <span aria-hidden>⚠</span>
      <span>{children}</span>
    </p>
  );
}

function FileField({
  id,
  label,
  hint,
  chooseLabel,
  removeLabel,
  file,
  error,
  required,
  inputRef,
  onFile,
}: {
  id: string;
  label: string;
  hint: string;
  chooseLabel: string;
  removeLabel: string;
  file: File | null;
  error?: string;
  required?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFile: (f: File | null) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-3">
        {label} {required && <span className="text-gold">·</span>}
      </label>
      <div className="border border-dashed border-border p-4 flex flex-wrap items-center gap-3">
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : `${id}-hint`}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm file:mr-4 file:border file:border-border file:bg-secondary file:px-4 file:py-2 file:font-mono file:text-[10px] file:uppercase file:tracking-[0.2em] file:cursor-pointer focus-visible:outline-2 focus-visible:outline-gold"
        />
        {file && (
          <div className="flex items-center gap-2 text-sm w-full">
            <FileText size={14} className="text-gold shrink-0" />
            <span className="truncate">{file.name}</span>
            <button
              type="button"
              onClick={() => {
                onFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label={removeLabel}
              className="ml-auto inline-flex items-center gap-1 text-muted-foreground hover:text-destructive focus-visible:outline-2 focus-visible:outline-gold"
            >
              <X size={14} /> <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{removeLabel}</span>
            </button>
          </div>
        )}
        {!file && (
          <span className="sr-only">
            <Upload size={12} /> {chooseLabel}
          </span>
        )}
      </div>
      <p id={`${id}-hint`} className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {hint}
      </p>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}
