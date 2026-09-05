import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { url } from "@/lib/seo";
import { useConsent } from "@/lib/consent";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Munich Construction GmbH" },
      {
        name: "description",
        content:
          "Datenschutzerklärung der Munich Construction GmbH: Cookies, Speichertechnologien, Rechtsgrundlagen, Speicherdauer und Widerruf Ihrer Einwilligung.",
      },
      { property: "og:title", content: "Datenschutzerklärung — Munich Construction GmbH" },
      { property: "og:description", content: "Wie Munich Construction GmbH personenbezogene Daten verarbeitet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url("/datenschutz") }],
  }),
  component: PrivacyPage,
});

type L = { de: string; en: string };
const T = {
  eyebrow: { de: "Recht · Munich Construction GmbH", en: "Legal · Munich Construction GmbH" },
  title: { de: "Datenschutzerklärung", en: "Privacy Policy" },
  intro: {
    de: "Diese Erklärung informiert Sie darüber, welche personenbezogenen Daten wir auf www.munichconstruction.de verarbeiten, auf welcher Rechtsgrundlage dies geschieht und welche Rechte Sie haben. Sie gilt zusätzlich zu den Angaben im Impressum.",
    en: "This policy explains which personal data we process on www.munichconstruction.de, on what legal basis, and which rights you have. It applies in addition to the information in our legal notice.",
  },
  controllerTitle: { de: "1. Verantwortlicher", en: "1. Controller" },
  controller: {
    de: "Munich Construction GmbH, Heiterwanger Straße 30, 81373 München, Deutschland · Telefon: +49 (0) 89 57 84 3675 · E-Mail: info@munichconstruction.de · Vertreten durch: Mehdi Mardi.",
    en: "Munich Construction GmbH, Heiterwanger Straße 30, 81373 Munich, Germany · Phone: +49 (0) 89 57 84 3675 · Email: info@munichconstruction.de · Represented by: Mehdi Mardi.",
  },
  hostingTitle: { de: "2. Hosting und Server-Logs", en: "2. Hosting and server logs" },
  hosting: {
    de: "Die Website wird bei Cloudflare (Cloudflare, Inc., EU-Rechenzentren, Standardvertragsklauseln) gehostet. Beim Aufruf werden technisch notwendige Zugriffsdaten (IP-Adresse, Zeitpunkt, aufgerufene Ressource, User-Agent) verarbeitet, um die Auslieferung und Sicherheit der Website zu gewährleisten. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb).",
    en: "The website is hosted by Cloudflare (Cloudflare, Inc., EU data centres, standard contractual clauses). When you visit, technically necessary access data (IP address, time, requested resource, user agent) is processed to deliver and secure the site. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in secure operation).",
  },
  cookiesTitle: { de: "3. Cookies und ähnliche Speichertechnologien", en: "3. Cookies and similar storage technologies" },
  cookiesIntro: {
    de: "Notwendige Speichertechnologien setzen wir auf Grundlage von § 25 Abs. 2 TDDDG und Art. 6 Abs. 1 lit. f DSGVO ein. Alle optionalen Cookies und externen Dienste werden ausschließlich nach Ihrer ausdrücklichen Einwilligung (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO) geladen. Ohne Einwilligung findet keine Verbindung zu optionalen Drittanbietern statt.",
    en: "Necessary storage technologies are used on the basis of Sec. 25(2) TDDDG and Art. 6(1)(f) GDPR. All optional cookies and external services are only loaded after your explicit consent (Sec. 25(1) TDDDG, Art. 6(1)(a) GDPR). Without consent, no connection to optional third parties is made.",
  },
  colName: { de: "Name", en: "Name" },
  colProvider: { de: "Anbieter", en: "Provider" },
  colPurpose: { de: "Zweck", en: "Purpose" },
  colCategory: { de: "Kategorie", en: "Category" },
  colDuration: { de: "Speicherdauer", en: "Storage duration" },
  colBasis: { de: "Rechtsgrundlage", en: "Legal basis" },
  categoriesTitle: { de: "4. Einwilligungskategorien", en: "4. Consent categories" },
  categories: {
    de: "Notwendig (immer aktiv), Präferenzen, Statistiken, Marketing und Externe Medien. Derzeit setzen wir keine Statistik- oder Marketing-Dienste ein; die Kategorien sind vorbereitet und bleiben ohne Ihre Einwilligung vollständig deaktiviert. Die Kategorie „Externe Medien“ steuert das Laden der Kartenansicht (OpenStreetMap).",
    en: "Necessary (always active), Preferences, Statistics, Marketing and External Media. We currently do not use any statistics or marketing services; these categories are prepared and remain fully disabled without your consent. The “External Media” category controls loading of the map view (OpenStreetMap).",
  },
  thirdTitle: { de: "5. Externe Dienste", en: "5. External services" },
  osm: {
    de: "OpenStreetMap: Die Kartenansicht auf der Startseite und der Kontaktseite wird von den Servern der OpenStreetMap Foundation (Vereinigtes Königreich, Angemessenheitsbeschluss der EU-Kommission) geladen. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen. Die Karte wird erst geladen, nachdem Sie der Kategorie „Externe Medien“ zugestimmt haben; vorher sehen Sie einen Platzhalter. OpenStreetMap setzt keine Marketing-Cookies. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.",
    en: "OpenStreetMap: The map view on the home and contact pages is loaded from servers of the OpenStreetMap Foundation (United Kingdom, EU adequacy decision). Your IP address is transmitted to OpenStreetMap. The map is only loaded after you consent to the “External Media” category; before that you see a placeholder. OpenStreetMap does not set marketing cookies. Legal basis: Art. 6(1)(a) GDPR.",
  },
  fonts: {
    de: "Google Fonts: Die Schriftarten dieser Website werden von Google Fonts (Google Ireland Limited, Irland) geladen; dabei wird Ihre IP-Adresse an Google übertragen und ggf. an Google LLC in den USA (Standardvertragsklauseln, EU-US Data Privacy Framework) weitergegeben. Google Fonts setzt keine Cookies. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (einheitliche und barrierefreie Darstellung der Website).",
    en: "Google Fonts: The website's typefaces are loaded from Google Fonts (Google Ireland Limited, Ireland); your IP address is transmitted to Google and may be forwarded to Google LLC in the USA (standard contractual clauses, EU-US Data Privacy Framework). Google Fonts does not set cookies. Legal basis: Art. 6(1)(f) GDPR (consistent and accessible presentation of the website).",
  },
  whatsapp: {
    de: "WhatsApp / Telefon / E-Mail: Links zu WhatsApp, Telefon und E-Mail sind reine Verweise. Eine Verbindung zu WhatsApp (Meta Platforms Ireland Ltd.) entsteht erst, wenn Sie den Link aktiv anklicken. Es werden keine Meta-Skripte oder Pixel auf dieser Website eingebunden.",
    en: "WhatsApp / phone / email: Links to WhatsApp, phone and email are plain links. A connection to WhatsApp (Meta Platforms Ireland Ltd.) is only established when you actively click the link. No Meta scripts or pixels are embedded on this website.",
  },
  formsTitle: { de: "6. Formulare (Kontakt, Bewerbung, Beratungstermin)", en: "6. Forms (contact, applications, consultation booking)" },
  forms: {
    de: "Wenn Sie das Kontakt-, Bewerbungs-, Rückruf- oder Terminbuchungsformular nutzen, verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Projektangaben, hochgeladene Dateien) zur Bearbeitung Ihrer Anfrage. Diese Daten werden in unserer Datenbank (Supabase, EU-Region) gespeichert und per E-Mail an uns übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO. Terminbuchungen werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind; Bewerbungsunterlagen spätestens 6 Monate nach Abschluss des Verfahrens. Wir nutzen keine externen Terminbuchungs-Tools von Drittanbietern.",
    en: "If you use the contact, application, callback or appointment-booking form, we process the data you provide (e.g. name, email address, phone number, project details, uploaded files) in order to handle your request. This data is stored in our database (Supabase, EU region) and sent to us by email. Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR. Bookings are deleted once no longer required; application documents at the latest 6 months after the process ends. We do not use any third-party appointment-booking tools.",
  },
  withdrawTitle: { de: "7. Widerruf der Einwilligung", en: "7. Withdrawing consent" },
  withdrawBody: {
    de: "Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen – über den Link „Cookie-Einstellungen“ im Footer oder über die Schaltfläche unten. Der Widerruf ist genauso einfach wie die Erteilung. Nach einem Widerruf werden keine optionalen Dienste mehr geladen und zugehörige optionale Cookies gelöscht, soweit technisch möglich.",
    en: "You can change or withdraw your consent at any time with effect for the future – via the “Cookie Settings” link in the footer or the button below. Withdrawal is as easy as giving consent. After withdrawal, no optional services are loaded and associated optional cookies are deleted where technically possible.",
  },
  openSettings: { de: "Cookie-Einstellungen öffnen", en: "Open cookie settings" },
  rightsTitle: { de: "8. Ihre Rechte", en: "8. Your rights" },
  rights: {
    de: "Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch (Art. 21). Wenden Sie sich dazu an info@munichconstruction.de. Zudem können Sie sich bei einer Aufsichtsbehörde beschweren, z. B. beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA).",
    en: "You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21). Please contact info@munichconstruction.de. You may also lodge a complaint with a supervisory authority, e.g. the Bavarian Data Protection Authority (BayLDA).",
  },
  transferTitle: { de: "9. Datenübermittlung in Drittländer", en: "9. Transfers outside the EEA" },
  transfer: {
    de: "Eine Übermittlung in Länder außerhalb des EWR findet nur im Rahmen der oben genannten Dienste statt (Cloudflare, Google Fonts, E-Mail-Versand über Resend) und ist durch Standardvertragsklauseln bzw. das EU-US Data Privacy Framework abgesichert. Formular- und Termindaten werden in der EU gespeichert.",
    en: "Transfers to countries outside the EEA only occur within the services listed above (Cloudflare, Google Fonts, email delivery via Resend) and are safeguarded by standard contractual clauses or the EU-US Data Privacy Framework. Form and booking data is stored in the EU.",
  },
  updated: { de: "Stand: August 2026 · Einwilligungsversion 1", en: "Last updated: August 2026 · Consent version 1" },
} satisfies Record<string, L>;

