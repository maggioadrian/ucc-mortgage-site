"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, TrendingUp, Handshake, ArrowRight } from "lucide-react";

const paths = [
  {
    icon: Building2,
    label: "I need financing",
    description: "Commercial, private & residential mortgages for every deal type.",
    href: "/borrowers",
    delay: 0.35,
  },
  {
    icon: TrendingUp,
    label: "I want to invest",
    description: "Earn 8–12% annually, secured by Ontario real estate.",
    href: "/investors",
    delay: 0.45,
  },
  {
    icon: Handshake,
    label: "I'm a partner / realtor",
    description: "Submit deals, refer clients, earn referral fees.",
    href: "/partners",
    delay: 0.55,
  },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0  },
};

export function HeroSection() {
  return (
    <section
      className="pt-28 pb-20 relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.14) 0%, transparent 65%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">

        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-8">
            <span className="w-1.5 h-1.5 bg-[#006f7f] rounded-full animate-pulse" />
            Windsor&apos;s commercial &amp; private lending specialists since 1974
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-[76px] font-bold tracking-tight leading-[1.06] text-foreground mb-6 max-w-4xl mx-auto"
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Windsor&apos;s commercial &amp; private{" "}
          <span className="shimmer-text">mortgage specialists.</span>
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-14"
          variants={fadeUp} initial="hidden" animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Financing solutions for borrowers, investors, and partners across Ontario.
        </motion.p>

        {/* Three-path CTA cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {paths.map((path) => (
            <motion.div
              key={path.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: path.delay }}
            >
              <Link href={path.href} className="group block h-full">
                <div
                  className="h-full p-7 rounded-2xl border border-[#006f7f]/12 hover:border-[#006f7f]/45 transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,111,127,0.10)] text-left"
                  style={{ background: "linear-gradient(145deg, #242018 0%, #141210 100%)" }}
                >
                  <div className="p-3 rounded-xl bg-[#006f7f]/10 w-fit mb-5 group-hover:bg-[#006f7f]/18 transition-colors">
                    <path.icon className="w-6 h-6 text-[#27aae1]" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                    {path.label}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {path.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27aae1] opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-0.5">
                    Get started <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
