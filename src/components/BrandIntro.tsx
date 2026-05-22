import { useEffect, useState } from "react";

/**
 * Controls the server-rendered initial loader from __root.tsx.
 * The visual loader must already exist in the initial HTML/CSS before React
 * hydrates, so this component only times the exit and reveals the app.
 */
const GIF_MS = 2600;       // GIF on its own
const TEXT_MS = 1400;      // GIF + text together
const FADE_MS = 800;       // fade-out duration

export function BrandIntro() {
  // Lazy init: decide on first render (pre-paint) whether to show the loader.
  const [active, setActive] = useState<boolean>(() => {
    if (typeof window === "undefined") return false; // SSR: don't block
    try {
      return !sessionStorage.getItem("mc-intro-played");
    } catch {
      return true;
    }
  });
  const [showText, setShowText] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!active) {
      document.body.classList.remove("loading-active", "loading-leaving");
      return;
    }

    document.body.classList.add("loading-active");
    document.body.classList.remove("loading-leaving");

    const leaveT = window.setTimeout(() => {
      setLeaving(true);
      document.body.classList.add("loading-leaving");
    }, GIF_MS + TEXT_MS);

    const doneT = window.setTimeout(() => {
      try {
        sessionStorage.setItem("mc-intro-played", "1");
      } catch {
        // ignore
      }
      document.body.classList.remove("loading-active", "loading-leaving");
      setActive(false);
    }, GIF_MS + TEXT_MS + FADE_MS);

    return () => {
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.classList.remove("loading-leaving");
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const textT = window.setTimeout(() => setShowText(true), GIF_MS);

    return () => window.clearTimeout(textT);
  }, [active]);

  useEffect(() => {
    if (!active || !leaving) return;
    document.body.classList.add("loading-leaving");

    return () => document.body.classList.remove("loading-leaving");
  }, [active, leaving]);

  return null;
}

export function OldBrandIntroMarkup() {
  useEffect(() => {
    if (!active) return;
    try {
      sessionStorage.setItem("mc-intro-played", "1");
    } catch {
      // ignore
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const textT = window.setTimeout(() => setShowText(true), GIF_MS);
    const leaveT = window.setTimeout(() => setLeaving(true), GIF_MS + TEXT_MS);
    const doneT = window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = prevOverflow;
    }, GIF_MS + TEXT_MS + FADE_MS);

    return () => {
      window.clearTimeout(textT);
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity ease-in-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden
    >
      <img
        src={introGif}
        alt=""
        className="max-w-[80vw] max-h-[60vh] w-auto h-auto object-contain select-none"
        draggable={false}
      />

      <div
        className={`mt-8 flex flex-col items-center text-center px-6 transition-all duration-700 ease-out ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
          Munich Construction <span className="text-[#d4af37]">GmbH</span>
        </h1>
        <div
          className={`mt-4 h-px w-16 bg-[#d4af37] transition-all duration-700 ${
            showText ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />
        <p className="mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-white/70">
          Precision <span className="text-[#d4af37]">•</span> Structure{" "}
          <span className="text-[#d4af37]">•</span> Trust
        </p>
      </div>
    </div>
  );
}
