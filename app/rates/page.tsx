"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Info, Sparkles, RefreshCw } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const rateCategories = [
  {
    category: "Fixed Rate Mortgages",
    description: "Rate locked in for the full term — predictable payments.",
    rates: [
      { term: "1-Year Fixed", insured: "5.79%", conventional: "5.89%", trend: "down", change: "-0.15%" },
      { term: "2-Year Fixed", insured: "5.24%", conventional: "5.34%", trend: "down", change: "-0.20%" },
      { term: "3-Year Fixed", insured: "4.79%", conventional: "4.89%", trend: "down", change: "-0.10%" },
      { term: "4-Year Fixed", insured: "4.54%", conventional: "4.64%", trend: "flat", change: "0.00%" },
      { term: "5-Year Fixed", insured: "4.39%", conventional: "4.49%", trend: "down", change: "-0.15%" },
      { term: "7-Year Fixed", insured: "5.04%", conventional: "5.14%", trend: "flat", change: "0.00%" },
      { term: "10-Year Fixed", insured: "5.34%", conventional: "5.44%", trend: "up", change: "+0.10%" },
    ],
  },
  {
    category: "Variable Rate Mortgages",
    description: "Rate moves with prime — lower now, with some rate risk.",
    rates: [
      { term: "5-Year Variable", insured: "Prime − 0.90%", conventional: "Prime − 0.80%", trend: "down", change: "-0.25%" },
      { term: "3-Year Variable", insured: "Prime − 0.65%", conventional: "Prime − 0.55%", trend: "down", change: "-0.15%" },
    ],
  },
  {
    category: "Home Equity Lines of Credit",
    description: "Revolving credit secured against your home equity.",
    rates: [
      { term: "HELOC (Standard)", insured: "N/A", conventional: "Prime + 0.50%", trend: "down", change: "-0.25%" },
      { term: "HELOC (Investment)", insured: "N/A", conventional: "Prime + 0.75%", trend: "down", change: "-0.25%" },
    ],
  },
];

const rateHistory = [
  { date: "Oct 2024", boc: "3.75%", prime: "5.95%", fiveYrFixed: "4.84%" },
  { date: "Nov 2024", boc: "3.25%", prime: "5.45%", fiveYrFixed: "4.69%" },
  { date: "Dec 2024", boc: "3.25%", prime: "5.45%", fiveYrFixed: "4.64%" },
  { date: "Jan 2025", boc: "3.00%", prime: "5.20%", fiveYrFixed: "4.54%" },
  { date: "Feb 2025", boc: "3.00%", prime: "5.20%", fiveYrFixed: "4.49%" },
  { date: "Mar 2025", boc: "2.75%", prime: "4.95%", fiveYrFixed: "4.44%" },
  { date: "Apr 2025", boc: "2.75%", prime: "4.95%", fiveYrFixed: "4.39%" },
];

