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
  neubau: [
    ...COMMON_FAQS,
    {
      q: { de: "Übernehmen Sie Neubauprojekte schlüsselfertig?", en: "Do you deliver new builds turn-key?" },
      a: { de: "Ja. Wir koordinieren Rohbau, Ausbau und Fachgewerke bis zur schlüsselfertigen Übergabe und bleiben dabei zentraler Ansprechpartner für den Bauherrn.", en: "Yes. We coordinate shell, fit-out and specialist trades through to turn-key handover and remain the client's central point of contact." },
    },
    {
      q: { de: "Arbeiten Sie mit vorhandenen Architekten und Fachplanern zusammen?", en: "Do you work with existing architects and specialist planners?" },
      a: { de: "Ja. Wir bauen auf vorhandenen Planungsunterlagen auf, prüfen sie auf Ausführbarkeit und stimmen offene Punkte direkt mit den beteiligten Planern ab.", en: "Yes. We build on existing planning documents, check them for buildability and clarify open points directly with the planners involved." },
    },
  ],
  renovierung: [
    ...COMMON_FAQS,
    {
      q: { de: "Kann während der Renovierung weiter gewohnt oder gearbeitet werden?", en: "Can the property stay in use during renovation?" },
      a: { de: "In vielen Fällen ja. Wir planen die Arbeiten in Bauabschnitten, arbeiten staubarm und vereinbaren feste Zeitfenster, damit die Nutzung möglichst wenig eingeschränkt wird.", en: "In many cases yes. We plan the works in phases, keep dust to a minimum and agree fixed time windows so that use is restricted as little as possible." },
    },
    {
      q: { de: "Was kostet eine Renovierung in München?", en: "What does a renovation in Munich cost?" },
      a: { de: "Die Kosten hängen von Fläche, Zustand und Leistungsumfang ab. Nach einer Besichtigung erhalten Sie ein klar gegliedertes Angebot mit Einzelpositionen und Zeitrahmen.", en: "Cost depends on area, condition and scope. After a site visit you receive a clearly structured quote with individual line items and a time frame." },
    },
  ],
  sanierung: [
    ...COMMON_FAQS,
    {
      q: { de: "Wie gehen Sie bei Feuchteschäden vor?", en: "How do you deal with moisture damage?" },
      a: { de: "Wir klären zuerst die Ursache, bevor wir instand setzen. Erst danach werden Abdichtung, Injektion oder Bauteilinstandsetzung festgelegt, damit der Schaden nicht wiederkehrt.", en: "We identify the cause before repairing. Only then do we decide on waterproofing, injection or component repair, so the damage does not return." },
    },
    {
      q: { de: "Eignet sich eine Sanierung auch für Münchner Altbauten?", en: "Is refurbishment suitable for older Munich buildings?" },
      a: { de: "Ja. Gerade im Altbau achten wir darauf, vorhandene Substanz zu erhalten und Verfahren zu wählen, die zum Bestand und zu den heutigen Anforderungen passen.", en: "Yes. In older buildings in particular we take care to preserve existing substance and choose methods that suit both the fabric and today's requirements." },
    },
  ],
  genehmigungsplanung: [
    ...COMMON_FAQS,
    {
      q: { de: "Übernehmen Sie den kompletten Bauantrag?", en: "Do you handle the entire building application?" },
      a: { de: "Ja. Wir stellen die Unterlagen zusammen, koordinieren Statik und Brandschutz, reichen ein und bearbeiten Rückfragen der Behörde bis zur Genehmigung.", en: "Yes. We compile the documents, coordinate structural and fire-protection input, submit the application and handle authority queries through to approval." },
    },
    {
      q: { de: "Wie lange dauert ein Genehmigungsverfahren in München?", en: "How long does an approval procedure in Munich take?" },
      a: { de: "Die Dauer hängt von Vorhaben und Behörde ab. Vollständige, prüffähige Unterlagen sind der wirksamste Hebel, um vermeidbare Verzögerungen zu verhindern.", en: "Duration depends on the project and the authority. Complete, reviewable documents are the most effective way to avoid unnecessary delays." },
    },
  ],
  werkplanung: [
    ...COMMON_FAQS,
    {
      q: { de: "Worin unterscheidet sich Werkplanung von der Genehmigungsplanung?", en: "How does execution planning differ from permit planning?" },
      a: { de: "Die Genehmigungsplanung dient der Behörde, die Werkplanung der Baustelle. Sie legt Details, Materialien und Anschlüsse so fest, dass sie unmittelbar baubar sind.", en: "Permit planning serves the authority, execution planning serves the site. It defines details, materials and interfaces so they can be built directly." },
    },
    {
      q: { de: "Erstellen Sie Werkplanung auch für Bestandsgebäude?", en: "Do you also provide execution planning for existing buildings?" },
      a: { de: "Ja. Auf Basis eines Bestandsaufmaßes entwickeln wir Details, die zu den tatsächlich vorhandenen Maßen und Anschlüssen passen.", en: "Yes. Based on an as-built survey we develop details that match the dimensions and connections actually present." },
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
