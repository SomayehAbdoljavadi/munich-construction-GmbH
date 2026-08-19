// Bilingual copy + configuration for the /beratung consultation landing page.
// Contact data mirrors the details already used across the site.

export type L = { de: string; en: string };

export const CONTACT = {
  phone: "+49 89 57843675",
  phoneHref: "tel:+498957843675",
  phoneDisplay: "+49 (0) 89 57 84 3675",
  mobile: "+49 176 32354815",
  mobileHref: "tel:+4917632354815",
  whatsapp: "https://wa.me/4917632354815",
  email: "info@munichconstruction.de",
} as const;

export const TIMEZONE = "Europe/Berlin";

export const BERATUNG = {
  seoTitle: {
    de: "Kostenlose Renovierungsberatung München | Munich Construction",
    en: "Free Renovation Consultation Munich | Munich Construction",
  },
  seoDescription: {
    de: "Sie planen eine Renovierung, einen Umbau oder eine Sanierung in München? Besprechen Sie Ihr Projekt unverbindlich mit Munich Construction und klären Sie die nächsten Schritte.",
    en: "Planning a renovation, remodelling or refurbishment in Munich? Discuss your project with Munich Construction without obligation and clarify the next steps.",
  },

  // Hero
  eyebrow: { de: "Erstberatung", en: "Initial consultation" },
  heroTitle: {
    de: "Kostenloses Erstgespräch für Ihr Bau- oder Renovierungsprojekt",
    en: "Free initial consultation for your construction or renovation project",
  },
  heroSubtitle: {
    de: "Sie planen eine Renovierung, einen Umbau oder eine Sanierung? Sprechen Sie Ihr Vorhaben mit uns durch und klären Sie die wichtigsten ersten Fragen direkt mit unserem Team.",
    en: "Planning a renovation, remodelling or refurbishment? Talk your project through with us and clarify the most important first questions directly with our team.",
  },
  heroTrust: {
    de: "10–15 Minuten · unverbindlich · persönlich",
    en: "10–15 minutes · no obligation · personal",
  },
  heroNote: {
    de: "10–15 Min. kostenloses Erstgespräch · Sie wählen den Termin · Wir rufen Sie an",
    en: "10–15 min free initial consultation · You choose the time · We call you",
  },
  ctaBook: { de: "Beratungstermin buchen", en: "Book a consultation" },
  ctaBookLong: { de: "Beratungstermin vereinbaren", en: "Schedule a consultation" },
  ctaCall: { de: "Jetzt anrufen", en: "Call now" },
  ctaCallProject: { de: "Jetzt Projekt besprechen", en: "Discuss your project now" },
  ctaCallback: { de: "Rückruf anfordern", en: "Request a callback" },
  ctaPhotos: { de: "Projektfotos senden", en: "Send project photos" },
  ctaMobileBook: { de: "📅 Termin buchen", en: "📅 Book a slot" },
  ctaMobileCall: { de: "📞 Jetzt anrufen", en: "📞 Call now" },

  // Topics
  topicsTitle: { de: "Wobei können wir Sie beraten?", en: "What can we advise you on?" },
  topicsIntro: {
    de: "Sie haben eine konkrete Idee, wissen aber noch nicht, wie Sie Ihr Projekt am besten umsetzen sollen? Im Erstgespräch können wir gemeinsam die wichtigsten Punkte Ihres Vorhabens besprechen.",
    en: "You have a concrete idea but are not yet sure how best to realise your project? In the initial call we can go through the key points of your plans together.",
  },

  // How it works
  howTitle: { de: "So funktioniert das Erstgespräch", en: "How the initial consultation works" },

  // Pre-qualification
  prequalTitle: { de: "Für eine bessere Einschätzung", en: "For a better assessment" },
  prequalIntro: {
    de: "Diese Angaben helfen uns, Ihr Vorhaben im Gespräch schneller einzuordnen.",
    en: "These details help us understand your project faster during the call.",
  },

  // Booking
  bookingTitle: { de: "Wann dürfen wir Sie anrufen?", en: "When may we call you?" },
  bookingIntro: {
    de: "Wählen Sie einfach einen passenden Termin für Ihr kostenloses Erstgespräch. Wir rufen Sie zum gewünschten Zeitpunkt an und besprechen Ihr Projekt persönlich mit Ihnen.",
    en: "Simply choose a suitable time for your free initial consultation. We will call you at the selected time and discuss your project with you personally.",
  },
  bookingBadge: { de: "10–15 Minuten · kostenlos · unverbindlich", en: "10–15 minutes · free · no obligation" },
  stepProject: { de: "Projekt", en: "Project" },
  stepDate: { de: "Termin", en: "Date & time" },
  stepContact: { de: "Kontaktdaten", en: "Contact" },
  stepConfirm: { de: "Bestätigung", en: "Confirm" },
  q1: { de: "Worum geht es bei Ihrem Projekt?", en: "What is your project about?" },
  q2: { de: "Wo befindet sich Ihr Projekt?", en: "Where is your project located?" },
  qDate: { de: "Wählen Sie einen Tag", en: "Choose a day" },
  qTime: { de: "Wählen Sie eine Uhrzeit", en: "Choose a time" },
  qContact: { de: "Ihre Kontaktdaten", en: "Your contact details" },
  qProjectInfo: { de: "Erzählen Sie uns kurz von Ihrem Projekt", en: "Tell us briefly about your project" },
  reachLabel: { de: "Wie können wir Sie am besten erreichen?", en: "How can we best reach you?" },
  reachPhone: { de: "Telefonanruf", en: "Phone call" },
  reachWhatsapp: { de: "WhatsApp", en: "WhatsApp" },
  callNotice: {
    de: "Wir rufen Sie zum vereinbarten Termin unter der angegebenen Telefonnummer an.",
    en: "We will call you at the agreed time on the phone number you provide.",
  },
  summaryTitle: { de: "Ihr Beratungstermin", en: "Your consultation appointment" },
  summaryDate: { de: "Datum", en: "Date" },
  summaryTime: { de: "Uhrzeit", en: "Time" },
  summaryDuration: { de: "Dauer", en: "Duration" },
  summaryDurationValue: { de: "ca. 10–15 Minuten", en: "approx. 10–15 minutes" },
  summaryContact: { de: "Kontakt", en: "Contact" },
  summaryContactValue: { de: "Telefonischer Rückruf", en: "Callback by phone" },
  summaryProject: { de: "Projekt", en: "Project" },
  edit: { de: "Termin ändern", en: "Change appointment" },
  bookCta: { de: "Kostenlosen Beratungstermin buchen", en: "Book free consultation" },
  booking: { de: "Wird gebucht …", en: "Booking …" },
  bookedTitle: { de: "Ihr Beratungstermin ist bestätigt", en: "Your consultation is confirmed" },
  bookedText: {
    de: "Vielen Dank für Ihre Anfrage. Wir rufen Sie zum von Ihnen gewählten Termin unter der angegebenen Telefonnummer an.",
    en: "Thank you for your request. We will call you at your selected time on the phone number you provided.",
  },
  cancelCta: { de: "Termin stornieren", en: "Cancel appointment" },
  cancelled: { de: "Ihr Termin wurde storniert.", en: "Your appointment has been cancelled." },
  slotTaken: {
    de: "Dieser Termin wurde soeben vergeben. Bitte wählen Sie eine andere Uhrzeit.",
    en: "This slot has just been taken. Please choose another time.",
  },
  noSlots: {
    de: "Für diesen Tag sind keine Termine mehr verfügbar. Bitte wählen Sie einen anderen Tag.",
    en: "No slots are available on this day. Please choose another day.",
  },
  loadingSlots: { de: "Termine werden geladen …", en: "Loading available times …" },

  // Callback form
  callbackTitle: { de: "Lieber zurückgerufen werden?", en: "Prefer to be called back?" },
  callbackIntro: {
    de: "Hinterlassen Sie uns Ihre Kontaktdaten und einige kurze Informationen zu Ihrem Projekt. Unser Team meldet sich bei Ihnen.",
    en: "Leave us your contact details and a few short notes about your project. Our team will get back to you.",
  },
  callbackSuccess: {
    de: "Vielen Dank. Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.",
    en: "Thank you. We have received your request and will get back to you as soon as possible.",
  },

  // Process
  processTitle: { de: "Wenn aus der Beratung ein Projekt wird", en: "When the consultation becomes a project" },
  processIntro: {
    de: "Auf Wunsch begleiten wir Ihr Projekt von der ersten Bestandsaufnahme bis zur fertigen Übergabe – bei genehmigungs- und planungsrelevanten Leistungen in Zusammenarbeit mit Architekten und Fachplanern.",
    en: "On request we support your project from the first site survey to the finished handover — for permit-related and planning services in cooperation with architects and specialist planners.",
  },

  // Final CTA
  finalTitle: {
    de: "Sie haben ein Projekt im Kopf? Lassen Sie uns darüber sprechen.",
    en: "Have a project in mind? Let's talk about it.",
  },
  finalText: {
    de: "Ob Wohnung, Haus oder Gewerbefläche – schildern Sie uns kurz Ihr Vorhaben und erfahren Sie, welche nächsten Schritte sinnvoll sind.",
    en: "Whether apartment, house or commercial space — tell us briefly about your plans and find out which next steps make sense.",
  },

  faqTitle: { de: "Häufige Fragen zur Beratung", en: "Consultation FAQ" },

  // Form labels
  firstName: { de: "Vorname", en: "First name" },
  lastName: { de: "Nachname", en: "Last name" },
  phone: { de: "Telefonnummer", en: "Phone number" },
  email: { de: "E-Mail-Adresse", en: "Email address" },
  projectType: { de: "Projektart", en: "Project type" },
  postalCode: { de: "PLZ", en: "Postcode" },
  city: { de: "Ort", en: "City" },
  location: { de: "Standort / PLZ des Projekts", en: "Project location / postcode" },
  projectStart: { de: "Geplanter Projektstart", en: "Planned project start" },
  budget: { de: "Budget (optional)", en: "Budget (optional)" },
  description: { de: "Kurze Projektbeschreibung", en: "Short project description" },
  files: { de: "Fotos oder Unterlagen (optional)", en: "Photos or documents (optional)" },
  filesHint: {
    de: "Bis zu 5 Dateien, je max. 10 MB (Bilder oder PDF).",
    en: "Up to 5 files, max. 10 MB each (images or PDF).",
  },
  chooseFiles: { de: "Dateien auswählen", en: "Choose files" },
  removeFile: { de: "Entfernen", en: "Remove" },
  optional: { de: "optional", en: "optional" },
  consent: {
    de: "Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage und zur Kontaktaufnahme verwendet werden. Weitere Informationen finden Sie in der",
    en: "I agree that my details may be used to process my enquiry and to contact me. Further information can be found in the",
  },
  consentLink: { de: "Datenschutzerklärung", en: "privacy policy" },
  required: { de: "Bitte ausfüllen.", en: "Please complete this field." },
  invalidEmail: { de: "Bitte geben Sie eine gültige E-Mail-Adresse ein.", en: "Please enter a valid email address." },
  invalidPhone: { de: "Bitte geben Sie eine gültige Telefonnummer ein.", en: "Please enter a valid phone number." },
  consentRequired: { de: "Bitte stimmen Sie der Datenschutzerklärung zu.", en: "Please accept the privacy policy." },
  fileError: {
    de: "Bitte nur Bilder oder PDF-Dateien bis 10 MB hochladen (max. 5 Dateien).",
    en: "Please upload only images or PDF files up to 10 MB (max. 5 files).",
  },
  failure: {
    de: "Ihre Anfrage konnte nicht gesendet werden. Bitte rufen Sie uns an oder versuchen Sie es später erneut.",
    en: "Your request could not be sent. Please call us or try again later.",
  },
  back: { de: "Zurück", en: "Back" },
  next: { de: "Weiter", en: "Continue" },
  linksTitle: { de: "Passende Seiten", en: "Related pages" },
} satisfies Record<string, L | string>;

