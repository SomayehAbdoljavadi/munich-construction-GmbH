import type { Lang } from "@/lib/i18n";

type L = { de: string; en: string };

export interface FAQ {
  q: L;
  a: L;
}

const COMMON_FAQS: FAQ[] = [
  {
    q: {
      de: "Welche Leistungen bietet Munich Construction GmbH an?",
      en: "What services does Munich Construction GmbH provide?",
    },
    a: {
      de: "Wir bieten Brandschutz, Trockenbau, Injektion und Risssperrung, Fenster und Türen sowie Renovierung, Sanierung, Innenausbau und Modernisierung im Bestand — alles aus einer Hand.",
      en: "We provide fire protection, drywall, injection & crack sealing, windows & doors, as well as renovation, refurbishment, interior construction and modernisation — all from a single source.",
    },
  },
  {
    q: {
      de: "In welchen Regionen ist Munich Construction GmbH tätig?",
      en: "Which areas do you serve?",
    },
    a: {
      de: "Wir arbeiten in München und im gesamten Großraum Bayern. Auf Anfrage realisieren wir Projekte auch in weiteren Regionen Deutschlands.",
      en: "We operate in Munich and across the wider Bavaria region. On request, we also deliver projects in other parts of Germany.",
    },
  },
  {
    q: {
      de: "Bieten Sie eine kostenlose Erstberatung an?",
      en: "Do you offer a free initial consultation?",
    },
    a: {
      de: "Ja. Wir bieten eine kostenlose Erstberatung vor Ort oder telefonisch, um Ihr Projekt einzuschätzen und ein verbindliches Angebot zu erstellen.",
      en: "Yes. We offer a free initial consultation on-site or by phone to assess your project and prepare a binding quote.",
    },
  },
];

export const FAQS_BY_SERVICE: Record<string, FAQ[]> = {
  brandschutz: [
    ...COMMON_FAQS,
    {
      q: {
        de: "Welche Brandschutzmaßnahmen führen Sie aus?",
        en: "Which fire protection works do you carry out?",
      },
      a: {
        de: "Wir realisieren passiven Brandschutz nach Bayerischer Bauordnung — Brandabschottungen für Wand- und Deckendurchführungen, Brandschutzbeschichtungen, feuerwiderstandsfähige Wand- und Deckensysteme sowie die vollständige Dokumentation für Behörden und Versicherungen.",
        en: "We deliver passive fire protection compliant with the Bavarian Building Code — fire-stopping of wall and slab penetrations, intumescent coatings, fire-rated wall and ceiling systems, and full documentation for authorities and insurers.",
      },
    },
    {
      q: {
        de: "Erstellen Sie auch ein Brandschutzkonzept?",
        en: "Do you also create a fire-protection concept?",
      },
      a: {
        de: "Ja. Wir erarbeiten Brandschutzkonzepte gemäß den geltenden Vorschriften und koordinieren die Umsetzung mit allen beteiligten Gewerken.",
        en: "Yes. We develop fire-protection concepts per applicable codes and coordinate execution across all involved trades.",
      },
    },
  ],
  trockenbau: [
    ...COMMON_FAQS,
    {
      q: {
        de: "Welche Trockenbauarbeiten übernehmen Sie?",
        en: "What kind of drywall works do you take on?",
      },
      a: {
        de: "Innenwände, Trennwände, abgehängte und akustisch optimierte Decken, Verkleidungen, Vorsatzschalen und Spezialwände für Büro, Gewerbe und Wohnbau — auf Wunsch inklusive Schall- und Brandschutzanforderungen.",
        en: "Interior walls, partitions, suspended and acoustically tuned ceilings, linings and special walls for office, commercial and residential projects — including acoustic and fire-protection requirements on request.",
      },
    },
    {
      q: {
        de: "Wie lange dauert ein typisches Trockenbauprojekt?",
        en: "How long does a typical drywall project take?",
      },
      a: {
        de: "Die Dauer hängt von Größe und Anforderungen ab. Eine einzelne Wohnung ist meist in 1–2 Wochen umgesetzt, größere Gewerbeflächen entsprechend länger. Wir nennen Ihnen den genauen Zeitplan nach dem Aufmaß.",
        en: "Duration depends on size and requirements. A single apartment is typically completed in 1–2 weeks; larger commercial spaces take longer. We confirm an exact schedule after the on-site survey.",
      },
    },
  ],
  "injektion-und-risssperrung": [
    ...COMMON_FAQS,
    {
      q: {
        de: "Wann ist eine Injektion oder Risssperrung sinnvoll?",
        en: "When is injection or crack sealing the right solution?",
      },
      a: {
        de: "Bei eindringender Feuchte, aufsteigender Nässe im Mauerwerk, undichten Rissen in Beton oder Kellerwänden sowie zur nachträglichen Horizontalabdichtung. Wir prüfen die Ursache und wählen das passende Injektionssystem.",
        en: "Whenever water ingress, rising damp, leaking cracks in concrete or basement walls, or a retrofit horizontal damp-proof course is required. We assess the cause and choose the right injection system.",
      },
    },
    {
      q: {
        de: "Sind die eingesetzten Materialien dauerhaft?",
        en: "Are the materials used permanent?",
      },
      a: {
        de: "Wir verwenden geprüfte Injektionsharze und Abdichtungssysteme mit langfristiger Eignung. Die Ausführung erfolgt nach Herstellervorgaben und wird dokumentiert.",
        en: "We use certified injection resins and waterproofing systems suitable for long-term use, executed to the manufacturer's specifications and documented.",
      },
    },
  ],
  "fenster-und-tueren": [
    ...COMMON_FAQS,
    {
      q: {
        de: "Welche Arten von Fenstern und Türen bieten Sie an?",
        en: "What types of windows and doors do you install?",
      },
      a: {
        de: "Wir liefern und montieren energieeffiziente Kunststoff-, Holz- und Aluminiumfenster sowie Haus-, Wohnungs- und Innentüren — Neubau und Sanierung im Bestand inklusive Anschluss- und Dichtarbeiten.",
        en: "We supply and install energy-efficient PVC, timber and aluminium windows, as well as entrance, apartment and interior doors — for new builds and refurbishments, including jointing and sealing works.",
      },
    },
    {
      q: {
        de: "Können bestehende Fenster im Sanierungsfall ersetzt werden?",
        en: "Can existing windows be replaced during a refurbishment?",
      },
      a: {
        de: "Ja. Wir tauschen Bestandsfenster fachgerecht aus, optimieren Wärmedämmung und Schallschutz und führen alle Anschlussarbeiten an Putz, Fensterbank und Innenleibung aus.",
        en: "Yes. We professionally replace existing windows, improve thermal and acoustic performance, and complete all interface works to plaster, sills and reveals.",
      },
    },
  ],
};

export function getFaqs(slug: string, lang: Lang): { q: string; a: string }[] {
  const list = FAQS_BY_SERVICE[slug] ?? COMMON_FAQS;
  return list.map((f) => ({ q: f.q[lang], a: f.a[lang] }));
}

export function getFaqsBilingual(slug: string): FAQ[] {
  return FAQS_BY_SERVICE[slug] ?? COMMON_FAQS;
}
