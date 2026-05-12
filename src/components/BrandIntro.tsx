import { useEffect, useState } from "react";

/**
 * Premium first-visit brand intro: draws the Munich Construction logo
 * silhouette in glowing gold over a dark backdrop, then fades in the
 * wordmark and tagline before dismissing. Plays once per session.
 */
const SILHOUETTE =
  "M 40 500 " +
  "L 150 500 " +
  "L 150 285 " +
  "L 240 135 " +
  "L 262 168 " +
  "L 292 90 " +
  "L 378 215 " +
  "L 378 305 " +
  "L 460 335 " +
  "L 460 500 " +
  "L 560 500";

const DOOR = "M 322 200 L 322 295";

export function BrandIntro() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mc-intro-played")) return;
    sessionStorage.setItem("mc-intro-played", "1");
    setMounted(true);
    document.body.style.overflow = "hidden";
    const leaveT = window.setTimeout(() => setLeaving(true), 3400);
    const doneT = window.setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 4200);
    return () => {
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden
    >
      <svg
        viewBox="0 0 600 600"
        className="w-[min(72vw,520px)] h-auto"
        fill="none"
      >
        <defs>
          <linearGradient id="introGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff19a" />
            <stop offset="100%" stopColor="#e8c441" />
          </linearGradient>
        </defs>

        {/* faint baseline guide */}
        <line
          x1="20" y1="500" x2="580" y2="500"
          stroke="url(#introGold)" strokeWidth="0.6" opacity="0.3"
          className="intro-guide"
        />

        {/* main silhouette */}
        <path
          d={SILHOUETTE}
          stroke="url(#introGold)"
          strokeWidth="2.4"
          strokeLinejoin="miter"
          strokeLinecap="square"
          className="intro-stroke"
          style={{ ["--dash" as never]: "2200" }}
        />

        {/* central door slit */}
        <path
          d={DOOR}
          stroke="url(#introGold)"
          strokeWidth="2"
          strokeLinecap="round"
          className="intro-stroke intro-stroke-late"
          style={{ ["--dash" as never]: "100" }}
        />
      </svg>

      <div className="mt-10 text-center intro-text">
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
          Munich Construction <span className="text-[#e8c441]">GmbH</span>
        </h1>
        <p className="mt-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.45em] text-white/55">
          Precision · Structure · Trust
        </p>
      </div>
    </div>
  );
}