export const CONSULTATION_TOPICS: Array<{ id: string; icon: string; title: L; text: L }> = [
  {
    id: "renovierung",
    icon: "Hammer",
    title: { de: "Renovierungsberatung", en: "Renovation consultation" },
    text: {
      de: "Für Renovierungen von Wohnungen, Häusern und Gewerbeflächen.",
      en: "For renovations of apartments, houses and commercial spaces.",
    },
  },
  {
    id: "projekt",
    icon: "Compass",
    title: { de: "Projektberatung", en: "Project consultation" },
    text: {
      de: "Erste Einschätzung Ihrer Idee, des Umfangs und der möglichen nächsten Schritte.",
      en: "A first assessment of your idea, its scope and possible next steps.",
    },
  },
  {
    id: "kosten",
    icon: "Euro",
    title: { de: "Kosten & Budget", en: "Costs & budget" },
    text: {
      de: "Erste Orientierung zu möglichen Kostenfaktoren und zur sinnvollen Budgetplanung.",
      en: "Initial orientation on cost drivers and sensible budget planning.",
    },
  },
  {
    id: "grundriss",
    icon: "LayoutGrid",
    title: { de: "Grundriss & Raumplanung", en: "Floor plan & space planning" },
    text: {
      de: "Besprechung möglicher Veränderungen von Räumen, Grundrissen und Nutzungskonzepten.",
      en: "Discussing possible changes to rooms, floor plans and usage concepts.",
    },
  },
  {
    id: "umbau",
    icon: "Building2",
    title: { de: "Umbau & Sanierung", en: "Remodelling & refurbishment" },
    text: {
      de: "Erste Einschätzung geplanter Umbau- oder Sanierungsmaßnahmen.",
      en: "A first assessment of planned remodelling or refurbishment work.",
    },
  },
  {
    id: "material",
    icon: "Layers",
    title: { de: "Material & Ausführung", en: "Materials & execution" },
    text: {
      de: "Orientierung zu Materialien, Oberflächen und möglichen Ausführungsvarianten.",
      en: "Orientation on materials, surfaces and possible execution options.",
    },
  },
  {
    id: "ablauf",
    icon: "CalendarClock",
    title: { de: "Ablauf & Bauzeit", en: "Process & construction time" },
    text: {
      de: "Besprechung der möglichen Projektphasen und eines realistischen zeitlichen Ablaufs.",
      en: "Discussing project phases and a realistic schedule.",
    },
  },
  {
    id: "bestand",
    icon: "KeyRound",
    title: { de: "Bestandsimmobilien", en: "Existing properties" },
    text: {
      de: "Erste Orientierung bei Renovierungs- oder Sanierungsbedarf nach dem Kauf einer Immobilie.",
      en: "Initial orientation on renovation needs after buying a property.",
    },
  },
  {
    id: "angebot",
    icon: "FileText",
    title: { de: "Angebot & Leistungsumfang", en: "Quote & scope of services" },
    text: {
      de: "Unterstützung dabei, Leistungen, Projektumfang und notwendige Arbeitsschritte besser zu verstehen.",
      en: "Support in understanding services, project scope and the necessary work steps.",
    },
  },
  {
    id: "start",
    icon: "Rocket",
    title: { de: "Projektstart", en: "Project start" },
    text: {
      de: "Klärung der nächsten Schritte bis zu Besichtigung, Planung und Angebot.",
      en: "Clarifying the next steps up to site visit, planning and quotation.",
    },
  },
];

