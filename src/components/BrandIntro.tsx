import { useEffect } from "react";

/**
 * Controls the server-rendered initial loader from __root.tsx.
 * The visual loader must already exist in the initial HTML/CSS before React
 * hydrates, so this component only times the exit and reveals the app.
 */
const GIF_MS = 2600;       // GIF on its own
const TEXT_MS = 1400;      // GIF + text together
const FADE_MS = 800;       // fade-out duration

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

    const leaveT = window.setTimeout(() => {
      document.body.classList.add("loading-leaving");
    }, GIF_MS + TEXT_MS);

    const doneT = window.setTimeout(() => {
      try {
        sessionStorage.setItem("mc-intro-played", "1");
      } catch {
        // ignore
      }
      document.body.classList.remove("loading-active", "loading-leaving");
    }, GIF_MS + TEXT_MS + FADE_MS);

    return () => {
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.classList.remove("loading-leaving");
    };
  }, []);

  return null;
}
