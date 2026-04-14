"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, DollarSign, Lock, Users, FileText, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageBackdrop } from "@/components/page-backdrop";

const benefits = [
  {
    icon: TrendingUp,
    title: "8–12% target returns",
    description: "Private mortgage investments typically yield 8–12% per annum, secured against Ontario real estate.",
  },
  {
    icon: Shield,
    title: "First or second mortgage security",
    description: "Your investment is registered directly on title. Real property is the collateral — not paper promises.",
  },
  {
    icon: Lock,
    title: "Short, predictable terms",
    description: "Typical mortgage investments run 6–24 months. No locking up capital for years on end.",
  },
  {
    icon: DollarSign,
    title: "Monthly income payments",
    description: "Interest payments deposited monthly. Ideal for investors seeking predictable passive income.",
  },
  {
    icon: Users,
    title: "Professionally underwritten",
    description: "Every file is underwritten by UCC's licensed team with 50 years of experience in the Windsor market.",
  },
  {
    icon: FileText,
    title: "Licensed administration",
    description: "UCC is Windsor's only licensed mortgage administrator (Lic. #11657) — providing regulatory oversight on all investments.",
  },
];

const process = [
  {
    number: "01",
    title: "Initial consultation",
    description: "We discuss your investment goals, risk tolerance, preferred term length, and minimum investment amount.",
  },
  {
    number: "02",
    title: "Mortgage matching",
    description: "We match you with a vetted borrower file — you receive a full package including property details, LTV, and borrower profile.",
  },
  {
    number: "03",
    title: "Legal & title review",
    description: "Your solicitor reviews the mortgage commitment. Title insurance and property insurance are confirmed.",
  },
  {
    number: "04",
    title: "Funded & earning",
    description: "Funds advanced at closing. Monthly interest payments begin immediately. UCC manages collections and servicing.",
  },
];

const faqs = [
  {
    q: "What is the minimum investment?",
    a: "We typically work with investors beginning at $50,000 per mortgage. Larger syndicated mortgages may be available for investors looking to participate with smaller amounts across multiple properties.",
  },
  {
    q: "How is my investment secured?",
    a: "Your investment is registered as a mortgage charge directly on the property title in Ontario — the same way a bank mortgage is registered. In a default scenario, you have the legal right to enforce against the property.",
  },
  {
    q: "What happens if a borrower defaults?",
    a: "As a licensed mortgage administrator, UCC manages all enforcement proceedings on your behalf. In most cases, defaults are resolved through a property sale or borrower refinancing, with investor capital and accrued interest recovered.",
  },
  {
    q: "Are the returns guaranteed?",
    a: "No investment returns are guaranteed. Returns depend on the borrower making payments and the underlying property value supporting the loan. We conduct thorough property appraisals and borrower assessments to minimize risk.",
  },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-20 relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 80% 20%, rgba(0,111,127,0.14) 0%, transparent 60%)",
          }}
        >
          <PageBackdrop variant="invest" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                  <span className="w-1.5 h-1.5 bg-[#006f7f] rounded-full animate-pulse" />
                  Licensed mortgage administration · Lic. #11657
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Earn 8–12% secured
                <br />
                <span className="text-[#27aae1]">against real property.</span>
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                UCC Mortgage Co. connects private investors with pre-qualified borrowers seeking short-term mortgage financing. Your investment is secured by registered mortgage on Ontario real estate — administered by Windsor's only licensed mortgage administrator.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]"
                >
                  Book an investor call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-[#1a1610] bg-[#0e0c0a]">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "8–12%", label: "Target annual return" },
                { value: "$50K+", label: "Minimum investment" },
                { value: "Since 2008", label: "Licensed administrator" },
                { value: "50 yrs", label: "Market experience" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#27aae1] mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Why private mortgage investing?</h2>
              <p className="text-muted-foreground max-w-2xl">
                Institutional-grade real estate returns, accessible to individual investors — backed by property you can drive past.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-6 rounded-xl border border-[#006f7f]/10 hover:border-[#006f7f]/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                  >
                    <div className="p-2.5 rounded-lg bg-[#006f7f]/10 w-fit mb-4">
                      <Icon className="w-5 h-5 text-[#006f7f]" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-[#0e0c0a] border-t border-[#1a1610]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From initial consultation to monthly income — the UCC investor process.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#006f7f] via-[#27aae1] to-[#006f7f]" />
              <div className="grid md:grid-cols-4 gap-8 md:gap-4">
                {process.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto w-28 h-28 rounded-full bg-[#1c1916] border-2 border-[#006f7f]/30 flex flex-col items-center justify-center mb-5">
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

        {/* Typical Investment Profile */}
        <section className="py-24 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">A typical investment</h2>
                <div
                  className="p-6 rounded-xl border border-[#006f7f]/15"
                  style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                >
                  <div className="space-y-4">
                    {[
                      { label: "Property value", value: "$650,000" },
                      { label: "First mortgage (bank)", value: "$390,000 (60% LTV)" },
                      { label: "Your second mortgage", value: "$97,500 (15% LTV)" },
                      { label: "Total LTV", value: "75% — well below 85% limit" },
                      { label: "Interest rate", value: "9.5% per annum" },
                      { label: "Monthly income (on $97,500)", value: "$770.83 / month" },
                      { label: "Term", value: "12 months" },
                      { label: "Annual income", value: "$9,250" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#1a1610] last:border-0">
                        <span className="text-sm text-muted-foreground">{row.label}</span>
                        <span className="text-sm font-semibold text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-4">
                    * Illustrative example only. Returns are not guaranteed. Past performance does not predict future results.
                  </p>
                </div>
              </motion.div>

              {/* FAQs */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-foreground mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  Common questions
                </motion.h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="p-5 rounded-xl border border-[#006f7f]/10 hover:border-[#006f7f]/25 transition-all"
                      style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#006f7f] flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-sm font-semibold text-foreground mb-1.5">{faq.q}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 border-t border-[#006f7f]/30"
          style={{ background: "linear-gradient(180deg, #0e0c0a 0%, rgba(0,111,127,0.06) 50%, #0e0c0a 100%)" }}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to learn more?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Book a confidential call with our investment team. We'll walk you through current opportunities, our underwriting process, and how to get started.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]"
              >
                Book an investor call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="text-xs text-muted-foreground/60 mt-6 max-w-lg mx-auto">
                Private mortgage investing involves risk, including potential loss of principal. This is not investment advice. Consult your financial advisor. UCC Mortgage Co. — Brokerage Lic. #10675 | Administrator Lic. #11657.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
