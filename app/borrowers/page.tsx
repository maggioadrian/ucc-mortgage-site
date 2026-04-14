"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Landmark, Home, CheckCircle2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const products = [
  {
    icon: Building2,
    priority: true,
    title: "Commercial Financing",
    description: "Multi-unit residential, retail plazas, office buildings, mixed-use, and industrial property financing across Ontario.",
    stats: [{ v: "$2.1M", l: "Recent deal" }, { v: "15+", l: "Lenders" }, { v: "50 yrs", l: "Experience" }],
    href: "/solutions/commercial",
    cta: "Explore commercial",
  },
  {
    icon: Landmark,
    priority: true,
    title: "Private Mortgages",
    description: "Fast approvals in 24–48 hours. All credit profiles welcome. Ideal for bridge financing, equity access, and non-traditional borrowers.",
    stats: [{ v: "24-48h", l: "Approval" }, { v: "Up to 85%", l: "LTV" }, { v: "Since 2008", l: "Licensed admin" }],
    href: "/solutions/private#borrowers",
    cta: "Get a private mortgage",
  },
  {
    icon: Home,
    priority: false,
    title: "Residential Mortgages",
    description: "First-time buyers, renewals, refinancing, and investment properties. Best rate from 40+ lenders.",
    stats: [{ v: "$1.2B+", l: "Placed" }, { v: "40+", l: "Lenders" }],
    href: "/solutions/residential",
    cta: "See residential rates",
  },
];

const steps = [
  { n: "01", title: "Tell us about your deal", desc: "Fill out a quick application or submit a deal directly. Takes 5 minutes." },
  { n: "02", title: "We match your file",       desc: "We select the right lender from our network based on your deal type and profile." },
  { n: "03", title: "Approval & funding",        desc: "Receive approval, sign documents, and get funded — on your timeline." },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function BorrowersPage() {
  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />
      <main>

        {/* Hero */}
        <section className="pt-24 pb-20 relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(0,111,127,0.14) 0%, transparent 60%)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <span className="w-1.5 h-1.5 bg-[#006f7f] rounded-full animate-pulse" />
                Borrower solutions
              </span>
            </motion.div>
            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-6 max-w-3xl"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.1 }}>
              Financing for every deal — commercial, private, residential.
            </motion.h1>
            <motion.p className="text-lg text-muted-foreground max-w-xl mb-8"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
              From complex commercial transactions to fast private bridge loans — UCC has the lender network and 50 years of experience to place your deal.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4"
              variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
              <Link href="/tools/deal-submission"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]">
                Submit a deal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#2a2420] text-foreground font-semibold rounded-full hover:border-[#006f7f]/40 hover:bg-[#006f7f]/5 transition-all">
                Book a call
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section className="py-24 bg-[#0e0c0a]">
          <div className="max-w-7xl mx-auto px-6 space-y-5">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group p-8 rounded-2xl"
                  style={{
                    background: p.priority
                      ? "linear-gradient(135deg, rgba(0,111,127,0.09) 0%, #242018 40%, #141210 100%)"
                      : "linear-gradient(145deg, #242018 0%, #141210 100%)",
                    border: p.priority ? "1px solid rgba(0,111,127,0.35)" : "1px solid rgba(0,111,127,0.10)",
                  }}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-[#006f7f]/10">
                          <Icon className="w-5 h-5 text-[#006f7f]" />
                        </div>
                        {p.priority && (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#006f7f]/20 border border-[#006f7f]/30 text-[#27aae1]">
                            Priority
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
                        {p.description}
                      </p>
                      <div className="flex gap-6">
                        {p.stats.map((s) => (
                          <div key={s.l}>
                            <div className="text-lg font-bold text-[#27aae1]">{s.v}</div>
                            <div className="text-xs text-muted-foreground">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link href={p.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#006f7f] text-[#141210] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_24px_rgba(0,111,127,0.35)] flex-shrink-0">
                      {p.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}
              className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">How it works</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Three steps from inquiry to funded deal.</p>
            </motion.div>
            <div className="relative">
              <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#006f7f] via-[#27aae1] to-[#006f7f]" />
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                  <motion.div key={step.n}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="text-center">
                    <div className="relative z-10 mx-auto w-28 h-28 rounded-full bg-[#1c1916] border-2 border-[#006f7f]/30 flex flex-col items-center justify-center mb-5">
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

        {/* CTA */}
        <section className="py-20 bg-[#0e0c0a] border-t border-[#1a1610]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to move forward?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Submit your deal details in 5 minutes or book a call with a broker. No hard credit pull, no obligation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tools/deal-submission"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,111,127,0.4)]">
                  Submit a deal <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a2420] text-foreground font-semibold rounded-full hover:border-[#006f7f]/40 hover:bg-[#006f7f]/5 transition-all">
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
