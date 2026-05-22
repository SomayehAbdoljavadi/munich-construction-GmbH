import { useEffect, useState } from "react";
import introGif from "@/assets/mc-intro.gif";

/**
 * Full-screen premium loader: plays the uploaded Munich Construction logo
 * GIF once, then fades out to reveal the site. Plays once per session.
 */
const GIF_DURATION_MS = 3500;
const FADE_MS = 900;

export function BrandIntro() {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("mc-intro-played")) return;
    sessionStorage.setItem("mc-intro-played", "1");
    setMounted(true);
    document.body.style.overflow = "hidden";
    const leaveT = window.setTimeout(() => setLeaving(true), GIF_DURATION_MS);
    const doneT = window.setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, GIF_DURATION_MS + FADE_MS);
    return () => {
      window.clearTimeout(leaveT);
      window.clearTimeout(doneT);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity ease-in-out ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden
    >
      <img
        src={introGif}
        alt=""
        className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
