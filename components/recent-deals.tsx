"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Tractor } from "lucide-react";

const deals = [
  {
    icon: Building2,
    type: "Commercial",
    title: "Commercial plaza refinance",
    amount: "$2.1M",
    location: "Windsor, ON",
    outcome: "6.25% rate secured",
    detail: "Retail plaza refinance with existing tenants. Conventional lender, 5-year fixed.",
    delay: 0.1,
  },
  {
    icon: Landmark,
    type: "Private",
    title: "Private bridge mortgage",
    amount: "$450K",
    location: "LaSalle, ON",
    outcome: "Funded in 4 days",
    detail: "Bridge financing to close a purchase before existing property sold. Second position.",
    delay: 0.2,
  },
  {
    icon: Tractor,
    type: "Farm",
    title: "Greenhouse operation",
    amount: "$1.8M",
    location: "Leamington, ON",
    outcome: "Farm Credit structure",
    detail: "Greenhouse facility financing. Custom FCC-backed structure aligned to crop cycles.",
    delay: 0.3,
  },
];

export function RecentDeals() {
  return (
    <section className="py-24 bg-[#0a0d0e]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-4">
            <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full" />
            Recent deals
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-3">Deals we&apos;ve closed</h2>
          <p className="text-muted-foreground max-w-lg">
            A sample of recent transactions across our commercial, private, and agricultural lending programs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {deals.map((deal) => {
            const Icon = deal.icon;
            return (
              <motion.div
                key={deal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: deal.delay }}
                className="relative p-6 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #161c1f 0%, #0e1214 100%)",
                  border: "1px solid #1d2428",
                }}
              >
                {/* Left teal accent line */}
                <div className="absolute left-0 top-6 bottom-6 w-0.5 bg-[#006f7f] rounded-r-full" />

                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-[#006f7f]/15">
                    <Icon className="w-4 h-4 text-[#27aae1]" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#27aae1]/10 border border-[#27aae1]/15 text-[#27aae1]">
                    {deal.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground mb-1">{deal.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{deal.detail}</p>

                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1d2428]">
                  <div>
                    <div className="text-lg font-bold text-[#27aae1]">{deal.amount}</div>
                    <div className="text-xs text-muted-foreground">Amount</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground leading-tight mt-1">{deal.location}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#27aae1] leading-tight mt-1">{deal.outcome}</div>
                    <div className="text-xs text-muted-foreground">Outcome</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
