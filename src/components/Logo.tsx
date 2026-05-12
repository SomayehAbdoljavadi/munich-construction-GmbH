interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className = "", showWordmark = true, variant = "light" }: LogoProps) {
  const stroke = variant === "light" ? "currentColor" : "var(--ink)";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="size-10 shrink-0"
        aria-hidden
      >
        {/* solid black background tile */}
        <rect x="0" y="0" width="48" height="48" fill="#0a0a0a" />
        {/* outer gold frame */}
        <rect x="6" y="6" width="36" height="36" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
        {/* gold M as architectural roofline */}
        <path
          d="M13 35 L13 16 L24 27 L35 16 L35 35"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="square"
          fill="none"
        />
        {/* base line */}
        <line x1="13" y1="38" x2="35" y2="38" stroke="var(--gold)" strokeWidth="1.5" />
      </svg>
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
