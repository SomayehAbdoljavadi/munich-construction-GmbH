import logoImg from "@/assets/munich-logo.jpg";
import { openMapInNewTab, THERESIENSTRASSE_MAPS_URL } from "@/lib/mapLinks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";

const ADDRESS = "Theresienstraße 93, 80333 München";
const MAP_CENTER: L.LatLngExpression = [48.1519814, 11.5606717];
const MAP_ZOOM = 16;

export function LocationMap({ className = "" }: { className?: string }) {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) return;

    const map = L.map(mapNodeRef.current, {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const logoIcon = L.divIcon({
      className: "mc-map-marker",
      html: `<span class="mc-map-marker-shell"><span class="mc-map-marker-glow"></span><span class="mc-map-marker-logo"><img src="${logoImg}" alt="Munich Construction GmbH" draggable="false" /></span><span class="mc-map-marker-tip"></span></span>`,
      iconSize: [56, 70],
      iconAnchor: [28, 70],
    });

    L.marker(MAP_CENTER, { icon: logoIcon, title: ADDRESS })
      .addTo(map)
      .on("click", () => window.open(THERESIENSTRASSE_MAPS_URL, "_blank", "noopener,noreferrer"));

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const resetMap = () => {
    mapRef.current?.setView(MAP_CENTER, MAP_ZOOM, { animate: true });
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mapNodeRef} aria-label={`${ADDRESS} map`} className="h-full w-full grayscale" />
      <button
        type="button"
        onClick={resetMap}
        aria-label="Reset map"
        title="Reset map"
        className="absolute right-4 top-4 z-[500] size-10 grid place-items-center border border-gold bg-ink text-gold shadow-premium hover:bg-gold hover:text-ink transition-colors"
      >
        <RotateCcw size={17} strokeWidth={1.8} />
      </button>
      <a
        href={THERESIENSTRASSE_MAPS_URL}
        onClick={(event) => openMapInNewTab(event, THERESIENSTRASSE_MAPS_URL)}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
      >
        Open {ADDRESS} in Google Maps
      </a>
    </div>
  );
}
