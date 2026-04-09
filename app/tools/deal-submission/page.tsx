"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { FileText, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm focus:outline-none focus:border-[#27aae1]/50 transition-colors";
const labelClass = "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2";

export default function DealSubmissionPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    dealType: "", propertyAddress: "",
    purchasePrice: "", downPayment: "",
    incomeInfo: "", timeline: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `New Deal Submission — ${form.dealType} — ${form.propertyAddress}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n` +
      `Deal Type: ${form.dealType}\nProperty Address: ${form.propertyAddress}\n` +
      `Purchase Price: ${form.purchasePrice}\nDown Payment / Equity: ${form.downPayment}\n\n` +
      `Income Info: ${form.incomeInfo}\nTimeline: ${form.timeline}\n\nNotes:\n${form.notes}`
    );
    window.location.href = `mailto:info@uccmortgageco.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="pt-24 pb-16"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex p-3 rounded-xl bg-[#27aae1]/10 mb-6">
              <FileText className="w-6 h-6 text-[#27aae1]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Submit a Deal</h1>
            <p className="text-muted-foreground">Fill out the form and a broker will respond within 4 business hours. No hard credit pull.</p>
          </div>
        </section>

        <section className="pb-24 bg-[#0a0d0e]">
          <div className="max-w-2xl mx-auto px-6">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle2 className="w-12 h-12 text-[#27aae1] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">Deal submitted</h2>
                <p className="text-muted-foreground">Your email client should have opened. We&apos;ll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="p-8 rounded-2xl border border-[#27aae1]/10 space-y-5"
                style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Your name *</label>
                    <input required value={form.name} onChange={set("name")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input required type="email" value={form.email} onChange={set("email")} className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input type="tel" value={form.phone} onChange={set("phone")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Deal type *</label>
                    <select required value={form.dealType} onChange={set("dealType")} className={inputClass}>
                      <option value="">Select type</option>
                      <option>Commercial mortgage</option>
                      <option>Private mortgage</option>
                      <option>Residential mortgage</option>
                      <option>Bridge financing</option>
                      <option>Refinancing</option>
                      <option>Farm & agriculture</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Property address *</label>
                  <input required value={form.propertyAddress} onChange={set("propertyAddress")}
                    placeholder="123 Main St, Windsor, ON"
                    className={inputClass} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Purchase price / value</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <input value={form.purchasePrice} onChange={set("purchasePrice")}
                        placeholder="0" className={inputClass + " pl-8"} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Down payment / equity</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <input value={form.downPayment} onChange={set("downPayment")}
                        placeholder="0" className={inputClass + " pl-8"} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Income / employment info</label>
                  <input value={form.incomeInfo} onChange={set("incomeInfo")}
                    placeholder="Employed, self-employed, rental income, etc."
                    className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Timeline</label>
                  <select value={form.timeline} onChange={set("timeline")} className={inputClass}>
                    <option value="">Select timeline</option>
                    <option>ASAP (under 2 weeks)</option>
                    <option>Within 1 month</option>
                    <option>1–3 months</option>
                    <option>3+ months</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Notes</label>
                  <textarea rows={4} value={form.notes} onChange={set("notes")}
                    placeholder="Any additional context about the deal, challenges, or questions..."
                    className={inputClass + " resize-none"} />
                </div>

                <button type="submit"
                  className="w-full py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]">
                  Submit deal
                </button>

                <p className="text-xs text-center text-muted-foreground/60">
                  No hard credit pull. No obligation. We respond within 4 business hours.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
