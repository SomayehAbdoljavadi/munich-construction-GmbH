import markerImg from "@/assets/map-marker.png";
import { OFFICE_ADDRESS, OFFICE_MAPS_URL } from "@/lib/mapLinks";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression, Map as LeafletMap } from "leaflet";
import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { NONE, useConsent } from "@/lib/consent";
import { useT } from "@/lib/i18n";

const ADDRESS = OFFICE_ADDRESS;
const MAP_CENTER: LatLngExpression = [48.1524, 11.5748];
const MAP_ZOOM = 16;

const PLACEHOLDER = {
  title: { de: "Karte ist deaktiviert", en: "Map is disabled" },
  body: {
    de: "Um die interaktive Karte zu sehen, benötigen wir Ihre Einwilligung für externe Medien. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen.",
    en: "To display the interactive map we need your consent for external media. Your IP address will be transmitted to OpenStreetMap.",
  },
  enable: { de: "Karte aktivieren", en: "Enable map" },
  settings: { de: "Cookie-Einstellungen", en: "Cookie settings" },
  open: { de: "Adresse in Google Maps öffnen", en: "Open address in Google Maps" },
} as const;

/**
 * The Leaflet map loads tiles from OpenStreetMap (a third party), so it is
 * gated behind the "External Media" consent category. Before consent only a
 * privacy-friendly placeholder is rendered — no external request is made.
 */
export function LocationMap({ className = "" }: { className?: string }) {
  const mapNodeRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const { lang } = useT();
  const { ready, allows, save, consent, openSettings } = useConsent();
  const mapAllowed = ready && allows("externalMedia");

  useEffect(() => {
    if (!mapAllowed) return;
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
        html: `<a href="${OFFICE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="mc-map-marker-shell" aria-label="Open ${ADDRESS} in Google Maps" title="${ADDRESS}"><img src="${markerImg}" alt="Munich Construction" draggable="false" class="mc-map-marker-img" /><span class="mc-map-marker-tooltip" role="tooltip">${ADDRESS}</span></a>`,
        iconSize: [48, 60],
        iconAnchor: [24, 58],
      });

      const marker = L.marker(MAP_CENTER, { icon: logoIcon, title: ADDRESS, riseOnHover: true });
      marker.on("add", () => {
        const markerLink = marker.getElement()?.querySelector<HTMLAnchorElement>(".mc-map-marker-shell");
        markerLink?.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          window.open(OFFICE_MAPS_URL, "_blank", "noopener,noreferrer");
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
  }, [mapAllowed]);

  const l = (v: { de: string; en: string }) => v[lang];

  if (!mapAllowed) {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-ink text-white grid place-items-center ${className}`}
      >
        <div className="max-w-md text-center px-6 py-10">
          <MapPin className="h-7 w-7 text-gold mx-auto" aria-hidden />
          <h3 className="font-display text-xl mt-4">{l(PLACEHOLDER.title)}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{l(PLACEHOLDER.body)}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => save({ ...NONE, ...(consent?.categories ?? {}), externalMedia: true })}
              className="bg-gold text-ink px-6 py-3 text-sm font-semibold hover:opacity-90 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {l(PLACEHOLDER.enable)}
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="border border-white/40 px-6 py-3 text-sm font-semibold hover:border-gold hover:text-gold transition"
            >
              {l(PLACEHOLDER.settings)}
            </button>
          </div>
          <a
            href={OFFICE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-xs text-white/50 underline underline-offset-4 hover:text-gold"
          >
            {l(PLACEHOLDER.open)}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div ref={mapNodeRef} aria-label={`${ADDRESS} map`} className="h-full w-full mc-map-grayscale" />
    </div>

  );
}
