// Auto-discovers per-project image folders under
// src/assets/services/<serviceSlug>/<projectSlug>/*
// Each project folder contains a meta.json: { name, location }
// Images are listed in filename order, so the "cover" (renamed to 00.*)
// always appears first.

type Meta = { name: string; location: string; count?: number };

const metaModules = import.meta.glob("/src/assets/services/*/*/meta.json", {
  eager: true,
}) as Record<string, { default: Meta }>;

const imageModules = import.meta.glob(
  "/src/assets/services/*/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export interface ProjectSlide {
  image: string;
  projectName: string;
  projectLocation: string;
  index: number; // 1-based index within the project
  total: number; // total images in the project
}

interface ProjectEntry {
  serviceSlug: string;
  projectSlug: string;
  meta: Meta;
  images: string[]; // sorted by filename
}

function buildIndex(): Record<string, ProjectEntry[]> {
  // First gather every project from meta files
  const byService: Record<string, ProjectEntry[]> = {};
  const projects: Record<string, ProjectEntry> = {};

  for (const [path, mod] of Object.entries(metaModules)) {
    // /src/assets/services/<service>/<project>/meta.json
    const m = path.match(/\/src\/assets\/services\/([^/]+)\/([^/]+)\/meta\.json$/);
    if (!m) continue;
    const [, serviceSlug, projectSlug] = m;
    const entry: ProjectEntry = {
      serviceSlug,
      projectSlug,
      meta: mod.default,
      images: [],
    };
    projects[`${serviceSlug}/${projectSlug}`] = entry;
  }

  for (const [path, url] of Object.entries(imageModules)) {
    const m = path.match(/\/src\/assets\/services\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (!m) continue;
    const [, serviceSlug, projectSlug] = m;
    const key = `${serviceSlug}/${projectSlug}`;
    let entry = projects[key];
    if (!entry) {
      entry = {
        serviceSlug,
        projectSlug,
        meta: { name: projectSlug, location: "" },
        images: [],
      };
      projects[key] = entry;
    }
    entry.images.push(url);
  }

  // Sort images by URL (which embeds the filename), and group by service
  for (const entry of Object.values(projects)) {
    entry.images.sort();
    if (!byService[entry.serviceSlug]) byService[entry.serviceSlug] = [];
    byService[entry.serviceSlug].push(entry);
  }

  // Sort projects per service by projectSlug for deterministic order
  for (const list of Object.values(byService)) {
    list.sort((a, b) => a.projectSlug.localeCompare(b.projectSlug));
  }

  return byService;
}

const INDEX = buildIndex();

export function getProjectSlidesForService(serviceSlug: string): ProjectSlide[] {
  const projects = INDEX[serviceSlug];
  if (!projects || projects.length === 0) return [];
  const slides: ProjectSlide[] = [];
  for (const p of projects) {
    const total = p.images.length;
    p.images.forEach((image, i) => {
      slides.push({
        image,
        projectName: p.meta.name,
        projectLocation: p.meta.location,
        index: i + 1,
        total,
      });
    });
  }
  return slides;
}

export function hasDynamicProjects(serviceSlug: string): boolean {
  return !!INDEX[serviceSlug]?.length;
}
