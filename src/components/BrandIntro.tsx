import { useEffect } from "react";
import introGif from "@/assets/mc-intro.gif";
import { getGifDurationMs } from "@/lib/gif-duration";

/**
 * Controls the server-rendered initial loader from __root.tsx.
 * Sequence: GIF plays exactly once → German brand tagline reveals → fade out.
 */
const FALLBACK_GIF_MS = 3750; // single playthrough of mc-intro.gif if parsing fails
const TEXT_MS = 1200;         // brand name + tagline reveal phase
const FADE_MS = 600;          // smooth fade-out

export function BrandIntro() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("mc-intro-played")) {
        document.body.classList.remove(
          "loading-active",
          "loading-gif-done",
          "loading-leaving",
        );
        return;
      }
    } catch {
      // keep the loader active when session storage is unavailable
    }

    document.body.classList.add("loading-active");
    document.body.classList.remove("loading-gif-done", "loading-leaving");

    let gifDoneT: number | undefined;
    let leaveT: number | undefined;
    let doneT: number | undefined;
    let cancelled = false;
    const start = performance.now();

    const schedule = (gifMs: number) => {
      if (cancelled) return;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, gifMs - elapsed);

      // After exactly one GIF cycle, hide the GIF and reveal German tagline.
      gifDoneT = window.setTimeout(() => {
        document.body.classList.add("loading-gif-done");
      }, remaining);

      leaveT = window.setTimeout(() => {
        document.body.classList.add("loading-leaving");
      }, remaining + TEXT_MS);

      doneT = window.setTimeout(() => {
        try {
          sessionStorage.setItem("mc-intro-played", "1");
        } catch {
          // ignore
        }
        document.body.classList.remove(
          "loading-active",
          "loading-gif-done",
          "loading-leaving",
        );
      }, remaining + TEXT_MS + FADE_MS);
    };

    getGifDurationMs(introGif)
      .then((ms) => schedule(ms && ms > 0 ? ms : FALLBACK_GIF_MS))
      .catch(() => schedule(FALLBACK_GIF_MS));

    return () => {
      cancelled = true;
      if (gifDoneT) window.clearTimeout(gifDoneT);
      if (leaveT) window.clearTimeout(leaveT);
      if (doneT) window.clearTimeout(doneT);
      document.body.classList.remove("loading-gif-done", "loading-leaving");
    };
  }, []);

  return null;
}
