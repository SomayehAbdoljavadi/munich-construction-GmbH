// Centralised SEO / GEO helpers — consistent canonical & OG URLs across routes.
export const BASE_URL = "https://www.munichconstruction.de";
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
      streetAddress: "Theresienstraße 93",
      postalCode: "80333",
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
      availableLanguage: ["German", "English"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+49 176 32354815",
      contactType: "sales",
      areaServed: ["DE", "Munich", "Bavaria"],
      availableLanguage: ["German", "English"],
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