export const HOW_STEPS: Array<{ title: L; text: L }> = [
  {
    title: { de: "Projekt kurz beschreiben", en: "Describe your project briefly" },
    text: {
      de: "Sagen Sie uns, was Sie planen und wo sich das Objekt befindet.",
      en: "Tell us what you are planning and where the property is located.",
    },
  },
  {
    title: { de: "Persönlich besprechen", en: "Talk it through personally" },
    text: {
      de: "Wir besprechen die wichtigsten Fragen zu Umfang, Machbarkeit, Zeitrahmen und nächsten Schritten.",
      en: "We discuss the key questions on scope, feasibility, timing and next steps.",
    },
  },
  {
    title: { de: "Nächste Schritte festlegen", en: "Define the next steps" },
    text: {
      de: "Passt das Projekt, vereinbaren wir einen Vor-Ort-Termin, eine genaue Aufnahme und ein Angebot.",
      en: "If the project is a good fit, we arrange an on-site appointment, a detailed assessment and a quotation.",
    },
  },
];

export const PREQUAL_QUESTIONS: L[] = [
  { de: "Was möchten Sie renovieren oder umbauen?", en: "What would you like to renovate or remodel?" },
  { de: "Wo befindet sich das Objekt?", en: "Where is the property located?" },
  { de: "Wann möchten Sie mit dem Projekt beginnen?", en: "When would you like to start the project?" },
  { de: "Gibt es bereits Pläne, Fotos oder Unterlagen?", en: "Do you already have plans, photos or documents?" },
];

