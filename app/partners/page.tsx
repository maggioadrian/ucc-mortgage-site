"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Scale, Calculator, TrendingUp, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const partnerTypes = [
  { icon: Users,      label: "Real estate agents",    desc: "Refer clients buying or selling — we handle the mortgage and keep you updated every step." },
  { icon: Scale,      label: "Lawyers & notaries",    desc: "Conveyancing partners for residential and commercial transactions." },
  { icon: Calculator, label: "Accountants & CPAs",    desc: "Refer business owners and self-employed clients who need mortgage flexibility." },
  { icon: TrendingUp, label: "Financial advisors",    desc: "Complement your clients' investment portfolios with private mortgage opportunities." },
  { icon: Briefcase,  label: "Mortgage agents",       desc: "Co-broker complex commercial and private deals you can't place on your own." },
];

const benefits = [
  "Fast turnaround — we'll follow up with your referral within 4 business hours",
  "You're kept in the loop throughout the deal",
  "Competitive referral fee structure",
  "50 years of deal experience — we close what others can't",
  "Licensed administrator status adds credibility to your referral",
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function PartnersPage() {
  const [form, setForm] = useState({
    partnerName: "", partnerEmail: "", clientName: "", dealType: "", contactInfo: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Partner Referral — ${form.clientName}`);
    const body = encodeURIComponent(
      `Partner Name: ${form.partnerName}\nPartner Email: ${form.partnerEmail}\n\nClient Name: ${form.clientName}\nDeal Type: ${form.dealType}\nClient Contact: ${form.contactInfo}\n\nNotes:\n${form.notes}`
    );
    window.location.href = `mailto:info@uccmortgageco.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />
      <main>

        {/* Hero */}
        <section className="pt-24 pb-20 relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 55% 0%, rgba(0,111,127,0.13) 0%, transparent 60%)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <span className="w-1.5 h-1.5 bg-[#006f7f] rounded-full animate-pulse" />
                Referral partners
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-6 max-w-3xl"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.1 }}>
              Partner with Windsor&apos;s commercial mortgage specialists.
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground max-w-xl mb-8"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
              Realtors, lawyers, accountants, and financial advisors trust UCC to handle complex mortgage deals — and to keep their clients happy.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
              <a href="#referral"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]">
                Submit a referral <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a2420] text-foreground font-semibold rounded-full hover:border-[#006f7f]/40 hover:bg-[#006f7f]/5 transition-all">
                Talk to us first
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Who we work with */}
        <section className="py-24 bg-[#0e0c0a]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Who we work with</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {partnerTypes.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.label}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-6 rounded-xl border border-[#006f7f]/10 hover:border-[#006f7f]/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}>
                    <div className="p-2.5 rounded-lg bg-[#006f7f]/10 w-fit mb-4">
                      <Icon className="w-5 h-5 text-[#006f7f]" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{p.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl font-bold text-foreground mb-8">Why partner with UCC</h2>
                <ul className="space-y-4">
                  {benefits.map((b, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#006f7f] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 gap-4">
                {[
                  { v: "50+", l: "Years in Windsor-Essex" },
                  { v: "40+", l: "Active lender partners" },
                  { v: "$2.1M", l: "Largest recent deal" },
                  { v: "4 hrs", l: "Referral follow-up" },
                ].map((s) => (
                  <div key={s.l} className="p-6 rounded-xl border border-[#006f7f]/10 text-center"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}>
                    <div className="text-3xl font-bold text-[#27aae1] mb-1">{s.v}</div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Referral form */}
        <section id="referral" className="py-24 bg-[#0e0c0a] border-t border-[#1a1610]">
          <div className="max-w-2xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
              className="text-center mb-10">
              <h2 className="text-3xl font-bold text-foreground mb-3">Submit a referral</h2>
              <p className="text-muted-foreground">We&apos;ll follow up with your client within 4 business hours and keep you informed.</p>
            </motion.div>

            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-[#006f7f] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Referral received</h3>
                <p className="text-muted-foreground">Your email client should have opened. We&apos;ll follow up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your name *</label>
                    <input required value={form.partnerName} onChange={e => setForm(f => ({ ...f, partnerName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Your email *</label>
                    <input required type="email" value={form.partnerEmail} onChange={e => setForm(f => ({ ...f, partnerEmail: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50 transition-colors" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client name *</label>
                    <input required value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Deal type</label>
                    <select value={form.dealType} onChange={e => setForm(f => ({ ...f, dealType: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50">
                      <option value="">Select type</option>
                      <option>Commercial mortgage</option>
                      <option>Private mortgage</option>
                      <option>Residential mortgage</option>
                      <option>Refinancing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client contact info</label>
                  <input value={form.contactInfo} onChange={e => setForm(f => ({ ...f, contactInfo: e.target.value }))}
                    placeholder="Phone or email"
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Notes</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Deal details, urgency, any relevant background..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm focus:outline-none focus:border-[#006f7f]/50 transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full py-4 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]">
                  Submit referral
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
