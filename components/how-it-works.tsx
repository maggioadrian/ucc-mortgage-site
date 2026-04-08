"use client";

import { motion } from "framer-motion";
import { Phone, Search, Banknote } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Book a call",
    description: "Schedule a free consultation. We'll learn about your goals and unique situation.",
    icon: Phone,
  },
  {
    number: "02",
    title: "We shop 40+ lenders",
    description: "Our team compares rates and terms from over 40 lending partners to find your best fit.",
    icon: Search,
  },
  {
    number: "03",
    title: "You get funded",
    description: "We handle the paperwork and coordinate with all parties. You get your mortgage.",
    icon: Banknote,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#0a0d0e]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How it works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Getting a mortgage doesn&apos;t have to be complicated. Here&apos;s our simple three-step process.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#006f7f] via-[#27aae1] to-[#006f7f]" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 mx-auto w-32 h-32 rounded-full bg-[#111618] border-2 border-[#27aae1]/30 flex flex-col items-center justify-center mb-6">
                  <span className="text-xs text-muted-foreground mb-1">{step.number}</span>
                  <step.icon className="w-8 h-8 text-[#27aae1]" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="#book"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
          >
            Start your journey
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
