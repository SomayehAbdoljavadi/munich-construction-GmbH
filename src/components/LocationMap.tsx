import logoImg from "@/assets/munich-logo.jpg";
import { openMapInNewTab, THERESIENSTRASSE_MAPS_URL } from "@/lib/mapLinks";

const ADDRESS = "Theresienstraße 93, 80333 München";

export function LocationMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <iframe
        title="Munich Construction GmbH location map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=11.5640%2C48.1455%2C11.5760%2C48.1525&amp;layer=mapnik"
        className="w-full h-full grayscale"
        style={{ pointerEvents: "auto" }}
        loading="lazy"
      />
      {/* Marker overlay — wrapper ignores pointer events; only the marker itself is clickable */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <a
          href={THERESIENSTRASSE_MAPS_URL}
          onClick={(event) => openMapInNewTab(event, THERESIENSTRASSE_MAPS_URL)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${ADDRESS} in Google Maps`}
          className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full cursor-pointer group bg-transparent border-0 p-0 inline-block"
        >
          <span className="relative flex flex-col items-center">
            <span className="absolute -inset-2 -z-10 rounded-full bg-gold/30 blur-xl scale-150 group-hover:bg-gold/50 transition-colors pointer-events-none" />
            <span className="size-14 rounded-full bg-ink ring-2 ring-gold grid place-items-center shadow-[0_8px_24px_rgba(0,0,0,0.45)] overflow-hidden group-hover:scale-110 transition-transform">
              <img
                src={logoImg}
                alt="Munich Construction GmbH"
                className="size-10 object-contain"
                draggable={false}
              />
            </span>
            <span className="w-3 h-3 bg-gold rotate-45 -mt-1.5 ring-2 ring-ink/80" />
          </span>
        </a>
      </div>
    </div>
  );
}
