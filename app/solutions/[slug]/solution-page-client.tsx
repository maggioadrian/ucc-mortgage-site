"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2,
  Home, Building2, Landmark, PiggyBank, RefreshCw, CreditCard,
  Search, Key, Briefcase, Clock, Factory, DollarSign, Hammer, Users,
  Shield, Zap, ArrowUpRight, Calendar, Target,
  Wallet, TrendingDown, Percent, BarChart3, CheckCircle,
  Banknote, LineChart, RotateCcw, Coins, Tractor, Map, Leaf,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageBackdrop, type BackdropVariant } from "@/components/page-backdrop";
import type { Solution } from "@/lib/solutions-data";

const slugToVariant: Record<string, BackdropVariant> = {
  residential: "residential",
  commercial: "commercial",
  "debt-consolidation": "debt-consolidation",
  refinancing: "refinancing",
  loans: "loans",
  "farm-agriculture": "farm",
  "vacant-land": "vacant-land",
};

type LucideIcon = React.ComponentType<{ className?: string }>;

const iconMap: Record<string, LucideIcon> = {
  Home, Building2, Landmark, PiggyBank, RefreshCw, CreditCard,
  Search, Key, Briefcase, Clock, Factory, DollarSign, Hammer, Users,
  Shield, Zap, ArrowUpRight, Calendar, Target,
  Wallet, TrendingDown, Percent, BarChart3, CheckCircle,
  Banknote, LineChart, RotateCcw, Coins, Tractor, Map,
};

function getIcon(id: string): LucideIcon {
  return iconMap[id] ?? Home;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function SolutionPageClient({ solution }: { solution: Solution }) {
  const HeroIcon = getIcon(solution.heroIconId);
  const backdropVariant = slugToVariant[solution.slug];

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-20 relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 70% 0%, rgba(0,111,127,0.14) 0%, transparent 60%)",
          }}
        >
          {backdropVariant && <PageBackdrop variant={backdropVariant} />}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                  <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                  {solution.badge}
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-6"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {solution.title}
              </motion.h1>

              <motion.p
                className="text-lg text-[#27aae1] font-semibold mb-4"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                {solution.tagline}
              </motion.p>

              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mb-8"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {solution.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Apply now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
                >
                  Book a call
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative hero element */}
          {solution.slug === "farm-agriculture" ? (
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 pointer-events-none">
              <div className="p-6 rounded-2xl border border-[#006f7f]/20 bg-[#006f7f]/05"
                style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.10) 0%, rgba(14,18,20,0.80) 100%)" }}>
                <Leaf className="w-8 h-8 text-[#27aae1]/30 mb-3 mx-auto" />
                <p className="text-xs font-semibold text-[#27aae1]/40 text-center uppercase tracking-wider leading-snug max-w-[160px]">
                  Windsor-Essex<br />Canada&apos;s greenhouse capital
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-[#006f7f]/5 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-[#006f7f]/8 flex items-center justify-center">
                  <HeroIcon className="w-20 h-20 text-[#27aae1]/20" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Stats Bar */}
        <section className="border-y border-[#1a1f22] bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-3 gap-8">
              {solution.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#27aae1] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
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
                What sets our {solution.title.toLowerCase()} solution apart.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {solution.benefits.map((benefit, i) => {
                const Icon = getIcon(benefit.iconId);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/35 transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,170,225,0.08)]"
                    style={{
                      background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)",
                    }}
                  >
                    <div className="p-2.5 rounded-lg bg-[#27aae1]/10 w-fit mb-4">
                      <Icon className="w-5 h-5 text-[#27aae1]" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-24 bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Eligibility criteria
                </h2>
                <p className="text-muted-foreground mb-8">
                  General requirements for this mortgage product. Every situation is unique — contact us if you&apos;re unsure whether you qualify.
                </p>
                <ul className="space-y-4">
                  {solution.eligibility.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#27aae1] mt-0.5 flex-shrink-0" />
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
                className="p-8 rounded-xl border border-[#27aae1]/15"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, rgba(14,18,20,1) 70%)",
                }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">Not sure if you qualify?</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Our brokers have helped clients in every type of financial situation for over 50 years. A 15-minute call is often all it takes to know your options — with zero obligation.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full text-sm transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)]"
                >
                  Speak to a broker
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-[#0e1214]">
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
                A simple, guided process from first conversation to funded mortgage.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#006f7f] via-[#27aae1] to-[#006f7f]" />

              <div className="grid md:grid-cols-4 gap-8 md:gap-4">
                {solution.steps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto w-28 h-28 rounded-full bg-[#111618] border-2 border-[#27aae1]/30 flex flex-col items-center justify-center mb-5">
                      <span className="text-xs text-muted-foreground mb-0.5">{step.number}</span>
                      <span className="text-xl font-bold text-[#27aae1]">{step.number}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Complete a quick application or book a call with one of our brokers. No obligation, no hard credit pull at this stage.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Start your application
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
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
