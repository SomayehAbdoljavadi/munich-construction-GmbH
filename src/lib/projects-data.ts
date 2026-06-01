// Auto-discovers per-project image folders under
// src/assets/projects/<projectSlug>/*
// Each project folder contains a meta.json: { name, location }

type Meta = { name: string; location: string; count?: number };

const metaModules = import.meta.glob("/src/assets/projects/*/meta.json", {
  eager: true,
}) as Record<string, { default: Meta }>;

const imageModules = import.meta.glob(
  "/src/assets/projects/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export interface Project {
  slug: string;
  name: string;
  location: string;
  images: string[];
}

function titleize(s: string): string {
  if (!s) return s;
  // Capitalize first letter of each space-separated word if it starts with lowercase
  return s
    .split(" ")
    .map((w) => (w && /^[a-zäöüß]/.test(w) ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function buildProjects(): Project[] {
  const map: Record<string, Project> = {};
  for (const [path, mod] of Object.entries(metaModules)) {
    const m = path.match(/\/src\/assets\/projects\/([^/]+)\/meta\.json$/);
    if (!m) continue;
    const [, slug] = m;
    map[slug] = {
      slug,
      name: titleize(mod.default.name || slug),
      location: mod.default.location || "",
      images: [],
    };
  }
  for (const [path, url] of Object.entries(imageModules)) {
    const m = path.match(/\/src\/assets\/projects\/([^/]+)\/([^/]+)$/);
    if (!m) continue;
    const [, slug] = m;
    let entry = map[slug];
    if (!entry) {
      entry = { slug, name: titleize(slug), location: "", images: [] };
      map[slug] = entry;
    }
    entry.images.push(url);
  }
  for (const p of Object.values(map)) p.images.sort();
  return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
}

export const PROJECTS: Project[] = buildProjects();
