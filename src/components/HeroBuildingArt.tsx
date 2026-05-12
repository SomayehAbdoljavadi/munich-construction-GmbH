/**
 * Animated architectural line drawing — a building rising
 * with subtle gold accents. Pure SVG + CSS, no JS animation library.
 */
export function HeroBuildingArt() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-full"
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.13 85)" />
          <stop offset="100%" stopColor="oklch(0.7 0.17 75)" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="oklch(0.78 0.16 80 / 0.18)" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 80 / 0)" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <rect x="0" y="0" width="600" height="600" fill="url(#glow)" />

      {/* grid */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="600" y2={i * 60} />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="600" />
        ))}
      </g>

      {/* horizon */}
      <line
        x1="40" y1="500" x2="560" y2="500"
        stroke="url(#goldGrad)" strokeWidth="1.2"
        className="draw-line" style={{ ['--dash' as string]: '520' }}
      />

      {/* main building outline (M-shape rooflines, 3 towers) */}
      <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinejoin="miter" strokeLinecap="square">
        {/* tower A */}
        <path
          d="M 90 500 L 90 280 L 180 220 L 180 500 Z"
          className="draw-line" style={{ ['--dash' as string]: '900', animationDelay: '0.2s' }}
        />
        {/* tower B (tallest, center) */}
        <path
          d="M 220 500 L 220 180 L 310 110 L 310 500 Z"
          className="draw-line" style={{ ['--dash' as string]: '1100', animationDelay: '0.6s' }}
        />
        {/* tower C */}
        <path
          d="M 350 500 L 350 240 L 440 290 L 440 500 Z"
          className="draw-line" style={{ ['--dash' as string]: '900', animationDelay: '1.0s' }}
        />
        {/* low wing */}
        <path
          d="M 470 500 L 470 380 L 540 360 L 540 500"
          className="draw-line" style={{ ['--dash' as string]: '500', animationDelay: '1.4s' }}
        />
      </g>

      {/* gold M arches (logo motif) */}
      <path
        d="M 60 470 L 60 320 L 145 240 L 230 320 L 315 200 L 400 320 L 485 280 L 560 340"
        stroke="url(#goldGrad)" strokeWidth="2"
        className="draw-line" style={{ ['--dash' as string]: '1200', animationDelay: '1.6s' }}
      />

      {/* window grids */}
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.8">
        {/* tower A windows */}
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`a-${r}-${c}`}
              x={100 + c * 25}
              y={300 + r * 30}
              width="18" height="20"
              className="animate-shimmer"
              style={{ animationDelay: `${(r + c) * 0.15}s` }}
              fill="oklch(0.78 0.16 80 / 0.08)"
            />
          ))
        )}
        {/* tower B windows */}
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`b-${r}-${c}`}
              x={232 + c * 25}
              y={210 + r * 30}
              width="18" height="20"
              className="animate-shimmer"
              style={{ animationDelay: `${(r + c) * 0.12}s` }}
              fill="oklch(0.78 0.16 80 / 0.1)"
            />
          ))
        )}
        {/* tower C windows */}
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`c-${r}-${c}`}
              x={362 + c * 25}
              y={310 + r * 25}
              width="18" height="16"
              className="animate-shimmer"
              style={{ animationDelay: `${(r + c) * 0.18}s` }}
              fill="oklch(0.78 0.16 80 / 0.07)"
            />
          ))
        )}
      </g>

      {/* survey crosshairs / construction marks */}
      <g stroke="url(#goldGrad)" strokeWidth="1" opacity="0.7">
        <circle cx="310" cy="110" r="5" fill="none" className="animate-shimmer" />
        <line x1="305" y1="110" x2="315" y2="110" />
        <line x1="310" y1="105" x2="310" y2="115" />
      </g>
    </svg>
  );
}