export const PROJECT_TYPES: Array<{ id: string; label: L }> = [
  { id: "wohnung-renovieren", label: { de: "Wohnung renovieren", en: "Renovate an apartment" } },
  { id: "haus-renovieren", label: { de: "Haus renovieren", en: "Renovate a house" } },
  { id: "sanierung", label: { de: "Sanierung", en: "Refurbishment" } },
  { id: "umbau", label: { de: "Umbau", en: "Remodelling" } },
  { id: "badezimmer", label: { de: "Badezimmer", en: "Bathroom" } },
  { id: "kueche", label: { de: "Küche", en: "Kitchen" } },
  { id: "gewerbeflaeche", label: { de: "Gewerbefläche", en: "Commercial space" } },
  { id: "innenausbau", label: { de: "Innenausbau", en: "Interior construction" } },
  { id: "grundriss", label: { de: "Grundriss / Raumplanung", en: "Floor plan / space planning" } },
  { id: "kosten-budget", label: { de: "Kosten & Budget", en: "Costs & budget" } },
  { id: "sonstiges", label: { de: "Sonstiges", en: "Other" } },
];

export const PROJECT_PHASES: Array<{ title: L; subtitle: L; text: L }> = [
  {
    title: { de: "Beratung", en: "Consultation" },
    subtitle: { de: "Erstberatung & Projektbesprechung", en: "Initial advice & project discussion" },
    text: {
      de: "Wünsche, Nutzung, Budget und Möglichkeiten gemeinsam klären.",
      en: "Clarifying wishes, usage, budget and options together.",
    },
  },
  {
    title: { de: "Bestandsaufnahme", en: "Site survey" },
    subtitle: { de: "Aufmaß & technische Prüfung", en: "Measurement & technical review" },
    text: {
      de: "Bestand aufnehmen, vorhandene Situation bewerten und mögliche Probleme früh erkennen.",
      en: "Recording the existing state, assessing the situation and spotting issues early.",
    },
  },
  {
    title: { de: "Planung", en: "Planning" },
    subtitle: { de: "Grundriss, Schnitte & Ansichten", en: "Floor plans, sections & elevations" },
    text: {
      de: "Das Bauvorhaben technisch und räumlich entwickeln – in Zusammenarbeit mit Architekten und Fachplanern.",
      en: "Developing the project technically and spatially — in cooperation with architects and specialist planners.",
    },
  },
  {
    title: { de: "3D-Visualisierung", en: "3D visualisation" },
    subtitle: { de: "3D-Darstellung des Projekts", en: "3D representation of the project" },
    text: {
      de: "Der Bauherr kann bereits vor der Ausführung besser verstehen, wie das fertige Projekt aussehen wird.",
      en: "Clients can understand how the finished project will look before work begins.",
    },
  },
  {
    title: { de: "Ausführungsplanung", en: "Execution planning" },
    subtitle: { de: "Details & Werkplanung", en: "Details & detailed design" },
    text: {
      de: "Anschlüsse, Wandaufbauten, Decken, Boden, Türen, Fenster und weitere Details festlegen.",
      en: "Defining connections, wall build-ups, ceilings, floors, doors, windows and further details.",
    },
  },
  {
    title: { de: "Kostenplanung", en: "Cost planning" },
    subtitle: { de: "Kostenschätzung & Budgetkontrolle", en: "Cost estimate & budget control" },
    text: { de: "Überblick über die voraussichtlichen Baukosten.", en: "An overview of the expected construction costs." },
  },
  {
    title: { de: "Ausschreibung & Vergabe", en: "Tendering & awarding" },
    subtitle: { de: "Angebote einholen und vergleichen", en: "Obtaining and comparing quotes" },
    text: {
      de: "Geeignete Firmen und wirtschaftliche Angebote auswählen.",
      en: "Selecting suitable companies and economical offers.",
    },
  },
  {
    title: { de: "Bauausführung", en: "Construction" },
    subtitle: { de: "Umsetzung der geplanten Arbeiten", en: "Delivering the planned works" },
    text: {
      de: "Fachgerechte Ausführung durch Munich Construction und Fachunternehmen.",
      en: "Professional execution by Munich Construction and specialist contractors.",
    },
  },
  {
    title: { de: "Bauleitung & Koordination", en: "Site management & coordination" },
    subtitle: { de: "Steuerung der Baustelle", en: "Managing the site" },
    text: {
      de: "Termine, Gewerke, Qualität und Schnittstellen koordinieren.",
      en: "Coordinating schedules, trades, quality and interfaces.",
    },
  },
  {
    title: { de: "Qualitätskontrolle", en: "Quality control" },
    subtitle: { de: "Kontrolle während der Ausführung", en: "Checks during execution" },
    text: { de: "Fehler und Mängel möglichst früh erkennen.", en: "Detecting errors and defects as early as possible." },
  },
  {
    title: { de: "Kosten- & Nachtragskontrolle", en: "Cost & variation control" },
    subtitle: { de: "Rechnungen und Nachträge prüfen", en: "Reviewing invoices and variations" },
    text: { de: "Kostenentwicklung transparent halten.", en: "Keeping cost development transparent." },
  },
  {
    title: { de: "Abnahme & Übergabe", en: "Acceptance & handover" },
    subtitle: { de: "Fertigstellung begleiten", en: "Supporting completion" },
    text: {
      de: "Mängelkontrolle, Dokumentation und Übergabe an den Bauherrn.",
      en: "Defect inspection, documentation and handover to the client.",
    },
  },
];

