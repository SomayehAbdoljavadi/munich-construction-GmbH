import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "de" | "en";

type Dict = Record<string, { de: string; en: string }>;

const translations: Dict = {
  // nav
  "nav.home": { de: "Start", en: "Home" },
  "nav.about": { de: "Über uns", en: "About" },
  "nav.services": { de: "Leistungen", en: "Services" },
  "nav.projects": { de: "Projekte", en: "Projects" },
  "nav.contact": { de: "Kontakt", en: "Contact" },
  "nav.imprint": { de: "Impressum", en: "Imprint" },
  "nav.cta": { de: "Kontakt aufnehmen", en: "Get in Touch" },

  // hero
  "hero.eyebrow": { de: "Bauen mit Anspruch · München", en: "Building with Standards · Munich" },
  "hero.title": {
    de: "Munich Construction GmbH — Ihr Partner für hochwertiges Bauen in München",
    en: "Munich Construction GmbH — Your Partner for High-Quality Construction in Munich",
  },
  "hero.titleBrand": {
    de: "Munich Construction GmbH",
    en: "Munich Construction GmbH",
  },
  "hero.titleRest": {
    de: "Ihr Partner für hochwertiges Bauen in München",
    en: "Your Partner for High-Quality Construction in Munich",
  },
  "hero.subtitle": {
    de: "Neubau, Renovierung, Sanierung, Brandschutz, Genehmigung und Werkplanung — alles aus einer Hand.",
    en: "New construction, renovation, refurbishment, fire protection, permit planning and execution planning — all from one source.",
  },
  "hero.cta1": { de: "Unsere Leistungen", en: "Our Services" },
  "hero.cta2": { de: "Kontakt", en: "Contact" },
  "hero.trust1": { de: "Hochwertige Bauausführung", en: "High-quality execution" },
  "hero.trust2": { de: "Individuelle Lösungen", en: "Tailored solutions" },
  "hero.trust3": { de: "Alles aus einer Hand", en: "End-to-end service" },
  "hero.trust4": { de: "Persönliche Betreuung", en: "Personal support" },

  // services index
  "services.eyebrow": { de: "Unsere Leistungen", en: "Our Services" },
  "services.title": { de: "Sechs Disziplinen, ein Anspruch.", en: "Six disciplines, one standard." },
  "services.lede": {
    de: "Von der ersten Skizze bis zur Übergabe — wir verantworten den gesamten Bauprozess.",
    en: "From the first sketch to handover — we own the entire construction process.",
  },
  "service.neubau.title": { de: "Neubau", en: "New Construction" },
  "service.neubau.text": {
    de: "Schlüsselfertiger Neubau für private und gewerbliche Bauherren in höchster Ausführungsqualität.",
    en: "Turn-key new builds for private and commercial clients with uncompromising quality.",
  },
  "service.renovierung.title": { de: "Renovierung", en: "Renovation" },
  "service.renovierung.text": {
    de: "Modernisierung von Bestandsgebäuden mit Respekt vor Substanz und Charakter.",
    en: "Modernising existing buildings with respect for substance and character.",
  },
  "service.sanierung.title": { de: "Sanierung", en: "Refurbishment" },
  "service.sanierung.text": {
    de: "Energetische und strukturelle Sanierung — von der Fassade bis zur Haustechnik.",
    en: "Energetic and structural refurbishment — from facade to building services.",
  },
  "service.brandschutz.title": { de: "Brandschutz", en: "Fire Protection" },
  "service.brandschutz.text": {
    de: "Konzeption und Umsetzung normgerechter Brandschutzlösungen.",
    en: "Concept and execution of compliant fire-protection solutions.",
  },
  "service.genehmigung.title": { de: "Genehmigung", en: "Permitting" },
  "service.genehmigung.text": {
    de: "Bauantrag, Behördenkommunikation, Genehmigungsplanung — Sie behalten den Kopf frei.",
    en: "Permit applications, authority liaison, approval planning — we handle the paperwork.",
  },
  "service.werkplanung.title": { de: "Werkplanung", en: "Execution Planning" },
  "service.werkplanung.text": {
    de: "Detaillierte Ausführungsplanung als Grundlage für reibungslose Bauabläufe.",
    en: "Detailed execution drawings that ensure a smooth construction process.",
  },

  // services page
  "service.benefits": { de: "Ihre Vorteile", en: "Your benefits" },
  "service.included": { de: "Inklusive Leistungen", en: "What's included" },
  "service.cta": { de: "Projekt anfragen", en: "Request a quote" },

  // about
  "about.eyebrow": { de: "Über uns", en: "About Us" },
  "about.title": { de: "Bauen mit Ingenieurskunst und Haltung.", en: "Building with engineering and attitude." },
  "about.lede": {
    de: "Munich Construction GmbH ist ein Münchner Bauunternehmen für anspruchsvolle Hochbauprojekte. Wir begleiten private und gewerbliche Bauherren von der ersten Idee bis zur schlüsselfertigen Übergabe.",
    en: "Munich Construction GmbH is a Munich-based construction company for demanding building projects. We accompany private and commercial clients from the first idea to turn-key handover.",
  },
  "about.body1": {
    de: "Mit fundiertem Ingenieur-Know-how, individueller Beratung und einem klaren Bekenntnis zu Qualität und Zuverlässigkeit realisieren wir Bauvorhaben, die Bestand haben. Unsere Stärke ist die Verbindung aus technischer Präzision, persönlicher Betreuung und einer tiefen Verwurzelung in München.",
    en: "With deep engineering expertise, individual consulting, and a clear commitment to quality and reliability, we deliver buildings that last. Our strength lies in the combination of technical precision, personal support, and deep roots in Munich.",
  },
  "about.body2": {
    de: "Geführt von Dipl.-Ing. Mehdi Mardi, Geschäftsführer und verantwortlich für den Hochbau, steht das Unternehmen für transparente Kommunikation, faire Verträge und kompromisslose Ausführungsqualität.",
    en: "Led by Dipl.-Ing. Mehdi Mardi, Managing Director responsible for construction, the company stands for transparent communication, fair contracts, and uncompromising execution quality.",
  },
  "about.value1.t": { de: "Technische Expertise", en: "Technical expertise" },
  "about.value1.b": { de: "Ingenieurwesen auf Diplom-Niveau in jedem Projekt.", en: "Engineering at diploma level in every project." },
  "about.value2.t": { de: "Individuelle Beratung", en: "Individual consulting" },
  "about.value2.b": { de: "Lösungen, die zu Ihrem Vorhaben passen — nicht umgekehrt.", en: "Solutions that fit your project — not the other way around." },
  "about.value3.t": { de: "Alles aus einer Hand", en: "End-to-end" },
  "about.value3.b": { de: "Planung, Genehmigung, Ausführung — eine Verantwortung.", en: "Planning, permitting, execution — one accountability." },
  "about.value4.t": { de: "Münchner Wurzeln", en: "Rooted in Munich" },
  "about.value4.b": { de: "Wir kennen die Stadt, ihre Behörden und ihre Architektur.", en: "We know the city, its authorities, and its architecture." },

  // projects
  "projects.eyebrow": { de: "Referenzen", en: "Selected Work" },
  "projects.title": { de: "Bauten, die Bestand haben.", en: "Buildings that endure." },
  "projects.lede": {
    de: "Eine Auswahl realisierter Projekte aus den Bereichen Neubau, Sanierung und Renovierung in München und Umgebung.",
    en: "A selection of completed projects in new construction, refurbishment and renovation across Munich.",
  },
  "projects.all": { de: "Alle", en: "All" },

  // contact
  "contact.eyebrow": { de: "Kontakt", en: "Contact" },
  "contact.title": { de: "Wir freuen uns auf Ihre Anfrage.", en: "We look forward to your inquiry." },
  "contact.lede": {
    de: "Sprechen Sie mit uns über Ihr Vorhaben — telefonisch, per E-Mail oder direkt vor Ort in München.",
    en: "Talk to us about your project — by phone, email, or in person in Munich.",
  },
  "contact.form.name": { de: "Name", en: "Name" },
  "contact.form.email": { de: "E-Mail", en: "Email" },
  "contact.form.phone": { de: "Telefon", en: "Phone" },
  "contact.form.subject": { de: "Betreff", en: "Subject" },
  "contact.form.message": { de: "Nachricht", en: "Message" },
  "contact.form.submit": { de: "Anfrage senden", en: "Send inquiry" },
  "contact.form.thanks": { de: "Vielen Dank — wir melden uns innerhalb von 24 Stunden.", en: "Thank you — we'll get back to you within 24 hours." },
  "contact.office": { de: "Büro", en: "Office" },
  "contact.phone": { de: "Telefon", en: "Phone" },
  "contact.mobile": { de: "Mobil", en: "Mobile" },
  "contact.email": { de: "E-Mail", en: "Email" },
  "contact.location": { de: "Standort", en: "Location" },

  // footer
  "footer.tagline": {
    de: "Hochwertiges Bauen in München — Neubau, Sanierung, Brandschutz und Werkplanung aus einer Hand.",
    en: "High-quality construction in Munich — new builds, refurbishment, fire protection and execution planning from one source.",
  },
  "footer.quicklinks": { de: "Navigation", en: "Quick Links" },
  "footer.contact": { de: "Kontakt", en: "Contact" },
  "footer.rights": { de: "Alle Rechte vorbehalten.", en: "All rights reserved." },

  // imprint
  "imprint.title": { de: "Impressum", en: "Imprint" },
  "imprint.responsible": { de: "Angaben gemäß § 5 TMG", en: "Information according to § 5 TMG" },
  "imprint.contact": { de: "Kontakt", en: "Contact" },
  "imprint.represented": { de: "Vertretungsberechtigter Geschäftsführer", en: "Authorized Managing Director" },
  "imprint.register": { de: "Registereintrag", en: "Register Entry" },
  "imprint.register.body": { de: "Eintragung im Handelsregister · Registergericht: München · [HRB-Nummer einfügen]", en: "Commercial register entry · Register court: Munich · [insert HRB number]" },
  "imprint.vat": { de: "Umsatzsteuer-ID", en: "VAT ID" },
  "imprint.vat.body": { de: "USt-IdNr. gemäß § 27a UStG: [USt-IdNr. einfügen]", en: "VAT ID per § 27a UStG: [insert VAT ID]" },
  "imprint.responsible.content": { de: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV", en: "Responsible for content per § 55 (2) RStV" },
  "imprint.disclaimer": { de: "Haftungsausschluss", en: "Disclaimer" },
  "imprint.disclaimer.body": {
    de: "Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.",
    en: "Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.",
  },
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("mc-lang") as Lang | null) : null;
    if (stored === "de" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("mc-lang", l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  const t = (key: keyof typeof translations) => translations[key]?.[lang] ?? String(key);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}

export type TranslationKey = keyof typeof translations;
