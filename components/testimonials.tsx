"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "I never thought I'd own a home — my credit wasn't the best. Anto made it happen.",
    name: "Danielle",
    location: "Tillsonburg",
    initials: "DM",
  },
  {
    quote:
      "Dianna handled everything with ease and made it genuinely fun to work together. I will refer her many times over.",
    name: "Bryan",
    location: "Toronto",
    initials: "BT",
  },
  {
    quote:
      "UCC helped us when we needed it most. Thanks to Anto's hard work our lives are now stress free.",
    name: "Colleen",
    location: "Windsor",
    initials: "CR",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <motion.section
      className="relative py-32 bg-[#0e0c0a]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Large decorative quotation mark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[400px] leading-none text-[#006f7f]"
        style={{ opacity: 0.1 }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Avatar */}
            <div className="mx-auto mb-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#006f7f] to-[#27aae1] flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {testimonials[activeIndex].initials}
              </span>
            </div>

            {/* Quote */}
            <blockquote className="text-[22px] leading-relaxed text-[#c8dde4] md:text-[26px]">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <p className="mt-8 text-sm font-semibold text-foreground">
              {testimonials[activeIndex].name}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonials[activeIndex].location}
            </p>

            {/* Five-star dots */}
            <div className="mt-4 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-[#006f7f]" />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-[#2a2420] text-muted-foreground hover:text-foreground hover:border-[#006f7f]/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot navigation */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 h-2 bg-[#006f7f]"
                    : "w-2 h-2 bg-[#2a2420] hover:bg-[#006f7f]/40"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-[#2a2420] text-muted-foreground hover:text-foreground hover:border-[#006f7f]/40 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
