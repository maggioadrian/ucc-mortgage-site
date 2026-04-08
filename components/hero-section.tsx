"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, CheckCircle2, PiggyBank } from "lucide-react";

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
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1]">
                <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                Trusted since 1974
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-[80px] font-bold tracking-tight leading-[1.05]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your mortgage,
              <br />
              <span className="shimmer-text">on your terms.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-md"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Windsor&apos;s trusted mortgage broker since 1974. We find the right rate from 40+ lenders so you don&apos;t have to.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="#apply"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
              >
                Get pre-approved
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#rates"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
              >
                View rates
              </Link>
            </motion.div>

            {/* Trust Metrics */}
            <motion.div 
              className="flex flex-wrap items-center gap-8 pt-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
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

          {/* Right Column - Floating Cards */}
          <div className="relative h-[400px] lg:h-[500px] hidden lg:flex items-center justify-center">
            {/* Card 1 - 5yr Fixed Rate */}
            <motion.div
              className="absolute top-8 right-4 animate-float"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="w-56 p-4 rounded-xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/10 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">5yr Fixed Rate</span>
                  <TrendingUp className="w-4 h-4 text-[#27aae1]" />
                </div>
                <div className="text-3xl font-bold text-[#27aae1] mb-2">4.39%</div>
                {/* Mini sparkline */}
                <svg viewBox="0 0 100 24" className="w-full h-6">
                  <path
                    d="M0 20 L15 16 L30 18 L45 12 L60 14 L75 8 L90 10 L100 4"
                    fill="none"
                    stroke="#27aae1"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <circle cx="100" cy="4" r="3" fill="#27aae1" />
                </svg>
              </div>
            </motion.div>

            {/* Card 2 - Pre-approval Status */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-0 animate-float-delayed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="w-52 p-4 rounded-xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Pre-approval status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-lg font-semibold text-foreground">Ready</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Up to $650,000</p>
              </div>
            </motion.div>

            {/* Card 3 - Monthly Savings */}
            <motion.div
              className="absolute bottom-12 right-12 animate-float-delayed-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="w-48 p-4 rounded-xl bg-gradient-to-br from-[#161c1f] to-[#0e1214] border border-[#27aae1]/10 shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-4 h-4 text-[#27aae1]" />
                  <span className="text-xs text-muted-foreground">Monthly savings</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400">$612</div>
                <p className="text-xs text-muted-foreground mt-1">vs. your current rate</p>
              </div>
            </motion.div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#006f7f]/5 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#27aae1]/5 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
