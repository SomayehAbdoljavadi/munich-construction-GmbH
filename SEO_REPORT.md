# SEO Report — Munich Construction GmbH

Domain: **https://munichconstruction.de** (non-www canonical)
Scope: every public route — 9 services, consultation, 9 projects, company and legal pages.
Status of this report: implemented and verified in **preview**. Live head tags update on the next publish.

Companion files (not served publicly):

- `SEO_METADATA_INVENTORY.json` — exact rendered tags for all 28 routes
- `SEO_IMAGE_ALT_INVENTORY.csv` — image alt-text sources

## 1. Route inventory (28 indexable-checked URLs)

| Group | Count | URLs |
|---|---|---|
| Core | 4 | `/`, `/about`, `/contact`, `/careers` |
| Services | 10 | `/services` + `/services/{brandschutz, trockenbau, injektion-und-risssperrung, fenster-und-tueren, neubau, renovierung, sanierung, genehmigungsplanung, werkplanung}` |
| Consultation | 1 | `/beratung` |
| Projects | 10 | `/projects` + 9 project detail pages |
| Legal | 2 | `/imprint`, `/datenschutz` |
| Utility | 1 | `/termin` (noindex, nofollow — token-bearing) |

`sitemap.xml` lists 27 URLs (all of the above except `/termin`), all non-www. `robots.txt` allows all crawlers, explicitly welcomes AI crawlers and references the non-www sitemap.

## 2. Search intent mapping

- **Service intent** — each service page targets "<Leistung> in München" in the title and H1, with local wording in the description (e.g. "Brandschutz in München", "Trockenbau in München").
- **Consultation intent** — `/beratung` targets "Bauberatung München" and states the German/Persian consultation languages in title, description and `Service` schema (`availableLanguage: ["de","fa"]`, also on the organisation contact point).
- **Project/proof intent** — each project page targets "<Objekt>: <Leistungen> in <Stadt>", using only verified facts (address, city, actual trades performed).
- **Support stages** — `/about` (trust), `/contact` (enquiry), `/careers` (recruiting), legal pages (compliance).

## 3. Tags implemented on every content route

- `<title>` (unique, German-first, ≤ 60–65 chars where possible)
- `meta description` (unique, German, local intent)
- `link rel="canonical"` — absolute, non-www, self-referencing, leaf routes only
- `og:title`, `og:description`, `og:url`, `og:type`
- `twitter:card`, `twitter:title`, `twitter:description`
- `og:image` + `twitter:image` (absolute) on all content routes: home, services overview and all 9 service pages, consultation, projects overview and all 9 project pages, about, contact, careers. Legal pages and `/termin` intentionally carry none rather than a low-quality placeholder.
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1` sitewide; `noindex, nofollow` on `/termin`; `noindex, follow` on unknown service/project slugs.

## 4. Structured data

- Sitewide: `GeneralContractor / LocalBusiness / Organization` (both addresses — Büro Blütenstraße 21 and Unternehmensanschrift Heiterwanger Straße 30), `WebSite`.
- Per page: `WebPage` / `CollectionPage` / `ItemPage` / `AboutPage` / `ContactPage`, each tied to the site and organisation IDs.
- Services: `Service` entities with provider, area served and the service list; consultation `Service` carries `availableLanguage: ["de","fa"]`.
- Projects: `CreativeWork` with `locationCreated`, verified address and the trades performed.
- `BreadcrumbList` on every non-home route.
- Existing FAQ content retained as-is.

## 5. Language handling

The site switches German/English client-side on the same URL, so no separate language URLs exist. Therefore **no hreflang tags were invented** — that would be inaccurate. German is served as the crawlable default (`<html lang="de">`) and all indexed metadata is German-first.

## 6. Images and internal linking

- All meaningful images carry descriptive alt text; the service slideshow now includes the service name plus project name and location. The decorative intro animation stays `alt=""`.
- Cross-linking: services → related projects, projects → the services used, and both → `/beratung` with the descriptive anchor "Bauberatung München – kostenloses Erstgespräch buchen". Header dropdown lists all 9 service pages; the services overview links every service page.

## 7. Verification performed (production, 8 Sep 2026)

All 28 URLs were fetched from `https://munichconstruction.de`:

- 28/28 return HTTP 200.
- 28/28 titles, descriptions and self-referencing non-www canonicals live and identical to the intended values.
- `/termin` returns `noindex, nofollow` live and is absent from the sitemap.
- `sitemap.xml` returns 200 with 27 `<loc>` entries, all `https://munichconstruction.de/...`.
- `robots.txt` returns 200, allows all crawlers and points to the non-www sitemap.
- og:image/twitter:image resolve to absolute hashed production asset URLs on all 26 content pages.
- No `Theresienstraße` or `80333` references remain.

Everything described in this report is confirmed live. Nothing is awaiting publication.

## 8. Remaining items

- `/services` H1 is "Transparente und faire Preise." — accurate to the page, but a Munich-intent H1 would rank better.
- `/projects/heiterwanger-strasse-30-muenchen` and `.../32-muenchen` share the title "Heiterwanger Str.: Trockenbau in München"; the descriptions differ, but the titles should be distinguished by house number.
- Project titles truncate long names ("Hotel Bayerischer", "Blütenstr.").
- No dedicated 1200×630 branded share image exists; legal pages carry none rather than a placeholder.
- No hreflang, by design — German and English share the same URLs.

