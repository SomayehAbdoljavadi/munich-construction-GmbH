import { useEffect } from "react";

/**
 * Controls the server-rendered initial loader from __root.tsx.
 * Timing is anchored to window.__mcLoaderStart (set inline before hydration)
 * so the GIF plays exactly one cycle regardless of hydration delay.
 */
const GIF_CYCLE_MS = 3700; // one full GIF cycle (~3.74s) — fade out before second loop
const FADE_MS = 400;

declare global {
  interface Window {
    __mcLoaderStart?: number;
  }
}

export function BrandIntro() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("mc-intro-played")) {
        document.body.classList.remove("loading-active", "loading-leaving");
        return;
      }
    } catch {
      // keep the loader active when session storage is unavailable
    }

    document.body.classList.add("loading-active");
    document.body.classList.remove("loading-leaving");

    const now =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();
    const start = window.__mcLoaderStart ?? now;
    const elapsed = Math.max(0, now - start);
    const leaveIn = Math.max(0, GIF_CYCLE_MS - FADE_MS - elapsed);
    const doneIn = Math.max(FADE_MS, GIF_CYCLE_MS - elapsed);

    const leaveT = window.setTimeout(() => {
      document.body.classList.add("loading-leaving");
    }, leaveIn);

    const doneT = window.setTimeout(() => {
      try {
        sessionStorage.setItem("mc-intro-played", "1");
      } catch {
        // ignore
      }
      document.body.classList.remove("loading-active", "loading-leaving");
    }, doneIn);

    return () => {
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.classList.remove("loading-leaving");
    };
  }, []);

  return null;
}
