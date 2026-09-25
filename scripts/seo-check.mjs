#!/usr/bin/env node
// Automated SEO checks across all public routes.
// Usage: node scripts/seo-check.mjs [baseUrl]   (default http://localhost:8080)
// Checks: areaServed = Bavaria only, unique titles, self-referencing canonical,
// consistent language metadata (html lang, og:locale, inLanguage).

const BASE = (process.argv[2] || "http://localhost:8080").replace(/\/$/, "");
const CANONICAL_ORIGIN = "https://munichconstruction.de";
const ALLOWED_AREA = new Set(["Bavaria", "Bayern"]);
const EXTRA_ROUTES = ["/termin"]; // noindex route, not in sitemap
const LANG = "de";

const errors = [];
const fail = (route, msg) => errors.push(`${route}: ${msg}`);

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  return { status: res.status, text: await res.text() };
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? decode(m[1]) : null;
}

function collectAreaServed(node, out) {
  if (Array.isArray(node)) return node.forEach((n) => collectAreaServed(n, out));
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === "areaServed") {
      for (const a of Array.isArray(v) ? v : [v]) out.push(typeof a === "string" ? a : a?.name ?? JSON.stringify(a));
    } else collectAreaServed(v, out);
  }
}
function collectKey(node, key, out) {
  if (Array.isArray(node)) return node.forEach((n) => collectKey(n, key, out));
  if (!node || typeof node !== "object") return;
  for (const [k, v] of Object.entries(node)) {
    if (k === key) out.push(v);
    else collectKey(v, key, out);
  }
}

const sitemap = (await get("/sitemap.xml")).text;
const routes = [
  ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname),
  ...EXTRA_ROUTES,
];
if (routes.length <= EXTRA_ROUTES.length) fail("/sitemap.xml", "no URLs found");

const titles = new Map();
for (const route of routes) {
  const { status, text } = await get(route);
  if (status !== 200) {
    fail(route, `HTTP ${status}`);
    continue;
  }

  // Title
  const titleM = text.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleM ? decode(titleM[1]).trim() : "";
  if (!title) fail(route, "missing <title>");
  else titles.set(title, [...(titles.get(title) ?? []), route]);

  // Canonical
  const canonicals = [...text.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/gi)].map((m) => attr(m[0], "href"));
  if (canonicals.length === 0) fail(route, "missing canonical");
  else if (canonicals.length > 1) fail(route, `multiple canonicals: ${canonicals.join(", ")}`);
  else {
    const expected = CANONICAL_ORIGIN + (route === "/" ? "/" : route);
    const c = canonicals[0].replace(/\/$/, "") || canonicals[0];
    if (c !== expected.replace(/\/$/, "") && canonicals[0] !== expected)
      fail(route, `canonical "${canonicals[0]}" should be "${expected}"`);
  }

  // Language metadata
  const htmlLang = attr(text.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang");
  if (htmlLang !== LANG) fail(route, `html lang="${htmlLang}" expected "${LANG}"`);
  const metas = [...text.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const ogLocales = metas.filter((m) => attr(m, "property") === "og:locale").map((m) => attr(m, "content"));
  if (ogLocales.length === 0) fail(route, "missing og:locale");
  for (const l of ogLocales) if (!l?.toLowerCase().startsWith(LANG)) fail(route, `og:locale "${l}" inconsistent with html lang`);

  // JSON-LD
  const blocks = [...text.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const areas = [];
  const inLang = [];
  for (const b of blocks) {
    try {
      const data = JSON.parse(b[1]);
      collectAreaServed(data, areas);
      collectKey(data, "inLanguage", inLang);
    } catch {
      fail(route, "invalid JSON-LD block");
    }
  }
  if (areas.length === 0) fail(route, "no areaServed found in JSON-LD");
  for (const a of areas) if (!ALLOWED_AREA.has(a)) fail(route, `incorrect areaServed "${a}" (Bavaria only)`);
  for (const l of inLang.flat()) {
    if (typeof l === "string" && !l.toLowerCase().startsWith(LANG)) fail(route, `JSON-LD inLanguage "${l}" inconsistent`);
  }
}

for (const [title, rs] of titles) if (rs.length > 1) fail(rs.join(", "), `duplicate title "${title}"`);

console.log(`Checked ${routes.length} routes on ${BASE}`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log("All SEO checks passed.");
