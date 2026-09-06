// SEO landing pages for individual reference projects.
// Facts are limited to what is verifiable from the project folders:
// project name, address/city and the services documented for that object.

import { PROJECTS, type Project } from "@/lib/projects-data";
import { ALL_SERVICES_I18N, type ServiceDetailI18n } from "@/lib/services-data";
import type { Lang } from "@/lib/i18n";

type L = { de: string; en: string };

interface ProjectPageDef {
  /** SEO slug used in the public URL. */
  slug: string;
  /** Folder slug in src/assets/projects. */
  source: string;
  /** Service slugs documented for this object. */
  services: string[];
  city: string;
  objectType: L;
}

const DEFS: ProjectPageDef[] = [
  {
    slug: "albert-rosshaupter-strasse-muenchen",
    source: "albert-rosshaupter-strasse-22-81369-munchen",
    services: ["trockenbau", "fenster-und-tueren"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
  {
    slug: "arthotel-paul-heyse-strasse-muenchen",
    source: "arthotelmunich-paul-heyse-strasse-10-80336-munchen",
    services: ["brandschutz", "trockenbau"],
    city: "München",
    objectType: { de: "Hotelgebäude", en: "hotel building" },
  },
  {
    slug: "bluetenstrasse-21-muenchen",
    source: "blutenstr-21-munchen",
    services: ["trockenbau", "injektion-und-risssperrung", "fenster-und-tueren"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
  {
    slug: "boschtsrieder-strasse-muenchen",
    source: "boschtsrieder-str-120-munchen",
    services: ["trockenbau"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
  {
    slug: "heiterwanger-strasse-30-muenchen",
    source: "heiterwanger-str-30-81373-munchen",
    services: ["trockenbau"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
  {
    slug: "heiterwanger-strasse-32-muenchen",
    source: "heiterwanger-str-32-81373-munchen",
    services: ["trockenbau"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
  {
    slug: "hotel-bayerischer-hof-bayreuth",
    source: "hotel-bayerischer-bahnhofstrasse-14-95444-bayreuth",
    services: ["brandschutz", "trockenbau"],
    city: "Bayreuth",
    objectType: { de: "Hotelgebäude", en: "hotel building" },
  },
  {
    slug: "kinderfan-kurt-schumacher-strasse-augsburg",
    source: "kinderfan-kurt-schumacher-strasse-63-86165-augsburg",
    services: ["brandschutz", "trockenbau", "fenster-und-tueren"],
    city: "Augsburg",
    objectType: { de: "Gewerbeobjekt", en: "commercial property" },
  },
  {
    slug: "thaddaeus-eck-strasse-muenchen",
    source: "thaddaus-eck-strasse-2a-81247-munchen",
    services: ["trockenbau"],
    city: "München",
    objectType: { de: "Bestandsgebäude", en: "existing building" },
  },
];

export interface ProjectPage {
  slug: string;
  sourceSlug: string;
  name: string;
  location: string;
  city: string;
  objectType: L;
  images: string[];
  services: ServiceDetailI18n[];
}

function build(): ProjectPage[] {
  const bySlug: Record<string, Project> = Object.fromEntries(
    PROJECTS.map((p) => [p.slug, p]),
  );
  const pages: ProjectPage[] = [];
  for (const def of DEFS) {
    const p = bySlug[def.source];
    if (!p || p.images.length === 0) continue;
    pages.push({
      slug: def.slug,
      sourceSlug: def.source,
      name: p.name,
      location: p.location,
      city: def.city,
      objectType: def.objectType,
      images: p.images,
      services: def.services
        .map((s) => ALL_SERVICES_I18N.find((x) => x.slug === s))
        .filter((s): s is ServiceDetailI18n => Boolean(s)),
    });
  }
  return pages;
}

export const PROJECT_PAGES: ProjectPage[] = build();

export function getProjectPage(slug: string): ProjectPage | undefined {
  return PROJECT_PAGES.find((p) => p.slug === slug);
}

export function getProjectPagesForService(serviceSlug: string): ProjectPage[] {
  return PROJECT_PAGES.filter((p) => p.services.some((s) => s.slug === serviceSlug));
}

/** Localised, strictly fact-based copy for a project page. */
export function projectCopy(p: ProjectPage, lang: Lang) {
  const services = p.services.map((s) => s.title[lang]);
  const list = services.join(lang === "de" ? " und " : " and ");
  const type = p.objectType[lang];
  return {
    title:
      lang === "de"
        ? `${p.name} – ${list} in ${p.city}`
        : `${p.name} – ${list} in ${p.city}`,
    intro:
      lang === "de"
        ? `Referenzprojekt der Munich Construction GmbH: ${type} in der ${p.location}. Ausgeführte Leistungen: ${list}.`
        : `Reference project by Munich Construction GmbH: ${type} at ${p.location}. Services delivered: ${list}.`,
    situation:
      lang === "de"
        ? `Das Objekt befindet sich in der ${p.location}. Vor Ausführungsbeginn wurde der Bestand vor Ort aufgenommen und die erforderlichen Arbeiten mit dem Auftraggeber abgestimmt.`
        : `The property is located at ${p.location}. Before works began, the existing situation was surveyed on site and the required works were agreed with the client.`,
    execution:
      lang === "de"
        ? `Die Ausführung umfasste ${list}. Die Arbeiten wurden von unserem Team koordiniert und in ${p.images.length} dokumentierten Aufnahmen festgehalten.`
        : `Execution covered ${list}. The works were coordinated by our team and recorded in ${p.images.length} documented photographs.`,
    result:
      lang === "de"
        ? `Die Leistungen wurden fertiggestellt und dem Auftraggeber übergeben. Die Baudokumentation zeigt den ausgeführten Zustand.`
        : `The works were completed and handed over to the client. The construction documentation shows the executed state.`,
    alt: (i: number) =>
      lang === "de"
        ? `${list} – ${p.name}, ${p.location} – Baudokumentation Bild ${i + 1}`
        : `${list} – ${p.name}, ${p.location} – construction documentation image ${i + 1}`,
  };
}
