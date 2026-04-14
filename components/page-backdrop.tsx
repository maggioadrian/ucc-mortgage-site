"use client";

/**
 * PageBackdrop — per-page animated SVG backgrounds.
 * Place as the FIRST child inside a `position: relative; overflow: hidden` section.
 * Content div should have `position: relative` to sit above the backdrop via DOM order.
 */

export type BackdropVariant =
  | "farm"
  | "residential"
  | "commercial"
  | "private"
  | "debt-consolidation"
  | "refinancing"
  | "loans"
  | "rates"
  | "apply"
  | "about"
  | "invest"
  | "vacant-land";

interface PageBackdropProps {
  variant: BackdropVariant;
}

/* ─── Farm ─────────────────────────────────────────────────────────────────── */
function FarmBackdrop() {
  // Perspective crop rows: vanishing point at top-center (720, 80)
  // Lines fan out from VP, growing wider toward the bottom
  const vp = { x: 720, y: 80 };
  const rowCount = 9;
  // Each row is defined by its y position and half-width at that y
  const rows = Array.from({ length: rowCount }, (_, i) => {
    const t = i / (rowCount - 1); // 0 = near VP, 1 = bottom
    const y = vp.y + 80 + t * 440;
    const halfW = 20 + t * 700;
    return { y, x0: vp.x - halfW, x1: vp.x + halfW };
  });

  // Left/right edge wheat stalk positions
  const stalks = [
    { x: 40,   y: 520, side: "left"  },
    { x: 110,  y: 500, side: "left"  },
    { x: 1330, y: 520, side: "right" },
    { x: 1400, y: 500, side: "right" },
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes farm-field-drift {
            0%   { transform: translateY(0px); }
            100% { transform: translateY(-30px); }
          }
          @keyframes stalk-sway-l {
            0%, 100% { transform: rotate(-2deg); transform-origin: bottom center; }
            50%       { transform: rotate(2deg);  transform-origin: bottom center; }
          }
          @keyframes stalk-sway-r {
            0%, 100% { transform: rotate(2deg);  transform-origin: bottom center; }
            50%       { transform: rotate(-2deg); transform-origin: bottom center; }
          }
          .farm-field   { animation: farm-field-drift 8s ease-in-out infinite alternate; }
          .stalk-l      { animation: stalk-sway-l 4s ease-in-out infinite; }
          .stalk-r      { animation: stalk-sway-r 4s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Perspective crop rows */}
      <g className="farm-field" fill="none" stroke="#006f7f" strokeOpacity="0.12" strokeWidth="1.5">
        {rows.map((row, i) => (
          <line key={i} x1={row.x0} y1={row.y} x2={row.x1} y2={row.y} />
        ))}
        {/* Radiating lines from VP to corners — furrow edges */}
        {[-700, -490, -280, -90, 90, 280, 490, 700].map((offset, i) => (
          <line
            key={`r${i}`}
            x1={vp.x} y1={vp.y}
            x2={vp.x + offset} y2={600}
            strokeOpacity="0.07"
          />
        ))}
        {/* Horizon line */}
        <line x1="0" y1={vp.y + 70} x2="1440" y2={vp.y + 70} strokeOpacity="0.09" />
      </g>

      {/* Wheat stalks — left edge */}
      {stalks.filter(s => s.side === "left").map((s, i) => (
        <g
          key={`sl${i}`}
          className="stalk-l"
          style={{ transformOrigin: `${s.x}px ${s.y}px`, animationDelay: `${i * 0.6}s` }}
        >
          <line x1={s.x} y1={s.y} x2={s.x} y2={s.y - 90}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.5" />
          {/* grain heads */}
          <line x1={s.x} y1={s.y - 70} x2={s.x - 16} y2={s.y - 88}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.2" />
          <line x1={s.x} y1={s.y - 70} x2={s.x + 16} y2={s.y - 88}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.2" />
          <line x1={s.x} y1={s.y - 52} x2={s.x - 12} y2={s.y - 66}
            stroke="#006f7f" strokeOpacity="0.08" strokeWidth="1" />
          <line x1={s.x} y1={s.y - 52} x2={s.x + 12} y2={s.y - 66}
            stroke="#006f7f" strokeOpacity="0.08" strokeWidth="1" />
        </g>
      ))}

      {/* Wheat stalks — right edge */}
      {stalks.filter(s => s.side === "right").map((s, i) => (
        <g
          key={`sr${i}`}
          className="stalk-r"
          style={{ transformOrigin: `${s.x}px ${s.y}px`, animationDelay: `${i * 0.8}s` }}
        >
          <line x1={s.x} y1={s.y} x2={s.x} y2={s.y - 90}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.5" />
          <line x1={s.x} y1={s.y - 70} x2={s.x - 16} y2={s.y - 88}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.2" />
          <line x1={s.x} y1={s.y - 70} x2={s.x + 16} y2={s.y - 88}
            stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1.2" />
          <line x1={s.x} y1={s.y - 52} x2={s.x - 12} y2={s.y - 66}
            stroke="#006f7f" strokeOpacity="0.08" strokeWidth="1" />
          <line x1={s.x} y1={s.y - 52} x2={s.x + 12} y2={s.y - 66}
            stroke="#006f7f" strokeOpacity="0.08" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/* ─── Residential ───────────────────────────────────────────────────────────── */
function ResidentialBackdrop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes res-pulse-1 { 0%,100% { opacity:0.14; } 50% { opacity:0.22; } }
          @keyframes res-pulse-2 { 0%,100% { opacity:0.10; } 50% { opacity:0.18; } }
          @keyframes res-pulse-3 { 0%,100% { opacity:0.08; } 50% { opacity:0.14; } }
          .res-h1 { animation: res-pulse-1 6s ease-in-out infinite; }
          .res-h2 { animation: res-pulse-2 6s ease-in-out infinite 1.5s; }
          .res-h3 { animation: res-pulse-3 6s ease-in-out infinite 3s; }
          .res-h4 { animation: res-pulse-1 6s ease-in-out infinite 4.5s; }
        `}</style>
      </defs>
      <g fill="none" stroke="#2e5f92" strokeWidth="1.5">
        <path className="res-h1" d="M 640 480 L 640 340 L 720 260 L 800 340 L 800 480 Z" />
        <path className="res-h1" d="M 660 480 L 660 390 L 700 370 L 740 370 L 780 390 L 780 480" />
        <path className="res-h2" d="M 350 480 L 350 370 L 420 300 L 490 370 L 490 480 Z" />
        <path className="res-h3" d="M 100 480 L 100 400 L 160 350 L 220 400 L 220 480 Z" />
        <path className="res-h2" d="M 950 480 L 950 370 L 1020 300 L 1090 370 L 1090 480 Z" />
        <path className="res-h3" d="M 1220 480 L 1220 400 L 1280 350 L 1340 400 L 1340 480 Z" />
        <path className="res-h4" d="M 20 480 L 20 430 L 60 400 L 100 430 L 100 480 Z" />
        <path className="res-h4" d="M 1340 480 L 1340 430 L 1380 400 L 1420 430 L 1420 480 Z" />
      </g>
      <line x1="0" y1="480" x2="1440" y2="480" stroke="#2e5f92" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  );
}

/* ─── Commercial ────────────────────────────────────────────────────────────── */
function CommercialBackdrop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <style>{`
          @keyframes com-blink-a { 0%,100% { opacity:0; } 48%,52% { opacity:0.28; } }
          @keyframes com-blink-b { 0%,100% { opacity:0; } 28%,32% { opacity:0.20; } }
          @keyframes com-blink-c { 0%,100% { opacity:0; } 68%,72% { opacity:0.24; } }
          .win-a { animation: com-blink-a 4s ease-in-out infinite; }
          .win-b { animation: com-blink-b 5s ease-in-out infinite 1s; }
          .win-c { animation: com-blink-c 6s ease-in-out infinite 2s; }
        `}</style>
      </defs>
      <g fill="none" stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1">
        <rect x="200" y="160" width="80" height="380" />
        <rect x="400" y="220" width="60" height="320" />
        <rect x="560" y="100" width="100" height="440" />
        <rect x="780" y="180" width="70" height="360" />
        <rect x="960" y="140" width="90" height="400" />
        <rect x="1160" y="200" width="65" height="340" />
        <rect x="1300" y="250" width="55" height="290" />
        {[220, 260, 300, 340].map((y) => <line key={y} x1="200" y1={y} x2="280" y2={y} strokeOpacity="0.07" />)}
        {[240, 280, 320].map((y) => <line key={y} x1="560" y1={y} x2="660" y2={y} strokeOpacity="0.07" />)}
      </g>
      <g fill="#006f7f">
        {[180, 210, 240, 270, 300, 330].map((y, i) =>
          [210, 230, 250, 270].map((x, j) => (
            <rect key={`a-${i}-${j}`} className={j % 2 === 0 ? "win-a" : "win-b"}
              x={x} y={y} width="8" height="6"
              style={{ animationDelay: `${(i + j) * 0.7}s` }} />
          ))
        )}
        {[160, 200, 240, 280, 320].map((y, i) =>
          [570, 590, 620, 640].map((x, j) => (
            <rect key={`b-${i}-${j}`} className="win-c"
              x={x} y={y} width="8" height="6"
              style={{ animationDelay: `${(i * 3 + j) * 0.5}s` }} />
          ))
        )}
      </g>
    </svg>
  );
}

/* ─── Private ───────────────────────────────────────────────────────────────── */
function PrivateBackdrop() {
  const hexPoints = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");

  const hexGrid: [number, number][] = [];
  for (let row = 0; row < 5; row++)
    for (let col = 0; col < 12; col++)
      hexGrid.push([col * 110 + (row % 2) * 55 + 60, row * 96 + 80]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes priv-rot { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .priv-hex-group { transform-origin: 720px 300px; animation: priv-rot 120s linear infinite; }
        `}</style>
      </defs>
      <g className="priv-hex-group" fill="none" stroke="#2e5f92" strokeOpacity="0.12" strokeWidth="1">
        {hexGrid.map(([cx, cy], i) => (
          <polygon key={i} points={hexPoints(cx, cy, 46)} />
        ))}
        <path d="M720 180 L780 210 L780 300 Q780 360 720 390 Q660 360 660 300 L660 210 Z"
          strokeOpacity="0.18" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* ─── Debt Consolidation ────────────────────────────────────────────────────── */
function DebtConsolidationBackdrop() {
  const lines = [
    { x1: 0, y1: 80, x2: 900, y2: 300 },
    { x1: 0, y1: 160, x2: 900, y2: 300 },
    { x1: 0, y1: 260, x2: 900, y2: 300 },
    { x1: 0, y1: 380, x2: 900, y2: 300 },
    { x1: 0, y1: 480, x2: 900, y2: 300 },
    { x1: 0, y1: 560, x2: 900, y2: 300 },
    { x1: 1440, y1: 50,  x2: 900, y2: 300 },
    { x1: 1440, y1: 200, x2: 900, y2: 300 },
    { x1: 1440, y1: 400, x2: 900, y2: 300 },
    { x1: 1440, y1: 560, x2: 900, y2: 300 },
  ];
  const totalLen = 1200;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes dc-draw {
            0%   { stroke-dashoffset: ${totalLen}; opacity: 0.06; }
            40%  { opacity: 0.18; }
            100% { stroke-dashoffset: 0; opacity: 0.12; }
          }
          @keyframes dc-pulse { 0%,100% { r: 5; opacity: 0.18; } 50% { r: 9; opacity: 0.32; } }
          .dc-line { stroke-dasharray: ${totalLen}; animation: dc-draw 6s ease-in-out infinite alternate; }
          .dc-node { animation: dc-pulse 3s ease-in-out infinite; }
        `}</style>
      </defs>
      <g stroke="#006f7f" strokeWidth="1.2">
        {lines.map((l, i) => (
          <line key={i} className="dc-line"
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
      </g>
      <circle className="dc-node" cx="900" cy="300" r="5" fill="#006f7f" />
      {lines.map((l, i) => (
        <circle key={i} cx={l.x1} cy={l.y1} r="3" fill="#006f7f" fillOpacity="0.18" />
      ))}
    </svg>
  );
}

/* ─── Refinancing ───────────────────────────────────────────────────────────── */
function RefinancingBackdrop() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes ref-spin     { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
          @keyframes ref-spin-rev { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
          .ref-arc1 { transform-origin: 720px 300px; animation: ref-spin 40s linear infinite; }
          .ref-arc2 { transform-origin: 720px 300px; animation: ref-spin-rev 28s linear infinite; }
          .ref-arc3 { transform-origin: 720px 300px; animation: ref-spin 60s linear infinite; }
        `}</style>
      </defs>
      <g fill="none" stroke="#006f7f">
        <circle className="ref-arc1" cx="720" cy="300" r="340"
          strokeOpacity="0.10" strokeWidth="1.5" strokeDasharray="30 18" />
        <circle className="ref-arc2" cx="720" cy="300" r="240"
          strokeOpacity="0.08" strokeWidth="1.5" strokeDasharray="20 30" />
        <circle className="ref-arc3" cx="720" cy="300" r="150"
          strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="12 20" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 12;
          return (
            <line key={i}
              x1={720 + 330 * Math.cos(a)} y1={300 + 330 * Math.sin(a)}
              x2={720 + 350 * Math.cos(a)} y2={300 + 350 * Math.sin(a)}
              strokeOpacity="0.12" strokeWidth="1" />
          );
        })}
      </g>
    </svg>
  );
}