const COOKIE_ROWS: Array<Record<"name" | "provider" | "purpose" | "category" | "duration" | "basis", L>> = [
  {
    name: { de: "mc_consent (Cookie)", en: "mc_consent (cookie)" },
    provider: { de: "Munich Construction GmbH (Erstanbieter)", en: "Munich Construction GmbH (first party)" },
    purpose: {
      de: "Speichert Ihre Cookie-Entscheidung, die gewählten Kategorien, Zeitstempel und Einwilligungsversion.",
      en: "Stores your cookie decision, selected categories, timestamp and consent version.",
    },
    category: { de: "Notwendig", en: "Necessary" },
    duration: { de: "6 Monate", en: "6 months" },
    basis: { de: "§ 25 Abs. 2 TDDDG, Art. 6 Abs. 1 lit. c/f DSGVO", en: "Sec. 25(2) TDDDG, Art. 6(1)(c)/(f) GDPR" },
  },
  {
    name: { de: "mc-theme (localStorage)", en: "mc-theme (localStorage)" },
    provider: { de: "Munich Construction GmbH (Erstanbieter)", en: "Munich Construction GmbH (first party)" },
    purpose: { de: "Speichert die gewählte Darstellung (hell/dunkel).", en: "Stores the selected appearance (light/dark)." },
    category: { de: "Notwendig", en: "Necessary" },
    duration: { de: "Bis zum Löschen durch den Nutzer", en: "Until deleted by the user" },
    basis: { de: "§ 25 Abs. 2 TDDDG", en: "Sec. 25(2) TDDDG" },
  },
  {
    name: { de: "mc-lang (localStorage)", en: "mc-lang (localStorage)" },
    provider: { de: "Munich Construction GmbH (Erstanbieter)", en: "Munich Construction GmbH (first party)" },
    purpose: { de: "Speichert die gewählte Sprache (DE/EN).", en: "Stores the selected language (DE/EN)." },
    category: { de: "Notwendig", en: "Necessary" },
    duration: { de: "Bis zum Löschen durch den Nutzer", en: "Until deleted by the user" },
    basis: { de: "§ 25 Abs. 2 TDDDG", en: "Sec. 25(2) TDDDG" },
  },
  {
    name: { de: "mc-intro-played (sessionStorage)", en: "mc-intro-played (sessionStorage)" },
    provider: { de: "Munich Construction GmbH (Erstanbieter)", en: "Munich Construction GmbH (first party)" },
    purpose: {
      de: "Verhindert, dass die Startanimation mehrfach pro Sitzung abgespielt wird.",
      en: "Prevents the intro animation from replaying during the same session.",
    },
    category: { de: "Notwendig", en: "Necessary" },
    duration: { de: "Ende der Browsersitzung", en: "End of browser session" },
    basis: { de: "§ 25 Abs. 2 TDDDG", en: "Sec. 25(2) TDDDG" },
  },
  {
    name: { de: "Kartenkacheln (kein Cookie)", en: "Map tiles (no cookie)" },
    provider: { de: "OpenStreetMap Foundation, UK", en: "OpenStreetMap Foundation, UK" },
    purpose: {
      de: "Anzeige unserer Standorte auf einer interaktiven Karte. Übermittelt Ihre IP-Adresse an OpenStreetMap.",
      en: "Displays our locations on an interactive map. Transmits your IP address to OpenStreetMap.",
    },
    category: { de: "Externe Medien", en: "External Media" },
    duration: { de: "Nur während des Seitenaufrufs (Browser-Cache)", en: "Only during the page visit (browser cache)" },
    basis: { de: "Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG", en: "Art. 6(1)(a) GDPR, Sec. 25(1) TDDDG" },
  },
  {
    name: { de: "Google Fonts (kein Cookie)", en: "Google Fonts (no cookie)" },
    provider: { de: "Google Ireland Limited", en: "Google Ireland Limited" },
    purpose: { de: "Laden der Schriftarten der Website.", en: "Loading the website's typefaces." },
    category: { de: "Notwendig (Darstellung)", en: "Necessary (presentation)" },
    duration: { de: "Browser-Cache (bis 1 Jahr)", en: "Browser cache (up to 1 year)" },
    basis: { de: "Art. 6 Abs. 1 lit. f DSGVO", en: "Art. 6(1)(f) GDPR" },
  },
];

