/**
 * HeroSkylineArt — premium cinematic city scene for Munich Construction GmbH.
 *
 * A layered nighttime skyline drawn line-by-line in gold, with three depth
 * layers (far, mid, near) for parallax + 3D feel, blueprint grid, ground
 * reflection glow, and warm windows that pulse on across the city.
 *
 * Pure SVG + CSS — no runtime JS. Animations live in src/styles.css under
 * the `mc-city-*` namespace.
 */
export function HeroSkylineArt() {
  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-sm mc-city">
      <div className="mc-city-vignette" />
      <CityScene />
    </div>
  );
}

/* ---------- Building primitives ---------- */

type Building = {
  /** unique id (used for animation delay class) */
  id: string;
  /** left edge */
  x: number;
  /** top edge of the roof — smaller = taller */
  top: number;
  /** width */
  w: number;
  /** optional roof shape: flat | step | pitch | antenna */
  roof?: "flat" | "step" | "pitch" | "antenna";
  /** window grid: cols x rows */
  windows?: { cols: number; rows: number };
  /** draw order delay multiplier */
  order: number;
};

const GROUND_Y = 540;

function buildingPath(b: Building): string {
  const { x, top, w, roof = "flat" } = b;
  const right = x + w;
  if (roof === "step") {
    const stepX = x + w * 0.55;
    const stepY = top + 22;
    return `M ${x} ${GROUND_Y} L ${x} ${stepY} L ${stepX} ${stepY} L ${stepX} ${top} L ${right} ${top} L ${right} ${GROUND_Y}`;
  }
  if (roof === "pitch") {
    const mid = x + w / 2;
    return `M ${x} ${GROUND_Y} L ${x} ${top + 18} L ${mid} ${top} L ${right} ${top + 18} L ${right} ${GROUND_Y}`;
  }
  if (roof === "antenna") {
    const mid = x + w / 2;
    return `M ${x} ${GROUND_Y} L ${x} ${top} L ${right} ${top} L ${right} ${GROUND_Y} M ${mid} ${top} L ${mid} ${top - 28}`;
  }
  return `M ${x} ${GROUND_Y} L ${x} ${top} L ${right} ${top} L ${right} ${GROUND_Y}`;
}

function Windows({ b }: { b: Building }) {
  if (!b.windows) return null;
  const { cols, rows } = b.windows;
  const padX = b.w * 0.16;
  const innerW = b.w - padX * 2;
  const gapX = innerW / cols;
  const wW = Math.max(2.2, gapX * 0.55);
  const innerH = GROUND_Y - b.top - 38;
  const gapY = innerH / rows;
  const wH = Math.max(3, gapY * 0.55);
  const rects: JSX.Element[] = [];
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = b.x + padX + c * gapX + (gapX - wW) / 2;
      const wy = b.top + 22 + r * gapY + (gapY - wH) / 2;
      // pseudo-random light-on staggered delay seeded by id+i
      const seed = (b.id.charCodeAt(0) * 13 + i * 7) % 100;
      const delay = (4.2 + (seed / 100) * 3.2).toFixed(2);
      const dim = (i % 4 === 0) ? "mc-city-window-dim" : "";
      rects.push(
        <rect
          key={`${b.id}-${i}`}
          x={wx}
          y={wy}
          width={wW}
          height={wH}
          rx="0.6"
          className={`mc-city-window ${dim}`}
          style={{ animationDelay: `${delay}s` }}
        />,
      );
      i++;
    }
  }
  return <g className="mc-city-windows">{rects}</g>;
}

function Tower({ b, layer }: { b: Building; layer: "far" | "mid" | "near" }) {
  return (
    <g className={`mc-city-tower mc-city-${layer}`} style={{ animationDelay: `${b.order * 0.18}s` }}>
      <path d={buildingPath(b)} className="mc-city-stroke" />
      <Windows b={b} />
    </g>
  );
}

/* ---------- Scene composition ---------- */

const farBuildings: Building[] = [
  { id: "f1", x: 30, top: 320, w: 70, order: 0, windows: { cols: 3, rows: 6 } },
  { id: "f2", x: 105, top: 290, w: 55, order: 1, roof: "step", windows: { cols: 2, rows: 7 } },
  { id: "f3", x: 165, top: 340, w: 80, order: 2, windows: { cols: 4, rows: 5 } },
  { id: "f4", x: 250, top: 270, w: 60, order: 3, roof: "antenna", windows: { cols: 2, rows: 8 } },
  { id: "f5", x: 315, top: 310, w: 70, order: 4, windows: { cols: 3, rows: 6 } },
  { id: "f6", x: 390, top: 285, w: 55, order: 5, roof: "pitch", windows: { cols: 2, rows: 7 } },
  { id: "f7", x: 450, top: 325, w: 75, order: 6, windows: { cols: 3, rows: 5 } },
  { id: "f8", x: 530, top: 295, w: 60, order: 7, roof: "step", windows: { cols: 2, rows: 7 } },
  { id: "f9", x: 595, top: 335, w: 70, order: 8, windows: { cols: 3, rows: 5 } },
  { id: "f10", x: 670, top: 305, w: 55, order: 9, windows: { cols: 2, rows: 6 } },
  { id: "f11", x: 730, top: 330, w: 70, order: 10, windows: { cols: 3, rows: 5 } },
];