/* ─── Loans ──────────────────────────────────────────────────────────────────── */
function LoansBackdrop() {
  const width = 1440, height = 600, amplitude = 60;
  const wave1 = (x: number, phase: number) =>
    height / 2 + amplitude * Math.sin((x / width) * Math.PI * 4 + phase);
  const wave2 = (x: number, phase: number) =>
    height / 2 + amplitude * 0.6 * Math.sin((x / width) * Math.PI * 6 + phase);
  const buildPath = (fn: (x: number) => number) =>
    Array.from({ length: 145 }, (_, i) =>
      `${i === 0 ? "M" : "L"} ${i * 10} ${fn(i * 10)}`
    ).join(" ");

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes loans-drift1 { 0% { transform: translateX(0); } 100% { transform: translateX(-180px); } }
          @keyframes loans-drift2 { 0% { transform: translateX(0); } 100% { transform: translateX(140px); } }
          .loans-w1 { animation: loans-drift1 14s linear infinite; }
          .loans-w2 { animation: loans-drift2 10s linear infinite; }
        `}</style>
      </defs>
      <g fill="none" stroke="#006f7f">
        <path className="loans-w1" d={buildPath((x) => wave1(x, 0))}
          strokeOpacity="0.12" strokeWidth="1.5" />
        <path className="loans-w1" d={buildPath((x) => wave1(x, Math.PI))}
          strokeOpacity="0.08" strokeWidth="1" />
        <path className="loans-w2" d={buildPath((x) => wave2(x, 0.8))}
          strokeOpacity="0.10" strokeWidth="1.5" />
        <path className="loans-w2" d={buildPath((x) => wave2(x, 0.8 + Math.PI))}
          strokeOpacity="0.07" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ─── Rates ──────────────────────────────────────────────────────────────────── */
const RATE_CHARS = "4.39 4.49 4.54 5.79 5.89 3.75 2.75 4.95 Prime −0.90% Fixed Variable BoC 5yr".split(" ");
function RatesBackdrop() {
  const cols = 10, rows = 6;
  const items = Array.from({ length: cols * rows }, (_, i) => ({
    x: (i % cols) * 148 + 20,
    y: Math.floor(i / cols) * 88 + 60,
    val: RATE_CHARS[i % RATE_CHARS.length],
    delay: (i * 0.23) % 8,
  }));
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes rate-scroll { 0%,100% { opacity:0.08; } 50% { opacity:0.16; } }
          .rate-num { animation: rate-scroll 5s ease-in-out infinite; font-family: 'Courier New', monospace; }
        `}</style>
      </defs>
      {items.map((item, i) => (
        <text key={i} className="rate-num"
          x={item.x} y={item.y} fill="#006f7f" fontSize="13"
          style={{ animationDelay: `${item.delay}s` }}>
          {item.val}
        </text>
      ))}
    </svg>
  );
}

