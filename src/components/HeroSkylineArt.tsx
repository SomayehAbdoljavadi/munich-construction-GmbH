/**
 * Munich Construction — premium luxury skyline reveal.
 *
 * Fuses the Munich Construction logo silhouette (center hero tower) with a
 * modern multi-building architectural composition. Thin white structural
 * outlines + warm golden-yellow highlight strokes are drawn step by step
 * over a subtle blueprint grid, then individual windows progressively
 * illuminate and a soft glow pulse closes the loop.
 *
 * Pure SVG + CSS, themed via design tokens. ~14s loop.
 */
type LineStyle = React.CSSProperties & {
  ["--dash"]?: string;
  ["--delay"]?: string;
};

const stroke = (dash: number, delay: number): LineStyle => ({
  ["--dash"]: String(dash),
  ["--delay"]: `${delay}s`,
});

type WinStyle = React.CSSProperties & { ["--delay"]?: string };
const win = (delay: number): WinStyle => ({ ["--delay"]: `${delay}s` });

// Center hero tower — derived from the Munich Construction logo silhouette.
const LOGO_SILHOUETTE =
  "M 250 500 " +
  "L 280 500 " +
  "L 280 360 " +
  "L 322 280 " +
  "L 334 298 " +
  "L 350 252 " +
  "L 396 320 " +
  "L 396 372 " +
  "L 440 388 " +
  "L 440 500 " +
  "L 470 500";

const LOGO_DOOR = "M 360 350 L 360 410";

// Left modern tower (slim high-rise with stepped crown).
const LEFT_TOWER =
  "M 70 500 L 70 240 L 130 200 L 130 168 L 160 150 L 160 500 Z";

// Right wide modern building (low-rise stepped block).
const RIGHT_BUILDING =
  "M 490 500 L 490 320 L 540 320 L 540 280 L 600 280 L 600 360 L 660 360 L 660 500 Z";

// Far-right slim accent tower.
const FAR_RIGHT_TOWER =
  "M 690 500 L 690 220 L 745 220 L 745 260 L 760 260 L 760 500 Z";

// Far-left low pavilion.
const FAR_LEFT =
  "M 20 500 L 20 420 L 60 420 L 60 500 Z";

