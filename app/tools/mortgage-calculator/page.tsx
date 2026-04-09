"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Calculator } from "lucide-react";

function calcMonthlyPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function fmt(n: number) {
  return n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });
}

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors";
const labelClass = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2";

export default function MortgageCalculatorPage() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate]           = useState("6.5");
  const [years, setYears]         = useState("25");

  const p = parseFloat(principal.replace(/,/g, "")) || 0;
  const r = parseFloat(rate) || 0;
  const y = parseInt(years) || 0;

  const monthly   = p > 0 && r > 0 && y > 0 ? calcMonthlyPayment(p, r, y) : 0;
  const totalPaid = monthly * y * 12;
  const totalInt  = totalPaid - p;

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="pt-24 pb-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex p-3 rounded-xl bg-[#27aae1]/10 mb-6">
              <Calculator className="w-6 h-6 text-[#27aae1]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Mortgage Calculator</h1>
            <p className="text-muted-foreground">Estimate your monthly payment in seconds.</p>
          </div>
        </section>

        <section className="pb-24 bg-[#0a0d0e]">
          <div className="max-w-2xl mx-auto px-6 space-y-6">

            {/* Inputs */}
            <div className="p-8 rounded-2xl border border-[#27aae1]/10"
              style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Loan amount (CAD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <input
                      type="number" min="0" step="10000"
                      value={principal}
                      onChange={e => setPrincipal(e.target.value)}
                      className={inputClass + " pl-8"}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Interest rate (%)</label>
                  <div className="relative">
                    <input
                      type="number" min="0" step="0.1" max="30"
                      value={rate}
                      onChange={e => setRate(e.target.value)}
                      className={inputClass + " pr-8"}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Amortization period (years)</label>
                  <select value={years} onChange={e => setYears(e.target.value)} className={inputClass}>
                    {[5,10,15,20,25,30].map(y => (
                      <option key={y} value={y}>{y} years</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            {monthly > 0 && (
              <div className="p-8 rounded-2xl border border-[#27aae1]/20"
                style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, #161c1f 100%)" }}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Estimated breakdown</p>
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-[#27aae1] mb-1">{fmt(monthly)}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#111618] border border-[#2a3033] text-center">
                    <div className="text-xl font-bold text-foreground mb-0.5">{fmt(totalPaid)}</div>
                    <div className="text-xs text-muted-foreground">Total paid</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#111618] border border-[#2a3033] text-center">
                    <div className="text-xl font-bold text-foreground mb-0.5">{fmt(totalInt)}</div>
                    <div className="text-xs text-muted-foreground">Total interest</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-4 text-center leading-relaxed">
                  Estimated figures only. Contact UCC for actual rates and terms.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
