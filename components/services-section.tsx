"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Home, Building2, Landmark, CreditCard, HardHat, PiggyBank, TrendingUp, Users } from "lucide-react";

const featured = {
  id: "01",
  title: "Residential",
  description:
    "Whether you're a first-time buyer, refinancing, or renewing — we find the best rate from 40+ lenders. Investment properties, second homes, and vacation properties welcome.",
  stat: "$1.2B+",
  statLabel: "placed since 1974",
  icon: Home,
  href: "/solutions/residential",
};

const otherServices = [
  {
    id: "02",
    title: "Commercial",
    description: "Multi-unit residential, retail, office, and industrial property financing.",
    icon: Building2,
    href: "/solutions/commercial",
  },
  {
    id: "04",
    title: "HELOC & Loans",
    description: "Access your home equity for renovations, investments, or consolidation.",
    icon: CreditCard,
    href: "/solutions/loans",
  },
  {
    id: "05",
    title: "Construction",
    description: "Financing for new builds and major renovations with progress draws.",
    icon: HardHat,
    href: "/solutions/residential",
  },
  {
    id: "06",
    title: "Debt Consolidation",
    description: "Combine high-interest debts into a single, manageable payment.",
    icon: PiggyBank,
    href: "/solutions/debt-consolidation",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#0e1214]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl">
            From your first home to complex commercial deals, we have the expertise and lender relationships to make it happen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Featured: Residential (2-col) ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 group"
          >
            <Link href={featured.href} className="block h-full">
              <div
                className="h-full p-8 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(39,170,225,0.1)]"
                style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-lg bg-[#27aae1]/10">
                    <featured.icon className="w-6 h-6 text-[#27aae1]" />
                  </div>
                  <span className="text-xs font-medium text-[#006f7f]">{featured.id}</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[#27aae1] transition-colors">
                  {featured.title}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md">{featured.description}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-4xl font-bold text-[#27aae1]">{featured.stat}</div>
                    <div className="text-sm text-muted-foreground">{featured.statLabel}</div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#27aae1] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Private Mortgages — dual-audience card (full width) ── */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-3 group"
          >
            <div
              className="h-full p-8 rounded-xl border border-[#006f7f]/30 hover:border-[#27aae1]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,111,127,0.15)]"
              style={{
                background: "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, #161c1f 40%, #0e1214 100%)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-lg bg-[#006f7f]/20">
                      <Landmark className="w-5 h-5 text-[#27aae1]" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#006f7f]/20 border border-[#006f7f]/30 text-[#27aae1]">
                      For borrowers &amp; investors
                    </span>
                    <span className="text-xs font-medium text-[#006f7f]">03</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                    Private Mortgages
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mb-1">
                    Fast, flexible financing when the bank says no — and a trusted way to earn 8–12% secured by Canadian real estate.
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <TrendingUp className="w-3.5 h-3.5 text-[#27aae1]" />
                    <span className="text-xs font-semibold text-[#27aae1]">Windsor&apos;s largest private mortgage source</span>
                    <span className="text-xs text-muted-foreground">· since 1974</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  <Link
                    href="/solutions/private#borrowers"
                    className="group/btn inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)]"
                  >
                    Get a private mortgage
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/solutions/private#invest"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-[#006f7f]/50 text-[#27aae1] text-sm font-semibold rounded-full hover:border-[#27aae1]/60 hover:bg-[#27aae1]/5 transition-all"
                  >
                    <Users className="w-4 h-4" />
                    Invest with us
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Other service cards ── */}
          {otherServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.25 + index * 0.08 }}
              className="group"
            >
              <Link href={service.href} className="block h-full">
                <div
                  className="h-full p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(39,170,225,0.08)]"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-[#27aae1]/10">
                      <service.icon className="w-5 h-5 text-[#27aae1]" />
                    </div>
                    <span className="text-xs font-medium text-[#006f7f]">{service.id}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
