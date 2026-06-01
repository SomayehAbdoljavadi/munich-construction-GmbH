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
  subtitle: L;
  intro: L;
  paragraph: L;
  gallery: GallerySlideI18n[];
  includes: L[];
  benefits: L[];
  whyUs: L[];
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
  subtitle: string;
  icon: typeof Flame;
  intro: string;
  paragraph: string;
  gallery: GallerySlide[];
  includes: string[];
  benefits: string[];
  whyUs: string[];
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

export function localizeService(s: ServiceDetailI18n, lang: Lang): ServiceDetail {
  const pick = (l: L) => l[lang];
  return {
    slug: s.slug,
    icon: s.icon,
    title: pick(s.title),
    subtitle: pick(s.subtitle),
    intro: pick(s.intro),
    paragraph: pick(s.paragraph),
    gallery: s.gallery.map((g) => ({
      title: pick(g.title),
      location: pick(g.location),
      description: pick(g.description),
      image: g.image,
    })),
    includes: s.includes.map(pick),
    benefits: s.benefits.map(pick),
    whyUs: s.whyUs.map(pick),
  };
}

// Backwards-compatible default export (German) for any non-localised consumer.
export const HOME_SERVICES: ServiceDetail[] = HOME_SERVICES_I18N.map((s) =>
  localizeService(s, "de"),
);

export function getServiceI18nBySlug(slug: string): ServiceDetailI18n | undefined {
  return HOME_SERVICES_I18N.find((s) => s.slug === slug);
}

export function getServiceBySlug(slug: string, lang: Lang = "de"): ServiceDetail | undefined {
  const s = getServiceI18nBySlug(slug);
  return s ? localizeService(s, lang) : undefined;
}
