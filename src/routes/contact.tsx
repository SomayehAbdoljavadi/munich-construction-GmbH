import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LocationMap } from "@/components/LocationMap";
import { HEITERWANGER_MAPS_URL, THERESIENSTRASSE_MAPS_URL } from "@/lib/mapLinks";

import { breadcrumb, ldScript, ORG_ID, url } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Munich Construction GmbH — Munich Office" },
      { name: "description", content: "Contact Munich Construction GmbH — phone, email, WhatsApp, and two offices in Munich. Free initial consultation for construction, renovation and refurbishment projects." },
      { property: "og:title", content: "Contact — Munich Construction GmbH" },
      { property: "og:description", content: "Phone, email, WhatsApp, and offices in Munich." },
      { property: "og:url", content: url("/contact") },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact — Munich Construction GmbH" },
      { name: "twitter:description", content: "Get in touch with our Munich office." },
    ],
    links: [{ rel: "canonical", href: url("/contact") }],
    scripts: [
      ldScript({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        url: url("/contact"),
        about: { "@id": ORG_ID },
      }),
      ldScript(breadcrumb([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ])),
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(2000),
});

function ContactPage() {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-wide">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">
            {t("contact.eyebrow")}
          </p>
          <h1 className="font-display h-fluid-page text-balance max-w-4xl">
            {t("contact.title")}
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <p className="text-white/70 text-lg mt-8 max-w-2xl leading-relaxed">{t("contact.lede")}</p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <Block icon={<Phone size={18} />} label={t("contact.phone")}>
              <a href="tel:+498957843675" className="block font-display text-2xl hover:text-gold transition-colors">
                +49 (0) 89 57 84 3675
              </a>
              <a href="tel:+4917632354815" className="block font-display text-2xl hover:text-gold transition-colors mt-1">
                +49 (176) 3235 4815
              </a>
            </Block>
            <Block icon={<Mail size={18} />} label={t("contact.email")}>
              <a href="mailto:info@munichconstruction.de" className="hover:text-gold break-all">
                info@munichconstruction.de
              </a>
            </Block>
            <Block icon={<MapPin size={18} />} label={t("contact.office")}>
              <a
                href={THERESIENSTRASSE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gold hover:underline transition-colors"
              >
                Theresienstraße 93<br />80333 München
              </a>
              <a
                href={HEITERWANGER_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 hover:text-gold hover:underline transition-colors"
              >
                Heiterwanger Straße 30<br />81373 München
              </a>
            </Block>

            <div className="flex gap-3 pt-4">
              <a href="https://wa.me/4917632354815" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-opacity">
                WhatsApp
              </a>
              <a href="tel:+498957843675" className="px-6 py-3 bg-ink text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors">
                Call
              </a>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {submitted ? (
              <div className="border border-gold/40 bg-secondary p-12 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-4">✓</div>
                <p className="font-display text-2xl">{t("contact.form.thanks")}</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const result = schema.safeParse(Object.fromEntries(fd));
                  if (!result.success) {
                    setError(result.error.issues[0]?.message ?? "Invalid input");
                    return;
                  }
                  setError(null);
                  setSubmitted(true);
                }}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label={t("contact.form.name")} name="name" required maxLength={100} />
                  <Field label={t("contact.form.email")} name="email" type="email" required maxLength={255} />
                  <Field label={t("contact.form.phone")} name="phone" type="tel" maxLength={50} />
                  <Field label={t("contact.form.subject")} name="subject" required maxLength={150} />
                </div>
                <div>
                  <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-3">
                    {t("contact.form.message")} <span className="text-gold">·</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={2000}
                    className="w-full bg-transparent border border-border focus:border-gold p-4 font-sans text-base focus:outline-none transition-colors resize-none"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <button
                  type="submit"
                  className="px-10 py-4 bg-ink text-white font-sans text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
                >
                  {t("contact.form.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="w-full h-[420px]">
          <LocationMap />
        </div>
      </section>
    </>
  );
}

function Block({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="size-10 grid place-items-center border border-gold text-gold shrink-0">{icon}</div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-3">
        {label} {required && <span className="text-gold">·</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full bg-transparent border border-border focus:border-gold px-4 py-3 font-sans text-base focus:outline-none transition-colors"
      />
    </div>
  );
}
