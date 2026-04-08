"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 50,  suffix: "+",  label: "Years Experience" },
  { value: 1.2, suffix: "B+", prefix: "$", label: "Mortgages Placed", decimals: 1 },
  { value: 40,  suffix: "+",  label: "Lending Partners" },
  { value: 4.9, suffix: "★",  label: "Client Rating", decimals: 1 },
];

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  trigger,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  trigger: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!trigger || started.current) return;
    started.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * ease);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, value]);

  return (
    <span>
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  // Trigger when 20% of the section enters the viewport — no negative margin
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0d0e] border-y border-[#1a1f22]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#27aae1] mb-2">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix ?? ""}
                  decimals={stat.decimals ?? 0}
                  trigger={isInView}
                />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