/* ─── Apply ──────────────────────────────────────────────────────────────────── */
function ApplyBackdrop() {
  const nodePositions = [120, 360, 600, 840, 1100, 1320];
  const y = 300;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes apply-dash { 0% { stroke-dashoffset: 800; } 100% { stroke-dashoffset: 0; } }
          @keyframes apply-pulse       { 0%,100% { r: 6;  opacity: 0.16; } 50% { r: 11; opacity: 0.28; } }
          @keyframes apply-pulse-outer { 0%,100% { r: 14; opacity: 0.07; } 50% { r: 20; opacity: 0.14; } }
          .apply-path { stroke-dasharray: 12 8; animation: apply-dash 12s linear infinite; }
          .apply-node { animation: apply-pulse 3s ease-in-out infinite; }
          .apply-ring { animation: apply-pulse-outer 3s ease-in-out infinite; }
        `}</style>
      </defs>
      <path className="apply-path"
        d={`M ${nodePositions[0]} ${y} ${nodePositions.slice(1).map((x) => `L ${x} ${y}`).join(" ")}`}
        fill="none" stroke="#006f7f" strokeOpacity="0.18" strokeWidth="2" />
      {nodePositions.map((x, i) => (
        <g key={i}>
          <circle className="apply-ring" cx={x} cy={y} r="14" fill="#006f7f"
            style={{ animationDelay: `${i * 0.5}s` }} />
          <circle className="apply-node" cx={x} cy={y} r="6" fill="#006f7f"
            style={{ animationDelay: `${i * 0.5}s` }} />
        </g>
      ))}
      {["Start", "Details", "Property", "Income", "Review", "Done"].map((label, i) => (
        <text key={i} x={nodePositions[i]} y={y + 36} textAnchor="middle"
          fill="#006f7f" fillOpacity="0.14" fontSize="11"
          style={{ fontFamily: "monospace" }}>
          {label}
        </text>
      ))}
    </svg>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────────── */
function AboutBackdrop() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes about-drift { 0% { transform: translateX(0); } 100% { transform: translateX(-60px); } }
          .about-skyline { animation: about-drift 40s ease-in-out infinite alternate; }
        `}</style>
      </defs>
      <g className="about-skyline" fill="none" stroke="#2e5f92" strokeOpacity="0.10" strokeWidth="1.2">
        <line x1="420" y1="120" x2="420" y2="440" />
        <line x1="760" y1="120" x2="760" y2="440" />
        <path d="M 200 440 Q 420 80 760 80 Q 1060 80 1240 440" strokeWidth="2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`cl${i}`} x1="420" y1={130 + i * 18} x2={420 - 30 - i * 28} y2="440" strokeOpacity="0.06" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`cr${i}`} x1="760" y1={130 + i * 18} x2={760 + 30 + i * 28} y2="440" strokeOpacity="0.06" />
        ))}
        <rect x="60"  y="340" width="40" height="100" />
        <rect x="110" y="300" width="55" height="140" />
        <rect x="175" y="360" width="35" height="80"  />
        <rect x="900"  y="380" width="30" height="60" strokeOpacity="0.07" />
        <rect x="940"  y="350" width="50" height="90" strokeOpacity="0.07" />
        <rect x="1000" y="340" width="40" height="100" strokeOpacity="0.07" />
        <rect x="1050" y="370" width="35" height="70" strokeOpacity="0.07" />
        <rect x="1100" y="360" width="60" height="80" strokeOpacity="0.07" />
        <rect x="1170" y="380" width="30" height="60" strokeOpacity="0.07" />
        <line x1="0" y1="440" x2="1440" y2="440" strokeOpacity="0.12" />
      </g>
    </svg>
  );
}

