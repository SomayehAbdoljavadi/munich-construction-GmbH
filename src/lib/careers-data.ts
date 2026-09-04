import type { Lang } from "@/lib/i18n";

export interface Bi {
  de: string;
  en: string;
}

export interface CareerPosition {
  /** Stable id used as the form value and in the backend mapping. */
  id: string;
  title: Bi;
  /** Category label used in the notification email subject. */
  category: Bi;
}

export interface CareerCategory {
  id: string;
  title: Bi;
  positions: CareerPosition[];
  /** Optional note rendered inside the category card. */
  note?: Bi;
}

const SITE: Bi = { de: "Baustelle & Handwerk", en: "Construction & Skilled Trades" };
const ENGINEERING: Bi = { de: "Engineering & Planung", en: "Engineering & Planning" };
const PM: Bi = { de: "Projektmanagement", en: "Project Management" };
const OFFICE: Bi = { de: "Office & Business", en: "Office & Business" };
const OPEN: Bi = { de: "Initiativbewerbung", en: "Open Application" };

export const CAREER_CATEGORIES: CareerCategory[] = [
  {
    id: "baustelle-handwerk",
    title: SITE,
    positions: [
      { id: "brandschutzmonteur", category: SITE, title: { de: "Brandschutzmonteur", en: "Fire Protection Installer" } },
      { id: "trockenbauer", category: SITE, title: { de: "Trockenbauer", en: "Drywall Installer" } },
      {
        id: "injektion-bauwerksabdichtung",
        category: SITE,
        title: {
          de: "Fachkraft für Injektion und Bauwerksabdichtung",
          en: "Injection and Structural Waterproofing Specialist",
        },
      },
      { id: "fenster-tueren-monteur", category: SITE, title: { de: "Fenster- und Türenmonteur", en: "Window and Door Installer" } },
      { id: "bauhelfer", category: SITE, title: { de: "Bauhelfer", en: "Construction Assistant" } },
    ],
  },
  {
    id: "engineering-planung",
    title: ENGINEERING,
    positions: [
      {
        id: "bauzeichner-werkplaner",
        category: ENGINEERING,
        title: { de: "Bauzeichner / Werkplaner", en: "Construction Draftsperson / Detailed Design Planner" },
      },
    ],
  },
  {
    id: "projektmanagement",
    title: PM,
    positions: [
      {
        id: "bauleiter-projektleiter",
        category: PM,
        title: { de: "Bauleiter / Projektleiter", en: "Construction Manager / Project Manager" },
      },
    ],
  },
  {
    id: "office-business",
    title: OFFICE,
    note: {
      de: "Keine passende Stelle gefunden? Wir freuen uns über Ihre Initiativbewerbung.",
      en: "Can’t find a suitable position? We welcome your unsolicited application.",
    },
    positions: [
      {
        id: "initiativbewerbung-office-business",
        category: OFFICE,
        title: { de: "Initiativbewerbung – Office & Business", en: "Open Application – Office & Business" },
      },
    ],
  },
];

export const GENERAL_POSITION: CareerPosition = {
  id: "initiativbewerbung",
  category: OPEN,
  title: { de: "Initiativbewerbung", en: "Open Application" },
};

export const ALL_POSITIONS: CareerPosition[] = [
  ...CAREER_CATEGORIES.flatMap((c) => c.positions),
  GENERAL_POSITION,
];

export function findPosition(id: string): CareerPosition | undefined {
  return ALL_POSITIONS.find((p) => p.id === id);
}

export function label(bi: Bi, lang: Lang) {
  return bi[lang];
}

