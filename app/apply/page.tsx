"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Home, Building2, Landmark, PiggyBank, RefreshCw, CreditCard, Check } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { PageBackdrop } from "@/components/page-backdrop";

const mortgageTypes = [
  { id: "residential", label: "Residential", description: "Purchase, renewal, or refinance a home", icon: Home },
  { id: "commercial", label: "Commercial", description: "Multi-unit, retail, office, or industrial", icon: Building2 },
  { id: "private", label: "Private Mortgage", description: "Alternative lending, fast approvals", icon: Landmark },
  { id: "debt-consolidation", label: "Debt Consolidation", description: "Roll high-interest debts into your mortgage", icon: PiggyBank },
  { id: "refinancing", label: "Refinancing", description: "Access equity or lower your rate", icon: RefreshCw },
  { id: "heloc", label: "HELOC / Credit Line", description: "Flexible revolving home equity access", icon: CreditCard },
];

const employmentOptions = ["Employed full-time", "Employed part-time", "Self-employed", "Retired", "Other"];

const steps = ["Mortgage type", "Property info", "Your details", "Confirm"];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    mortgageType: "",
    purchasePrice: "",
    downPayment: "",
    propertyAddress: "",
    propertyType: "Residential",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employment: "",
    annualIncome: "",
    consent: false,
  });

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };
  const handleSubmit = () => {
    setSubmitted(true);
  };

  const update = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0e1214]">
        <ScrollProgress />
        <Navigation />
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg"
          >
            <div className="w-20 h-20 rounded-full bg-[#006f7f]/20 border-2 border-[#27aae1]/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#27aae1]" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Application received</h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Thank you, {form.firstName}. One of our brokers will review your information and reach out within one business day to discuss your options.
            </p>
            <p className="text-sm text-muted-foreground/60 mb-8">
              A confirmation has been sent to {form.email}.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
            >
              Back to home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1214] relative overflow-hidden">
      <PageBackdrop variant="apply" />
      <ScrollProgress />
      <Navigation />

      <main className="relative py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-4">
              <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
              No hard credit pull at this stage
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Start your application</h1>
            <p className="text-muted-foreground">Takes about 5 minutes. A broker will follow up within 1 business day.</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-10 px-2">
            {steps.map((label, i) => (
              <div key={i} className="flex items-center gap-0 flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${
                      i < step
                        ? "bg-[#27aae1] border-[#27aae1] text-[#0e1214]"
                        : i === step
                        ? "border-[#27aae1] text-[#27aae1] bg-[#27aae1]/10"
                        : "border-[#2a3033] text-muted-foreground"
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === step ? "text-[#27aae1]" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-all ${i < step ? "bg-[#27aae1]" : "bg-[#2a3033]"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div
            className="relative rounded-2xl border border-[#27aae1]/10 p-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Step 1: Mortgage Type */}
                {step === 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">What type of mortgage are you looking for?</h2>
                    <p className="text-sm text-muted-foreground mb-6">Select the option that best describes your situation.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {mortgageTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => update("mortgageType", type.id)}
                            className={`group text-left p-4 rounded-xl border-2 transition-all ${
                              form.mortgageType === type.id
                                ? "border-[#27aae1] bg-[#27aae1]/8"
                                : "border-[#2a3033] hover:border-[#27aae1]/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${form.mortgageType === type.id ? "bg-[#27aae1]/20" : "bg-[#1a1f22]"}`}>
                                <Icon className={`w-4 h-4 ${form.mortgageType === type.id ? "text-[#27aae1]" : "text-muted-foreground"}`} />
                              </div>
                              <div>
                                <div className={`text-sm font-semibold ${form.mortgageType === type.id ? "text-[#27aae1]" : "text-foreground"}`}>{type.label}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Property Info */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Property information</h2>
                    <p className="text-sm text-muted-foreground mb-6">Tell us about the property you're financing.</p>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Property address (or city if not yet chosen)</label>
                        <input
                          type="text"
                          value={form.propertyAddress}
                          onChange={(e) => update("propertyAddress", e.target.value)}
                          placeholder="e.g. 123 Riverside Dr E, Windsor, ON"
                          className="w-full px-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Purchase / appraised value</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                            <input
                              type="text"
                              value={form.purchasePrice}
                              onChange={(e) => update("purchasePrice", e.target.value)}
                              placeholder="550,000"
                              className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Down payment / equity</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                            <input
                              type="text"
                              value={form.downPayment}
                              onChange={(e) => update("downPayment", e.target.value)}
                              placeholder="110,000"
                              className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Property type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Residential", "Condo", "Commercial"].map((t) => (
                            <button
                              key={t}
                              onClick={() => update("propertyType", t)}
                              className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                                form.propertyType === t
                                  ? "border-[#27aae1] bg-[#27aae1]/10 text-[#27aae1]"
                                  : "border-[#2a3033] text-muted-foreground hover:border-[#27aae1]/40"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Personal Info */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Your information</h2>
                    <p className="text-sm text-muted-foreground mb-6">Used to match you with the right lenders. Not shared without your consent.</p>
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">First name</label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            placeholder="Jane"
                            className="w-full px-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Last name</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            placeholder="Smith"
                            className="w-full px-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@email.com"
                            className="w-full px-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Phone number</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="(519) 555-0100"
                            className="w-full px-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Employment status</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {employmentOptions.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => update("employment", opt)}
                              className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all text-left ${
                                form.employment === opt
                                  ? "border-[#27aae1] bg-[#27aae1]/10 text-[#27aae1]"
                                  : "border-[#2a3033] text-muted-foreground hover:border-[#27aae1]/40"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Gross annual household income</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                          <input
                            type="text"
                            value={form.annualIncome}
                            onChange={(e) => update("annualIncome", e.target.value)}
                            placeholder="95,000"
                            className="w-full pl-8 pr-4 py-3 rounded-lg bg-[#0e1214] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-1">Review your application</h2>
                    <p className="text-sm text-muted-foreground mb-6">Make sure everything looks right before submitting.</p>

                    <div className="space-y-4 mb-6">
                      <div className="p-4 rounded-xl bg-[#0e1214] border border-[#1a1f22]">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Mortgage type</h3>
                        <p className="text-sm text-foreground font-medium capitalize">{form.mortgageType.replace("-", " ") || "—"}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0e1214] border border-[#1a1f22]">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Property</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Address:</span>
                            <span className="ml-2 text-foreground">{form.propertyAddress || "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <span className="ml-2 text-foreground">{form.propertyType}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Value:</span>
                            <span className="ml-2 text-foreground">${form.purchasePrice || "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Down payment:</span>
                            <span className="ml-2 text-foreground">${form.downPayment || "—"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-[#0e1214] border border-[#1a1f22]">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contact</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><span className="text-muted-foreground">Name:</span><span className="ml-2 text-foreground">{form.firstName} {form.lastName}</span></div>
                          <div><span className="text-muted-foreground">Email:</span><span className="ml-2 text-foreground">{form.email || "—"}</span></div>
                          <div><span className="text-muted-foreground">Phone:</span><span className="ml-2 text-foreground">{form.phone || "—"}</span></div>
                          <div><span className="text-muted-foreground">Employment:</span><span className="ml-2 text-foreground">{form.employment || "—"}</span></div>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => update("consent", !form.consent)}
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                          form.consent ? "bg-[#27aae1] border-[#27aae1]" : "border-[#2a3033]"
                        }`}
                      >
                        {form.consent && <Check className="w-3 h-3 text-[#0e1214]" />}
                      </div>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        I consent to UCC Mortgage Co. contacting me regarding my application. My information will not be shared with lenders without my explicit consent. View our{" "}
                        <Link href="#" className="text-[#27aae1] hover:underline">Privacy Policy</Link>.
                      </span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1a1f22]">
              <button
                onClick={goBack}
                className={`inline-flex items-center gap-2 px-5 py-2.5 border border-[#2a3033] text-foreground text-sm font-semibold rounded-full hover:border-[#27aae1]/40 transition-all ${
                  step === 0 ? "opacity-0 pointer-events-none" : ""
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < 3 ? (
                <button
                  onClick={goNext}
                  disabled={step === 0 && !form.mortgageType}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!form.consent}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit application
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            No hard credit check. No obligation. Questions?{" "}
            <Link href="/contact" className="text-[#27aae1] hover:underline">Call us directly.</Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
