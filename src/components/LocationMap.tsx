import logoImg from "@/assets/munich-logo.jpg";

const ADDRESS = "Theresienstraße 93, 80333 München";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Theresienstra%C3%9Fe+93,+80333+M%C3%BCnchen/@48.151985,11.5580914,17z/data=!3m1!4b1!4m6!3m5!1s0x479e75e14e4a11e5:0x957ab2c38fed5ce9!8m2!3d48.1519814!4d11.5606717!16s%2Fg%2F11bw3fcx47?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D";

export function LocationMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        title="Munich Construction GmbH location map"
        src="https://www.openstreetmap.org/export/embed.html?bbox=11.5640%2C48.1455%2C11.5760%2C48.1525&amp;layer=mapnik"
        className="w-full h-full grayscale pointer-events-none"
        loading="lazy"
      />
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${ADDRESS} in Google Maps`}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10 cursor-pointer group bg-transparent border-0 p-0"
      >
        <span className="relative flex flex-col items-center">
          <span className="absolute -inset-2 -z-10 rounded-full bg-gold/30 blur-xl scale-150 group-hover:bg-gold/50 transition-colors" />
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
  );
}
