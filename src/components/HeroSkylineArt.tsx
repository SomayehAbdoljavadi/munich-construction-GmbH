export function HeroSkylineArt() {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-sm">
      <BlueprintScene />
    </div>
  );
}

function BlueprintScene() {
  return (
    <svg
      viewBox="0 0 800 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f5d27a" />
          <stop offset="100%" stopColor="#c79b3a" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#grid)" className="mc-grid" />

      <line x1="60" y1="430" x2="740" y2="430" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="0.6" className="mc-ground" />

      <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" className="mc-side mc-side-a">
        <path d="M 110 430 L 110 300 L 170 300 L 170 260 L 210 260 L 210 430" />
        <line x1="135" y1="320" x2="135" y2="410" strokeOpacity="0.25" />
        <line x1="190" y1="280" x2="190" y2="410" strokeOpacity="0.25" />
      </g>

      <g stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" fill="none" className="mc-side mc-side-b">
        <path d="M 590 430 L 590 290 L 640 270 L 690 290 L 690 430" />
        <line x1="615" y1="310" x2="615" y2="410" strokeOpacity="0.25" />
        <line x1="665" y1="310" x2="665" y2="410" strokeOpacity="0.25" />
      </g>

      <g fill="none" stroke="url(#goldGrad)" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" filter="url(#softGlow)">
        <path d="M 290 430 L 290 360 L 360 360 L 360 430" className="mc-draw mc-d1" />
        <path d="M 360 430 L 360 200 L 410 180 L 460 200 L 460 430" className="mc-draw mc-d2" />
        <path d="M 460 430 L 460 320 L 540 280 L 540 430" className="mc-draw mc-d3" />
        <line x1="410" y1="240" x2="410" y2="380" className="mc-draw mc-d4" />
      </g>

      <g fill="#f5d27a" className="mc-lights" filter="url(#softGlow)">
        <rect x="406" y="250" width="8" height="14" rx="1" className="mc-win mc-w1" />
        <rect x="406" y="280" width="8" height="14" rx="1" className="mc-win mc-w2" />
        <rect x="406" y="310" width="8" height="14" rx="1" className="mc-win mc-w3" />
        <rect x="486" y="340" width="6" height="10" rx="1" className="mc-win mc-w4" />
        <rect x="510" y="340" width="6" height="10" rx="1" className="mc-win mc-w5" />
        <rect x="310" y="380" width="6" height="10" rx="1" className="mc-win mc-w6" />
        <rect x="335" y="380" width="6" height="10" rx="1" className="mc-win mc-w7" />
      </g>

      <g stroke="#f5d27a" strokeWidth="0.8" className="mc-cross" opacity="0">
        <circle cx="410" cy="180" r="6" fill="none" />
        <line x1="402" y1="180" x2="418" y2="180" />
        <line x1="410" y1="172" x2="410" y2="188" />
      </g>
    </svg>
  );
}
