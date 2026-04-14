"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, FileText, TrendingUp, HelpCircle, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Mortgage calculator",
    description: "Estimate your monthly payment based on rate, amortization, and purchase price.",
    href: "/tools/mortgage-calculator",
    delay: 0.1,
  },
  {
    icon: FileText,
    title: "Deal submission",
    description: "Submit a deal directly to our team. Structured form with deal type, property info, and timeline.",
    href: "/tools/deal-submission",
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: "Investor yield calculator",
    description: "See annual and monthly returns on a private mortgage investment at different amounts and rates.",
    href: "/tools/investor-calculator",
    delay: 0.3,
  },
  {
    icon: HelpCircle,
    title: "Find your product",
    description: "5 quick questions — we'll tell you which UCC mortgage product best fits your situation.",
    href: "/tools/qualify",
    delay: 0.35,
  },
];

export function ToolsPreview() {
  return (
    <section className="py-24 bg-[#141210]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-3">Tools &amp; calculators</h2>
            <p className="text-muted-foreground max-w-lg">
              Free tools to help you plan your deal, estimate payments, and find the right product.
            </p>
          </div>
          <Link href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#27aae1] hover:opacity-75 transition-opacity whitespace-nowrap">
            All tools <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: tool.delay }}
              >
                <Link href={tool.href} className="group block h-full">
                  <div
                    className="h-full p-6 rounded-2xl border border-[#006f7f]/10 hover:border-[#006f7f]/35 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,111,127,0.1)]"
                    style={{ background: "linear-gradient(145deg, #242018 0%, #141210 100%)" }}
                  >
                    <div className="p-2.5 rounded-lg bg-[#006f7f]/10 w-fit mb-4 group-hover:bg-[#006f7f]/18 transition-colors">
                      <Icon className="w-5 h-5 text-[#006f7f]" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
