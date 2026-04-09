"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, TrendingUp, Lock, DollarSign, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const benefits = [
  { icon: TrendingUp, title: "8–12% target returns",     desc: "Secured annual yield on private mortgage investments — well above GICs and bonds."           },
  { icon: Shield,     title: "Registered on title",       desc: "Your investment is recorded directly on the property title. Real collateral, not paper promises." },
  { icon: Lock,       title: "Short predictable terms",   desc: "Typical terms of 6–24 months. Capital isn't locked up for years."                             },
  { icon: DollarSign, title: "Monthly income",            desc: "Interest payments deposited monthly — ideal for investors seeking passive income."               },
];

const tiers = [
  {
    label: "Starter",
    min: "$25,000",
    rate: "8–9%",
    features: ["First mortgage security", "6–12 month terms", "Monthly interest payments", "Licensed administration"],
    highlighted: false,
  },
  {
    label: "Growth",
    min: "$100,000",
    rate: "9–10%",
    features: ["First or second position", "6–24 month terms", "Monthly income", "Priority deal access", "Dedicated contact"],
    highlighted: true,
  },
  {
    label: "Institutional",
    min: "$250,000+",
    rate: "10–12%",
    features: ["Custom deal structures", "First position priority", "Flexible terms", "Portfolio diversification", "Quarterly review meetings"],
    highlighted: false,
  },
];

const process = [
  { n: "01", title: "Initial consultation", desc: "Discuss your investment goals, risk tolerance, preferred terms, and minimum amount." },
  { n: "02", title: "Deal presentation",    desc: "We present vetted mortgage opportunities matching your profile — with full property and borrower details." },
  { n: "03", title: "Commitment",           desc: "You review and approve the deal. Legal documents prepared by your solicitor." },
  { n: "04", title: "Ongoing income",       desc: "Monthly interest payments deposited. UCC administers the mortgage for the full term." },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function InvestorsPage() {
  const [form, setForm] = useState({ name: "", email: "", range: "", timeline: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Investor Inquiry — ${form.range}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nInvestment Range: ${form.range}\nTimeline: ${form.timeline}\n\nNotes:\n${form.notes}`
    );
    window.location.href = `mailto:info@uccmortgageco.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <main>

        {/* Hero */}
        <section className="pt-24 pb-20 relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 65% 0%, rgba(0,111,127,0.15) 0%, transparent 60%)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                Private mortgage investing
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-6 max-w-3xl"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.1 }}>
              Earn 8–12% secured by Ontario real estate.
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground max-w-xl mb-8"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
              UCC is Windsor&apos;s only licensed mortgage administrator (Lic. #11657). Your investment is registered on title, professionally underwritten, and administered for the full term.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
              <a href="#inquiry"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]">
                Book investor call <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/solutions/private#invest"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all">
                Learn more
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-[#1a1f22] bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: "8–12%", l: "Target annual return"   },
              { v: "$25K+", l: "Minimum investment"     },
              { v: "6–24mo",l: "Typical term"           },
              { v: "Lic. #11657", l: "Licensed administrator" },
            ].map((s, i) => (
              <motion.div key={i} className="text-center"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-2xl sm:text-3xl font-bold text-[#27aae1] mb-1">{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Why invest with UCC</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div key={b.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>
                    <div className="p-2.5 rounded-lg bg-[#27aae1]/10 w-fit mb-4">
                      <Icon className="w-5 h-5 text-[#27aae1]" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Investment tiers */}
        <section className="py-24 bg-[#0a0d0e]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Investment tiers</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {tiers.map((tier, i) => (
                <motion.div key={tier.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-7 rounded-2xl relative"
                  style={{
                    background: tier.highlighted
                      ? "linear-gradient(135deg, rgba(0,111,127,0.12) 0%, #161c1f 100%)"
                      : "linear-gradient(145deg, #161c1f 0%, #0e1214 100%)",
                    border: tier.highlighted ? "1px solid rgba(39,170,225,0.35)" : "1px solid rgba(39,170,225,0.10)",
                  }}>
                  {tier.highlighted && (
                    <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#27aae1]/15 border border-[#27aae1]/25 text-[#27aae1]">
                      Most popular
                    </span>
                  )}
                  <div className="text-sm font-semibold text-muted-foreground mb-2">{tier.label}</div>
                  <div className="text-3xl font-bold text-foreground mb-1">{tier.min}</div>
                  <div className="text-xl font-bold text-[#27aae1] mb-5">{tier.rate} <span className="text-sm text-muted-foreground font-normal">per year</span></div>
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-[#27aae1] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">How it works</h2>
            </motion.div>
            <div className="relative">
              <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-[#006f7f] via-[#27aae1] to-[#006f7f]" />
              <div className="grid md:grid-cols-4 gap-8 md:gap-4">
                {process.map((step, i) => (
                  <motion.div key={step.n}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center">
                    <div className="relative z-10 mx-auto w-28 h-28 rounded-full bg-[#111618] border-2 border-[#27aae1]/30 flex flex-col items-center justify-center mb-5">
                      <span className="text-xs text-muted-foreground mb-0.5">{step.n}</span>
                      <span className="text-xl font-bold text-[#27aae1]">{step.n}</span>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead capture form */}
        <section id="inquiry" className="py-24 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
              className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Book an investor call</h2>
              <p className="text-muted-foreground">Tell us about your investment goals and we&apos;ll reach out within one business day.</p>
            </motion.div>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#27aae1] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Inquiry received</h3>
                <p className="text-muted-foreground">Your email client should have opened. We&apos;ll follow up within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Investment range</label>
                    <select value={form.range} onChange={e => setForm(f => ({ ...f, range: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50">
                      <option value="">Select range</option>
                      <option>$25,000 – $99,999</option>
                      <option>$100,000 – $249,999</option>
                      <option>$250,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</label>
                    <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50">
                      <option value="">Select timeline</option>
                      <option>Ready now</option>
                      <option>Within 30 days</option>
                      <option>Within 90 days</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Additional notes</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]">
                  Book investor call
                </button>
              </form>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
