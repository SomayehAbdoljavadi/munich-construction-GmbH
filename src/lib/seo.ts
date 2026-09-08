// Centralised SEO / GEO helpers — consistent canonical & OG URLs across routes.
export const BASE_URL = "https://munichconstruction.de";
export const SITE_NAME = "Munich Construction GmbH";

export const url = (path: string) => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${p}`;
};

// Shared organisation / local-business identity used across JSON-LD blocks.
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["GeneralContractor", "LocalBusiness", "Organization"],
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Munich Construction",
  legalName: "Munich Construction GmbH",
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.png`,
  image: `${BASE_URL}/favicon.png`,
  description:
    "Munich Construction GmbH is a Munich-based construction company offering fire protection, drywall, injection & crack sealing, windows & doors, renovation, refurbishment, interior construction and building modernisation across Munich and Bavaria.",
  email: "info@munichconstruction.de",
  telephone: "+49 89 57843675",
  priceRange: "€€",
  foundingLocation: { "@type": "Place", name: "Munich, Germany" },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Blütenstraße 21",
      postalCode: "80799",
      addressLocality: "München",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Heiterwanger Straße 30",
      postalCode: "81373",
      addressLocality: "München",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+49 89 57843675",
      contactType: "customer service",
      email: "info@munichconstruction.de",
      areaServed: ["DE", "Munich", "Bavaria"],
      availableLanguage: ["de", "en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+49 176 32354815",
      contactType: "sales",
      areaServed: ["DE", "Munich", "Bavaria"],
      availableLanguage: ["de", "en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "reservations",
      name: "Bauberatung / Erstgespräch",
      url: `${BASE_URL}/beratung`,
      email: "office@munichconstruction.de",
      areaServed: ["DE", "Munich", "Bavaria"],
      availableLanguage: ["de", "fa"],
    },
  ],
  areaServed: [
    { "@type": "City", name: "Munich" },
    { "@type": "AdministrativeArea", name: "Bavaria" },
    { "@type": "Country", name: "Germany" },
  ],
  knowsAbout: [
    "Construction",
    "Renovation",
    "Refurbishment",
    "Fire Protection",
    "Drywall",
    "Interior Construction",
    "Windows and Doors",
    "Facade Work",
    "Injection and Crack Sealing",
    "Building Modernisation",
    "Construction Management",
    "Permit Planning",
    "Execution Planning",
  ],
  slogan: "Präzision · Struktur · Vertrauen",
};

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BASE_URL,
  name: SITE_NAME,
  inLanguage: ["de-DE", "en"],
  publisher: { "@id": ORG_ID },
};

export const breadcrumb = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: url(it.path),
  })),
});

export const ldScript = (obj: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(obj),
});

/**
 * Absolute URL for a bundled asset (Vite emits root-relative paths in
 * production). Returns undefined for anything that is not root-relative,
 * so we never emit a broken/relative og:image.
 */
export const assetUrl = (src?: string): string | undefined => {
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${BASE_URL}${src}`;
  return undefined;
};

/** Brand fallback share image. */
export const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.png`;
export const DEFAULT_OG_IMAGE_ALT = "Logo der Munich Construction GmbH, Bauunternehmen in München";

/** og:image + twitter:image pair with alt text. Absolute URLs only. */
export const socialImage = (src: string | undefined, alt: string) => {
  const href = assetUrl(src) ?? DEFAULT_OG_IMAGE;
  return [
    { property: "og:image", content: href },
    { property: "og:image:alt", content: alt },
    { name: "twitter:image", content: href },
    { name: "twitter:image:alt", content: alt },
  ];
};

/** WebPage entity tied to the site + organisation identity. */
export const webPage = (opts: {
  path: string;
  name: string;
  description: string;
  inLanguage?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage";
  primaryImage?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": opts.type ?? "WebPage",
  "@id": `${url(opts.path)}#webpage`,
  url: url(opts.path),
  name: opts.name,
  description: opts.description,
  inLanguage: opts.inLanguage ?? "de-DE",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  ...(assetUrl(opts.primaryImage)
    ? { primaryImageOfPage: { "@type": "ImageObject", url: assetUrl(opts.primaryImage) } }
    : {}),
});
