import { useEffect, useState } from "react";

const INTRO_GIF = "/media/munich-final-reveal.gif";

/**
 * First-visit brand intro: plays the Munich Construction reveal GIF
 * over a dark backdrop, then fades out. Plays once per session.
 */
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
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden
    >
      <img
        src={INTRO_GIF}
        alt=""
        className="max-w-[min(80vw,640px)] max-h-[80vh] object-contain"
      />
    </div>
  );
}
