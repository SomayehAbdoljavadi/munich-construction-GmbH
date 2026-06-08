import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { GallerySlide } from "@/lib/services-data";
import { useT } from "@/lib/i18n";

interface Props {
  slides: GallerySlide[];
  autoPlayMs?: number;
}

export function ServiceGallery({ slides, autoPlayMs = 6000 }: Props) {
  const { t } = useT();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((n: number) => setI(((n % total) + total) % total), [total]);
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % total), autoPlayMs);
    return () => clearInterval(id);
  }, [paused, total, autoPlayMs]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative bg-ink text-white overflow-hidden border border-gold/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        {slides.map((s, idx) => {
          const hasProject = !!s.projectName;
          return (
            <div
              key={`${s.image}-${idx}`}
              aria-hidden={idx !== i}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="absolute inset-0 bg-ink" />
              <img
                src={s.image}
                alt={s.projectName ? `${s.projectName} — ${s.projectLocation ?? ""}` : s.title}
                loading={idx === 0 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-contain"
              />

              {/* Readability gradients */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />

              {hasProject ? (
                <>
                  {/* Bottom-left: project info */}
                  <div className="absolute left-4 right-4 bottom-4 md:left-8 md:right-8 md:bottom-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div className="max-w-[80%] md:max-w-[60%]">
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-2 flex items-center gap-2">
                        <MapPin size={11} /> {t("sd.gallery.eyebrow")}
                      </p>
                      <h3 className="font-display text-lg sm:text-2xl md:text-3xl leading-tight text-balance">
                        {s.projectName}
                      </h3>
                      {s.projectLocation && (
                        <p className="text-white/80 text-xs sm:text-sm md:text-base mt-1 leading-snug">
                          {s.projectLocation}
                        </p>
                      )}
                    </div>

                    {/* Bottom-right: image counter / location chip */}
                    <div className="md:text-right shrink-0">
                      <div className="inline-flex items-center gap-2 bg-ink/70 border border-gold/30 backdrop-blur px-3 py-1.5">
                        <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-gold">
                          {String(s.index ?? idx + 1).padStart(2, "0")} /{" "}
                          {String(s.total ?? total).padStart(2, "0")}
                        </span>
                        {s.projectLocation && (
                          <span className="hidden sm:inline font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/70 truncate max-w-[14rem]">
                            · {s.projectLocation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3 flex items-center gap-2">
                    <MapPin size={12} /> {s.location}
                  </p>
                  <h3 className="font-display text-2xl md:text-4xl mb-3 max-w-3xl">{s.title}</h3>
                  <p className="text-white/80 max-w-2xl leading-relaxed text-sm md:text-base">
                    {s.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label={t("sg.prev")}
            onClick={prev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label={t("sg.next")}
            onClick={next}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 max-w-[80%] overflow-hidden">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-[3px] transition-all duration-300 ${
                  idx === i ? "w-8 bg-gold" : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
