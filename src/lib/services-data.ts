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

export interface GallerySlide {
  title: string;
  location: string;
  description: string;
  image: string;
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

const WHY_US_DEFAULT = [
  "Professionelle Projektabwicklung von der Planung bis zur Übergabe",
  "Verlässliche Kommunikation und transparente Abstimmung",
  "Saubere, präzise Ausführung nach deutschen Qualitätsstandards",
  "Langjährige Erfahrung in anspruchsvollen Bauprojekten",
  "Qualitätsorientierter Service mit erfahrenem Fachpersonal",
];

export const HOME_SERVICES: ServiceDetail[] = [
  {
    slug: "brandschutz",
    title: "Brandschutz",
    subtitle: "Normgerechter passiver Brandschutz für Neubau und Bestand",
    icon: Flame,
    intro:
      "Normgerechte Brandschutzlösungen für Neubau und Bestand – geplant, umgesetzt und dokumentiert nach geltenden Bauvorschriften.",
    paragraph:
      "Für den Brandschutz begleitet Sie Munich Construction GmbH von der ersten Objektbegehung bis zur fachgerechten Umsetzung auf der Baustelle. Wir analysieren die brandschutztechnischen Anforderungen Ihres Gebäudes, erarbeiten ein passendes technisches Konzept, koordinieren die notwendigen Materialien und Fachkräfte und liefern saubere, behördenkonforme Bauleistungen nach geltenden deutschen Normen und der Bayerischen Bauordnung.",
    gallery: [
      {
        title: "Fire Protection Upgrade",
        location: "München, Deutschland",
        description:
          "Installation und Optimierung des passiven Brandschutzes für ein gewerblich genutztes Bürogebäude.",
        image: brandschutzImg,
      },
      {
        title: "Brandabschottung Bürogebäude",
        location: "München · Schwabing",
        description:
          "Brandschutztechnische Abschottung sämtlicher Wand- und Deckendurchführungen nach geprüften Systemen.",
        image: proj3,
      },
      {
        title: "Brandschutzsanierung Altbau",
        location: "München · Maxvorstadt",
        description:
          "Ertüchtigung der Bestandskonstruktion mit zertifizierten Brandschutzbeschichtungen und Bekleidungen.",
        image: proj2,
      },
    ],
    includes: [
      "Brandschutzkonzepte nach Bayerischer Bauordnung",
      "Brandabschottungen für Wand- und Deckendurchführungen",
      "Brandschutzbeschichtungen und -bekleidungen",
      "Feuerwiderstandsfähige Wand- und Deckensysteme",
      "Dokumentation und Übergabe an Behörden & Sachverständige",
    ],
    benefits: [
      "Sicherheit für Nutzer, Mieter und Eigentümer",
      "Versicherungs- und behördenkonforme Umsetzung",
      "Erfahrenes Fachpersonal mit zertifizierten Systemen",
      "Klare Schnittstellenkoordination mit allen Gewerken",
    ],
    whyUs: WHY_US_DEFAULT,
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    subtitle: "Präziser Innenausbau für Büro, Gewerbe und Wohnbau",
    icon: Hammer,
    intro:
      "Präziser Trockenbau für Büro, Gewerbe und Wohnbau – von der Raum­aufteilung bis zur schallschutzoptimierten Spezialwand.",
    paragraph:
      "Im Trockenbau übernimmt Munich Construction GmbH die komplette Ausführung – von der Aufmaßaufnahme über die statisch und bauphysikalisch korrekte Planung bis zur sauberen Montage. Wir koordinieren Material, Schnittstellen und Folgegewerke und liefern maßgenaue Wände, Decken und Vorsatzschalen, die optisch wie funktional höchsten Ansprüchen genügen.",
    gallery: [
      {
        title: "Interior Drywall Construction",
        location: "München, Deutschland",
        description:
          "Professionelle Trennwände, Deckensysteme und Innenausbau für ein modernes Bauprojekt.",
        image: trockenbauImg,
      },
      {
        title: "Loft-Umbau Werksviertel",
        location: "München · Werksviertel",
        description:
          "Großflächiger Innenausbau mit akustisch optimierten Wand- und Deckenkonstruktionen.",
        image: proj5,
      },
      {
        title: "Bürogebäude Schwabing",
        location: "München · Schwabing",
        description:
          "Trockenbauwände in Metallständerbauweise mit integriertem Schall- und Brandschutz.",
        image: proj3,
      },
    ],
    includes: [
      "Nichttragende Wände in Metallständerbauweise",
      "Abgehängte Decken und Designdecken",
      "Schall-, Wärme- und Brandschutzkonstruktionen",
      "Vorsatzschalen und Installationswände",
      "Spachtel- und Oberflächenarbeiten in Q1–Q4",
    ],
    benefits: [
      "Schnelle, saubere Bauabläufe ohne lange Trocknungszeiten",
      "Flexible Grundrisse und nachträgliche Anpassbarkeit",
      "Hohe Maßgenauigkeit für hochwertige Ausbaugewerke",
      "Optimale akustische und thermische Eigenschaften",
    ],
    whyUs: WHY_US_DEFAULT,
  },
  {
    slug: "injektion-und-risssperrung",
    title: "Injektion und Risssperrung",
    subtitle: "Bauwerksabdichtung und Rissverpressung mit professionellen Injektionsverfahren",
    icon: Droplet,
    intro:
      "Bauwerksabdichtung und Rissverpressung mit professionellen Injektionsverfahren – nachhaltige Lösungen gegen Feuchte, Wasser­eintritt und strukturelle Schäden.",
    paragraph:
      "Bei Injektions- und Risssperrarbeiten unterstützt Munich Construction GmbH von der schadensbildbezogenen Voruntersuchung bis zur fachgerechten Ausführung. Wir bestimmen das passende Verfahren, wählen geprüfte Materialien und führen die Arbeiten mit minimalem Eingriff in die Bausubstanz aus – nachhaltig, dokumentiert und nach den gültigen deutschen Regelwerken.",
    gallery: [
      {
        title: "Crack Injection and Sealing",
        location: "Bayern, Deutschland",
        description:
          "Strukturelle Rissverpressung und Abdichtung zum Schutz des Bauwerks vor Feuchte und Folgeschäden.",
        image: injektionImg,
      },
      {
        title: "Stadthaus Lehel",
        location: "München · Lehel",
        description:
          "Horizontalsperre und Flächeninjektion zur dauerhaften Trockenlegung des Kellergeschosses.",
        image: proj4,
      },
      {
        title: "Altbau Maxvorstadt",
        location: "München · Maxvorstadt",
        description:
          "Epoxidharz-Verpressung zur kraftschlüssigen Schließung statisch relevanter Risse.",
        image: proj2,
      },
    ],
    includes: [
      "Horizontalsperren gegen aufsteigende Feuchtigkeit",
      "PUR- und Acrylatgel-Injektionen bei drückendem Wasser",
      "Epoxidharz-Verpressung zur kraftschlüssigen Rissschließung",
      "Flächeninjektion und Schleierinjektion im Erdreich",
      "Voruntersuchung, Materialwahl und Dokumentation",
    ],
    benefits: [
      "Nachhaltige Trockenlegung ohne aufwendige Freilegung",
      "Wiederherstellung der statischen Tragfähigkeit",
      "Einsatz geprüfter und zertifizierter Materialien",
      "Minimaler Eingriff in bestehende Bausubstanz",
    ],
    whyUs: WHY_US_DEFAULT,
  },
  {
    slug: "fenster-und-tueren",
    title: "Fenster und Türen",
    subtitle: "Energieeffiziente und einbruchhemmende Montage für Neubau und Sanierung",
    icon: DoorOpen,
    intro:
      "Hochwertige Fenster- und Türenmontage für Neubau und Sanierung – energieeffizient, einbruchhemmend und ästhetisch auf Ihr Gebäude abgestimmt.",
    paragraph:
      "Bei Fenstern und Türen begleitet Sie Munich Construction GmbH von der Produktberatung über das Aufmaß bis zur fachgerechten RAL-Montage. Wir koordinieren Hersteller, Demontage, Entsorgung und Anschlussarbeiten und sorgen für eine präzise, dichte und ästhetisch saubere Einbausituation – pünktlich und mit minimaler Beeinträchtigung der Nutzung.",
    gallery: [
      {
        title: "Window and Door Installation",
        location: "München, Deutschland",
        description:
          "Einbau und Austausch von Fenstern und Türen mit präziser Passung und sauberer Endverarbeitung.",
        image: fensterImg,
      },
      {
        title: "Villa am Starnberger See",
        location: "Starnberg",
        description:
          "Hochwertige Aluminium-Fensteranlagen mit RC2-Einbruchschutz und energieeffizienter Verglasung.",
        image: proj6,
      },
      {
        title: "Wohnhaus Bogenhausen",
        location: "München · Bogenhausen",
        description:
          "Komplettmontage von Haus- und Innentüren in Premium-Ausführung inkl. Anschlussarbeiten.",
        image: proj1,
      },
    ],
    includes: [
      "Holz-, Kunststoff- und Aluminiumfenster nach Maß",
      "Haus-, Wohnungs- und Innentüren in Premium-Ausführung",
      "RAL-Montage nach geltenden Richtlinien",
      "Einbruchschutz nach RC2 / RC3",
      "Demontage, Entsorgung und Anschlussarbeiten",
    ],
    benefits: [
      "Spürbare Reduktion der Heiz- und Energiekosten",
      "Verbesserter Schall- und Einbruchschutz",
      "Langlebige Markenprodukte mit Herstellergarantie",
      "Saubere Ausführung mit minimalen Nutzungsausfällen",
    ],
    whyUs: WHY_US_DEFAULT,
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return HOME_SERVICES.find((s) => s.slug === slug);
}
