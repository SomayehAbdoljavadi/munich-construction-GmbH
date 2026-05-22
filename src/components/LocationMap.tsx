import logoImg from "@/assets/munich-logo.jpg";
import { THERESIENSTRASSE_MAPS_URL } from "@/lib/mapLinks";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";

const ADDRESS = "Theresienstraße 93, 80333 München";
const MAP_CENTER: LatLngExpression = [48.1519814, 11.5606717];
const MAP_ZOOM = 16;

export function LocationMap({ className = "" }: { className?: string }) {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!mapNodeRef.current || mapRef.current) return;

    let cancelled = false;
    let activeMap: LeafletMap | null = null;

    import("leaflet").then((L) => {
      if (!mapNodeRef.current || mapRef.current || cancelled) return;

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
        html: `<a href="${THERESIENSTRASSE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="mc-map-marker-shell" aria-label="Open ${ADDRESS} in Google Maps"><span class="mc-map-marker-glow"></span><span class="mc-map-marker-logo"><img src="${logoImg}" alt="Munich Construction GmbH" draggable="false" /></span><span class="mc-map-marker-tip"></span></a>`,
        iconSize: [56, 70],
        iconAnchor: [28, 70],
      });

      const marker = L.marker(MAP_CENTER, { icon: logoIcon, title: ADDRESS, riseOnHover: true });
      marker.on("add", () => {
        const markerLink = marker.getElement()?.querySelector<HTMLAnchorElement>(".mc-map-marker-shell");
        markerLink?.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          window.open(THERESIENSTRASSE_MAPS_URL, "_blank", "noopener,noreferrer");
        });
      });
      marker.addTo(map);

      // Reset control styled like native zoom controls
      const ResetControl = L.Control.extend({
        onAdd: () => {
          const container = L.DomUtil.create("div", "leaflet-bar leaflet-control");
          const link = L.DomUtil.create("a", "leaflet-control-reset", container) as HTMLAnchorElement;
          link.href = "#";
          link.title = "Reset map";
          link.setAttribute("role", "button");
          link.setAttribute("aria-label", "Reset map");
          link.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';
          L.DomEvent.on(link, "click", (e: Event) => {
            L.DomEvent.preventDefault(e);
            L.DomEvent.stopPropagation(e);
            map.setView(MAP_CENTER, MAP_ZOOM, { animate: true });
          });
          L.DomEvent.disableClickPropagation(container);
          return container;
        },
      });
      new ResetControl({ position: "topleft" }).addTo(map);

      mapRef.current = map;
      activeMap = map;
    });

    return () => {
      cancelled = true;
      activeMap?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mapNodeRef} aria-label={`${ADDRESS} map`} className="h-full w-full grayscale" />
    </div>
  );
}
