"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Shield, Zap, Clock, Banknote,
  TrendingUp, Lock, Users, FileText, DollarSign,
  ArrowUpRight, Home, Calendar, Target,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageBackdrop } from "@/components/page-backdrop";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

// ── Borrower section data ─────────────────────────────────────────────────────

const borrowerBenefits = [
  { icon: Zap,          title: "Fast approval",            description: "Decisions in 24–48 hours. Funds in 7–10 business days from application to close." },
  { icon: Calendar,     title: "Flexible terms",           description: "6-month to 3-year terms. Interest-only options available. Structured around your exit strategy." },
  { icon: Shield,       title: "All credit profiles",      description: "Bruised credit, past bankruptcy, consumer proposals — we look at equity, not just credit scores." },
  { icon: FileText,     title: "No income verification",   description: "Asset-based and equity-based qualifying. Ideal for self-employed and non-traditional borrowers." },
  { icon: ArrowUpRight, title: "Bridge financing",         description: "Short-term solutions while you arrange conventional financing or complete a sale." },
  { icon: Home,         title: "Second mortgages welcome", description: "Second-position mortgages available up to 85% combined LTV on Ontario properties." },
];

const whoQualifies = [
  "Self-employed or business owners",
  "Bruised credit or past bankruptcy",
  "Recent consumer proposal discharged",
  "Non-traditional income sources",
  "Need fast closing (divorce, estate, urgent purchase)",
  "Existing property equity (35%+ minimum)",
  "Foreign income or new-to-Canada borrowers",
  "Properties that banks consider non-conforming",
];

const borrowerSteps = [
  {
    number: "01",
    title: "Quick inquiry",
    description: "Call or submit online. We respond within 24 hours with an initial assessment.",
  },
  {
    number: "02",
    title: "Property assessment",
    description: "We evaluate your property value, equity position, and identify the right lender.",
  },
  {
    number: "03",
    title: "Funded in days",
    description: "Commitment issued, solicitors engaged. Funds in your account in 7–10 business days.",
  },
];

// ── Investor section data ──────────────────────────────────────────────────────

const investorBenefits = [
  { icon: Lock,       title: "Only licensed administrator in Windsor-Essex",    description: "UCC holds Mortgage Administrator Licence #11657 — Windsor's only licensed administrator since 2008. Your investment is managed under FSRA regulatory oversight." },
  { icon: TrendingUp, title: "50+ years of local market expertise",              description: "Decades of Windsor-Essex property valuations mean we know exactly what a property is worth — and exactly how to protect your investment." },
  { icon: Shield,     title: "Secured by registered mortgage on title",         description: "Your investment is registered as a legal charge on the property title — the same security a bank holds. Real property. Real collateral." },
  { icon: FileText,   title: "Transparent quarterly reporting",                  description: "Receive detailed statements showing mortgage performance, payment history, and your accrued returns — every quarter." },
  { icon: Users,      title: "Active enforcement when needed",                   description: "If a borrower defaults, our licensed team manages the entire enforcement process. We protect your capital and pursue recovery on your behalf." },
];

