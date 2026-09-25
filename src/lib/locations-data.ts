// Location landing pages. Only verified facts: the Munich office/registered
// address and reference projects that actually exist in the project data.
import { PROJECT_PAGES } from "@/lib/project-pages";

type L = { de: string; en: string };

export interface LocationDef {
  slug: string;
  city: L;
  region: L;
  /** Services highlighted for this town (service slugs). */
  services: string[];
  intro: L;
  isBase?: boolean;
}

export const LOCATIONS: LocationDef[] = [
  {
    slug: "muenchen",
    city: { de: "München", en: "Munich" },
    region: { de: "Oberbayern", en: "Upper Bavaria" },
    isBase: true,
    services: ["trockenbau", "brandschutz", "renovierung", "sanierung", "injektion-und-risssperrung", "fenster-und-tueren", "neubau", "genehmigungsplanung", "werkplanung"],
    intro: {
      de: "München ist unser Sitz: Unser Büro liegt in der Blütenstraße 21 in der Maxvorstadt, die Unternehmensanschrift in der Heiterwanger Straße 30. Von hier aus betreuen wir Bauprojekte im ganzen Stadtgebiet – von Trockenbau und Brandschutz in Hotels bis zur Sanierung von Bestandsgebäuden.",
      en: "Munich is our home base: our office is at Blütenstraße 21 in Maxvorstadt and our registered address at Heiterwanger Straße 30. From here we handle construction projects across the city – from drywall and fire protection in hotels to the refurbishment of existing buildings.",
    },
  },
  {
    slug: "nuernberg",
    city: { de: "Nürnberg", en: "Nuremberg" },
    region: { de: "Mittelfranken", en: "Middle Franconia" },
    services: ["trockenbau", "brandschutz", "sanierung", "renovierung", "genehmigungsplanung", "werkplanung"],
    intro: {
      de: "Als Bauunternehmen mit Sitz in München sind wir in ganz Bayern tätig – auch in Nürnberg und der Metropolregion. Für Büro-, Gewerbe- und Wohnobjekte übernehmen wir Trockenbau, Brandschutz, Renovierung und Sanierung sowie die Genehmigungs- und Werkplanung.",
      en: "As a construction company based in Munich we work throughout Bavaria – including Nuremberg and its metropolitan region. For office, commercial and residential properties we handle drywall, fire protection, renovation and refurbishment as well as permit and execution planning.",
    },
  },
  {
    slug: "regensburg",
    city: { de: "Regensburg", en: "Regensburg" },
    region: { de: "Oberpfalz", en: "Upper Palatinate" },
    services: ["sanierung", "injektion-und-risssperrung", "renovierung", "trockenbau", "brandschutz", "fenster-und-tueren"],
    intro: {
      de: "Auch in Regensburg und der Oberpfalz stehen wir Eigentümern, Hausverwaltungen und Unternehmen zur Seite – bei Sanierung und Renovierung von Bestandsgebäuden, Injektion und Risssperrung, Trockenbau, Brandschutz sowie Fenstern und Türen.",
      en: "In Regensburg and the Upper Palatinate we support owners, property managers and companies – with refurbishment and renovation of existing buildings, injection and crack sealing, drywall, fire protection and windows and doors.",
    },
  },
  {
    slug: "augsburg",
    city: { de: "Augsburg", en: "Augsburg" },
    region: { de: "Schwaben", en: "Swabia" },
    services: ["brandschutz", "trockenbau", "fenster-und-tueren", "renovierung", "sanierung"],
    intro: {
      de: "In Augsburg haben wir bereits ein Gewerbeobjekt in der Kurt-Schumacher-Straße betreut – mit Brandschutz, Trockenbau sowie Fenstern und Türen. Von München aus sind wir schnell vor Ort und übernehmen Bauleistungen in ganz Schwaben.",
      en: "In Augsburg we have already worked on a commercial property on Kurt-Schumacher-Straße – with fire protection, drywall and windows and doors. From Munich we reach Augsburg quickly and deliver construction services throughout Swabia.",
    },
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);

/** Reference projects actually located in this city. */
export const projectsInCity = (loc: LocationDef) =>
  PROJECT_PAGES.filter((p) => p.city === loc.city.de);
