# SEO Report — Munich Construction GmbH

Domain: **https://munichconstruction.de** (non-www canonical)
Scope: every public route — 9 services, consultation, 9 projects, company and legal pages.
Status of this report: **fully verified live on production, 9 September 2026 — including the Blütenstraße 21 H1 correction, which is now live.**

Companion files (not served publicly):

- `SEO_METADATA_INVENTORY.json` — exact rendered tags for all 28 production routes
- `SEO_INVENTORY_FULL.md` — readable page-by-page inventory
- `SEO_IMAGE_ALT_INVENTORY.csv` — image alt text as rendered on production

## 1. Route inventory (28 URLs, all HTTP 200)

| Group | Count | URLs |
|---|---|---|
| Core | 4 | `/`, `/about`, `/contact`, `/careers` |
| Services | 10 | `/services` + `/services/{brandschutz, trockenbau, injektion-und-risssperrung, fenster-und-tueren, neubau, renovierung, sanierung, genehmigungsplanung, werkplanung}` |
| Consultation | 1 | `/beratung` |
| Projects | 10 | `/projects` + 9 project detail pages |
| Legal | 2 | `/imprint`, `/datenschutz` |
| Utility | 1 | `/termin` (noindex, nofollow — token-bearing) |

`sitemap.xml` returns 200 with 27 `<loc>` entries, all non-www, `/termin` excluded. `robots.txt` allows all crawlers, welcomes AI crawlers and points at the non-www sitemap.

## 2. Verification of the published corrections (production, 9 Sep 2026)

| Check | Result |
|---|---|
| `/services` H1 | **Bauleistungen in München und Bayern** — live. "Transparente und faire Preise." retained as visible supporting text. |
| `/projects/heiterwanger-strasse-30-muenchen` title | `Heiterwanger Straße 30 – Trockenbau München \| Munich Construction` — live |
| `/projects/heiterwanger-strasse-32-muenchen` title | `Heiterwanger Straße 32 – Trockenbau München \| Munich Construction` — live |
| Heiterwanger H1 / description / og / twitter / JSON-LD | House number 30 / 32 present in every field on the respective page — live |
| Blütenstraße 21 | Full name live in title, H1, description, Open Graph, Twitter and structured data. **H1 live as** “Blütenstraße 21 – Trockenbau, Injektion und Risssperrung sowie Fenster und Türen in München” |
| Title uniqueness | 28 / 28 titles unique on production |
| `/termin` | `noindex, nofollow` live; absent from the 27-URL sitemap |
| Hotel Bayerischer | unchanged, as instructed |
| Preview vs production | zero differences in title, description or robots across all 28 routes |

The `/services` H1 change improves topical clarity about what the page covers; it is not a ranking promise.

## 3. Tags implemented on every content route

- `<title>` (German-first, unique across all 28 routes)
- `meta description` (unique, German, local intent)
- `link rel="canonical"` — absolute, non-www, self-referencing, leaf routes only
- `og:title`, `og:description`, `og:url`, `og:type`
- `twitter:card`, `twitter:title`, `twitter:description`
- `og:image` + `twitter:image` (absolute production URLs) on all 26 content routes. Legal pages and `/termin` intentionally carry none rather than a low-quality placeholder.
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1` sitewide; `noindex, nofollow` on `/termin`; `noindex, follow` on unknown service/project slugs.

## 4. Structured data

- Sitewide: `GeneralContractor / LocalBusiness / Organization` (Büro Blütenstraße 21 and Unternehmensanschrift Heiterwanger Straße 30), `WebSite`.
- Per page: `WebPage` / `CollectionPage` / `ItemPage` / `AboutPage` / `ContactPage`, tied to the site and organisation IDs.
- Services: `Service` entities with provider, area served and service list; consultation `Service` carries `availableLanguage: ["de","fa"]`.
- Projects: `CreativeWork` with `locationCreated`, verified address and trades performed.
- `BreadcrumbList` on every non-home route.

## 5. Search intent mapping

- **Service intent** — each service page targets "<Leistung> in München" in title and H1.
- **Consultation intent** — `/beratung` targets "Bauberatung München" and declares German and Persian consultation languages in the `Service` schema and the organisation contact point.
- **Project/proof intent** — each project page targets "<Objekt> – <Leistung> <Stadt>", using only verified facts.
- **Support stages** — `/about` (trust), `/contact` (enquiry), `/careers` (recruiting), legal pages (compliance).

## 6. Language handling

German and English share the same URLs (client-side switch), so **no hreflang tags were invented** — that would be inaccurate. German is the crawlable default (`<html lang="de">`).

## 7. Remaining items

- **Hotel Bayerischer** — kept as-is. The only authoritative source in the project data is the folder metadata (`Hotel Bayerischer`, `Bahnhofstraße 14, 95444 Bayreuth`). Provide the verified full name and it will be applied to title, H1 and content.
- No dedicated 1200×630 branded share image exists; the brand logo is used as the fallback and legal pages carry none.

- No hreflang, by design.
