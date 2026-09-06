import { Flame, Hammer, Droplet, DoorOpen } from "lucide-react";
import brandschutzImg from "@/assets/service-brandschutz.jpg";
import trockenbauImg from "@/assets/service-trockenbau.jpg";
import injektionImg from "@/assets/service-injektion.jpg";
import fensterImg from "@/assets/service-fenster.jpg";
import proj1 from "@/assets/mc-proj-1.jpg";
import proj2 from "@/assets/mc-proj-2.jpg";
import proj3 from "@/assets/mc-proj-3.jpg";
import proj4 from "@/assets/mc-proj-4.jpg";
import proj5 from "@/assets/mc-proj-5.jpg";
import proj6 from "@/assets/mc-proj-6.jpg";
import type { Lang } from "@/lib/i18n";

type L = { de: string; en: string };

export interface GallerySlideI18n {
  title: L;
  location: L;
  description: L;
  image: string;
}

export interface ServiceDetailI18n {
  slug: string;
  icon: typeof Flame;
  title: L;
  /** Locally intent-optimised page heading (H1). */
  h1: L;
  subtitle: L;
  intro: L;
  paragraph: L;
  gallery: GallerySlideI18n[];
  includes: L[];
  benefits: L[];
  whyUs: L[];
  /** Optional SEO overrides */
  metaTitle?: L;
  metaDescription?: L;
  /** Typical applications / Einsatzbereiche */
  applications?: L[];
  /** Process steps / Ablauf */
  process?: Array<{ title: L; text: L }>;
}

export interface GallerySlide {
  title: string;
  location: string;
  description: string;
  image: string;
  // Optional dynamic project metadata (used by ServiceGallery overlay)
  projectName?: string;
  projectLocation?: string;
  index?: number;
  total?: number;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  h1: string;
  subtitle: string;
  icon: typeof Flame;
  intro: string;
  paragraph: string;
  gallery: GallerySlide[];
  includes: string[];
  benefits: string[];
  whyUs: string[];
  applications: string[];
  process: Array<{ title: string; text: string }>;
}


const WHY_US: L[] = [
  {
    de: "Professionelle Projektabwicklung von der Planung bis zur Übergabe",
    en: "Professional project delivery from planning to handover",
  },
  {
    de: "Verlässliche Kommunikation und transparente Abstimmung",
    en: "Reliable communication and transparent coordination",
  },
  {
    de: "Saubere, präzise Ausführung nach deutschen Qualitätsstandards",
    en: "Clean, precise execution to German quality standards",
  },
  {
    de: "Langjährige Erfahrung in anspruchsvollen Bauprojekten",
    en: "Years of experience in demanding construction projects",
  },
  {
    de: "Qualitätsorientierter Service mit erfahrenem Fachpersonal",
    en: "Quality-driven service with experienced specialists",
  },
];

const MUNICH_GERMANY: L = { de: "München, Deutschland", en: "Munich, Germany" };

