import logoImg from "@/assets/munich-logo.jpg";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logoImg}
        alt="Munich Construction GmbH"
        className="size-10 shrink-0 object-contain"
      />
      {showWordmark && (
        <div className="leading-none">
          <div className="font-display text-base tracking-tight font-semibold">
            Munich <span className="gold-text">Construction</span>
          </div>
          <div className="font-sans text-[9px] tracking-[0.25em] uppercase opacity-70 mt-0.5">
            GmbH · München
          </div>
        </div>
      )}
    </div>
  );
}
