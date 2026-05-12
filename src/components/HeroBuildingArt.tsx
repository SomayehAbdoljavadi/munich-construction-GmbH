/**
 * Munich Construction — animated architectural blueprint.
 *
 * A premium, looping line-drawing inspired by the company logo:
 * a framed silhouette assembled from gold construction lines into
 * a modern building / "M" rooftop motif. Pure SVG + CSS, themed via
 * design tokens so it works in both dark and light mode.
 *
 * The full cycle runs ~11s: thin gold guides → building silhouette →
 * gold "M" arches → window glow → fade and redraw.
 */
type LineStyle = React.CSSProperties & {
  ["--dash"]?: string;
  ["--delay"]?: string;
};

const line = (dash: number, delay: number): LineStyle => ({
  ["--dash"]: String(dash),
  ["--delay"]: `${delay}s`,
});

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
          <stop offset="0%" stopColor="oklch(0.88 0.13 88)" />
          <stop offset="100%" stopColor="oklch(0.72 0.17 75)" />
        </linearGradient>
        <radialGradient id="heroGlow" cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="oklch(0.78 0.16 80 / 0.18)" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 80 / 0)" />
        </radialGradient>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 80 / 0)" />
          <stop offset="50%" stopColor="oklch(0.78 0.16 80 / 0.35)" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 80 / 0)" />
        </linearGradient>
      </defs>

      {/* ambient glow */}
      <rect x="0" y="0" width="600" height="600" fill="url(#heroGlow)" />

      {/* blueprint grid — themed via currentColor */}
      <g
        style={{ color: "var(--foreground)" }}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.06"
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" />
        ))}
      </g>

      {/* logo-inspired outer frame (drawn first, like a blueprint border) */}
      <rect
        x="60" y="80" width="480" height="460"
        stroke="var(--gold)" strokeWidth="1.2" rx="2"
        className="blueprint-line" style={line(1880, 0)}
      />

      {/* construction guide lines — thin gold scaffolding */}
      <g stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.85">
        <line x1="60" y1="500" x2="540" y2="500"
          className="blueprint-line" style={line(480, 0.4)} />
        <line x1="150" y1="80" x2="150" y2="540"
          className="blueprint-line" style={line(460, 0.7)} />
        <line x1="300" y1="80" x2="300" y2="540"
          className="blueprint-line" style={line(460, 0.9)} />
        <line x1="450" y1="80" x2="450" y2="540"
          className="blueprint-line" style={line(460, 1.1)} />
        {/* diagonal sight lines */}
        <line x1="60" y1="540" x2="300" y2="120"
          className="blueprint-line" style={line(490, 1.3)} />
        <line x1="540" y1="540" x2="300" y2="120"
          className="blueprint-line" style={line(490, 1.3)} />
      </g>

      {/* main building silhouette — three vertical towers, M roofline */}
      <g
        style={{ color: "var(--foreground)" }}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="miter"
        strokeLinecap="square"
        opacity="0.9"
      >
        {/* tower A (left) */}
        <path d="M 110 500 L 110 290 L 220 230 L 220 500 Z"
          className="blueprint-line" style={line(1080, 1.7)} />
        {/* tower B (center, tallest — apex of the M) */}
        <path d="M 240 500 L 240 200 L 300 130 L 360 200 L 360 500 Z"
          className="blueprint-line" style={line(1320, 2.1)} />
        {/* tower C (right) */}
        <path d="M 380 500 L 380 250 L 490 310 L 490 500 Z"
          className="blueprint-line" style={line(1080, 2.5)} />
      </g>

      {/* gold "M" architectural arches — the logo motif */}
      <path
        d="M 90 480 L 90 320 L 175 220 L 260 320 L 300 260 L 340 320 L 425 240 L 510 320 L 510 480"
        stroke="url(#goldGrad)" strokeWidth="2" strokeLinejoin="round"
        className="blueprint-line" style={line(1500, 3.0)}
      />

      {/* window grid — soft gold rectangles that glow */}
      <g fill="var(--gold)">
        {/* tower A */}
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`a-${r}-${c}`}
              x={120 + c * 32} y={310 + r * 26}
              width="20" height="14" rx="1"
              className="blueprint-window"
              style={{ ["--delay" as never]: `${3.4 + (r + c) * 0.06}s`, opacity: 0 }}
            />
          ))
        )}
        {/* tower B */}
        {Array.from({ length: 10 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`b-${r}-${c}`}
              x={250 + c * 32} y={220 + r * 26}
              width="20" height="14" rx="1"
              className="blueprint-window"
              style={{ ["--delay" as never]: `${3.6 + (r + c) * 0.05}s`, opacity: 0 }}
            />
          ))
        )}
        {/* tower C */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => (
            <rect
              key={`c-${r}-${c}`}
              x={390 + c * 32} y={290 + r * 24}
              width="20" height="12" rx="1"
              className="blueprint-window"
              style={{ ["--delay" as never]: `${3.8 + (r + c) * 0.06}s`, opacity: 0 }}
            />
          ))
        )}
      </g>

      {/* survey crosshair on apex */}
      <g stroke="url(#goldGrad)" strokeWidth="1">
        <circle cx="300" cy="130" r="6" fill="none"
          className="blueprint-line" style={line(40, 3.2)} />
        <line x1="290" y1="130" x2="310" y2="130"
          className="blueprint-line" style={line(20, 3.3)} />
        <line x1="300" y1="120" x2="300" y2="140"
          className="blueprint-line" style={line(20, 3.3)} />
      </g>

      {/* dimension ticks at the base */}
      <g stroke="var(--gold)" strokeWidth="0.8" opacity="0.6">
        {[110, 220, 240, 300, 360, 380, 490].map((x, i) => (
          <line
            key={`tick-${i}`}
            x1={x} y1="510" x2={x} y2="520"
            className="blueprint-line"
            style={line(10, 3.5 + i * 0.05)}
          />
        ))}
      </g>

      {/* AI/architectural scan sweep */}
      <rect
        x="60" y="80" width="480" height="40"
        fill="url(#scanGrad)"
        className="blueprint-scan"
      />
    </svg>
  );
}