/* ─── Invest ─────────────────────────────────────────────────────────────────── */
function InvestBackdrop() {
  const pts = Array.from({ length: 100 }, (_, i) => {
    const t = i / 99;
    const x = 200 + t * 1000;
    const y = 480 - 320 * Math.pow(t, 1.6);
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  const dataPoints = [0, 15, 30, 48, 65, 80, 99].map((idx) => {
    const t = idx / 99;
    return { x: 200 + t * 1000, y: 480 - 320 * Math.pow(t, 1.6) };
  });

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes inv-draw { 0% { stroke-dashoffset: 1400; } 100% { stroke-dashoffset: 0; } }
          @keyframes inv-dot  { 0%,100% { r: 4; opacity: 0.18; } 50% { r: 7; opacity: 0.32; } }
          .inv-curve { stroke-dasharray: 1400; animation: inv-draw 8s ease-out infinite; }
          .inv-dot   { animation: inv-dot 3s ease-in-out infinite; }
        `}</style>
      </defs>
      {[160, 240, 320, 400, 480].map((y) => (
        <line key={y} x1="150" y1={y} x2="1290" y2={y}
          stroke="#006f7f" strokeOpacity="0.05" strokeWidth="1" />
      ))}
      <path className="inv-curve" d={pts}
        fill="none" stroke="#006f7f" strokeOpacity="0.14" strokeWidth="1.5" />
      {dataPoints.map((pt, i) => (
        <circle key={i} className="inv-dot"
          cx={pt.x} cy={pt.y} r="4" fill="#006f7f"
          style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      <line x1="200" y1="160" x2="200" y2="490"
        stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="190" y1="480" x2="1210" y2="480"
        stroke="#006f7f" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  );
}

/* ─── Vacant Land ────────────────────────────────────────────────────────────── */
function VacantLandBackdrop() {
  const contours = [
    "M 0 520 Q 200 480 400 510 Q 600 540 800 500 Q 1000 460 1200 490 L 1440 510",
    "M 0 460 Q 240 420 480 450 Q 720 480 960 440 Q 1140 410 1440 440",
    "M 0 400 Q 280 360 560 390 Q 800 420 1040 380 Q 1240 350 1440 380",
    "M 0 340 Q 300 300 600 330 Q 840 360 1080 320 Q 1280 290 1440 315",
    "M 0 280 Q 260 250 520 275 Q 780 300 1040 265 Q 1260 240 1440 260",
    "M 0 230 Q 320 210 640 232 Q 900 252 1160 220 Q 1340 198 1440 212",
  ];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <style>{`
          @keyframes land-pan { 0% { transform: translateX(0); } 100% { transform: translateX(-30px); } }
          .land-contours { animation: land-pan 25s ease-in-out infinite alternate; }
        `}</style>
      </defs>
      <g className="land-contours" fill="none" stroke="#006f7f">
        {contours.map((d, i) => (
          <path key={i} d={d} strokeOpacity={0.08 + i * 0.015} strokeWidth="1" />
        ))}
        <line x1="0" y1="200" x2="1440" y2="200" strokeOpacity="0.10" strokeWidth="1.2" />
        <circle cx="1100" cy="160" r="36" strokeOpacity="0.09" strokeWidth="1.5" fill="none" />
        <circle cx="1100" cy="160" r="22" strokeOpacity="0.07" strokeWidth="1"   fill="none" />
      </g>
    </svg>
  );
}

/* ─── Dispatcher ─────────────────────────────────────────────────────────────── */
const VARIANT_MAP: Record<BackdropVariant, () => JSX.Element> = {
  farm: FarmBackdrop,
  residential: ResidentialBackdrop,
  commercial: CommercialBackdrop,
  private: PrivateBackdrop,
  "debt-consolidation": DebtConsolidationBackdrop,
  refinancing: RefinancingBackdrop,
  loans: LoansBackdrop,
  rates: RatesBackdrop,
  apply: ApplyBackdrop,
  about: AboutBackdrop,
  invest: InvestBackdrop,
  "vacant-land": VacantLandBackdrop,
};

export function PageBackdrop({ variant }: PageBackdropProps) {
  const Component = VARIANT_MAP[variant];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Component />
    </div>
  );
}
