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
        {/* outer frame */}
        <rect x="3" y="3" width="42" height="42" stroke={stroke} strokeWidth="1.5" />
        {/* gold M as architectural roofline */}
        <path
          d="M10 36 L10 14 L24 28 L38 14 L38 36"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinejoin="miter"
          strokeLinecap="square"
          fill="none"
        />
        {/* base line */}
        <line x1="10" y1="40" x2="38" y2="40" stroke="var(--gold)" strokeWidth="1.5" />
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
