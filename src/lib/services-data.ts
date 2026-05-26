import { Flame, Hammer, Droplet, DoorOpen } from "lucide-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  icon: typeof Flame;
  intro: string;
  includes: string[];
  benefits: string[];
}

export const HOME_SERVICES: ServiceDetail[] = [
  {
    slug: "brandschutz",
    title: "Brandschutz",
    icon: Flame,
    intro:
      "Normgerechte Brandschutzlösungen für Neubau und Bestand – geplant, umgesetzt und dokumentiert nach geltenden Bauvorschriften.",
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
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    icon: Hammer,
    intro:
      "Präziser Trockenbau für Büro, Gewerbe und Wohnbau – von der Raum­aufteilung bis zur schallschutzoptimierten Spezialwand.",
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
  },
  {
    slug: "injektion-und-risssperrung",
    title: "Injektion und Risssperrung",
    icon: Droplet,
    intro:
      "Bauwerksabdichtung und Rissverpressung mit professionellen Injektionsverfahren – nachhaltige Lösungen gegen Feuchte, Wasser­eintritt und strukturelle Schäden.",
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
  },
  {
    slug: "fenster-und-tueren",
    title: "Fenster und Türen",
    icon: DoorOpen,
    intro:
      "Hochwertige Fenster- und Türenmontage für Neubau und Sanierung – energieeffizient, einbruchhemmend und ästhetisch auf Ihr Gebäude abgestimmt.",
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
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return HOME_SERVICES.find((s) => s.slug === slug);
}
