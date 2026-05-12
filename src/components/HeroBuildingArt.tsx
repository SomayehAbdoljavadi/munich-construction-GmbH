/**
 * Munich Construction — animated architectural blueprint.
 *
 * The silhouette is traced directly from the company logo: a tall stepped
 * left tower with two angled peaks, a long slanted roofline cascading down
 * to a lower right-side wing, anchored on a continuous ground line. Drawn
 * as gold construction lines over a blueprint grid, then held and redrawn
 * on a calm ~11s loop. Pure SVG + CSS, themed with design tokens so it
 * works in both dark and light mode.
 */
type LineStyle = React.CSSProperties & {
  ["--dash"]?: string;
  ["--delay"]?: string;
};

const line = (dash: number, delay: number): LineStyle => ({
  ["--dash"]: String(dash),
  ["--delay"]: `${delay}s`,
});

// Silhouette traced from the Munich Construction logo (viewBox 600x600).
// Single continuous polyline: ground → left tower → twin peaks → long
// slanted roofline → right wing → ground.
const SILHOUETTE =
  "M 40 500 " +
  "L 150 500 " +
  "L 150 285 " +     // up the left tower's left edge
  "L 240 135 " +     // up to first (left) peak
  "L 262 168 " +     // small valley
  "L 292 90 " +      // up to tallest peak (center)
  "L 378 215 " +     // long slant down toward the right
  "L 378 305 " +     // step down (shoulder of left mass)
  "L 460 335 " +     // continue slant onto right wing roof
  "L 460 500 " +     // down right wing's right edge
  "L 560 500";       // ground extending right

// Inner door/window slit on the central tower (logo motif).
const DOOR = "M 322 200 L 322 295";

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
          <stop offset="0%" stopColor="oklch(0.9 0.13 90)" />
          <stop offset="100%" stopColor="oklch(0.72 0.17 75)" />
        </linearGradient>
        <radialGradient id="heroGlow" cx="50%" cy="62%" r="55%">
          <stop offset="0%" stopColor="oklch(0.78 0.16 80 / 0.18)" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 80 / 0)" />
        </radialGradient>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 80 / 0)" />
          <stop offset="50%" stopColor="oklch(0.78 0.16 80 / 0.28)" />
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

      {/* construction guide lines — thin gold scaffolding aligned to logo */}
      <g stroke="url(#goldGrad)" strokeWidth="0.7" opacity="0.7">
        {/* horizon datum */}
        <line x1="20" y1="500" x2="580" y2="500"
          className="blueprint-line" style={line(560, 0.2)} />
        {/* vertical sight lines through key peaks */}
        <line x1="150" y1="80" x2="150" y2="540"
          className="blueprint-line" style={line(460, 0.5)} />
        <line x1="292" y1="40" x2="292" y2="540"
          className="blueprint-line" style={line(500, 0.7)} />
        <line x1="460" y1="80" x2="460" y2="540"
          className="blueprint-line" style={line(460, 0.9)} />
        {/* diagonal sight rays converging on the tallest peak */}
        <line x1="40" y1="540" x2="292" y2="90"
          className="blueprint-line" style={line(520, 1.1)} />
        <line x1="560" y1="540" x2="292" y2="90"
          className="blueprint-line" style={line(520, 1.1)} />
        {/* eave-height datum */}
        <line x1="40" y1="335" x2="560" y2="335"
          className="blueprint-line" style={line(520, 1.3)} strokeDasharray="2 4" />
      </g>

      {/* faint white blueprint shadow of the silhouette */}
      <path
        d={SILHOUETTE}
        style={{ color: "var(--foreground)" }}
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.18"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />

      {/* MAIN GOLD SILHOUETTE — derived from the Munich Construction logo */}
      <path
        d={SILHOUETTE}
        stroke="url(#goldGrad)"
        strokeWidth="2.6"
        strokeLinejoin="miter"
        strokeLinecap="square"
        className="blueprint-line"
        style={line(2200, 1.6)}
      />

      {/* central tower's vertical door/window — logo signature detail */}
      <path
        d={DOOR}
        stroke="url(#goldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        className="blueprint-line"
        style={line(100, 3.4)}
      />

      {/* survey crosshair on the tallest peak */}
      <g stroke="url(#goldGrad)" strokeWidth="1">
        <circle cx="292" cy="90" r="6" fill="none"
          className="blueprint-line" style={line(40, 3.2)} />
        <line x1="282" y1="90" x2="302" y2="90"
          className="blueprint-line" style={line(20, 3.3)} />
        <line x1="292" y1="80" x2="292" y2="100"
          className="blueprint-line" style={line(20, 3.3)} />
      </g>

      {/* dimension ticks at base — only at silhouette's structural points */}
      <g stroke="var(--gold)" strokeWidth="0.8" opacity="0.55">
        {[150, 240, 292, 378, 460].map((x, i) => (
          <line
            key={`tick-${i}`}
            x1={x} y1="510" x2={x} y2="520"
            className="blueprint-line"
            style={line(10, 3.6 + i * 0.05)}
          />
        ))}
      </g>

      {/* AI / architectural scan sweep */}
      <rect
        x="20" y="40" width="560" height="60"
        fill="url(#scanGrad)"
        className="blueprint-scan"
      />
    </svg>
  );
}
