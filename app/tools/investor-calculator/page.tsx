"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors";
const labelClass = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2";

function fmt(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
}

export default function InvestorCalculatorPage() {
  const [amount, setAmount]   = useState("100000");
  const [rate, setRate]       = useState("9.0");
  const [term, setTerm]       = useState("12");

  const p = parseFloat(amount.replace(/,/g, "")) || 0;
  const r = parseFloat(rate) || 0;
  const m = parseInt(term) || 0;

  const annualReturn  = p * (r / 100);
  const monthlyReturn = annualReturn / 12;
  const termReturn    = monthlyReturn * m;

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="pt-24 pb-16"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex p-3 rounded-xl bg-[#27aae1]/10 mb-6">
              <TrendingUp className="w-6 h-6 text-[#27aae1]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Investor Yield Calculator</h1>
            <p className="text-muted-foreground">Estimate your returns from private mortgage investments managed by UCC.</p>
          </div>
        </section>

        <section className="pb-24 bg-[#0a0d0e]">
          <div className="max-w-2xl mx-auto px-6 space-y-6">

            {/* Inputs */}
            <div className="p-8 rounded-2xl border border-[#27aae1]/10"
              style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Investment amount (CAD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input type="number" min="0" step="10000"
                      value={amount} onChange={e => setAmount(e.target.value)}
                      className={inputClass + " pl-8"} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Annual interest rate (%)</label>
                  <div className="space-y-3">
                    <div className="relative">
                      <input type="number" min="0" step="0.5" max="20"
                        value={rate} onChange={e => setRate(e.target.value)}
                        className={inputClass + " pr-8"} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                    </div>
                    <div className="flex gap-2">
                      {["8.0","9.0","10.0","11.0"].map(r => (
                        <button key={r} type="button" onClick={() => setRate(r)}
                          className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                            rate === r
                              ? "border-[#27aae1] bg-[#27aae1]/10 text-[#27aae1]"
                              : "border-[#2a3033] text-muted-foreground hover:border-[#27aae1]/30"
                          }`}>
                          {r}%
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/60">Current UCC private mortgage rates typically range 8–11%.</p>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Investment term (months)</label>
                  <select value={term} onChange={e => setTerm(e.target.value)} className={inputClass}>
                    {[6,12,18,24,36].map(t => (
                      <option key={t} value={t}>{t} months</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            {p > 0 && r > 0 && (
              <div className="p-8 rounded-2xl border border-[#27aae1]/20"
                style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, #161c1f 100%)" }}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Estimated returns</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-[#111618] border border-[#2a3033] text-center">
                    <div className="text-lg font-bold text-[#27aae1] mb-0.5">{fmt(monthlyReturn)}</div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111618] border border-[#2a3033] text-center">
                    <div className="text-lg font-bold text-[#27aae1] mb-0.5">{fmt(annualReturn)}</div>
                    <div className="text-xs text-muted-foreground">Annual</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111618] border border-[#2a3033] text-center">
                    <div className="text-lg font-bold text-[#27aae1] mb-0.5">{fmt(termReturn)}</div>
                    <div className="text-xs text-muted-foreground">{term}-month total</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/60 text-center leading-relaxed mb-6">
                  Estimates only. Actual returns depend on deal structure and terms. Past performance does not guarantee future results.
                </p>
                <Link href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_24px_rgba(39,170,225,0.35)]">
                  Book an investor call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
