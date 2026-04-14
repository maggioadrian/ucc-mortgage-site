"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Landmark, Home, TrendingUp } from "lucide-react";

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

export function ServicesSection() {
  return (
    <section id="solutions" className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-3">Featured solutions</h2>
          <p className="text-muted-foreground max-w-xl">
            Commercial and private lending are our core strengths — backed by 50 years of Ontario deal experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* ── Commercial — large priority card ── */}
          <motion.div
            variants={cardVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 group"
          >
            <Link href="/solutions/commercial" className="block h-full">
              <div
                className="h-full p-8 rounded-2xl border border-[#006f7f]/30 hover:border-[#006f7f]/50 transition-all duration-300 hover:shadow-[0_0_36px_rgba(0,111,127,0.10)]"
                style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.10) 0%, #242018 40%, #141210 100%)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#006f7f]/12">
                      <Building2 className="w-6 h-6 text-[#006f7f]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#006f7f]/10 border border-[#006f7f]/20 text-[#27aae1]">
                      Priority
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#27aae1] transition-colors">
                  Commercial Financing
                </h3>
                <p className="text-muted-foreground mb-6 max-w-lg leading-relaxed">
                  Multi-unit residential, retail plazas, office buildings, and industrial properties. We place commercial deals other brokers can&apos;t — with lenders who understand the Windsor-Essex market.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { value: "$2.1M",  label: "Recent deal closed" },
                    { value: "15+",    label: "Commercial lenders" },
                    { value: "50 yrs", label: "Market experience"  },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-xl font-bold text-[#27aae1]">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#27aae1] opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore commercial <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ── Residential — secondary card ── */}
          <motion.div
            variants={cardVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group"
          >
            <Link href="/solutions/residential" className="block h-full">
              <div
                className="h-full p-7 rounded-2xl border border-[#006f7f]/10 hover:border-[#006f7f]/35 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,111,127,0.1)]"
                style={{ background: "linear-gradient(145deg, #242018 0%, #141210 100%)" }}
              >
                <div className="p-3 rounded-xl bg-[#006f7f]/10 w-fit mb-5">
                  <Home className="w-5 h-5 text-[#006f7f]" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                  Residential Mortgages
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  First-time buyers, renewals, refinancing, and investment properties. Best rate from 40+ lenders.
                </p>
                <div className="text-2xl font-bold text-[#27aae1] mb-1">$1.2B+</div>
                <div className="text-xs text-muted-foreground mb-5">placed since 1974</div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#27aae1] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ── Private Mortgages — large priority card (full width) ── */}
          <motion.div
            variants={cardVariants} initial="hidden"
            whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 group"
          >
            <div
              className="p-8 rounded-2xl border border-[#006f7f]/35 hover:border-[#006f7f]/50 transition-all duration-300 hover:shadow-[0_0_36px_rgba(0,111,127,0.12)]"
              style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.09) 0%, #242018 45%, #141210 100%)" }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-[#006f7f]/20">
                      <Landmark className="w-6 h-6 text-[#006f7f]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#006f7f]/20 border border-[#006f7f]/35 text-[#27aae1]">
                      Priority · For borrowers &amp; investors
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#27aae1] transition-colors">
                    Private Mortgages
                  </h3>
                  <p className="text-muted-foreground max-w-2xl leading-relaxed">
                    Fast, flexible financing when the bank says no — and a trusted way to earn 8–12% secured by Canadian real estate. Windsor&apos;s only licensed mortgage administrator since 2008.
                  </p>
                  <div className="flex items-center gap-1.5 mt-4">
                    <TrendingUp className="w-3.5 h-3.5 text-[#006f7f]" />
                    <span className="text-xs font-semibold text-[#27aae1]">Windsor&apos;s largest private mortgage source</span>
                    <span className="text-xs text-muted-foreground">· since 1974</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                  <Link
                    href="/solutions/private#borrowers"
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-[#006f7f] text-[#141210] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_24px_rgba(0,111,127,0.35)]"
                  >
                    Get a private mortgage
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/investors"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#006f7f]/50 text-[#27aae1] text-sm font-semibold rounded-full hover:border-[#006f7f]/60 hover:bg-[#006f7f]/5 transition-all"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Invest with us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