function PrivacyPage() {
  const { lang } = useT();
  const l = (v: L) => v[lang];
  const { openSettings } = useConsent();

  return (
    <>
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="container-text">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-5">{l(T.eyebrow)}</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">{l(T.title)}</h1>
          <div className="gold-divider w-24 mt-8" />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 md:px-8 space-y-12">
          <p className="text-muted-foreground leading-relaxed">{l(T.intro)}</p>

          <Block title={l(T.controllerTitle)}>
            <p>{l(T.controller)}</p>
          </Block>

          <Block title={l(T.hostingTitle)}>
            <p>{l(T.hosting)}</p>
          </Block>

          <Block title={l(T.cookiesTitle)}>
            <p>{l(T.cookiesIntro)}</p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-muted">
                    {[T.colName, T.colProvider, T.colPurpose, T.colCategory, T.colDuration, T.colBasis].map((c, i) => (
                      <th key={i} className="border border-border p-2 font-semibold align-top">
                        {l(c)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIE_ROWS.map((row) => (
                    <tr key={row.name.de}>
                      <td className="border border-border p-2 align-top font-mono">{l(row.name)}</td>
                      <td className="border border-border p-2 align-top">{l(row.provider)}</td>
                      <td className="border border-border p-2 align-top">{l(row.purpose)}</td>
                      <td className="border border-border p-2 align-top">{l(row.category)}</td>
                      <td className="border border-border p-2 align-top">{l(row.duration)}</td>
                      <td className="border border-border p-2 align-top">{l(row.basis)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Block>

          <Block title={l(T.categoriesTitle)}>
            <p>{l(T.categories)}</p>
          </Block>

          <Block title={l(T.thirdTitle)}>
            <p>{l(T.osm)}</p>
            <p>{l(T.fonts)}</p>
            <p>{l(T.whatsapp)}</p>
          </Block>

          <Block title={l(T.formsTitle)}>
            <p>{l(T.forms)}</p>
          </Block>

          <Block title={l(T.withdrawTitle)}>
            <p>{l(T.withdrawBody)}</p>
            <button
              type="button"
              onClick={openSettings}
              className="mt-2 inline-flex bg-ink text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-ink transition-colors"
            >
              {l(T.openSettings)}
            </button>
          </Block>

          <Block title={l(T.rightsTitle)}>
            <p>{l(T.rights)}</p>
          </Block>

          <Block title={l(T.transferTitle)}>
            <p>{l(T.transfer)}</p>
          </Block>

          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{l(T.updated)}</p>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed text-sm">{children}</div>
    </div>
  );
}