const aiExplainerFaqs = [
  {
    q: "What's the difference between insured and conventional rates?",
    a: "Insured mortgages require mortgage default insurance (CMHC, Sagen, or Canada Guaranty) when your down payment is less than 20%. Because the lender's risk is covered, insured rates are typically lower. Conventional mortgages have a 20%+ down payment — no insurance required, but rates run slightly higher.",
  },
  {
    q: "Should I choose fixed or variable right now?",
    a: "The Bank of Canada has been cutting rates through 2024–2025, with prime currently at 4.95%. Variable rates are lower today, but if you prefer certainty in your payments and the 5-year fixed spread vs. variable is small, fixed provides peace of mind. We model both scenarios for your specific purchase price so you can make an informed choice.",
  },
  {
    q: "What is prime rate and how does it affect me?",
    a: "Prime rate is set by Canada's major banks and typically moves in lock-step with the Bank of Canada's overnight target rate. Variable-rate mortgages and HELOCs are priced as a spread above or below prime. When the BoC cuts, prime drops — and your variable rate drops too. As of April 2025, prime is 4.95%.",
  },
  {
    q: "How do I know if I'm getting the best rate?",
    a: "Posted rates at your bank are rarely the best available. Mortgage brokers like UCC Mortgage have access to wholesale rates that aren't advertised publicly. We also negotiate on your behalf. The 5-year fixed best rate we can access today (4.39%) is typically 40–80 basis points below what a bank would offer at their counter.",
  },
];

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="w-4 h-4 text-rose-400" />;
  if (trend === "down") return <TrendingDown className="w-4 h-4 text-emerald-400" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-16 relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 60% 0%, rgba(39,170,225,0.08) 0%, transparent 60%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
                Updated April 2025
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Current mortgage rates
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                Best available rates from our lender network. Rates shown are best-case for qualified borrowers — your actual rate depends on credit, property type, and amortization.
              </p>
              <p className="text-sm text-muted-foreground/60 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                Rates updated weekly. Last update: April 8, 2025.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rate Tables */}
        <section className="pb-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            {rateCategories.map((cat, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-foreground mb-1">{cat.category}</h2>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>

                <div className="rounded-xl overflow-hidden border border-[#27aae1]/10">
                  {/* Table header */}
                  <div className="grid grid-cols-4 gap-0 bg-[#111618] border-b border-[#1a1f22]">
                    <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Term</div>
                    <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Insured</div>
                    <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Conventional</div>
                    <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">7-Day Change</div>
                  </div>

                  {cat.rates.map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-4 gap-0 border-b border-[#1a1f22] last:border-0 bg-[#0e1214] hover:bg-[#111618] transition-colors"
                    >
                      <div className="px-5 py-4 text-sm font-medium text-foreground">{row.term}</div>
                      <div className="px-5 py-4 text-sm text-[#27aae1] font-semibold">{row.insured}</div>
                      <div className="px-5 py-4 text-sm text-[#27aae1] font-semibold">{row.conventional}</div>
                      <div className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <TrendIcon trend={row.trend} />
                          <span className={`text-sm font-medium ${row.trend === "up" ? "text-rose-400" : row.trend === "down" ? "text-emerald-400" : "text-muted-foreground"}`}>
                            {row.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <p className="text-xs text-muted-foreground/60 flex items-start gap-1.5 pt-2">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              Rates are provided for illustrative purposes and are subject to change without notice. OAC. Rates subject to lender approval and may vary based on individual circumstances. E.&amp;O.E.
            </p>
          </div>
        </section>

        {/* Rate History Context */}
        <section className="py-24 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Rate history context</h2>
              <p className="text-muted-foreground max-w-2xl">
                The Bank of Canada cut rates 5 times between June and December 2024, and again in January 2025. Prime rate has dropped from a peak of 7.20% in 2023 to 4.95% today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-xl overflow-hidden border border-[#27aae1]/10"
            >
              <div className="grid grid-cols-4 bg-[#111618] border-b border-[#1a1f22]">
                <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</div>
                <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">BoC Rate</div>
                <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prime Rate</div>
                <div className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">5yr Fixed (Best)</div>
              </div>
              {rateHistory.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 border-b border-[#1a1f22] last:border-0 bg-[#0e1214] hover:bg-[#111618] transition-colors"
                >
                  <div className="px-5 py-3.5 text-sm text-muted-foreground">{row.date}</div>
                  <div className="px-5 py-3.5 text-sm text-foreground font-medium">{row.boc}</div>
                  <div className="px-5 py-3.5 text-sm text-foreground font-medium">{row.prime}</div>
                  <div className="px-5 py-3.5 text-sm text-[#27aae1] font-semibold">{row.fiveYrFixed}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AI Explainer */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#27aae1]" />
                <span className="text-sm font-semibold text-[#27aae1] uppercase tracking-wider">Rate explainer</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Understand what these numbers mean</h2>
              <p className="text-muted-foreground max-w-2xl">
                Mortgage rates have their own language. Here are plain-English answers to the questions we hear most often.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {aiExplainerFaqs.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/25 transition-all"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  <h3 className="text-base font-semibold text-foreground mb-3">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Lock in your rate today</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Rate holds are available for up to 120 days on most products. Don't let rates move against you while you shop.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Get pre-approved
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
                >
                  Speak to a broker
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
