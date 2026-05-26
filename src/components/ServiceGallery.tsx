import { useEffect, useState, useCallback } from "react";
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

  const go = useCallback((n: number) => setI(((n % total) + total) % total), [total]);
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setI((v) => (v + 1) % total), autoPlayMs);
    return () => clearInterval(id);
  }, [paused, total, autoPlayMs]);

  return (
    <div
      className="relative bg-ink text-white overflow-hidden border border-gold/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
        {slides.map((s, idx) => (
          <div
            key={s.title}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              width={1280}
              height={832}
              loading={idx === 0 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-3 flex items-center gap-2">
                <MapPin size={12} /> {s.location}
              </p>
              <h3 className="font-display text-2xl md:text-4xl mb-3 max-w-3xl">{s.title}</h3>
              <p className="text-white/80 max-w-2xl leading-relaxed text-sm md:text-base">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Vorheriges Projekt"
            onClick={prev}
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Nächstes Projekt"
            onClick={next}
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 size-11 grid place-items-center border border-gold/40 bg-ink/60 backdrop-blur text-gold hover:bg-gold hover:text-ink transition-colors"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 right-4 md:bottom-5 md:right-6 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => go(idx)}
                className={`h-[3px] transition-all duration-300 ${
                  idx === i ? "w-8 bg-gold" : "w-4 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
