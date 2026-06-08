# Munich Construction GmbH — Official Website

The official website for **Munich Construction GmbH**, a construction company based in Munich, Germany. The site presents the company's construction services, project gallery, company background, and contact information in a modern, dark/gold luxury design and is fully bilingual (German / English).

---

## 1. Project Overview

- Public marketing site for **Munich Construction GmbH** (Munich, Germany).
- Showcases construction services, completed projects, company information, and contact details.
- **Bilingual:** German (default) and English, switchable from the header.
- Optimized for search engines (technical SEO + local/GEO signals for Munich).
- Built as a server-rendered React app deployed to **Cloudflare Workers**.

---

## 2. Main Features

- Fully **responsive** layout for desktop, tablet, and mobile.
- **Dark and gold** premium construction aesthetic with custom design tokens.
- **Home page** with animated brand intro, hero, services preview, projects preview, and map.
- **Services overview** (`/services`) and **individual service pages** (`/services/:slug`) with per-service galleries.
- **Project gallery / slideshow** with images scaled responsively, fully visible, never cropped.
- **Contact page** with embedded Leaflet/OpenStreetMap map and clickable Google Maps links.
- **SEO + GEO** optimization: titles, meta descriptions, canonical URLs, Open Graph, Twitter cards.
- **JSON-LD structured data** for the local business and individual services/projects.
- **`sitemap.xml`** served dynamically and **`robots.txt`** in `public/`.
- **Bilingual content** (DE / EN) through an in-app i18n provider.

---

## 3. Tech Stack

| Area | Technology |
| --- | --- |
| UI framework | **React 19** + **TypeScript 5** |
| Meta-framework | **TanStack Start** (SSR) on top of **TanStack Router** (file-based routing) |
| Build tool | **Vite 7** |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/vite`), custom CSS tokens in `src/styles.css` |
| UI primitives | **Radix UI** + **shadcn**-style components in `src/components/ui` |
| Icons | **lucide-react** |
| Forms / validation | **react-hook-form** + **zod** + `@hookform/resolvers` |
| Data / state | **@tanstack/react-query** |
| Map | **leaflet** + **OpenStreetMap** tiles |
| Carousel | **embla-carousel-react** |
| Notifications | **sonner** |
| Animations | **tw-animate-css** + custom CSS keyframes |
| E2E tests | **Playwright** |
| Deployment | **Cloudflare Workers** via `@cloudflare/vite-plugin` and `wrangler.jsonc` |

See `package.json` for the full dependency list.

---

## 4. Project Structure

Only folders that actually exist in the repository:

```
.
├── public/                         # Static assets served as-is
│   ├── favicon.png
│   ├── robots.txt
│   ├── llms.txt
│   └── media/                      # Static media (OG images, etc.)
├── src/
│   ├── assets/                     # Imported images (logos, projects, services)
│   │   ├── projects/<project-slug>/      # One folder per project, includes meta.json + images
│   │   └── services/<service-slug>/...   # Per-service galleries and metadata
│   ├── components/                 # Shared React components
│   │   ├── ui/                     # shadcn/Radix UI primitives
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── LocationMap.tsx
│   │   ├── ServiceGallery.tsx
│   │   ├── BrandIntro.tsx
│   │   └── ...
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # App logic, data, helpers
│   │   ├── i18n.tsx                # German / English translations
│   │   ├── seo.ts                  # Shared SEO + JSON-LD helpers
│   │   ├── services-data.ts
│   │   ├── projects-data.ts
│   │   ├── service-projects.ts
│   │   ├── faqs.ts
│   │   ├── mapLinks.ts
│   │   ├── theme.tsx
│   │   └── utils.ts
│   ├── routes/                     # File-based routes (TanStack Router)
│   │   ├── __root.tsx              # Root layout + global head
│   │   ├── index.tsx               # Home (/)
│   │   ├── about.tsx               # /about
│   │   ├── services.tsx            # /services
│   │   ├── services_.$slug.tsx     # /services/:slug
│   │   ├── projects.tsx            # /projects
│   │   ├── contact.tsx             # /contact
│   │   ├── imprint.tsx             # /imprint
│   │   └── sitemap[.]xml.ts        # GET /sitemap.xml (server route)
│   ├── routeTree.gen.ts            # AUTO-GENERATED — do not edit
│   ├── router.tsx                  # Router setup
│   ├── server.ts                   # SSR server entry
│   ├── start.ts                    # TanStack Start setup
│   └── styles.css                  # Tailwind v4 + design tokens + animations
├── e2e/                            # Playwright end-to-end tests
├── playwright.config.ts
├── vite.config.ts                  # Vite + TanStack Start + Cloudflare plugin
├── wrangler.jsonc                  # Cloudflare Workers config
├── tsconfig.json
├── eslint.config.js
├── components.json                 # shadcn config
└── package.json
```

> Do not edit `src/routeTree.gen.ts` — it is regenerated automatically by the TanStack Router Vite plugin.

---

## 5. Installation

Prerequisites: **Node.js 20+** and **npm** (or **bun** / **pnpm**).

```bash
# 1. Clone the repository
git clone <repository-url>
cd <project-folder>

