import { useEffect, useRef, useState } from "react";

const MP4 = "/media/munich-logo-anim.mp4";
const GIF = "/media/munich-final-reveal.gif";

export function HeroSkylineArt() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showGif, setShowGif] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const FADE_MS = 1200;
    const FADE_LEAD = 0.6; // start fading this many seconds before end

    const onTimeUpdate = () => {
      if (!v.duration || isNaN(v.duration)) return;
      if (v.duration - v.currentTime <= FADE_LEAD && !fadingOut) {
        setFadingOut(true);
      }
    };
    const onEnded = () => {
      setFadingOut(true);
      setTimeout(() => setShowGif(true), FADE_MS);
    };
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, [fadingOut]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {!showGif && (
        <video
          ref={videoRef}
          src={MP4}
          autoPlay
          muted
          playsInline
          className="max-w-full max-h-full object-contain transition-opacity ease-in-out"
          style={{ opacity: fadingOut ? 0 : 1, transitionDuration: "1200ms" }}
          
        />
      )}
      {showGif && (
        <img
          src={GIF}
          alt=""
          className="max-w-full max-h-full object-contain animate-fade-in"
        />
      )}
    </div>
  );
}
