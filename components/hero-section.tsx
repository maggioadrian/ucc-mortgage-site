"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, TrendingUp, CheckCircle2, PiggyBank,
  Lock, Users, Clock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section
      className="min-h-[calc(100vh-100px)] flex items-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 80% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">

          {/* ── Left Column ── */}
          <div className="space-y-8">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1]">
                <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                Trusted since 1974
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.05]"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your mortgage,
              <br />
              <span className="shimmer-text">on your terms.</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-md"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Windsor&apos;s trusted mortgage broker since 1974. We find the right rate
              from 40+ lenders so you don&apos;t have to.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/apply"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
              >
                Get pre-approved
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/rates"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
              >
                View rates
              </Link>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              className="flex flex-wrap items-center gap-8 pt-4"
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Years experience</div>
              </div>
              <div className="w-px h-10 bg-[#2a3033]" />
              <div>
                <div className="text-2xl font-bold text-foreground">$1.2B+</div>
                <div className="text-sm text-muted-foreground">Mortgages placed</div>
              </div>
              <div className="w-px h-10 bg-[#2a3033] hidden sm:block" />
              <div className="hidden sm:block">
                <div className="text-2xl font-bold text-foreground">40+</div>
                <div className="text-sm text-muted-foreground">Lending partners</div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column — Dashboard cards ── */}
          <div className="relative h-[600px] hidden lg:block">

            {/* Card 1 — Rate locked in (top right) */}
            <motion.div
              className="absolute top-0 right-0 animate-float"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-[248px] p-5 rounded-2xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/15 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#27aae1]" />
                    <span className="text-xs font-medium text-muted-foreground">Rate locked in</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 font-medium">Active</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-[#27aae1]">4.39</span>
                  <span className="text-lg font-bold text-[#27aae1]">%</span>
                </div>
                <div className="text-sm text-muted-foreground mb-3">5-Year Fixed</div>
                <svg viewBox="0 0 120 28" className="w-full h-7">
                  <path d="M0 24 L18 19 L36 21 L54 14 L72 16 L90 9 L108 11 L120 5"
                    fill="none" stroke="#27aae1" strokeWidth="2" opacity="0.5" />
                  <path d="M0 24 L18 19 L36 21 L54 14 L72 16 L90 9 L108 11 L120 5"
                    fill="url(#grad)" opacity="0.1" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#27aae1" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <circle cx="120" cy="5" r="3.5" fill="#27aae1" />
                </svg>
              </div>
            </motion.div>

            {/* Card 2 — Application approved (upper left) */}
            <motion.div
              className="absolute top-[105px] left-0 animate-float-delayed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68 }}
            >
              <div className="w-[238px] p-5 rounded-2xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/15 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-muted-foreground">Application approved</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-2xl font-bold text-foreground">Ready</span>
                </div>
                <div className="text-sm font-semibold text-emerald-400 mb-1">Pre-approval: $650,000</div>
                <div className="text-xs text-muted-foreground">Rate hold: 120 days</div>
              </div>
            </motion.div>

            {/* Card 3 — Monthly savings (centre right) */}
            <motion.div
              className="absolute top-[240px] right-[10px] animate-float-delayed-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82 }}
            >
              <div className="w-[232px] p-5 rounded-2xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/15 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <PiggyBank className="w-4 h-4 text-[#27aae1]" />
                  <span className="text-xs font-medium text-muted-foreground">Monthly savings</span>
                </div>
                <div className="text-3xl font-bold text-emerald-400 mb-1">$612<span className="text-lg">/mo</span></div>
                <div className="text-xs text-muted-foreground">vs. your current rate</div>
                <div className="mt-3 h-1.5 rounded-full bg-[#1a1f22] overflow-hidden">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#006f7f] to-emerald-400" />
                </div>
              </div>
            </motion.div>

            {/* Card 4 — Lenders compared (lower left) */}
            <motion.div
              className="absolute top-[370px] left-[10px] animate-float-delayed-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
            >
              <div className="w-[235px] p-5 rounded-2xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/15 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-[#27aae1]" />
                  <span className="text-xs font-medium text-muted-foreground">Lenders compared</span>
                </div>
                <div className="text-2xl font-bold text-[#27aae1] mb-1">40+</div>
                <div className="text-xs text-muted-foreground mb-3">partners searched</div>
                <div className="flex gap-1">
                  {[65, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-[#27aae1]/20" style={{ height: `${h * 0.2}px` }} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 5 — Time to approval (bottom right) */}
            <motion.div
              className="absolute bottom-[10px] right-[5px] animate-float-delayed-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="w-[228px] p-5 rounded-2xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/15 shadow-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#27aae1]" />
                  <span className="text-xs font-medium text-muted-foreground">Time to approval</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">24–48 hrs</div>
                <div className="text-xs text-muted-foreground">typical pre-approval</div>
                <div className="mt-3 flex gap-1.5">
                  {["Inquiry", "Review", "Approved"].map((step, i) => (
                    <div key={step} className="flex-1 text-center">
                      <div className={`h-1 rounded-full mb-1 ${i < 2 ? "bg-[#27aae1]" : "bg-[#27aae1]/30"}`} />
                      <span className="text-[9px] text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#006f7f]/5 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-[#27aae1]/5 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
