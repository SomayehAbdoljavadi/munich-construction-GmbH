import { useEffect } from "react";
import introGif from "@/assets/mc-intro.gif";
import { getGifDurationMs } from "@/lib/gif-duration";

/**
 * Controls the server-rendered initial loader from __root.tsx.
 * The visual loader must already exist in the initial HTML/CSS before React
 * hydrates, so this component only times the exit and reveals the app.
 */
const FALLBACK_GIF_MS = 3750; // used if duration can't be parsed
const FADE_MS = 500;          // quick fade-out

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

    let leaveT: number | undefined;
    let doneT: number | undefined;
    let cancelled = false;
    const start = performance.now();

    const schedule = (gifMs: number) => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, gifMs - elapsed);

      leaveT = window.setTimeout(() => {
        document.body.classList.add("loading-leaving");
      }, remaining);

      doneT = window.setTimeout(() => {
        try {
          sessionStorage.setItem("mc-intro-played", "1");
        } catch {
          // ignore
        }
        document.body.classList.remove("loading-active", "loading-leaving");
      }, remaining + FADE_MS);
    };

    // Detect the GIF's real duration, fall back if parsing fails.
    getGifDurationMs(introGif)
      .then((ms) => schedule(ms && ms > 0 ? ms : FALLBACK_GIF_MS))
      .catch(() => schedule(FALLBACK_GIF_MS));

    return () => {
      cancelled = true;
      if (leaveT) window.clearTimeout(leaveT);
      if (doneT) window.clearTimeout(doneT);
      document.body.classList.remove("loading-leaving");
    };
  }, []);

  return null;
}
