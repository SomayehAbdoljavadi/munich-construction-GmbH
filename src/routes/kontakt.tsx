import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Steiner & Co. Bauunternehmen München" },
      {
        name: "description",
        content:
          "Sprechen Sie mit uns über Ihr Bauprojekt. Steiner & Co. GmbH, Prinzregentenstraße 1, München. +49 (0) 89 234 567 890.",
      },
      { property: "og:title", content: "Kontakt — Steiner & Co." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="px-6 md:px-8 pt-20 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-6">
            Erstgespräch · unverbindlich
          </p>
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] text-balance max-w-4xl">
            Lassen Sie uns Ihr Vorhaben <span className="italic">besprechen</span>.
          </h1>
          <div className="h-px w-full bg-foreground/20 mt-12 animate-scale-line" />
        </div>
      </section>

      <section className="px-6 md:px-8 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact details */}
          <aside className="lg:col-span-4 space-y-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Büro München</p>
              <p className="font-sans text-base leading-relaxed">
                Steiner &amp; Co. GmbH<br />
                Prinzregentenstraße 1<br />
                80538 München
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Telefon</p>
              <a href="tel:+498923456789" className="font-display text-2xl hover:text-primary transition-colors">
                +49 (0) 89 234 567 890
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">E-Mail</p>
              <a href="mailto:projekte@steiner-bau.de" className="font-sans text-base hover:text-primary transition-colors">
                projekte@steiner-bau.de
              </a>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Bürozeiten</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Mo — Do · 08:00 — 17:00<br />
                Fr · 08:00 — 14:00
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="border border-border p-12 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary mb-4">
                  Vielen Dank
                </p>
                <h2 className="font-display text-3xl mb-4">Wir melden uns innerhalb von 24 Stunden.</h2>
                <p className="font-sans text-muted-foreground">
                  Ihre Anfrage liegt bei unserem Projektteam.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field label="Vorname" name="vorname" required />
                  <Field label="Nachname" name="nachname" required />
                  <Field label="E-Mail" name="email" type="email" required />
                  <Field label="Telefon" name="telefon" type="tel" />
                </div>
                <Field label="Projektart" name="projektart" placeholder="z. B. Neubau, Sanierung, Holzbau" />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
                    Nachricht
                  </label>
                  <textarea
                    name="nachricht"
                    required
                    rows={6}
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-base focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Beschreiben Sie kurz Ihr Vorhaben…"
                  />
                </div>
                <button
                  type="submit"
                  className="px-12 py-5 bg-foreground text-background font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-colors"
                >
                  Anfrage senden
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
        {label}
        {required && <span className="text-primary ml-1">·</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-border py-3 font-sans text-base focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
