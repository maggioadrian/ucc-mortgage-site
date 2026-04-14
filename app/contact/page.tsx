"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const contactInfo = [
  {
    icon: MapPin,
    label: "Office",
    lines: ["3200 Deziel Drive, Suite 508", "Windsor, ON  N8W 5K8"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["(519) 974-3300", "Toll-free: 1-800-555-0199"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["info@uccmortgage.ca", "mortgages@uccmortgage.ca"],
  },
  {
    icon: Clock,
    label: "Hours",
    lines: ["Mon–Fri: 9:00 AM – 5:30 PM", "Sat: 10:00 AM – 2:00 PM (by appt)"],
  },
];

const timeSlots = [
  "Morning (9–11 AM)",
  "Midday (11 AM–1 PM)",
  "Afternoon (1–3 PM)",
  "Late afternoon (3–5 PM)",
  "Saturday morning",
];

const topics = [
  "Buying a home",
  "Mortgage renewal",
  "Refinancing",
  "Debt consolidation",
  "Commercial financing",
  "Private mortgage",
  "Mortgage investing",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    timeSlot: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-16 relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 20% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <span className="w-1.5 h-1.5 bg-[#006f7f] rounded-full animate-pulse" />
                Typically respond within 1 business day
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Get in touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Whether you're ready to apply or just have questions — we're here. No obligation, no pressure.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="pb-24 bg-[#141210]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[380px_1fr] gap-12">

              {/* Left: Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-xl border border-[#006f7f]/10"
                      style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                    >
                      <div className="p-2.5 rounded-lg bg-[#006f7f]/10 flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#006f7f]" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                          {item.label}
                        </div>
                        {item.lines.map((line, j) => (
                          <div key={j} className="text-sm text-foreground">{line}</div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Licensing */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="p-5 rounded-xl border border-[#1a1610]"
                >
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    UCC Mortgage Co. is a licensed mortgage brokerage and administrator in Ontario.
                    <br />
                    <span className="mt-1 block">Brokerage Lic. #10675 | Administrator Lic. #11657</span>
                  </p>
                </motion.div>

                {/* Quick links */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="space-y-2"
                >
                  <p className="text-sm font-semibold text-foreground mb-3">Quick actions</p>
                  <Link
                    href="/apply"
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-[#006f7f]/10 hover:border-[#006f7f]/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                  >
                    <span className="text-sm text-foreground">Start an application</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#27aae1] transition-colors" />
                  </Link>
                  <Link
                    href="/rates"
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-[#006f7f]/10 hover:border-[#006f7f]/30 transition-all"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                  >
                    <span className="text-sm text-foreground">View current rates</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[#27aae1] transition-colors" />
                  </Link>
                </motion.div>
              </div>

              {/* Right: Book a Call Form */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {submitted ? (
                  <div
                    className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-2xl border border-[#006f7f]/15 text-center"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#006f7f]/20 border-2 border-[#006f7f]/40 flex items-center justify-center mb-5">
                      <CheckCircle2 className="w-8 h-8 text-[#006f7f]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">We'll be in touch</h3>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Thank you, {form.firstName}. We've received your message and will reach out to confirm your preferred time within 1 business day.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="p-8 rounded-2xl border border-[#006f7f]/10"
                    style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar className="w-5 h-5 text-[#006f7f]" />
                      <h2 className="text-xl font-bold text-foreground">Book a call</h2>
                    </div>

                    <div className="space-y-5">
                      {/* Name */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">First name</label>
                          <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => update("firstName", e.target.value)}
                            placeholder="Jane"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#141210] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#006f7f]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Last name</label>
                          <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => update("lastName", e.target.value)}
                            placeholder="Smith"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#141210] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#006f7f]/50 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="jane@email.com"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-[#141210] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#006f7f]/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="(519) 555-0100"
                            className="w-full px-4 py-3 rounded-lg bg-[#141210] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#006f7f]/50 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Topic */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">What can we help with?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {topics.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => update("topic", t)}
                              className={`py-2 px-2.5 rounded-lg border text-xs font-medium transition-all text-left ${
                                form.topic === t
                                  ? "border-[#006f7f] bg-[#006f7f]/10 text-[#27aae1]"
                                  : "border-[#2a2420] text-muted-foreground hover:border-[#006f7f]/40"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Preferred time */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Preferred call time</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => update("timeSlot", slot)}
                              className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all text-left ${
                                form.timeSlot === slot
                                  ? "border-[#006f7f] bg-[#006f7f]/10 text-[#27aae1]"
                                  : "border-[#2a2420] text-muted-foreground hover:border-[#006f7f]/40"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Additional notes <span className="text-muted-foreground font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          placeholder="Tell us about your situation — purchase price, timeline, any challenges..."
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg bg-[#141210] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#006f7f]/50 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_25px_rgba(0,111,127,0.35)]"
                      >
                        Send request
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>

                      <p className="text-center text-xs text-muted-foreground/60">
                        By submitting, you agree to be contacted by UCC Mortgage Co. regarding your inquiry.
                      </p>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="border-t border-[#1a1610] bg-[#0e0c0a]">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden border border-[#006f7f]/10"
            >
              <div
                className="h-64 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1c1916 0%, #141210 100%)" }}
              >
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#006f7f]/40 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">3200 Deziel Drive, Suite 508</p>
                  <p className="text-sm text-muted-foreground">Windsor, ON  N8W 5K8</p>
                  <a
                    href="https://maps.google.com/?q=3200+Deziel+Drive+Windsor+ON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs text-[#27aae1] hover:underline"
                  >
                    Open in Google Maps
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