export const BERATUNG_FAQ: Array<{ q: L; a: L }> = [
  {
    q: { de: "Ist das Erstgespräch kostenlos?", en: "Is the initial consultation free?" },
    a: {
      de: "Ja. Das erste Projektgespräch von 10–15 Minuten ist kostenlos und unverbindlich.",
      en: "Yes. The first 10–15 minute project discussion is free and non-binding.",
    },
  },
  {
    q: { de: "Welche Projekte können wir besprechen?", en: "Which projects can we discuss?" },
    a: {
      de: "Renovierung, Sanierung, Umbau, Innenausbau sowie die weiteren Leistungen von Munich Construction – etwa Trockenbau, Brandschutz, Fenster und Türen oder Injektion und Risssperrung.",
      en: "Renovation, refurbishment, remodelling, interior construction and the other Munich Construction services — such as drywall, fire protection, windows and doors or injection and crack sealing.",
    },
  },
  {
    q: { de: "Muss ich bereits genaue Pläne haben?", en: "Do I need detailed plans already?" },
    a: {
      de: "Nein. Eine erste Idee, Fotos oder eine kurze Beschreibung Ihres Vorhabens genügen für das Erstgespräch.",
      en: "No. A first idea, photos or a short description of your project is enough for the initial conversation.",
    },
  },
  {
    q: { de: "Kann ich Fotos meines Projekts senden?", en: "Can I send photos of my project?" },
    a: {
      de: "Ja. Fotos, Pläne und vorhandene Unterlagen helfen uns, das Projekt besser zu verstehen – per Formular, WhatsApp oder E-Mail.",
      en: "Yes. Photos, plans and existing documents help us understand the project better — via the form, WhatsApp or email.",
    },
  },
  {
    q: { de: "Was passiert nach dem Erstgespräch?", en: "What happens after the initial consultation?" },
    a: {
      de: "Wenn beide Seiten feststellen, dass Munich Construction für das Projekt geeignet sein kann, folgen als nächste Schritte ein Vor-Ort-Termin, eine genaue Aufnahme und ein Angebot.",
      en: "If both sides find that Munich Construction may be a good fit, the next steps are an on-site appointment, a detailed assessment and a quotation.",
    },
  },
  {
    q: {
      de: "In welchem Gebiet bietet Munich Construction die Leistungen an?",
      en: "In which area does Munich Construction work?",
    },
    a: {
      de: "Wir arbeiten in München und Bayern – von unseren Standorten in der Theresienstraße 93 und der Heiterwanger Straße 30 in München.",
      en: "We work in Munich and Bavaria — from our locations at Theresienstraße 93 and Heiterwanger Straße 30 in Munich.",
    },
  },
];