# 2. Install dependencies
npm install
# or: bun install

# 3. Start the development server (http://localhost:5173)
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 6. Development Workflow

- **Edit a page** — open the matching file in `src/routes/` (e.g. `about.tsx`, `contact.tsx`). Each page sets its own `<head>` via the route's `head()` export.
- **Edit shared layout** — `src/components/SiteHeader.tsx`, `SiteFooter.tsx`, and `src/routes/__root.tsx`.
- **Update services** — edit `src/lib/services-data.ts` (list, slugs, descriptions). Service detail content is rendered by `src/routes/services_.$slug.tsx`. Per-service images live in `src/assets/services/<slug>/...`.
- **Update projects** — edit `src/lib/projects-data.ts` and the project folders under `src/assets/projects/<slug>/` (see section 7).
- **Update translations** — edit the dictionaries in `src/lib/i18n.tsx` (`de` and `en`). Add the same key to both languages.
- **Update SEO metadata** — adjust each route's `head()` (`title`, `meta`, `link rel=canonical`, OG / Twitter tags) and the JSON-LD helpers in `src/lib/seo.ts`.
- **Design tokens** — colors, typography, shadows, gradients, and animations live as CSS variables in `src/styles.css`. Always use semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, etc.) instead of hard-coded colors.
- **Test locally** — `npm run dev`, then verify both `?lang=de` and `?lang=en` paths, the mobile menu, and the contact map.
- **End-to-end tests** — `npm run test:e2e` (Playwright). Tests live in `e2e/`.

---

## 7. Project Images / Gallery Workflow

Project content is **folder-based**. Each project has its own directory under `src/assets/projects/`.

```
src/assets/projects/
├── albert-rosshaupter-strasse-22-81369-munchen/
│   ├── meta.json
│   ├── 01-cover.jpg
│   ├── 02.jpg
│   └── ...
├── arthotelmunich-paul-heyse-strasse-10-80336-munchen/
│   ├── meta.json
│   └── ...
└── ...
```

Rules:

- **One folder = one project.** The folder name is the project slug used in URLs and lookups.
- **`meta.json`** inside each folder holds the project metadata (title, address, year, description, etc.).
- **All images** inside the folder are picked up by the project slideshow, in filename order.
- The **first (cover) image** is used wherever a single preview thumbnail is needed (project cards, social shares).
- Per-service galleries follow the same convention under `src/assets/services/<service-slug>/<project-slug>/`.
- The slideshow scales each image responsively, keeps it fully visible (no cropping), and centers it on a clean dark background.

When adding a new project:

1. Create the folder with a kebab-case slug.
2. Add a `meta.json` mirroring the existing examples.
3. Drop in optimized images (JPEG/WebP recommended, ~1600 px wide).
4. Register the project in `src/lib/projects-data.ts` (and `src/lib/service-projects.ts` if it should appear under a specific service).
5. Run the sitemap (see section 9) to make sure the new entry is included.

---

## 8. Deployment

This project is configured for **Cloudflare Workers** via `@cloudflare/vite-plugin` and `wrangler.jsonc`. SSR runs in the Worker runtime — there is **no separate static `dist/` upload step** for the standard deployment.

