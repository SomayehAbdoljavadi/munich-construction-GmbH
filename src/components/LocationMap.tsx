import { MapPin } from "lucide-react";

const ADDRESS = "Theresienstraße 93, 80333 München";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function LocationMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        title="Munich Construction GmbH location map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=11.5640%2C48.1455%2C11.5760%2C48.1525&amp;layer=mapnik"
        className="w-full h-full grayscale"
        loading="lazy"
      />
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${ADDRESS} in Google Maps`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full group pointer-events-auto"
      >
        <span className="relative flex items-center justify-center">
          <span className="absolute inset-0 -z-10 rounded-full bg-gold/30 blur-xl scale-150 group-hover:bg-gold/50 transition-colors" />
          <span className="size-12 rounded-full bg-gold text-ink grid place-items-center shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-2 ring-ink/80 group-hover:scale-110 transition-transform">
            <MapPin size={22} strokeWidth={2.25} fill="currentColor" />
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold rotate-45 ring-2 ring-ink/80" />
        </span>
      </a>
    </div>
  );
}