// Copy for the /termin self-service page (reschedule / cancel a booking).
export const MANAGE = {
  eyebrow: { de: "Terminverwaltung", en: "Manage appointment" },
  title: { de: "Ihren Beratungstermin verwalten", en: "Manage your consultation" },
  intro: {
    de: "Hier können Sie Ihren gebuchten Termin verschieben oder stornieren. Den Link dazu finden Sie in Ihrer Bestätigungs-E-Mail.",
    en: "Here you can reschedule or cancel your booked appointment. You will find the link in your confirmation email.",
  },
  loading: { de: "Termin wird geladen …", en: "Loading appointment …" },
  notFound: {
    de: "Dieser Termin konnte nicht gefunden werden. Bitte öffnen Sie den Link aus Ihrer Bestätigungs-E-Mail erneut.",
    en: "This appointment could not be found. Please reopen the link from your confirmation email.",
  },
  current: { de: "Ihr aktueller Termin", en: "Your current appointment" },
  statusConfirmed: { de: "Bestätigt", en: "Confirmed" },
  statusCancelled: { de: "Storniert", en: "Cancelled" },
  rescheduleTitle: { de: "Termin verschieben", en: "Reschedule appointment" },
  rescheduleCta: { de: "Neuen Termin bestätigen", en: "Confirm new time" },
  rescheduling: { de: "Wird verschoben …", en: "Rescheduling …" },
  rescheduled: { de: "Ihr Termin wurde erfolgreich verschoben.", en: "Your appointment has been rescheduled." },
  cancelTitle: { de: "Termin stornieren", en: "Cancel appointment" },
  cancelIntro: {
    de: "Sie können den Termin jederzeit kostenlos stornieren. Wir freuen uns, wenn Sie später einen neuen Termin buchen.",
    en: "You can cancel free of charge at any time. We would be glad to welcome you at a new appointment later.",
  },
  cancelConfirm: { de: "Wirklich stornieren?", en: "Really cancel?" },
  cancelling: { de: "Wird storniert …", en: "Cancelling …" },
  cancelledTitle: { de: "Termin storniert", en: "Appointment cancelled" },
  cancelledText: {
    de: "Ihr Beratungstermin wurde storniert. Sie können jederzeit einen neuen Termin buchen.",
    en: "Your consultation has been cancelled. You can book a new appointment at any time.",
  },
  bookNew: { de: "Neuen Termin buchen", en: "Book a new appointment" },
  tooLate: {
    de: "Dieser Termin liegt in der Vergangenheit und kann nicht mehr geändert werden. Bitte rufen Sie uns an.",
    en: "This appointment is in the past and can no longer be changed. Please give us a call.",
  },
  keepAppointment: { de: "Termin behalten", en: "Keep appointment" },
  failure: {
    de: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
    en: "Something went wrong. Please try again or give us a call.",
  },
  manageLink: { de: "Termin verschieben oder stornieren", en: "Reschedule or cancel your appointment" },
} as const;
