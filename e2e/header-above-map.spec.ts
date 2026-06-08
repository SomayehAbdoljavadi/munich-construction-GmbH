import { expect, test, type Page } from "@playwright/test";

const ROUTES = ["/", "/contact"] as const;

async function dismissIntro(page: Page) {
  // Brand intro overlay plays once and then unmounts. Wait until the sticky
  // header is actually visible and interactive before measuring layout.
  await page.waitForLoadState("networkidle");
  await page.waitForSelector("header", { state: "visible", timeout: 15_000 });
}

async function scrollMapBehindHeader(page: Page) {
  // Scroll the Leaflet container into the viewport so its top sits just
  // under the sticky header — that's where any z-index regression appears.
  const handle = await page.waitForSelector(".mc-map-grayscale", {
    state: "attached",
    timeout: 15_000,
  });
  await handle.scrollIntoViewIfNeeded();
  // Then nudge further so the map's top edge is hidden behind the header.
  await page.evaluate(() => {
    const header = document.querySelector("header");
    const map = document.querySelector(".mc-map-grayscale") as HTMLElement | null;
    if (!header || !map) return;
    const headerH = header.getBoundingClientRect().height;
    const mapTop = map.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: mapTop - headerH / 2, behavior: "instant" as ScrollBehavior });
  });
  // Wait one frame for sticky/transform recalculation.
  await page.waitForTimeout(150);
}

for (const route of ROUTES) {
  test(`sticky header stays above the Leaflet map on ${route}`, async ({ page }) => {
    await page.goto(route);
    await dismissIntro(page);
    await scrollMapBehindHeader(page);

    const result = await page.evaluate(() => {
      const header = document.querySelector("header") as HTMLElement | null;
      const map = document.querySelector(".mc-map-grayscale") as HTMLElement | null;
      if (!header || !map) return { ok: false, reason: "missing elements" };

      const headerRect = header.getBoundingClientRect();
      const mapRect = map.getBoundingClientRect();

      // Compute overlap; require some vertical overlap to make the test meaningful.
      const overlap = Math.min(headerRect.bottom, mapRect.bottom) - Math.max(headerRect.top, mapRect.top);
      if (overlap <= 0) {
        return { ok: false, reason: "no overlap between header and map" };
      }

      // Sample several points across the header band; every one must hit the
      // header (or one of its descendants), never the map or a Leaflet pane.
      const y = headerRect.top + Math.min(headerRect.height / 2, 20);
      const xs = [
        headerRect.left + 10,
        headerRect.left + headerRect.width * 0.25,
        headerRect.left + headerRect.width * 0.5,
        headerRect.left + headerRect.width * 0.75,
        headerRect.right - 10,
      ];

      const hits: string[] = [];
      for (const x of xs) {
        const el = document.elementFromPoint(x, y);
        if (!el) return { ok: false, reason: `no element at ${x},${y}` };
        const insideHeader = header.contains(el);
        const insideMap = map.contains(el);
        hits.push(`${Math.round(x)}:${el.tagName}.${el.className?.toString().slice(0, 40)}`);
        if (!insideHeader || insideMap) {
          return { ok: false, reason: `map/other element on top at ${x},${y}: ${hits.join(" | ")}` };
        }
      }
      return { ok: true, hits, overlap };
    });

    expect(result, JSON.stringify(result)).toMatchObject({ ok: true });
  });
}