export function HeroSkylineArt() {
  return (
    <svg
      viewBox="0 0 800 560"
      className="w-full h-full"
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="hsGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff19a" />
          <stop offset="100%" stopColor="#e8c441" />
        </linearGradient>
        <radialGradient id="hsAmbient" cx="50%" cy="78%" r="60%">
          <stop offset="0%" stopColor="rgba(232,196,65,0.18)" />
          <stop offset="100%" stopColor="rgba(232,196,65,0)" />
        </radialGradient>
        <linearGradient id="hsScan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(232,196,65,0)" />
          <stop offset="50%" stopColor="rgba(232,196,65,0.22)" />
          <stop offset="100%" stopColor="rgba(232,196,65,0)" />
        </linearGradient>
        <filter id="hsGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient warm glow at the base */}
      <rect x="0" y="0" width="800" height="560" fill="url(#hsAmbient)" />

      {/* subtle blueprint grid */}
      <g stroke="white" strokeWidth="0.5" opacity="0.05">
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`gh${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`gv${i}`} x1={i * 40} y1="0" x2={i * 40} y2="560" />
        ))}
      </g>

      {/* horizon datum + verticals — drawn first as "construction guides" */}
      <g stroke="url(#hsGold)" strokeWidth="0.6" opacity="0.55">
        <line x1="10" y1="500" x2="790" y2="500"
          className="hs-line" style={stroke(780, 0.0)} />
        <line x1="360" y1="40" x2="360" y2="540"
          className="hs-line" style={stroke(500, 0.4)} strokeDasharray="2 5" />
        <line x1="115" y1="80" x2="115" y2="540"
          className="hs-line" style={stroke(460, 0.55)} strokeDasharray="2 5" />
        <line x1="600" y1="80" x2="600" y2="540"
          className="hs-line" style={stroke(460, 0.7)} strokeDasharray="2 5" />
      </g>

      {/* === BUILDING OUTLINES (white structural lines) === */}
      <g
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.2"
        strokeLinejoin="miter"
        strokeLinecap="square"
      >
        <path d={FAR_LEFT}        className="hs-line" style={stroke(360, 1.0)} />
        <path d={LEFT_TOWER}      className="hs-line" style={stroke(1300, 1.4)} />
        <path d={RIGHT_BUILDING}  className="hs-line" style={stroke(1500, 1.9)} />
        <path d={FAR_RIGHT_TOWER} className="hs-line" style={stroke(1300, 2.4)} />
      </g>

      {/* === HERO LOGO SILHOUETTE (gold, glowing) === */}
      <g filter="url(#hsGlow)">
        <path
          d={LOGO_SILHOUETTE}
          stroke="url(#hsGold)"
          strokeWidth="2.2"
          strokeLinejoin="miter"
          strokeLinecap="square"
          className="hs-line hs-pulse"
          style={stroke(1400, 2.9)}
        />
        <path
          d={LOGO_DOOR}
          stroke="url(#hsGold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="hs-line"
          style={stroke(80, 4.4)}
        />
      </g>

      {/* === GOLD HIGHLIGHT EDGES on side buildings === */}
      <g stroke="url(#hsGold)" strokeWidth="1.1" opacity="0.9">
        {/* Left tower crown highlight */}
        <path d="M 130 200 L 130 168 L 160 150"
          className="hs-line" style={stroke(80, 3.4)} />
        {/* Right building stepped crown */}
        <path d="M 490 320 L 540 320 L 540 280 L 600 280 L 600 360 L 660 360"
          className="hs-line" style={stroke(280, 3.7)} />
        {/* Far-right tower top */}
        <path d="M 690 220 L 745 220 L 745 260 L 760 260"
          className="hs-line" style={stroke(135, 4.0)} />
        {/* Base ground accent */}
        <line x1="20" y1="500" x2="780" y2="500"
          className="hs-line" style={stroke(760, 4.2)} />
      </g>

      {/* === WINDOWS — progressive illumination === */}
      <g fill="#ffd76b">
        {/* Left tower windows: 3 cols x 8 rows */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => {
            const i = r * 3 + c;
            return (
              <rect
                key={`lw-${i}`}
                x={82 + c * 22}
                y={270 + r * 26}
                width="10"
                height="12"
                className="hs-window"
                style={win(4.6 + i * 0.06)}
              />
            );
          }),
        )}

        {/* Right building windows */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const i = r * 7 + c;
            return (
              <rect
                key={`rw-${i}`}
                x={500 + c * 22}
                y={372 + r * 22}
                width="10"
                height="10"
                className="hs-window"
                style={win(5.2 + i * 0.05)}
              />
            );
          }),
        )}

        {/* Far-right slim tower windows */}
        {Array.from({ length: 9 }).map((_, r) => (
          <rect
            key={`fr-${i}-${r}`}
            x={708}
            y={252 + r * 24}
            width="34"
            height="8"
            className="hs-window"
            style={win(5.8 + r * 0.07)}
          />
        ))}

        {/* Hero tower accent windows */}
        {[0, 1, 2, 3].map((r) => (
          <rect
            key={`hr-${r}`}
            x={296}
            y={380 + r * 22}
            width="6"
            height="8"
            className="hs-window"
            style={win(6.4 + r * 0.1)}
          />
        ))}
        {[0, 1, 2, 3].map((r) => (
          <rect
            key={`hr2-${r}`}
            x={418}
            y={400 + r * 20}
            width="6"
            height="6"
            className="hs-window"
            style={win(6.6 + r * 0.1)}
          />
        ))}
      </g>

      {/* survey crosshair on hero peak */}
      <g stroke="url(#hsGold)" strokeWidth="1">
        <circle cx="350" cy="252" r="5" fill="none"
          className="hs-line" style={stroke(34, 4.6)} />
      </g>

      {/* slow architectural scan sweep */}
      <rect
        x="0" y="0" width="800" height="80"
        fill="url(#hsScan)"
        className="hs-scan"
      />
    </svg>
  );
}