export const HOME_SERVICES_I18N: ServiceDetailI18n[] = [
  {
    slug: "brandschutz",
    icon: Flame,
    title: { de: "Brandschutz", en: "Fire Protection" },
    h1: { de: "Brandschutz in München", en: "Fire Protection in Munich" },
    subtitle: {
      de: "Normgerechter passiver Brandschutz für Neubau und Bestand",
      en: "Compliant passive fire protection for new builds and existing buildings",
    },
    intro: {
      de: "Normgerechte Brandschutzlösungen für Neubau und Bestand – geplant, umgesetzt und dokumentiert nach geltenden Bauvorschriften.",
      en: "Compliant fire protection solutions for new builds and existing buildings – planned, executed and documented in line with applicable building codes.",
    },
    paragraph: {
      de: "Bei Munich Construction GmbH unterstützen wir unsere Kunden bei professionellen Brandschutzmaßnahmen im Bau- und Sanierungsbereich. Unser Fokus liegt auf einer sauberen, normgerechten und zuverlässigen Ausführung von Brandschutzarbeiten, angepasst an die Anforderungen des jeweiligen Gebäudes. Von der ersten Einschätzung der baulichen Situation bis zur fachgerechten Umsetzung auf der Baustelle achten wir auf Qualität, Präzision und eine klare Koordination aller Arbeitsschritte. Ziel ist es, Gebäude sicherer zu machen und gleichzeitig eine langlebige, hochwertige Lösung zu schaffen.",
      en: "At Munich Construction GmbH we support our clients with professional fire protection measures in construction and refurbishment. Our focus is on clean, compliant and reliable execution of fire protection works, tailored to the requirements of each building. From the first assessment of the structural situation to the professional implementation on site, we ensure quality, precision and clear coordination of every step. Our goal is to make buildings safer while delivering a durable, high-quality solution.",
    },
    gallery: [
      {
        title: { de: "Brandschutz-Ertüchtigung", en: "Fire Protection Upgrade" },
        location: MUNICH_GERMANY,
        description: {
          de: "Installation und Optimierung des passiven Brandschutzes für ein gewerblich genutztes Bürogebäude.",
          en: "Installation and optimisation of passive fire protection for a commercial office building.",
        },
        image: brandschutzImg,
      },
      {
        title: { de: "Brandabschottung Bürogebäude", en: "Firestopping – Office Building" },
        location: { de: "München · Schwabing", en: "Munich · Schwabing" },
        description: {
          de: "Brandschutztechnische Abschottung sämtlicher Wand- und Deckendurchführungen nach geprüften Systemen.",
          en: "Certified firestopping of all wall and slab penetrations using approved system solutions.",
        },
        image: proj3,
      },
      {
        title: { de: "Brandschutzsanierung Altbau", en: "Fire Protection Refurbishment – Heritage Building" },
        location: { de: "München · Maxvorstadt", en: "Munich · Maxvorstadt" },
        description: {
          de: "Ertüchtigung der Bestandskonstruktion mit zertifizierten Brandschutzbeschichtungen und Bekleidungen.",
          en: "Upgrading the existing structure with certified intumescent coatings and fire-rated linings.",
        },
        image: proj2,
      },
    ],
    includes: [
      { de: "Brandschutzkonzepte nach Bayerischer Bauordnung", en: "Fire protection concepts per Bavarian Building Code" },
      { de: "Brandabschottungen für Wand- und Deckendurchführungen", en: "Firestopping for wall and slab penetrations" },
      { de: "Brandschutzbeschichtungen und -bekleidungen", en: "Intumescent coatings and fire-rated linings" },
      { de: "Feuerwiderstandsfähige Wand- und Deckensysteme", en: "Fire-resistant wall and ceiling systems" },
      { de: "Dokumentation und Übergabe an Behörden & Sachverständige", en: "Documentation and handover to authorities & experts" },
    ],
    benefits: [
      { de: "Sicherheit für Nutzer, Mieter und Eigentümer", en: "Safety for occupants, tenants and owners" },
      { de: "Versicherungs- und behördenkonforme Umsetzung", en: "Implementation compliant with insurers and authorities" },
      { de: "Erfahrenes Fachpersonal mit zertifizierten Systemen", en: "Experienced specialists using certified systems" },
      { de: "Klare Schnittstellenkoordination mit allen Gewerken", en: "Clear interface coordination with all trades" },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "trockenbau",
    icon: Hammer,
    title: { de: "Trockenbau", en: "Drywall Construction" },
    h1: { de: "Trockenbau in München", en: "Drywall Construction in Munich" },
    subtitle: {
      de: "Präziser Innenausbau für Büro, Gewerbe und Wohnbau",
      en: "Precise interior fit-out for office, commercial and residential projects",
    },
    intro: {
      de: "Präziser Trockenbau für Büro, Gewerbe und Wohnbau – von der Raum­aufteilung bis zur schallschutzoptimierten Spezialwand.",
      en: "Precise drywall construction for office, commercial and residential projects – from room layout to acoustically optimised partition systems.",
    },
    paragraph: {
      de: "Munich Construction GmbH bietet professionelle Trockenbauarbeiten für Neubau-, Umbau- und Sanierungsprojekte an. Wir übernehmen die Umsetzung von Innenwänden, Decken, Verkleidungen und weiteren Ausbauarbeiten mit hoher Genauigkeit und sauberer Ausführung. Dabei achten wir auf eine effiziente Planung, hochwertige Materialien und ein präzises Finish, damit jeder Raum funktional, modern und optisch ansprechend gestaltet wird. Unser Anspruch ist es, flexible Innenausbaulösungen zu schaffen, die perfekt zu den Anforderungen des Projekts passen.",
      en: "Munich Construction GmbH delivers professional drywall works for new build, refit and refurbishment projects. We execute interior walls, ceilings, linings and further fit-out works with high accuracy and clean workmanship. We focus on efficient planning, high-quality materials and a precise finish so every space is functional, modern and visually refined. Our ambition is to create flexible interior solutions that perfectly match each project's requirements.",
    },
    gallery: [
      {
        title: { de: "Trockenbau Innenausbau", en: "Interior Drywall Construction" },
        location: MUNICH_GERMANY,
        description: {
          de: "Professionelle Trennwände, Deckensysteme und Innenausbau für ein modernes Bauprojekt.",
          en: "Professional partitions, ceiling systems and interior fit-out for a modern construction project.",
        },
        image: trockenbauImg,
      },
      {
        title: { de: "Loft-Umbau Werksviertel", en: "Loft Conversion – Werksviertel" },
        location: { de: "München · Werksviertel", en: "Munich · Werksviertel" },
        description: {
          de: "Großflächiger Innenausbau mit akustisch optimierten Wand- und Deckenkonstruktionen.",
          en: "Large-scale interior fit-out with acoustically optimised wall and ceiling assemblies.",
        },
        image: proj5,
      },
      {
        title: { de: "Bürogebäude Schwabing", en: "Office Building – Schwabing" },
        location: { de: "München · Schwabing", en: "Munich · Schwabing" },
        description: {
          de: "Trockenbauwände in Metallständerbauweise mit integriertem Schall- und Brandschutz.",
          en: "Metal-stud drywall partitions with integrated acoustic and fire protection.",
        },
        image: proj3,
      },
    ],
    includes: [
      { de: "Nichttragende Wände in Metallständerbauweise", en: "Non-load-bearing metal-stud partitions" },
      { de: "Abgehängte Decken und Designdecken", en: "Suspended and designer ceilings" },
      { de: "Schall-, Wärme- und Brandschutzkonstruktionen", en: "Acoustic, thermal and fire-rated assemblies" },
      { de: "Vorsatzschalen und Installationswände", en: "Furring walls and service-cavity partitions" },
      { de: "Spachtel- und Oberflächenarbeiten in Q1–Q4", en: "Jointing and surface finishes Q1–Q4" },
    ],
    benefits: [
      { de: "Schnelle, saubere Bauabläufe ohne lange Trocknungszeiten", en: "Fast, clean build processes without long drying times" },
      { de: "Flexible Grundrisse und nachträgliche Anpassbarkeit", en: "Flexible layouts that can be adapted later on" },
      { de: "Hohe Maßgenauigkeit für hochwertige Ausbaugewerke", en: "High dimensional accuracy for premium finishing trades" },
      { de: "Optimale akustische und thermische Eigenschaften", en: "Optimal acoustic and thermal performance" },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "injektion-und-risssperrung",
    icon: Droplet,
    title: { de: "Injektion und Risssperrung", en: "Injection and Crack Sealing" },
    h1: { de: "Injektion und Risssperrung in München", en: "Injection and Crack Sealing in Munich" },
    subtitle: {
      de: "Bauwerksabdichtung und Rissverpressung mit professionellen Injektionsverfahren",
      en: "Structural waterproofing and crack injection using professional injection methods",
    },
    intro: {
      de: "Bauwerksabdichtung und Rissverpressung mit professionellen Injektionsverfahren – nachhaltige Lösungen gegen Feuchte, Wasser­eintritt und strukturelle Schäden.",
      en: "Structural waterproofing and crack injection using professional methods – durable solutions against moisture, water ingress and structural damage.",
    },
    paragraph: {
      de: "Im Bereich Injektion und Risssperrung bietet Munich Construction GmbH zuverlässige Lösungen zur Abdichtung, Stabilisierung und Instandsetzung von Bauwerken. Wir analysieren Risse, Undichtigkeiten und betroffene Bauteile sorgfältig und wählen eine passende Methode, um Feuchtigkeitseintritt zu verhindern und die Bausubstanz langfristig zu schützen. Durch präzise Ausführung und fachgerechte Verarbeitung sorgen wir dafür, dass Schäden nachhaltig behandelt werden und die Stabilität sowie der Werterhalt des Gebäudes unterstützt werden.",
      en: "In the field of injection and crack sealing, Munich Construction GmbH provides reliable solutions for waterproofing, stabilising and repairing structures. We carefully analyse cracks, leaks and affected building components and choose a suitable method to prevent moisture ingress and protect the structure long-term. Through precise execution and professional workmanship we ensure damage is repaired sustainably, supporting the stability and value of the building.",
    },
    gallery: [
      {
        title: { de: "Rissinjektion und Abdichtung", en: "Crack Injection and Sealing" },
        location: { de: "Bayern, Deutschland", en: "Bavaria, Germany" },
        description: {
          de: "Strukturelle Rissverpressung und Abdichtung zum Schutz des Bauwerks vor Feuchte und Folgeschäden.",
          en: "Structural crack injection and waterproofing to protect the building from moisture and secondary damage.",
        },
        image: injektionImg,
      },
      {
        title: { de: "Stadthaus Lehel", en: "Townhouse – Lehel" },
        location: { de: "München · Lehel", en: "Munich · Lehel" },
        description: {
          de: "Horizontalsperre und Flächeninjektion zur dauerhaften Trockenlegung des Kellergeschosses.",
          en: "Horizontal barrier and area injection for permanent drying of the basement level.",
        },
        image: proj4,
      },
      {
        title: { de: "Altbau Maxvorstadt", en: "Heritage Building – Maxvorstadt" },
        location: { de: "München · Maxvorstadt", en: "Munich · Maxvorstadt" },
        description: {
          de: "Epoxidharz-Verpressung zur kraftschlüssigen Schließung statisch relevanter Risse.",
          en: "Epoxy resin injection for the force-locked closure of structurally relevant cracks.",
        },
        image: proj2,
      },
    ],
    includes: [
      { de: "Horizontalsperren gegen aufsteigende Feuchtigkeit", en: "Horizontal barriers against rising damp" },
      { de: "PUR- und Acrylatgel-Injektionen bei drückendem Wasser", en: "PU and acrylate gel injections against pressurised water" },
      { de: "Epoxidharz-Verpressung zur kraftschlüssigen Rissschließung", en: "Epoxy resin injection for force-locked crack closure" },
      { de: "Flächeninjektion und Schleierinjektion im Erdreich", en: "Area injection and curtain injection into the surrounding soil" },
      { de: "Voruntersuchung, Materialwahl und Dokumentation", en: "Preliminary survey, material selection and documentation" },
    ],
    benefits: [
      { de: "Nachhaltige Trockenlegung ohne aufwendige Freilegung", en: "Sustainable drying without major excavation" },
      { de: "Wiederherstellung der statischen Tragfähigkeit", en: "Restoration of structural load-bearing capacity" },
      { de: "Einsatz geprüfter und zertifizierter Materialien", en: "Use of tested and certified materials" },
      { de: "Minimaler Eingriff in bestehende Bausubstanz", en: "Minimal intervention in existing building fabric" },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "fenster-und-tueren",
    icon: DoorOpen,
    title: { de: "Fenster und Türen", en: "Windows and Doors" },
    h1: { de: "Fenster und Türen in München", en: "Windows and Doors in Munich" },
    subtitle: {
      de: "Energieeffiziente und einbruchhemmende Montage für Neubau und Sanierung",
      en: "Energy-efficient and burglar-resistant installation for new builds and refurbishments",
    },
    intro: {
      de: "Hochwertige Fenster- und Türenmontage für Neubau und Sanierung – energieeffizient, einbruchhemmend und ästhetisch auf Ihr Gebäude abgestimmt.",
      en: "High-quality window and door installation for new builds and refurbishments – energy-efficient, burglar-resistant and aesthetically matched to your building.",
    },
    paragraph: {
      de: "Munich Construction GmbH übernimmt die fachgerechte Montage, den Austausch und die Anpassung von Fenstern und Türen für private, gewerbliche und bauliche Projekte. Wir achten auf präzises Aufmaß, saubere Installation, gute Abdichtung und ein hochwertiges Erscheinungsbild. Ob im Neubau, bei der Renovierung oder im Rahmen einer Modernisierung – unser Ziel ist es, funktionale, langlebige und optisch passende Lösungen umzusetzen, die Komfort, Sicherheit und Energieeffizienz des Gebäudes verbessern.",
      en: "Munich Construction GmbH carries out the professional installation, replacement and adaptation of windows and doors for private, commercial and construction projects. We ensure precise measurement, clean installation, proper sealing and a premium appearance. Whether new build, renovation or modernisation – our goal is to deliver functional, durable and visually fitting solutions that improve the comfort, security and energy efficiency of the building.",
    },
    gallery: [
      {
        title: { de: "Fenster- und Türenmontage", en: "Window and Door Installation" },
        location: MUNICH_GERMANY,
        description: {
          de: "Einbau und Austausch von Fenstern und Türen mit präziser Passung und sauberer Endverarbeitung.",
          en: "Installation and replacement of windows and doors with precise fit and clean finishing.",
        },
        image: fensterImg,
      },
      {
        title: { de: "Villa am Starnberger See", en: "Villa on Lake Starnberg" },
        location: { de: "Starnberg", en: "Starnberg" },
        description: {
          de: "Hochwertige Aluminium-Fensteranlagen mit RC2-Einbruchschutz und energieeffizienter Verglasung.",
          en: "High-end aluminium window systems with RC2 burglar resistance and energy-efficient glazing.",
        },
        image: proj6,
      },
      {
        title: { de: "Wohnhaus Bogenhausen", en: "Residential House – Bogenhausen" },
        location: { de: "München · Bogenhausen", en: "Munich · Bogenhausen" },
        description: {
          de: "Komplettmontage von Haus- und Innentüren in Premium-Ausführung inkl. Anschlussarbeiten.",
          en: "Complete installation of entrance and interior doors in premium quality including finishing works.",
        },
        image: proj1,
      },
    ],
    includes: [
      { de: "Holz-, Kunststoff- und Aluminiumfenster nach Maß", en: "Wood, PVC and aluminium windows made to measure" },
      { de: "Haus-, Wohnungs- und Innentüren in Premium-Ausführung", en: "Entrance, apartment and interior doors in premium quality" },
      { de: "RAL-Montage nach geltenden Richtlinien", en: "RAL-compliant installation per applicable guidelines" },
      { de: "Einbruchschutz nach RC2 / RC3", en: "Burglar resistance to RC2 / RC3" },
      { de: "Demontage, Entsorgung und Anschlussarbeiten", en: "Dismantling, disposal and finishing works" },
    ],
    benefits: [
      { de: "Spürbare Reduktion der Heiz- und Energiekosten", en: "Noticeable reduction of heating and energy costs" },
      { de: "Verbesserter Schall- und Einbruchschutz", en: "Improved acoustic insulation and burglar resistance" },
      { de: "Langlebige Markenprodukte mit Herstellergarantie", en: "Long-lasting brand products with manufacturer warranty" },
      { de: "Saubere Ausführung mit minimalen Nutzungsausfällen", en: "Clean execution with minimal disruption to use" },
    ],
    whyUs: WHY_US,
  },
];

// ---------------------------------------------------------------------------
// Additional dedicated service pages (planning & building-phase services).
// These are not shown as home cards but have their own SEO landing pages.
// ---------------------------------------------------------------------------

const g = (title: L, location: L, description: L, image: string): GallerySlideI18n => ({
  title,
  location,
  description,
  image,
});

const MUC: L = { de: "München", en: "Munich" };

export const EXTRA_SERVICES_I18N: ServiceDetailI18n[] = [
  {
    slug: "neubau",
    icon: Building2,
    title: { de: "Neubau", en: "New Construction" },
    h1: { de: "Neubau in München", en: "New Construction in Munich" },
    metaTitle: { de: "Neubau in München | Munich Construction GmbH", en: "New Construction in Munich | Munich Construction GmbH" },
    metaDescription: {
      de: "Neubau in München und Bayern: Rohbau, Ausbau, Koordination der Gewerke und schlüsselfertige Übergabe durch Munich Construction GmbH.",
      en: "New construction in Munich and Bavaria: shell, fit-out, trade coordination and turn-key handover by Munich Construction GmbH.",
    },
    subtitle: {
      de: "Vom Rohbau bis zur schlüsselfertigen Übergabe – koordiniert aus einer Hand",
      en: "From shell construction to turn-key handover – coordinated from a single source",
    },
    intro: {
      de: "Wir realisieren Neubauvorhaben in München und Bayern von der Baustelleneinrichtung über den Rohbau bis zum vollständigen Innenausbau – mit klarer Terminplanung und durchgehender Qualitätskontrolle.",
      en: "We deliver new-build projects in Munich and Bavaria from site setup and shell construction to complete interior fit-out – with clear scheduling and continuous quality control.",
    },
    paragraph: {
      de: "Ein Neubau ist ein Zusammenspiel vieler Gewerke, Termine und technischer Anforderungen. Munich Construction GmbH übernimmt die Koordination dieser Schnittstellen und sorgt dafür, dass Rohbau, Ausbau und technische Gewerke ineinandergreifen. Wir arbeiten auf Grundlage geprüfter Planunterlagen, stimmen uns eng mit Bauherren, Architekten und Fachplanern ab und dokumentieren jeden Bauabschnitt nachvollziehbar. So entsteht ein Gebäude, das nicht nur termingerecht fertig wird, sondern in Ausführung und Detailqualität dauerhaft überzeugt.",
      en: "A new building is an interplay of many trades, deadlines and technical requirements. Munich Construction GmbH coordinates these interfaces and makes sure shell, fit-out and building services work together. We build on approved planning documents, coordinate closely with clients, architects and specialist planners, and document every construction phase. The result is a building delivered on schedule with lasting quality in execution and detail.",
    },
    gallery: [
      g({ de: "Neubauprojekt", en: "New-build project" }, MUC, { de: "Ausführung und Koordination der Gewerke im Neubau.", en: "Execution and trade coordination on a new build." }, proj1),
      g({ de: "Rohbau und Ausbau", en: "Shell and fit-out" }, MUC, { de: "Übergang vom Rohbau in den Innenausbau.", en: "Transition from shell construction to interior fit-out." }, proj5),
      g({ de: "Innenausbau Neubau", en: "New-build interior fit-out" }, MUC, { de: "Ausbaugewerke mit präziser Maßhaltigkeit.", en: "Finishing trades with precise dimensional accuracy." }, proj3),
    ],
    includes: [
      { de: "Baustelleneinrichtung und Bauablaufplanung", en: "Site setup and construction scheduling" },
      { de: "Rohbauarbeiten und Betonbau", en: "Shell construction and concrete works" },
      { de: "Innenausbau, Trockenbau und Oberflächen", en: "Interior fit-out, drywall and surfaces" },
      { de: "Koordination von Haustechnik und Fachgewerken", en: "Coordination of building services and specialist trades" },
      { de: "Qualitätskontrolle, Abnahme und Dokumentation", en: "Quality control, acceptance and documentation" },
    ],
    benefits: [
      { de: "Ein Ansprechpartner für alle Bauphasen", en: "One point of contact for every construction phase" },
      { de: "Verlässliche Termin- und Ablaufplanung", en: "Reliable scheduling and sequencing" },
      { de: "Transparente Kommunikation mit Bauherr und Planern", en: "Transparent communication with client and planners" },
      { de: "Saubere Ausführung nach deutschen Qualitätsstandards", en: "Clean execution to German quality standards" },
    ],
    applications: [
      { de: "Wohn- und Mehrfamilienhäuser", en: "Residential and multi-family buildings" },
      { de: "Büro- und Verwaltungsgebäude", en: "Office and administrative buildings" },
      { de: "Gewerbe-, Hotel- und Sonderbauten", en: "Commercial, hotel and special-purpose buildings" },
      { de: "Anbauten und Aufstockungen im Bestand", en: "Extensions and storey additions to existing buildings" },
    ],
    process: [
      { title: { de: "Erstgespräch und Bestandsklärung", en: "Initial consultation and site clarification" }, text: { de: "Wir klären Ziel, Umfang und Rahmenbedingungen des Neubauvorhabens.", en: "We clarify the goal, scope and framework of the new-build project." } },
      { title: { de: "Planungsabgleich", en: "Planning review" }, text: { de: "Abstimmung der Ausführungsunterlagen mit Architekten und Fachplanern.", en: "Coordination of execution documents with architects and specialist planners." } },
      { title: { de: "Angebot und Terminplan", en: "Quote and schedule" }, text: { de: "Leistungsverzeichnis, Kostenrahmen und verbindlicher Bauzeitenplan.", en: "Scope of works, cost framework and a binding construction schedule." } },
      { title: { de: "Ausführung", en: "Execution" }, text: { de: "Rohbau, Ausbau und Gewerkekoordination mit laufender Qualitätskontrolle.", en: "Shell, fit-out and trade coordination with ongoing quality control." } },
      { title: { de: "Abnahme und Übergabe", en: "Acceptance and handover" }, text: { de: "Gemeinsame Begehung, Mängelfreigabe und dokumentierte Übergabe.", en: "Joint inspection, defect clearance and documented handover." } },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "renovierung",
    icon: Hammer,
    title: { de: "Renovierung", en: "Renovation" },
    h1: { de: "Renovierung in München", en: "Renovation in Munich" },
    metaTitle: { de: "Renovierung in München | Munich Construction GmbH", en: "Renovation in Munich | Munich Construction GmbH" },
    metaDescription: {
      de: "Renovierung in München: Wohnungen, Büros und Gewerbeflächen modernisieren – Innenausbau, Oberflächen, Fenster und Türen aus einer Hand.",
      en: "Renovation in Munich: modernising apartments, offices and commercial spaces – interior fit-out, surfaces, windows and doors from one source.",
    },
    subtitle: {
      de: "Bestandsflächen modernisieren – wohnlich, funktional und wertsteigernd",
      en: "Modernising existing spaces – comfortable, functional and value-enhancing",
    },
    intro: {
      de: "Renovierungen für Wohnungen, Büros und Gewerbeflächen in München – von der Bestandsaufnahme bis zur besenreinen Übergabe, mit möglichst geringer Störung des laufenden Betriebs.",
      en: "Renovations for apartments, offices and commercial spaces in Munich – from survey to clean handover, with minimal disruption to ongoing use.",
    },
    paragraph: {
      de: "Eine Renovierung verändert die Nutzung und Wirkung eines Gebäudes, ohne seine Struktur grundlegend anzutasten. Munich Construction GmbH nimmt den Bestand sorgfältig auf, plant die Arbeitsschritte in einer sinnvollen Reihenfolge und führt Innenausbau, Oberflächenarbeiten sowie den Austausch von Fenstern und Türen fachgerecht aus. Gerade in bewohnten oder genutzten Objekten in München achten wir auf staubarme Arbeitsweise, klare Zeitfenster und eine saubere Baustelle – damit das Ergebnis überzeugt und der Weg dorthin planbar bleibt.",
      en: "A renovation changes how a building is used and perceived without fundamentally altering its structure. Munich Construction GmbH surveys the existing fabric carefully, plans the works in a sensible sequence and carries out interior fit-out, surface works and the replacement of windows and doors. Especially in occupied buildings in Munich we work with low dust, clear time windows and a tidy site – so both the result and the route to it stay predictable.",
    },
    gallery: [
      g({ de: "Renovierung Innenräume", en: "Interior renovation" }, MUC, { de: "Modernisierung von Wohn- und Büroflächen im Bestand.", en: "Modernisation of residential and office space in existing buildings." }, proj2),
      g({ de: "Oberflächen und Ausbau", en: "Surfaces and fit-out" }, MUC, { de: "Spachtel-, Maler- und Ausbauarbeiten mit hochwertigem Finish.", en: "Jointing, painting and fit-out works with a high-quality finish." }, proj5),
      g({ de: "Fenster- und Türentausch", en: "Window and door replacement" }, MUC, { de: "Austausch von Bestandselementen inklusive Anschlussarbeiten.", en: "Replacement of existing elements including interface works." }, proj6),
    ],
    includes: [
      { de: "Bestandsaufnahme und Aufmaß", en: "Condition survey and measurement" },
      { de: "Demontage, Entkernung und Entsorgung", en: "Dismantling, strip-out and disposal" },
      { de: "Trockenbau, Wände, Decken und Vorsatzschalen", en: "Drywall, walls, ceilings and furring" },
      { de: "Spachtel-, Oberflächen- und Malerarbeiten", en: "Jointing, surface and painting works" },
      { de: "Austausch von Fenstern, Türen und Bodenbelägen", en: "Replacement of windows, doors and floor coverings" },
    ],
    benefits: [
      { de: "Sichtbare Aufwertung ohne Eingriff in die Tragstruktur", en: "Visible upgrade without touching the load-bearing structure" },
      { de: "Planbare Bauzeit und klar abgegrenzte Bauabschnitte", en: "Predictable build time and clearly defined phases" },
      { de: "Geringe Störung bei genutzten Objekten", en: "Low disruption in occupied properties" },
      { de: "Wertsteigerung von Wohn- und Gewerbeflächen", en: "Value increase for residential and commercial space" },
    ],
    applications: [
      { de: "Wohnungsrenovierung vor Vermietung oder Verkauf", en: "Apartment renovation before letting or sale" },
      { de: "Büro- und Praxisflächen bei Mieterwechsel", en: "Office and practice space on tenant change" },
      { de: "Hotel- und Gastronomieflächen", en: "Hotel and hospitality spaces" },
      { de: "Treppenhäuser und Allgemeinflächen", en: "Stairwells and common areas" },
    ],
    process: [
      { title: { de: "Besichtigung vor Ort", en: "On-site visit" }, text: { de: "Aufnahme des Bestands und Abstimmung der Wünsche.", en: "Survey of the existing fabric and alignment on requirements." } },
      { title: { de: "Leistungsumfang und Angebot", en: "Scope and quote" }, text: { de: "Klar gegliedertes Angebot mit Positionen und Zeitrahmen.", en: "Clearly structured quote with line items and a time frame." } },
      { title: { de: "Ausführung in Bauabschnitten", en: "Execution in phases" }, text: { de: "Geordnete Abfolge der Gewerke, staubarm und terminiert.", en: "Ordered sequence of trades, low-dust and scheduled." } },
      { title: { de: "Endreinigung und Übergabe", en: "Final cleaning and handover" }, text: { de: "Kontrolle der Oberflächen und Übergabe der fertigen Flächen.", en: "Surface inspection and handover of the finished spaces." } },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "sanierung",
    icon: Wrench,
    title: { de: "Sanierung", en: "Refurbishment" },
    h1: { de: "Sanierung in München", en: "Refurbishment in Munich" },
    metaTitle: { de: "Sanierung in München | Munich Construction GmbH", en: "Refurbishment in Munich | Munich Construction GmbH" },
    metaDescription: {
      de: "Sanierung in München: Substanzerhalt, Feuchteschäden, Bauwerksabdichtung und Ertüchtigung im Bestand durch Munich Construction GmbH.",
      en: "Refurbishment in Munich: preserving substance, moisture damage, structural waterproofing and upgrading existing buildings.",
    },
    subtitle: {
      de: "Bausubstanz erhalten, Schäden beheben, Gebäude zukunftsfähig machen",
      en: "Preserving substance, repairing damage, making buildings fit for the future",
    },
    intro: {
      de: "Sanierung im Bestand für Gebäude in München und Bayern – Ursachenanalyse, Instandsetzung geschädigter Bauteile und dauerhafte Ertüchtigung statt kurzfristiger Kosmetik.",
      en: "Refurbishment of existing buildings in Munich and Bavaria – root-cause analysis, repair of damaged components and lasting upgrades instead of short-term cosmetics.",
    },
    paragraph: {
      de: "Sanierung beginnt mit dem Verstehen des Schadens. Bevor wir ausführen, klären wir Ursache und Ausmaß – ob Feuchteeintritt, Risse, veraltete Bauteile oder unzureichender Brandschutz. Auf dieser Grundlage wählt Munich Construction GmbH die passenden Verfahren: Bauwerksabdichtung und Injektion, Ertüchtigung von Wand- und Deckenaufbauten, Erneuerung von Fenstern und Türen oder brandschutztechnische Nachrüstung. Der Münchner Altbaubestand verlangt dabei besonderes Fingerspitzengefühl, weil vorhandene Substanz erhalten und gleichzeitig heutigen Anforderungen genügt werden muss.",
      en: "Refurbishment starts with understanding the damage. Before we build, we clarify cause and extent – moisture ingress, cracks, outdated components or insufficient fire protection. On that basis Munich Construction GmbH selects the right methods: structural waterproofing and injection, upgrading wall and ceiling assemblies, renewing windows and doors, or retrofitting fire protection. Munich's older building stock in particular requires sensitivity, since existing substance must be preserved while meeting today's requirements.",
    },
    gallery: [
      g({ de: "Sanierung im Bestand", en: "Refurbishment of existing fabric" }, MUC, { de: "Instandsetzung geschädigter Bauteile im Bestandsgebäude.", en: "Repair of damaged components in an existing building." }, proj2),
      g({ de: "Abdichtung und Injektion", en: "Waterproofing and injection" }, MUC, { de: "Bauwerksabdichtung gegen Feuchte und Wassereintritt.", en: "Structural waterproofing against moisture and water ingress." }, injektionImg),
      g({ de: "Brandschutz im Bestand", en: "Fire protection in existing buildings" }, MUC, { de: "Brandschutztechnische Ertüchtigung bestehender Bauteile.", en: "Fire-protection upgrade of existing components." }, brandschutzImg),
    ],
    includes: [
      { de: "Schadensaufnahme und Ursachenanalyse", en: "Damage survey and root-cause analysis" },
      { de: "Bauwerksabdichtung, Injektion und Risssperrung", en: "Structural waterproofing, injection and crack sealing" },
      { de: "Instandsetzung von Wand-, Decken- und Bodenaufbauten", en: "Repair of wall, ceiling and floor assemblies" },
      { de: "Brandschutztechnische Ertüchtigung im Bestand", en: "Fire-protection upgrades in existing buildings" },
      { de: "Erneuerung von Fenstern, Türen und Anschlüssen", en: "Renewal of windows, doors and interfaces" },
    ],
    benefits: [
      { de: "Nachhaltige Beseitigung der Schadensursache", en: "Sustainable removal of the cause of damage" },
      { de: "Erhalt und Aufwertung vorhandener Bausubstanz", en: "Preservation and upgrade of existing substance" },
      { de: "Dokumentierte Ausführung für Eigentümer und Versicherer", en: "Documented execution for owners and insurers" },
      { de: "Kombinierte Gewerke ohne zusätzliche Schnittstellen", en: "Combined trades without additional interfaces" },
    ],
    applications: [
      { de: "Feuchte Keller und erdberührte Bauteile", en: "Damp basements and earth-contact components" },
      { de: "Risse in Beton- und Mauerwerkskonstruktionen", en: "Cracks in concrete and masonry structures" },
      { de: "Altbauten und denkmalnahe Bestandsgebäude", en: "Older and heritage-adjacent buildings" },
      { de: "Hotel-, Büro- und Wohngebäude im laufenden Betrieb", en: "Hotel, office and residential buildings in operation" },
    ],
    process: [
      { title: { de: "Schadensaufnahme", en: "Damage survey" }, text: { de: "Begehung, Dokumentation und Bewertung des Schadensbildes.", en: "Inspection, documentation and assessment of the damage." } },
      { title: { de: "Ursachenklärung", en: "Cause analysis" }, text: { de: "Feststellung der Ursache als Grundlage der Verfahrenswahl.", en: "Identifying the cause as the basis for choosing a method." } },
      { title: { de: "Sanierungskonzept", en: "Refurbishment concept" }, text: { de: "Festlegung von Verfahren, Materialien und Bauabschnitten.", en: "Defining methods, materials and construction phases." } },
      { title: { de: "Ausführung und Dokumentation", en: "Execution and documentation" }, text: { de: "Fachgerechte Umsetzung mit nachvollziehbarer Dokumentation.", en: "Professional execution with traceable documentation." } },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "genehmigungsplanung",
    icon: FileCheck2,
    title: { de: "Genehmigungsplanung", en: "Permit Planning" },
    h1: { de: "Genehmigungsplanung in München", en: "Permit Planning in Munich" },
    metaTitle: { de: "Genehmigungsplanung in München | Munich Construction GmbH", en: "Permit Planning in Munich | Munich Construction GmbH" },
    metaDescription: {
      de: "Genehmigungsplanung in München: Bauantrag, vollständige Unterlagen und Behördenkommunikation – strukturiert begleitet von Munich Construction GmbH.",
      en: "Permit planning in Munich: building applications, complete documentation and authority liaison – guided by Munich Construction GmbH.",
    },
    subtitle: {
      de: "Bauantrag, Unterlagen und Behördenabstimmung strukturiert begleitet",
      en: "Building application, documentation and authority liaison, structured end to end",
    },
    intro: {
      de: "Genehmigungsplanung für Bauvorhaben in München und Bayern – vollständige, prüffähige Unterlagen und eine geordnete Kommunikation mit den zuständigen Behörden.",
      en: "Permit planning for construction projects in Munich and Bavaria – complete, reviewable documentation and orderly communication with the responsible authorities.",
    },
    paragraph: {
      de: "Verzögerungen im Genehmigungsverfahren entstehen meist durch unvollständige oder widersprüchliche Unterlagen. Munich Construction GmbH stellt die Genehmigungsplanung so zusammen, dass sie prüffähig ist: Bauantragsunterlagen, Nachweise, Abstimmung mit Statik und Brandschutz sowie die Beantwortung von Rückfragen der Behörde. Im Rahmen der Bayerischen Bauordnung kennen wir die üblichen Anforderungen der Münchner Bauaufsicht und bereiten Projekte entsprechend vor, damit das Verfahren ohne vermeidbare Schleifen läuft.",
      en: "Delays in approval procedures usually stem from incomplete or inconsistent documentation. Munich Construction GmbH assembles permit planning so it can be reviewed: application documents, certificates, coordination with structural and fire-protection planning, and responses to authority queries. Within the framework of the Bavarian Building Code we know the usual requirements of Munich's building authority and prepare projects accordingly, so the procedure runs without avoidable loops.",
    },
    gallery: [
      g({ de: "Genehmigungsplanung", en: "Permit planning" }, MUC, { de: "Zusammenstellung prüffähiger Bauantragsunterlagen.", en: "Compiling reviewable building-application documents." }, proj1),
      g({ de: "Abstimmung mit Fachplanern", en: "Coordination with specialist planners" }, MUC, { de: "Abgleich von Statik, Brandschutz und Architektur.", en: "Alignment of structure, fire protection and architecture." }, proj3),
      g({ de: "Projektvorbereitung", en: "Project preparation" }, MUC, { de: "Vorbereitung des Vorhabens für das Genehmigungsverfahren.", en: "Preparing the project for the approval procedure." }, proj4),
    ],
    includes: [
      { de: "Prüfung der Genehmigungsfähigkeit des Vorhabens", en: "Review of the project's eligibility for approval" },
      { de: "Erstellung und Zusammenstellung der Bauantragsunterlagen", en: "Preparation and compilation of building-application documents" },
      { de: "Koordination von Statik, Brandschutz und Fachnachweisen", en: "Coordination of structural, fire-protection and specialist certificates" },
      { de: "Kommunikation mit Bauaufsicht und Fachbehörden", en: "Communication with the building authority and specialist agencies" },
      { de: "Nachreichungen und Bearbeitung von Rückfragen", en: "Submissions and handling of authority queries" },
    ],
    benefits: [
      { de: "Weniger Rückfragen durch vollständige Unterlagen", en: "Fewer queries thanks to complete documentation" },
      { de: "Klare Zuständigkeiten statt paralleler Ansprechpartner", en: "Clear responsibilities instead of parallel contacts" },
      { de: "Erfahrung mit Verfahren nach Bayerischer Bauordnung", en: "Experience with procedures under the Bavarian Building Code" },
      { de: "Nahtloser Übergang in die Werkplanung", en: "Seamless transition into execution planning" },
    ],
    applications: [
      { de: "Neubauvorhaben und Ersatzneubauten", en: "New builds and replacement buildings" },
      { de: "Nutzungsänderungen im Bestand", en: "Changes of use in existing buildings" },
      { de: "Umbauten, Anbauten und Aufstockungen", en: "Conversions, extensions and storey additions" },
      { de: "Brandschutztechnische Nachrüstungen mit Genehmigungsbedarf", en: "Fire-protection retrofits requiring approval" },
    ],
    process: [
      { title: { de: "Vorprüfung", en: "Preliminary review" }, text: { de: "Einordnung des Vorhabens und Klärung des Verfahrenswegs.", en: "Classifying the project and clarifying the procedural route." } },
      { title: { de: "Unterlagenerstellung", en: "Document preparation" }, text: { de: "Zusammenstellung aller erforderlichen Pläne und Nachweise.", en: "Compiling all required drawings and certificates." } },
      { title: { de: "Einreichung", en: "Submission" }, text: { de: "Formgerechte Einreichung bei der zuständigen Stelle.", en: "Formally correct submission to the responsible office." } },
      { title: { de: "Begleitung bis zur Genehmigung", en: "Support until approval" }, text: { de: "Bearbeitung von Rückfragen und Nachreichungen.", en: "Handling queries and supplementary submissions." } },
    ],
    whyUs: WHY_US,
  },
  {
    slug: "werkplanung",
    icon: Ruler,
    title: { de: "Werkplanung", en: "Execution Planning" },
    h1: { de: "Werkplanung in München", en: "Execution Planning in Munich" },
    metaTitle: { de: "Werkplanung in München | Munich Construction GmbH", en: "Execution Planning in Munich | Munich Construction GmbH" },
    metaDescription: {
      de: "Werkplanung in München: Ausführungs- und Detailpläne, Materialspezifikationen und Schnittstellenkoordination für einen reibungslosen Bauablauf.",
      en: "Execution planning in Munich: detail drawings, material specifications and interface coordination for a smooth construction process.",
    },
    subtitle: {
      de: "Ausführungs- und Detailplanung für einen reibungslosen Bauablauf",
      en: "Execution and detail planning for a smooth construction process",
    },
    intro: {
      de: "Werkplanung für Bauprojekte in München und Bayern – baubare Details, eindeutige Materialangaben und abgestimmte Schnittstellen zwischen allen Gewerken.",
      en: "Execution planning for construction projects in Munich and Bavaria – buildable details, unambiguous material specifications and coordinated interfaces between all trades.",
    },
    paragraph: {
      de: "Die Werkplanung übersetzt die Genehmigungsplanung in das, was auf der Baustelle tatsächlich gebaut wird. Munich Construction GmbH erarbeitet Ausführungs- und Detailpläne, legt Materialien und Aufbauten eindeutig fest und klärt die Schnittstellen zwischen Rohbau, Ausbau und Haustechnik im Vorfeld. Dadurch entfallen Rückfragen und Improvisationen im laufenden Bau – Nachträge, Wartezeiten und Ausführungsfehler werden deutlich seltener. Besonders bei Bestandsprojekten in München zahlt sich eine präzise Werkplanung aus, weil vorhandene Maße und Anschlüsse selten dem Idealfall entsprechen.",
      en: "Execution planning translates the approved design into what is actually built on site. Munich Construction GmbH develops execution and detail drawings, specifies materials and assemblies unambiguously, and clarifies interfaces between shell, fit-out and building services in advance. This removes queries and improvisation during construction – variations, waiting times and execution errors become far rarer. In Munich's existing buildings in particular, precise execution planning pays off, because real dimensions and connections rarely match the ideal case.",
    },
    gallery: [
      g({ de: "Werk- und Detailplanung", en: "Execution and detail planning" }, MUC, { de: "Detaillierte Ausführungsunterlagen für die Baustelle.", en: "Detailed execution documents for the site." }, proj3),
      g({ de: "Schnittstellenkoordination", en: "Interface coordination" }, MUC, { de: "Abstimmung zwischen Rohbau, Ausbau und Haustechnik.", en: "Coordination between shell, fit-out and building services." }, proj5),
      g({ de: "Umsetzung nach Plan", en: "Implementation to plan" }, MUC, { de: "Ausführung auf Basis abgestimmter Werkpläne.", en: "Execution based on coordinated shop drawings." }, trockenbauImg),
    ],
    includes: [
      { de: "Ausführungs-, Detail- und Schnittpläne", en: "Execution, detail and section drawings" },
      { de: "Material- und Aufbauspezifikationen", en: "Material and assembly specifications" },
      { de: "Schnittstellenkoordination zwischen den Gewerken", en: "Interface coordination between trades" },
      { de: "Abgleich mit Brandschutz-, Schallschutz- und Statikvorgaben", en: "Alignment with fire, acoustic and structural requirements" },
      { de: "Planpflege und Fortschreibung während der Ausführung", en: "Drawing maintenance and updates during execution" },
    ],
    benefits: [
      { de: "Weniger Nachträge und Ausführungsfehler", en: "Fewer variations and execution errors" },
      { de: "Klare Vorgaben für ausführende Gewerke", en: "Clear specifications for the executing trades" },
      { de: "Bessere Kostensicherheit im Bauablauf", en: "Better cost certainty during construction" },
      { de: "Kürzere Entscheidungswege auf der Baustelle", en: "Shorter decision paths on site" },
    ],
    applications: [
      { de: "Innenausbau- und Trockenbaudetails", en: "Interior fit-out and drywall details" },
      { de: "Brandschutztechnische Anschlussdetails", en: "Fire-protection interface details" },
      { de: "Fenster- und Türanschlüsse im Bestand", en: "Window and door interfaces in existing buildings" },
      { de: "Abdichtungs- und Anschlussdetails erdberührter Bauteile", en: "Waterproofing and interface details for earth-contact components" },
    ],
    process: [
      { title: { de: "Grundlagenermittlung", en: "Basis assessment" }, text: { de: "Auswertung vorhandener Pläne und Bestandsaufmaße.", en: "Evaluating existing drawings and as-built measurements." } },
      { title: { de: "Detailentwicklung", en: "Detail development" }, text: { de: "Erarbeitung baubarer Details und Aufbauten.", en: "Developing buildable details and assemblies." } },
      { title: { de: "Abstimmung", en: "Coordination" }, text: { de: "Freigabe mit Bauherr, Planern und ausführenden Gewerken.", en: "Sign-off with client, planners and executing trades." } },
      { title: { de: "Planpflege", en: "Drawing maintenance" }, text: { de: "Fortschreibung der Pläne während der Bauausführung.", en: "Updating drawings throughout construction." } },
    ],
    whyUs: WHY_US,
  },
];

/** Every service that has its own detail page. */
export const ALL_SERVICES_I18N: ServiceDetailI18n[] = [
  ...HOME_SERVICES_I18N,
  ...EXTRA_SERVICES_I18N,
];

export function localizeService(s: ServiceDetailI18n, lang: Lang): ServiceDetail {
  const pick = (l: L) => l[lang];
  return {
    slug: s.slug,
    icon: s.icon,
    title: pick(s.title),
    h1: pick(s.h1),
    subtitle: pick(s.subtitle),
    intro: pick(s.intro),
    paragraph: pick(s.paragraph),
    gallery: s.gallery.map((gs) => ({
      title: pick(gs.title),
      location: pick(gs.location),
      description: pick(gs.description),
      image: gs.image,
    })),
    includes: s.includes.map(pick),
    benefits: s.benefits.map(pick),
    whyUs: s.whyUs.map(pick),
    applications: (s.applications ?? []).map(pick),
    process: (s.process ?? []).map((p) => ({ title: pick(p.title), text: pick(p.text) })),
  };
}

// Backwards-compatible default export (German) for any non-localised consumer.
export const HOME_SERVICES: ServiceDetail[] = HOME_SERVICES_I18N.map((s) =>
  localizeService(s, "de"),
);

export function getServiceI18nBySlug(slug: string): ServiceDetailI18n | undefined {
  return ALL_SERVICES_I18N.find((s) => s.slug === slug);
}

export function getServiceBySlug(slug: string, lang: Lang = "de"): ServiceDetail | undefined {
  const s = getServiceI18nBySlug(slug);
  return s ? localizeService(s, lang) : undefined;
}