Standard deployment (recommended — used by the Lovable preview/production environments):

- Click **Publish** in the Lovable editor, or push to the connected repository — the build is produced by `vite build` and deployed to Cloudflare automatically.
- Manual Cloudflare deploys can be performed with **Wrangler**:

```bash
npm run build
npx wrangler deploy
```

The Worker entry, routes, and asset bindings are defined in `wrangler.jsonc`. Environment variables for production must be set in the Cloudflare dashboard or via `wrangler secret put`.

> **Note on alternative static hosting (e.g. IONOS):** The current project is a server-rendered TanStack Start app targeting Cloudflare Workers. A plain static export to IONOS / shared FTP hosting is **not** supported by this configuration — pages such as `/sitemap.xml` and the SSR shell require the Worker runtime. If static hosting is required, the project must first be reconfigured to a fully client-side build (no SSR, no server routes), which is a separate change.

---

## 9. SEO / GEO Optimization

- **Per-page `<head>`** — every route in `src/routes/*` defines its own `head()` with a unique `title`, meta `description`, `link rel="canonical"`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), and Twitter card tags.
- **Single H1 per page**, semantic landmarks (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`).
- **Structured data (JSON-LD)** generated by helpers in `src/lib/seo.ts`:
  - `LocalBusiness` / `GeneralContractor` schema for Munich Construction GmbH (address, geo, phone, opening hours).
  - `Service` schema for each service page.
  - `Project` / `CreativeWork` schema for project entries where applicable.
  - `BreadcrumbList` on nested routes.
- **Sitemap** — dynamic server route at `src/routes/sitemap[.]xml.ts`, served at `/sitemap.xml`. Update the `entries` array when routes or projects change.
- **`robots.txt`** — `public/robots.txt`, allows all crawlers by default.
- **GEO signals** — German-language copy, Munich address, postal code, and coordinates referenced consistently in the contact page, footer, and JSON-LD.
- **Performance** — lazy loading of images, route-level code splitting, and SSR for fast first paint.

---

## 10. Maintenance Notes

- Keep images **optimized** (compress JPEG / convert to WebP where appropriate, ≤ ~300 KB each, ~1600 px wide max).
- Keep all user-facing strings **bilingual** — every key added to `i18n.tsx` must have both a `de` and `en` value.
- When adding, removing, or renaming a route, **update** `src/routes/sitemap[.]xml.ts` and the relevant nav in `SiteHeader.tsx` / `SiteFooter.tsx`.
- Keep **contact information** (phone numbers, email, addresses) identical in the home page, contact page, footer, and JSON-LD (`src/lib/seo.ts`).
- Test both **German and English** language switches before publishing.
- Test the **mobile menu**, the **contact map**, and the **Google Maps links** after layout changes.
- Run `npm run lint` and `npm run build` locally before deploying.
- Run `npm run test:e2e` after changes that affect layering (header / map / overlays), slideshows, or navigation.
- Do not edit `src/routeTree.gen.ts` — it is regenerated by the Vite plugin.
- Use semantic Tailwind tokens (`bg-background`, `text-foreground`, `bg-primary`, …); never hard-code colors in components.

---

## 11. Available Scripts

From `package.json`:

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite dev` | Start the local dev server with HMR. |
| `build` | `vite build` | Production build (SSR bundle for Cloudflare Workers). |
| `build:dev` | `vite build --mode development` | Development-mode build, useful for debugging. |
| `preview` | `vite preview` | Preview the built output locally. |
| `lint` | `eslint .` | Lint the entire codebase. |
| `format` | `prettier --write .` | Format the codebase with Prettier. |
| `test:e2e` | `playwright test` | Run Playwright end-to-end tests in `e2e/`. |

---

## 12. License / Ownership

This project belongs to **Munich Construction GmbH**.

All company content, copy, images, logos, branding, and project photographs are the property of **Munich Construction GmbH** unless otherwise stated. Third-party libraries are used under their respective open-source licenses (see `package.json` and each package's license).

Map data © **OpenStreetMap** contributors, used under the Open Database License (ODbL).
