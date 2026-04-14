"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Percent } from "lucide-react";
import Link from "next/link";

export function InvestSection() {
  return (
    <section className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-[#006f7f]/30 p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, #0d1a1f 0%, #141210 50%, #0d1518 100%)",
          }}
        >
          {/* Accent glow */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#006f7f] via-[#27aae1] to-[#006f7f]" />
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <TrendingUp className="w-3.5 h-3.5" />
                Investment Opportunity
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Invest with us
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Earn competitive returns by investing in private mortgages through UCC. 
                Our experienced team carefully vets each opportunity, providing you with 
                steady income backed by real estate security.
              </p>
              
              <Link
                href="#invest"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#006f7f] text-foreground font-semibold rounded-full transition-all hover:bg-[#006f7f]/80 hover:shadow-[0_0_20px_rgba(0,111,127,0.3)]"
              >
                Learn more
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#1c1916] border border-[#1a1610]">
                <Percent className="w-6 h-6 text-[#006f7f] mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">8-12%</div>
                <div className="text-sm text-muted-foreground">Annual returns</div>
              </div>
              
              <div className="p-5 rounded-xl bg-[#1c1916] border border-[#1a1610]">
                <Shield className="w-6 h-6 text-[#006f7f] mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1">Secured</div>
                <div className="text-sm text-muted-foreground">Real estate backed</div>
              </div>
              
              <div className="col-span-2 p-5 rounded-xl bg-[#1c1916] border border-[#1a1610]">
                <div className="text-sm text-muted-foreground mb-2">Minimum investment</div>
                <div className="text-3xl font-bold text-[#27aae1]">$25,000</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