const midBuildings: Building[] = [
  { id: "m1", x: 60, top: 250, w: 90, order: 4, windows: { cols: 4, rows: 8 } },
  { id: "m2", x: 155, top: 200, w: 75, order: 5, roof: "step", windows: { cols: 3, rows: 10 } },
  { id: "m3", x: 235, top: 235, w: 95, order: 6, windows: { cols: 4, rows: 9 } },
  { id: "m4", x: 335, top: 180, w: 70, order: 7, roof: "antenna", windows: { cols: 3, rows: 11 } },
  { id: "m5", x: 410, top: 215, w: 100, order: 8, windows: { cols: 4, rows: 9 } },
  { id: "m6", x: 515, top: 240, w: 80, order: 9, windows: { cols: 3, rows: 8 } },
  { id: "m7", x: 600, top: 205, w: 95, order: 10, roof: "step", windows: { cols: 4, rows: 10 } },
  { id: "m8", x: 700, top: 245, w: 75, order: 11, windows: { cols: 3, rows: 8 } },
];

const nearBuildings: Building[] = [
  { id: "n1", x: -20, top: 280, w: 110, order: 7, windows: { cols: 4, rows: 7 } },
  { id: "n2", x: 95, top: 150, w: 95, order: 8, roof: "antenna", windows: { cols: 4, rows: 12 } },
  { id: "n3", x: 195, top: 200, w: 120, order: 9, roof: "step", windows: { cols: 5, rows: 10 } },
  { id: "n4", x: 320, top: 120, w: 90, order: 10, windows: { cols: 4, rows: 13 } },
  { id: "n5", x: 415, top: 170, w: 130, order: 11, roof: "step", windows: { cols: 5, rows: 11 } },
  { id: "n6", x: 550, top: 145, w: 100, order: 12, roof: "antenna", windows: { cols: 4, rows: 12 } },
  { id: "n7", x: 655, top: 195, w: 115, order: 13, windows: { cols: 5, rows: 10 } },
  { id: "n8", x: 775, top: 230, w: 90, order: 14, windows: { cols: 3, rows: 8 } },
];

function CityScene() {
  return (
    <svg
      viewBox="0 0 800 560"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="mcGold" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f5d27a" />
          <stop offset="55%" stopColor="#e0b75a" />
          <stop offset="100%" stopColor="#8a6422" />
        </linearGradient>
        <linearGradient id="mcWinGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff1c4" />
          <stop offset="100%" stopColor="#e8b94a" />
        </linearGradient>
        <linearGradient id="mcSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="65%" stopColor="#070604" />
          <stop offset="100%" stopColor="#1a1207" />
        </linearGradient>
        <linearGradient id="mcReflect" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d4a14a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4a14a" stopOpacity="0" />
        </linearGradient>
        <filter id="mcGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mcWinGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="mcGrid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#d4a14a" strokeOpacity="0.05" strokeWidth="0.4" />
        </pattern>
        <pattern id="mcGridFine" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#d4a14a" strokeOpacity="0.025" strokeWidth="0.3" />
        </pattern>
        <radialGradient id="mcHorizon" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#3a2a10" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#1a1207" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky + blueprint grid */}
      <rect width="800" height="560" fill="url(#mcSky)" />
      <rect width="800" height="560" fill="url(#mcGridFine)" className="mc-city-grid" />
      <rect width="800" height="560" fill="url(#mcGrid)" className="mc-city-grid mc-city-grid-bold" />
      <rect width="800" height="280" y="280" fill="url(#mcHorizon)" className="mc-city-horizon" />

      {/* Distant haze layer */}
      <g className="mc-city-parallax-far">
        <g filter="url(#mcGlow)" stroke="url(#mcGold)" fill="none" strokeWidth="0.7" strokeLinejoin="miter">
          {farBuildings.map((b) => (
            <Tower key={b.id} b={b} layer="far" />
          ))}
        </g>
      </g>

      {/* Mid layer */}
      <g className="mc-city-parallax-mid">
        <g filter="url(#mcGlow)" stroke="url(#mcGold)" fill="none" strokeWidth="1.1" strokeLinejoin="miter">
          {midBuildings.map((b) => (
            <Tower key={b.id} b={b} layer="mid" />
          ))}
        </g>
      </g>

      {/* Near / foreground layer */}
      <g className="mc-city-parallax-near">
        <g filter="url(#mcGlow)" stroke="url(#mcGold)" fill="none" strokeWidth="1.6" strokeLinejoin="miter">
          {nearBuildings.map((b) => (
            <Tower key={b.id} b={b} layer="near" />
          ))}
        </g>
      </g>

      {/* Ground line */}
      <line
        x1="0"
        y1={GROUND_Y}
        x2="800"
        y2={GROUND_Y}
        stroke="url(#mcGold)"
        strokeOpacity="0.55"
        strokeWidth="0.8"
        className="mc-city-ground"
      />

      {/* Ground reflection / glow */}
      <rect x="0" y={GROUND_Y} width="800" height="120" fill="url(#mcReflect)" className="mc-city-reflect" />

      {/* Soft light pulses sweeping across */}
      <g className="mc-city-pulse" opacity="0">
        <ellipse cx="400" cy={GROUND_Y + 6} rx="320" ry="14" fill="#f5d27a" opacity="0.18" filter="url(#mcWinGlow)" />
      </g>
    </svg>
  );
}