const investmentTiers = [
  {
    name: "Starter",
    minimum: "$25,000",
    returns: "8–9%",
    term: "12-month term",
    features: [
      "Single first or second mortgage",
      "Monthly interest payments",
      "FSRA-administered",
      "Title & property insurance required",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    minimum: "$100,000",
    returns: "9–10%",
    term: "Flexible term",
    features: [
      "Access to preferred deal flow",
      "Monthly or quarterly distributions",
      "Lower total LTV deals available",
      "Priority placement on new mortgages",
    ],
    highlight: true,
  },
  {
    name: "Institutional",
    minimum: "$250,000+",
    returns: "10–12%",
    term: "Custom structure",
    features: [
      "Bespoke syndicate structures",
      "Multi-property portfolio options",
      "Direct broker relationship",
      "Custom reporting & documentation",
    ],
    highlight: false,
  },
];

const riskItems = [
  { label: "1st position mortgages", detail: "Up to 75% LTV — bank-equivalent security on title" },
  { label: "2nd position mortgages", detail: "Up to 85% combined LTV with existing first mortgage" },
  { label: "FSRA regulated",         detail: "Administration licensed under Ontario FSRA (Lic. #11657)" },
  { label: "Title insurance",        detail: "Required on every mortgage — protects title defects" },
  { label: "Property insurance",     detail: "Required on every mortgage — protects the collateral" },
  { label: "Independent appraisal",  detail: "Third-party appraisal on every file over $150,000" },
];

export function PrivatePageClient() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* ── Page intro / anchor nav ── */}
        <section
          className="pt-20 pb-10 border-b border-[#1a1f22]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.10) 0%, transparent 55%)" }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-5">
                <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                For borrowers &amp; investors
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Private Mortgages
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Two sides of the same market. Whether you need a mortgage or want to invest in one — UCC has been the trusted connection since 1974.
              </p>
            </motion.div>

            {/* Audience jump links */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="visible"
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#borrowers"
                className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)]"
              >
                I need a mortgage
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#invest"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#006f7f]/50 text-[#27aae1] text-sm font-semibold rounded-full hover:border-[#27aae1]/50 hover:bg-[#27aae1]/5 transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                I want to invest
              </a>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            BORROWER SECTION
        ════════════════════════════════════════════════════════════ */}
        <section id="borrowers" className="scroll-mt-[72px] bg-[#0e1214]">

          {/* Borrower hero */}
          <div
            className="py-20 relative overflow-hidden border-b border-[#1a1f22]"
            style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(39,170,225,0.07) 0%, transparent 60%)" }}
          >
            <PageBackdrop variant="private" />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#27aae1]/10 border border-[#27aae1]/20 text-xs font-semibold text-[#27aae1] mb-5">
                    For Borrowers
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                    Private mortgages —<br />when the bank says no.
                  </h2>
                  <p className="text-lg text-muted-foreground mb-2">
                    Fast, flexible mortgage financing backed by real estate. No credit score minimums. Funded in days, not weeks.
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-8">
                    Fast approval (24–48 hrs) · Flexible terms · All credit profiles · No income verification required
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/apply"
                      className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                    >
                      Apply for a private mortgage
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
                    >
                      Call us first
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Borrower stats */}
          <div className="border-b border-[#1a1f22] bg-[#0a0d0e]">
            <div className="max-w-7xl mx-auto px-6 py-7">
              <div className="grid grid-cols-3 gap-6 text-center">
                {[
                  { value: "24–48 hrs", label: "Decision time" },
                  { value: "7–10 days", label: "To funding" },
                  { value: "Up to 85%", label: "Combined LTV" },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-[#27aae1] mb-0.5">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="py-20 bg-[#0e1214]">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">Why borrowers choose private lending</h3>
                <p className="text-muted-foreground">The flexibility that A-lenders can't offer.</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {borrowerBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/30 transition-all"
                      style={{ background: "linear-gradient(135deg,#161c1f 0%,#0e1214 100%)" }}
                    >
                      <div className="p-2.5 rounded-lg bg-[#27aae1]/10 w-fit mb-4">
                        <Icon className="w-5 h-5 text-[#27aae1]" />
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-1.5">{b.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Who qualifies + how it works */}
          <div className="py-20 bg-[#0a0d0e] border-t border-[#1a1f22]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16">

                {/* Who qualifies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-2">Who qualifies</h3>
                  <p className="text-muted-foreground mb-7 text-sm">
                    Private lending decisions are based primarily on the property and its equity — not your credit score.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {whoQualifies.map((item, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: i * 0.06 }}
                        className="flex items-start gap-2.5 p-3 rounded-lg border border-[#27aae1]/8 bg-[#0e1214]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#27aae1] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* How it works */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-2xl font-bold text-foreground mb-2">How it works</h3>
                    <p className="text-muted-foreground mb-7 text-sm">Three steps from first contact to funded.</p>
                  </motion.div>

                  <div className="relative space-y-0">
                    <div className="absolute left-6 top-10 bottom-10 w-px bg-gradient-to-b from-[#27aae1]/40 via-[#006f7f]/30 to-transparent" />
                    {borrowerSteps.map((step, i) => (
                      <motion.div key={step.number}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.45, delay: i * 0.12 }}
                        className="relative flex gap-5 pb-8 last:pb-0"
                      >
                        <div className="relative z-10 w-12 h-12 rounded-full bg-[#111618] border-2 border-[#27aae1]/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-[#27aae1]">{step.number}</span>
                        </div>
                        <div className="pt-2.5">
                          <h4 className="text-base font-semibold text-foreground mb-1">{step.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicative rates */}
          <div className="py-16 bg-[#0e1214] border-t border-[#1a1f22]">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">Indicative rates</h3>
                <p className="text-sm text-muted-foreground">Private mortgage rates vary by property type, LTV, credit profile, and term. These are starting rates for well-secured Ontario properties.</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { type: "Private 1st Mortgage", from: "7.99%", note: "Up to 75% LTV" },
                  { type: "Private 2nd Mortgage", from: "10.99%", note: "Up to 85% combined LTV" },
                ].map((rate, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="p-6 rounded-xl border border-[#27aae1]/15"
                    style={{ background: "linear-gradient(135deg,rgba(0,111,127,0.08) 0%,#0e1214 70%)" }}
                  >
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{rate.type}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-sm text-muted-foreground">from</span>
                      <span className="text-3xl font-bold text-[#27aae1]">{rate.from}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{rate.note}</div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground/50 mt-4">* Rates are indicative. OAC. Rates subject to lender approval and individual circumstance. Lender fees apply. E.&amp;O.E.</p>
            </div>
          </div>

          {/* Borrower CTA */}
          <div className="py-16 bg-[#0a0d0e] border-t border-[#1a1f22]">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">Ready to move forward?</h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm">
                  Submit a quick application or call us directly. Private mortgage approvals start with a 15-minute conversation.
                </p>
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Apply for a private mortgage
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            INVESTOR SECTION — visually distinct surface
        ════════════════════════════════════════════════════════════ */}
        <section id="invest" className="scroll-mt-[72px] bg-[#080b0c]" style={{ borderTop: "2px solid #006f7f" }}>

          {/* Investor hero */}
          <div
            className="py-20 relative overflow-hidden border-b border-[#006f7f]/25"
            style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(0,111,127,0.13) 0%, transparent 55%)" }}
          >
            <PageBackdrop variant="invest" />
            <div className="relative max-w-7xl mx-auto px-6">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006f7f]/20 border border-[#006f7f]/30 text-xs font-semibold text-[#27aae1] mb-5">
                    <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                    For Investors · Licensed Administrator Lic. #11657
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                    Earn 8–12% secured by<br />
                    <span className="text-[#27aae1]">Canadian real estate.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-3">
                    UCC has been Windsor-Essex&apos;s only licensed mortgage administrator since 2008. We connect qualified investors with pre-vetted private mortgage opportunities — with full regulatory oversight and transparent reporting.
                  </p>
                  <p className="text-sm text-muted-foreground/60 mb-8">
                    Monthly income payments · Secured by registered charge on title · FSRA regulated · 50+ years local market expertise
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                    >
                      Book an investor call
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <button
                      className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#006f7f]/50 text-[#27aae1] font-semibold rounded-full hover:border-[#27aae1]/50 hover:bg-[#27aae1]/5 transition-all cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      Download investor package
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Investor stats */}
          <div className="border-b border-[#006f7f]/20 bg-[#060809]">
            <div className="max-w-7xl mx-auto px-6 py-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "8–12%",    label: "Target annual return" },
                  { value: "$50K+",    label: "Minimum investment" },
                  { value: "Since 2008", label: "Licensed administrator" },
                  { value: "50 yrs",   label: "Local market expertise" },
                ].map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-[#27aae1] mb-0.5">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Why invest with UCC */}
          <div className="py-20 bg-[#080b0c]">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">Why invest with UCC</h3>
                <p className="text-muted-foreground text-sm">What separates a licensed administrator from an unlicensed lender.</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {investorBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className={`p-6 rounded-xl border transition-all ${i === 0 ? "border-[#006f7f]/40 bg-gradient-to-br from-[#0d1a1c] to-[#080b0c]" : "border-[#27aae1]/10 hover:border-[#27aae1]/25"}`}
                      style={i !== 0 ? { background: "linear-gradient(135deg,#121619 0%,#080b0c 100%)" } : {}}
                    >
                      <div className="p-2.5 rounded-lg bg-[#006f7f]/20 w-fit mb-4">
                        <Icon className="w-5 h-5 text-[#27aae1]" />
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-2">{b.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Investment tiers */}
          <div className="py-20 bg-[#060809] border-t border-[#006f7f]/20">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Investment tiers</h3>
                <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                  Choose the tier that matches your capital level and preferred structure. All tiers administered by our licensed team.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-5">
                {investmentTiers.map((tier, i) => (
                  <motion.div key={tier.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className={`relative rounded-2xl border p-7 ${tier.highlight ? "border-[#27aae1]/40 shadow-[0_0_40px_rgba(39,170,225,0.1)]" : "border-[#27aae1]/12"}`}
                    style={{
                      background: tier.highlight
                        ? "linear-gradient(135deg, rgba(0,111,127,0.14) 0%, #0a0e10 100%)"
                        : "linear-gradient(135deg, #121619 0%, #080b0c 100%)",
                    }}
                  >
                    {tier.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="px-3 py-1 bg-[#27aae1] text-[#0e1214] text-xs font-bold rounded-full">Most popular</span>
                      </div>
                    )}

                    <div className="mb-5">
                      <div className="text-sm font-semibold text-muted-foreground mb-1">{tier.name}</div>
                      <div className="text-3xl font-bold text-[#27aae1] mb-0.5">{tier.returns}</div>
                      <div className="text-sm text-muted-foreground">per annum target</div>
                    </div>

                    <div className="space-y-1 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Minimum</span>
                        <span className="font-semibold text-foreground">{tier.minimum}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Term</span>
                        <span className="font-semibold text-foreground">{tier.term}</span>
                      </div>
                    </div>

                    <div className="border-t border-[#1a1f22] pt-5 space-y-2.5">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#27aae1] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className={`mt-6 w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        tier.highlight
                          ? "bg-[#27aae1] text-[#0e1214] hover:shadow-[0_0_20px_rgba(39,170,225,0.35)]"
                          : "border border-[#27aae1]/25 text-[#27aae1] hover:border-[#27aae1]/50 hover:bg-[#27aae1]/5"
                      }`}
                    >
                      Get started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk & security */}
          <div className="py-20 bg-[#080b0c] border-t border-[#006f7f]/20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-foreground mb-3">Risk &amp; security</h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                    Private mortgage investing involves real risk, including potential loss of principal in a default or market downturn. UCC structures every investment to maximize security, but no returns are guaranteed. Here&apos;s exactly how your investment is protected.
                  </p>
                  <div className="space-y-3">
                    {riskItems.map((item, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className="flex items-start gap-3 p-4 rounded-xl border border-[#006f7f]/20 bg-[#060809]"
                      >
                        <Shield className="w-4 h-4 text-[#27aae1] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-foreground mb-0.5">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Trust signal */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div
                    className="p-8 rounded-2xl border border-[#006f7f]/30"
                    style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.10) 0%, #080b0c 80%)" }}
                  >
                    <div className="text-4xl text-[#006f7f] font-serif mb-4 opacity-60">&ldquo;</div>
                    <blockquote className="text-[17px] text-[#c8dde4] leading-relaxed mb-6">
                      We&apos;ve been placing private mortgage investments for Windsor families since 1974. Our investors know their capital is secured by real property they can drive past. That&apos;s the difference between a number on a screen and a real asset.
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006f7f] to-[#27aae1] flex items-center justify-center">
                        <span className="text-sm font-bold text-white">UCC</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">Principal Broker</div>
                        <div className="text-xs text-muted-foreground">UCC Mortgage Co. · Windsor, ON</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-5 rounded-xl border border-[#1a1f22] bg-[#060809]">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Typical investment example</div>
                    <div className="space-y-2">
                      {[
                        { label: "Property value",    value: "$650,000" },
                        { label: "Your 2nd mortgage", value: "$75,000 (11.5% LTV)" },
                        { label: "Combined LTV",       value: "72% — well below 85%" },
                        { label: "Rate",               value: "10.5% per annum" },
                        { label: "Monthly income",     value: "$656.25 / month" },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between text-sm py-1.5 border-b border-[#111618] last:border-0">
                          <span className="text-muted-foreground">{row.label}</span>
                          <span className="font-semibold text-foreground">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground/50 mt-3">Illustrative only. Returns not guaranteed. Past performance does not predict future results.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Investor CTA */}
          <div
            className="py-20 border-t"
            style={{
              borderColor: "rgba(0,111,127,0.3)",
              background: "linear-gradient(180deg, #060809 0%, rgba(0,111,127,0.06) 50%, #060809 100%)",
            }}
          >
            <div className="max-w-7xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-foreground mb-4">Ready to start investing?</h3>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-sm">
                  Book a confidential call with our investment team. We&apos;ll walk you through current opportunities, our underwriting process, and answer any questions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                  >
                    Book an investor call
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button className="inline-flex items-center gap-2 px-8 py-4 border border-[#27aae1]/25 text-[#27aae1] font-semibold rounded-full hover:border-[#27aae1]/50 hover:bg-[#27aae1]/5 transition-all">
                    <FileText className="w-4 h-4" />
                    Download investor package
                  </button>
                </div>
                <p className="text-xs text-muted-foreground/50 mt-6 max-w-lg mx-auto">
                  Private mortgage investing involves risk including potential loss of principal. This is not investment advice. Consult your financial advisor. UCC Mortgage Co. — Brokerage Lic. #10675 | Administrator Lic. #11657.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