/** Page copy (bilingual) — kept next to the data so the page stays fully translated. */
export const CAREERS_COPY = {
  eyebrow: { de: "Karriere bei Munich Construction", en: "Careers at Munich Construction" },
  heading: { de: "Gemeinsam bauen wir Qualität.", en: "Together, we build quality." },
  lede: {
    de: "Werden Sie Teil unseres Teams und gestalten Sie mit uns hochwertige Bauprojekte in München und darüber hinaus.",
    en: "Join our team and help us deliver high-quality construction projects in Munich and beyond.",
  },
  heroCta: { de: "Offene Stellen entdecken", en: "View open positions" },
  positionsEyebrow: { de: "Offene Stellen", en: "Open positions" },
  positionsTitle: { de: "Bereiche & Positionen", en: "Areas & positions" },
  apply: { de: "Jetzt bewerben", en: "Apply now" },
  generalTitle: { de: "Initiativbewerbung", en: "Open Application" },
  generalText: {
    de: "Sie überzeugen uns mit Ihrem Profil, auch ohne passende Ausschreibung? Senden Sie uns Ihre Unterlagen.",
    en: "Convinced you are a fit even without a matching listing? Send us your documents.",
  },
  formEyebrow: { de: "Bewerbung", en: "Application" },
  formTitle: { de: "Bewerbungsformular", en: "Application form" },
  firstName: { de: "Vorname", en: "First name" },
  lastName: { de: "Nachname", en: "Last name" },
  email: { de: "E-Mail-Adresse", en: "Email address" },
  phone: { de: "Telefonnummer", en: "Phone number" },
  position: { de: "Gewünschte Position", en: "Position applied for" },
  positionPlaceholder: { de: "Bitte wählen", en: "Please select" },
  cv: { de: "Lebenslauf hochladen", en: "Upload CV" },
  cover: { de: "Anschreiben hochladen – optional", en: "Upload cover letter – optional" },
  fileHint: { de: "Nur PDF · max. 10 MB", en: "PDF only · max. 10 MB" },
  chooseFile: { de: "Datei auswählen", en: "Choose file" },
  removeFile: { de: "Datei entfernen", en: "Remove file" },
  consent: {
    de: "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zum Zweck des Bewerbungsverfahrens zu.",
    en: "I have read the Privacy Policy and consent to the processing of my data for the recruitment process.",
  },
  consentLink: { de: "Datenschutzerklärung", en: "Privacy Policy" },
  submit: { de: "Bewerbung absenden", en: "Submit application" },
  submitting: { de: "Bewerbung wird gesendet …", en: "Submitting application…" },
  success: {
    de: "Vielen Dank für Ihre Bewerbung. Wir haben Ihre Unterlagen erhalten und melden uns nach der Prüfung bei Ihnen.",
    en: "Thank you for your application. We have received your documents and will contact you after reviewing them.",
  },
  failure: {
    de: "Ihre Bewerbung konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
    en: "Unfortunately, your application could not be submitted. Please try again or contact us directly.",
  },
  failureFileType: {
    de: "Die hochgeladene Datei konnte nicht als PDF gelesen werden. Bitte laden Sie ein gültiges PDF hoch.",
    en: "The uploaded file could not be read as a PDF. Please upload a valid PDF file.",
  },
  failureFileSize: {
    de: "Die Datei ist zu groß. Bitte laden Sie ein PDF mit maximal 10 MB hoch.",
    en: "The file is too large. Please upload a PDF of no more than 10 MB.",
  },
  failureRateLimit: {
    de: "Es wurden zu viele Bewerbungen in kurzer Zeit gesendet. Bitte versuchen Sie es in einer Stunde erneut.",
    en: "Too many applications were sent in a short time. Please try again in an hour.",
  },
  failureTemporary: {
    de: "Der Versand ist vorübergehend nicht möglich. Bitte versuchen Sie es in Kürze erneut oder schreiben Sie an info@munichconstruction.de.",
    en: "Application submission is temporarily unavailable. Please try again shortly or email us at info@munichconstruction.de.",
  },

  required: { de: "Dieses Feld ist erforderlich.", en: "This field is required." },
  invalidEmail: { de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.", en: "Please enter a valid email address." },
  invalidPhone: { de: "Bitte geben Sie eine gültige Telefonnummer ein.", en: "Please enter a valid telephone number." },
  cvRequired: { de: "Bitte laden Sie Ihren Lebenslauf als PDF-Datei hoch.", en: "Please upload your CV as a PDF file." },
  fileType: { de: "Bitte laden Sie Ihren Lebenslauf als PDF-Datei hoch.", en: "Please upload your CV as a PDF file." },
  fileSize: { de: "Die Datei darf maximal 10 MB groß sein.", en: "The file must not exceed 10 MB." },
  consentRequired: {
    de: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    en: "Please accept the Privacy Policy to continue.",
  },
} satisfies Record<string, Bi>;
