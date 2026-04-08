"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

// ── Agricultural accent palette (green-teal, earthy) ─────────────────────────
// AG_ACCENT: borders, backgrounds, subtle tints
// AG_TEXT:   readable text on dark bg (slightly lighter)
const AG_ACCENT = "#0a7a5a";
const AG_TEXT   = "#1fbe7a";

// ── Animated SVG Hero Backdrop ────────────────────────────────────────────────
function FarmHeroBackdrop() {
  const VP        = { x: 720, y: 120 }; // vanishing point — top center, ~20% height
  const BOTTOM_Y  = 620;
  const NUM_LINES = 12;

  // Fan lines: evenly distributed x-positions at BOTTOM_Y
  const fanXs = Array.from({ length: NUM_LINES }, (_, i) =>
    40 + (i * (1400 - 40)) / (NUM_LINES - 1)
  );

  // Cross-hatch at intermediate depths between alternating adjacent line pairs
  type Seg = { x1: number; y1: number; x2: number; y2: number };
  const crossHatchYs = [200, 275, 355, 435, 515];
  const crossHatches: Seg[] = [];
  for (const yh of crossHatchYs) {
    const t = (yh - VP.y) / (BOTTOM_Y - VP.y);
    for (let i = 0; i < NUM_LINES - 1; i += 2) {
      crossHatches.push({
        x1: VP.x + (fanXs[i]     - VP.x) * t, y1: yh,
        x2: VP.x + (fanXs[i + 1] - VP.x) * t, y2: yh,
      });
    }
  }

  // Wheat stalk positions — 5 per side, staggered heights
  const leftStalks  = [
    { x: 24,  y: 590, h: 110 },
    { x: 62,  y: 580, h: 95  },
    { x: 98,  y: 596, h: 122 },
    { x: 134, y: 584, h: 100 },
    { x: 170, y: 592, h: 116 },
  ];
  const rightStalks = [
    { x: 1270, y: 590, h: 110 },
    { x: 1308, y: 580, h: 95  },
    { x: 1342, y: 596, h: 122 },
    { x: 1378, y: 584, h: 100 },
    { x: 1414, y: 592, h: 116 },
  ];

  const Stalk = ({
    s,
    dir,
    delay,
  }: {
    s: { x: number; y: number; h: number };
    dir: "l" | "r";
    delay: number;
  }) => {
    const cx = dir === "l"
      ? `M ${s.x} ${s.y} C ${s.x - 9} ${s.y - s.h * 0.38} ${s.x + 9} ${s.y - s.h * 0.68} ${s.x} ${s.y - s.h}`
      : `M ${s.x} ${s.y} C ${s.x + 9} ${s.y - s.h * 0.38} ${s.x - 9} ${s.y - s.h * 0.68} ${s.x} ${s.y - s.h}`;
    return (
      <g
        style={{
          transformOrigin: `${s.x}px ${s.y}px`,
          animation: `farm-sway-${dir} 3.6s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {/* S-curve stem */}
        <path d={cx} stroke="#006f7f" strokeOpacity="0.15" strokeWidth="1.5" fill="none" />
        {/* Top grain heads */}
        <line x1={s.x} y1={s.y - s.h * 0.84} x2={s.x - 13} y2={s.y - s.h}
          stroke="#006f7f" strokeOpacity="0.15" strokeWidth="1.2" />
        <line x1={s.x} y1={s.y - s.h * 0.84} x2={s.x + 13} y2={s.y - s.h}
          stroke="#006f7f" strokeOpacity="0.15" strokeWidth="1.2" />
        {/* Mid grain heads */}
        <line x1={s.x} y1={s.y - s.h * 0.64} x2={s.x - 9} y2={s.y - s.h * 0.77}
          stroke="#006f7f" strokeOpacity="0.11" strokeWidth="1" />
        <line x1={s.x} y1={s.y - s.h * 0.64} x2={s.x + 9} y2={s.y - s.h * 0.77}
          stroke="#006f7f" strokeOpacity="0.11" strokeWidth="1" />
      </g>
    );
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="farm-vp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#27aae1" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#27aae1" stopOpacity="0"    />
        </radialGradient>
        <style>{`
          @keyframes farm-sway-l {
            0%, 100% { transform: rotate(-3deg); }
            50%       { transform: rotate( 3deg); }
          }
          @keyframes farm-sway-r {
            0%, 100% { transform: rotate( 3deg); }
            50%       { transform: rotate(-3deg); }
          }
        `}</style>
      </defs>

      {/* Sun / horizon glow at vanishing point */}
      <circle cx={VP.x} cy={VP.y} r="120" fill="url(#farm-vp-glow)" />
      <circle cx={VP.x} cy={VP.y} r="60"
        fill="none" stroke="#27aae1" strokeOpacity="0.04" strokeWidth="1" />

      {/* Perspective fan lines */}
      {fanXs.map((x2, i) => (
        <line key={i}
          x1={VP.x} y1={VP.y} x2={x2} y2={BOTTOM_Y}
          stroke="#006f7f" strokeOpacity="0.15" strokeWidth="1" />
      ))}

      {/* Cross-hatch between alternating row pairs */}
      {crossHatches.map((seg, i) => (
        <line key={i}
          x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
          stroke="#006f7f" strokeOpacity="0.07" strokeWidth="0.8" />
      ))}

      {/* Wheat stalks */}
      {leftStalks.map((s, i) => (
        <Stalk key={`l${i}`} s={s} dir="l" delay={i * 0.42} />
      ))}
      {rightStalks.map((s, i) => (
        <Stalk key={`r${i}`} s={s} dir="r" delay={i * 0.55} />
      ))}
    </svg>
  );
}

// ── Custom benefit card SVG icons ─────────────────────────────────────────────
function IconWheat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="22" x2="12" y2="6" />
      <path d="M12 18 C8 16 6 11 9 9" />
      <path d="M12 18 C16 16 18 11 15 9" />
      <path d="M12 12 C8 10 6 5 9 3" />
      <path d="M12 12 C16 10 18 5 15 3" />
    </svg>
  );
}

function IconBarn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12 L12 4 L21 12" />
      <rect x="4" y="12" width="16" height="9" rx="0.5" />
      <path d="M9 21 L9 16 Q12 14 15 16 L15 21" />
      <line x1="12" y1="4" x2="12" y2="12" strokeOpacity="0.5" />
    </svg>
  );
}

function IconLandChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="18" x2="21" y2="18" />
      <line x1="3" y1="14" x2="21" y2="14" />
      <line x1="6" y1="14" x2="4"  y2="9"  />
      <line x1="10" y1="14" x2="9"  y2="8"  />
      <line x1="14" y1="14" x2="15" y2="8"  />
      <line x1="18" y1="14" x2="20" y2="9"  />
      <circle cx="12" cy="5" r="2.5" />
    </svg>
  );
}

function IconWaterDrop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2 C12 2 4 10 4 15 A8 8 0 0 0 20 15 C20 10 12 2 12 2Z" />
      <path d="M8.5 17 Q12 14.5 15.5 17" strokeWidth="1" />
    </svg>
  );
}

function IconMapleLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3 L13.5 7.5 L18 6 L15.5 10 L21 11.5 L17 14 L18.5 19 L12 17 L5.5 19 L7 14 L3 11.5 L8.5 10 L6 6 L10.5 7.5 Z" />
      <line x1="12" y1="17" x2="12" y2="22" />
    </svg>
  );
}

function IconScrollDoc({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2 H6 A2 2 0 0 0 4 4 V20 A2 2 0 0 0 6 22 H18 A2 2 0 0 0 20 20 V8 L14 2Z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <polyline points="13,17 15,15 17,17" strokeWidth="1.2" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const benefits = [
  {
    Icon: IconWheat,
    title: "Working farm financing",
    description:
      "Cash crop, livestock, greenhouse, and mixed farming operations financed by lenders who understand agriculture.",
  },
  {
    Icon: IconBarn,
    title: "Hobby farms & acreages",
    description:
      "Properties with outbuildings, acreage, and mixed residential-agricultural use welcome.",
  },
  {
    Icon: IconLandChart,
    title: "Up to 80% LTV on residential farm",
    description:
      "Productive farmland financing with lenders who assess income potential, not just market value.",
  },
  {
    Icon: IconWaterDrop,
    title: "Operating line coordination",
    description:
      "We work alongside your agricultural banker to structure mortgage debt that complements your operating credit.",
  },
  {
    Icon: IconMapleLeaf,
    title: "Federal programs available",
    description:
      "Farm Credit Canada (FCC) and CEBA-eligible structures accessed through our lender relationships.",
  },
  {
    Icon: IconScrollDoc,
    title: "Flexible income qualifying",
    description:
      "Farm income fluctuates — our lenders understand crop cycles, insurance proceeds, and Schedule F income.",
  },
];

const eligibility = [
  "Property classified as agricultural or rural residential in Ontario",
  "Working farm, hobby farm, or mixed-use acreage",
  "Minimum 25% down payment for most agricultural properties",
  "Farm income documentation (T1 general, Schedule F) for 2 years",
  "Environmental assessment may be required for certain operations",
  "Property inspection including outbuildings and equipment sheds",
];

const steps = [
  {
    number: "01",
    title: "Farm & property review",
    description: "Tell us about the farm type, acreage, outbuildings, and current operations or intended use.",
  },
  {
    number: "02",
    title: "Ag lender matching",
    description: "We connect your file with agricultural lending specialists who understand farm valuations.",
  },
  {
    number: "03",
    title: "Appraisal & assessment",
    description: "Agricultural appraisal completed by a CUSPAP-accredited farm appraiser.",
  },
  {
    number: "04",
    title: "Approval & closing",
    description: "Mortgage registered, funds advanced. Your farm, secured.",
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0  },
};

// ── Page component ────────────────────────────────────────────────────────────
export function FarmPageClient() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="pt-24 pb-20 relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(10,122,90,0.12) 0%, transparent 65%)`,
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <FarmHeroBackdrop />
          </div>

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left — text content */}
              <div className="max-w-xl">
                <motion.div variants={fadeUp} initial="hidden" animate="visible"
                  transition={{ duration: 0.5 }}>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                    style={{
                      background:  `${AG_ACCENT}28`,
                      border:      `1px solid ${AG_ACCENT}50`,
                      color:       AG_TEXT,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: AG_TEXT }} />
                    Rural &amp; agricultural lending
                  </span>
                </motion.div>

                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-6"
                  variants={fadeUp} initial="hidden" animate="visible"
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Farm &amp; Agriculture Mortgages
                </motion.h1>

                <motion.p
                  className="text-lg font-semibold mb-4"
                  style={{ color: AG_TEXT }}
                  variants={fadeUp} initial="hidden" animate="visible"
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  Financing for the land that feeds us.
                </motion.p>

                <motion.p
                  className="text-lg text-muted-foreground max-w-lg mb-8"
                  variants={fadeUp} initial="hidden" animate="visible"
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Financing for working farms, hobby farms, acreages, and agricultural
                  operations across Ontario. We understand the unique lending requirements
                  of rural properties and have lender partners who specialize in this space.
                </motion.p>

                <motion.div className="flex flex-wrap gap-4"
                  variants={fadeUp} initial="hidden" animate="visible"
                  transition={{ duration: 0.5, delay: 0.3 }}>
                  <Link
                    href="/apply"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full transition-all"
                    style={{
                      background:  AG_TEXT,
                      color:       "#0e1214",
                      boxShadow:   `0 0 0 0 ${AG_TEXT}00`,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 28px ${AG_TEXT}55`)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = `0 0 0 0 ${AG_TEXT}00`)}
                  >
                    Apply now
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border text-foreground font-semibold rounded-full transition-all"
                    style={{ borderColor: `${AG_ACCENT}60` }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${AG_ACCENT}cc`;
                      e.currentTarget.style.background  = `${AG_ACCENT}0d`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `${AG_ACCENT}60`;
                      e.currentTarget.style.background  = "transparent";
                    }}
                  >
                    Book a call
                  </Link>
                </motion.div>
              </div>

              {/* Right — split stat card */}
              <motion.div
                className="hidden lg:grid grid-cols-2 gap-4"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {[
                  { value: "$2.8B",  label: "Ontario greenhouse\nindustry value" },
                  { value: "40+",    label: "Ag lenders in\nour network"         },
                  { value: "50+ yrs",label: "Rural lending\nexperience"           },
                  { value: "Up to 80%", label: "LTV on residential\nfarm"         },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="p-6 rounded-xl text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(10,122,90,0.08) 0%, rgba(14,18,20,0.9) 100%)",
                      border:     `1px solid ${AG_ACCENT}35`,
                    }}
                  >
                    <div
                      className="text-4xl font-bold mb-1 leading-none"
                      style={{ color: AG_TEXT }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground whitespace-pre-line leading-snug">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── Panoramic field banner ────────────────────────────────────────── */}
        <section
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            height: 120,
            background: "linear-gradient(180deg, #111918 0%, #0f1a14 100%)",
          }}
        >
          {/* Thin teal accent lines */}
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: AG_ACCENT, opacity: 0.35 }} />
          <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: AG_ACCENT, opacity: 0.35 }} />
          <motion.p
            className="text-2xl sm:text-3xl font-semibold tracking-wide text-foreground/80 px-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Serving Ontario farmers since 1974
          </motion.p>
        </section>

        {/* ── Stats bar ────────────────────────────────────────────────────── */}
        <section className="border-y border-[#1a1f22] bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "50+ yrs",  label: "Rural lending experience"    },
                { value: "Up to 80%",label: "LTV on residential farm"      },
                { value: "10+",      label: "Ag-specialized lenders"       },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: AG_TEXT }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key benefits ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Key benefits</h2>
              <p className="text-muted-foreground max-w-xl">
                What sets our agricultural mortgage solution apart from the banks.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group p-6 rounded-xl transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)",
                    border:     `1px solid ${AG_ACCENT}25`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${AG_ACCENT}70`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${AG_ACCENT}15`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.border = `1px solid ${AG_ACCENT}25`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <div className="p-2.5 rounded-lg w-fit mb-4" style={{ background: `${AG_ACCENT}22` }}>
                    <b.Icon className="w-5 h-5" style={{ color: AG_TEXT } as React.CSSProperties} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 transition-colors"
                    style={{ ["--tw-group-hover-color" as string]: AG_TEXT }}>
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {b.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Eligibility ──────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">Eligibility criteria</h2>
                <p className="text-muted-foreground mb-8">
                  General requirements for agricultural mortgage financing. Every farm is unique
                  — contact us if you&apos;re unsure whether your property qualifies.
                </p>
                <ul className="space-y-4">
                  {eligibility.map((item, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: AG_TEXT }} />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${AG_ACCENT}12 0%, rgba(14,18,20,1) 70%)`,
                  border:     `1px solid ${AG_ACCENT}30`,
                }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">Not sure if you qualify?</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Our brokers have helped Ontario farmers in every type of situation for over 50 years.
                  A 15-minute call is often all it takes to know your options — with zero obligation.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full text-sm transition-all"
                  style={{ background: AG_TEXT, color: "#0e1214" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 20px ${AG_TEXT}50`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  Speak to a broker
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Windsor-Essex Greenhouse Spotlight ───────────────────────────── */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0d1c17 0%, #0a0d0e 100%)",
                border:     `2px solid ${AG_ACCENT}50`,
              }}
            >
              {/* Subtle background texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 80% 50%, ${AG_ACCENT}08 0%, transparent 60%)`,
                }}
              />

              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-5"
                    style={{
                      background: `${AG_ACCENT}25`,
                      border:     `1px solid ${AG_ACCENT}45`,
                      color:      AG_TEXT,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: AG_TEXT }} />
                    Windsor-Essex Greenhouse Spotlight
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
                    Canada&apos;s greenhouse capital
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Windsor-Essex County is home to over 65% of Canada&apos;s greenhouse vegetable
                    production. UCC has financed greenhouse operations across the region for decades —
                    from small hobby greenhouses to large-scale commercial operations. Our lenders
                    understand greenhouse valuations, crop cycles, and the unique financing needs of
                    controlled environment agriculture.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: AG_TEXT }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Talk to a greenhouse specialist
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {[
                    { value: "65%",      label: "of Canada's greenhouse\nvegetable production" },
                    { value: "Decades",  label: "of greenhouse financing\nin Windsor-Essex"     },
                    { value: "All sizes",label: "from hobby greenhouses\nto commercial ops"     },
                    { value: "CEA",      label: "controlled environment\nagriculture expertise" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="p-5 rounded-xl text-center"
                      style={{
                        background: `${AG_ACCENT}10`,
                        border:     `1px solid ${AG_ACCENT}30`,
                      }}
                    >
                      <div className="text-2xl font-bold mb-1" style={{ color: AG_TEXT }}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider whitespace-pre-line leading-snug">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A simple, guided process from first conversation to funded farm mortgage.
              </p>
            </motion.div>

            <div className="relative">
              <div
                className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px"
                style={{ background: `linear-gradient(to right, ${AG_ACCENT}, ${AG_TEXT}, ${AG_ACCENT})` }}
              />
              <div className="grid md:grid-cols-4 gap-8 md:gap-4">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center"
                  >
                    <div
                      className="relative z-10 mx-auto w-28 h-28 rounded-full flex flex-col items-center justify-center mb-5"
                      style={{
                        background:   "#111618",
                        border:       `2px solid ${AG_ACCENT}55`,
                      }}
                    >
                      <span className="text-xs text-muted-foreground mb-0.5">{step.number}</span>
                      <span className="text-xl font-bold" style={{ color: AG_TEXT }}>
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 bg-[#0e1214] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to finance your farm?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Complete a quick application or book a call with one of our agricultural lending
                specialists. No obligation, no hard credit pull at this stage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all"
                  style={{ background: AG_TEXT, color: "#0e1214" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 0 30px ${AG_TEXT}55`)}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  Start your application
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border text-foreground font-semibold rounded-full transition-all"
                  style={{ borderColor: `${AG_ACCENT}55` }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${AG_ACCENT}aa`;
                    e.currentTarget.style.background  = `${AG_ACCENT}0d`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${AG_ACCENT}55`;
                    e.currentTarget.style.background  = "transparent";
                  }}
                >
                  Book a free call
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
