"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Calendar, Tag, ExternalLink, BookOpen } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";

const featuredArticle = {
  date: "April 8, 2025",
  tag: "Weekly Rate Update",
  title: "Bank of Canada holds at 2.75% — fixed rates continue to ease",
  excerpt:
    "The Bank of Canada held its overnight rate steady at 2.75% at its April 16th decision. Bond yields have continued to compress, pulling 5-year fixed rates down to 4.39% — a 12-month low. Variable rate borrowers are seeing prime at 4.95%, the lowest since 2022. Here's what this means for buyers, renewers, and investors in Windsor-Essex.",
  readTime: "4 min read",
};

const newsItems = [
  {
    date: "March 28, 2025",
    tag: "Market Update",
    title: "Windsor home sales up 18% year-over-year in Q1 2025",
    excerpt: "Windsor-Essex saw strong sales activity in Q1 2025, with average residential sale prices rising to $612,000 — a 6.2% increase from Q1 2024.",
    readTime: "3 min read",
  },
  {
    date: "March 15, 2025",
    tag: "Rate News",
    title: "Variable vs. fixed: the case for variable is strengthening",
    excerpt: "With prime now at 4.95% and forecasters expecting further cuts in 2025, the math on variable-rate mortgages is improving for many borrowers.",
    readTime: "5 min read",
  },
  {
    date: "March 1, 2025",
    tag: "First-Time Buyers",
    title: "New FHSA rules for 2025: what Windsor buyers need to know",
    excerpt: "The First Home Savings Account now allows $8,000 annual contributions with up to $40,000 lifetime. Here's how to make it work for your purchase.",
    readTime: "6 min read",
  },
  {
    date: "February 14, 2025",
    tag: "Mortgage Strategy",
    title: "Should you break your mortgage early in 2025?",
    excerpt: "With rates continuing to drop, the break-even analysis on breaking a higher-rate mortgage is becoming more favorable. We walk through the math.",
    readTime: "7 min read",
  },
  {
    date: "January 30, 2025",
    tag: "Investing",
    title: "Private mortgage investing in 2025: what investors should know",
    excerpt: "As equity markets remain volatile, more Windsor investors are looking at private mortgage investing for stable, secured returns of 8–12%.",
    readTime: "5 min read",
  },
];

const incentives = [
  {
    name: "First Home Savings Account (FHSA)",
    description: "Tax-free savings account for first-time homebuyers. Contribute up to $8,000/year ($40,000 lifetime). Contributions are tax-deductible; withdrawals for a qualifying home purchase are tax-free.",
    eligibility: "First-time buyers, Canadian residents age 18–71",
    benefit: "Up to $40,000 tax-free + tax deduction on contributions",
  },
  {
    name: "First-Time Home Buyer's Tax Credit",
    description: "A $10,000 non-refundable tax credit for first-time buyers, resulting in up to $1,500 in federal tax savings in the year of purchase.",
    eligibility: "First-time buyers, qualifying home purchase",
    benefit: "Up to $1,500 federal tax relief",
  },
  {
    name: "CMHC Mortgage Insurance (Insured Purchase)",
    description: "Enables purchases with as little as 5% down payment. Premium is added to your mortgage and amortized. Access to lower insured rates from lenders.",
    eligibility: "Purchase price under $1.5M, min. 5% down, max 25yr amortization",
    benefit: "Lower down payment, access to insured pricing",
  },
  {
    name: "Home Buyers' Plan (RRSP Withdrawal)",
    description: "Withdraw up to $35,000 from your RRSP tax-free for a first home purchase. Repay over 15 years to avoid tax inclusion.",
    eligibility: "First-time buyers with existing RRSP contributions",
    benefit: "Up to $35,000 ($70,000 per couple) for down payment",
  },
  {
    name: "GST/HST New Housing Rebate",
    description: "Partial rebate of HST paid on newly constructed homes under $450,000 (partial rebate up to $1.5M).",
    eligibility: "New construction buyers, primary residence",
    benefit: "Up to $24,000 HST rebate (Ontario)",
  },
];

const faqs = [
  {
    question: "What's the difference between a mortgage broker and a bank mortgage specialist?",
    answer:
      "A bank mortgage specialist works for one lender and can only offer that lender's products. A mortgage broker like UCC works with 40+ lenders and can compare products across the market — often finding better rates and more flexible terms. Our service is free to borrowers in most cases, as we're compensated by the lender on funded mortgages.",
  },
  {
    question: "How does the mortgage approval process work?",
    answer:
      "The typical process: 1) Pre-approval — we review your income, debts, and credit to determine your maximum purchase price and lock in a rate hold. 2) Property found — once you have an accepted offer, we submit a full mortgage application. 3) Lender commitment — lender reviews the full file and issues a commitment letter. 4) Conditions satisfied — we collect any remaining documents. 5) Closing — your lawyer receives mortgage instructions and funds on closing day.",
  },
  {
    question: "What documents do I need to apply for a mortgage?",
    answer:
      "Typically: government-issued ID, T4 slips (2 years), recent pay stubs, last 90 days of bank statements, Notice of Assessment (2 years), employment letter, and proof of down payment source (90-day history). Self-employed clients provide T1 generals and financial statements. We'll give you a personalized document checklist at your consultation.",
  },
  {
    question: "How much of a down payment do I need?",
    answer:
      "In Canada: 5% minimum for purchases under $500,000 (insured mortgage). For $500K–$999,999, it's 5% on the first $500K and 10% on the remainder. $1M+ requires 20% minimum and is not eligible for mortgage default insurance. 20%+ avoids the CMHC premium and gives access to conventional rates.",
  },
  {
    question: "What is a mortgage stress test?",
    answer:
      "The federal mortgage stress test requires borrowers to qualify at the higher of their contract rate + 2%, or 5.25%. For example, if your rate is 4.39%, you must qualify at 6.39%. This is designed to ensure borrowers can handle rate increases. It applies to all federally regulated lenders (banks) but not always to credit unions or private lenders.",
  },
  {
    question: "What is a rate hold and should I get one?",
    answer:
      "A rate hold locks in today's rate for up to 120 days while you shop for a home. If rates rise during that period, you're protected. If rates drop, lenders typically allow you to take the lower rate. In a falling-rate environment like 2024–2025, a rate hold is still good insurance. We recommend getting one as soon as you're serious about buying.",
  },
  {
    question: "Can I get a mortgage if I'm self-employed?",
    answer:
      "Yes. Self-employed mortgage programs are available through several of our lender partners. The main difference is income verification — lenders will want to see 2 years of T1 generals and Notices of Assessment. Some lenders offer 'stated income' programs for well-established business owners. We place dozens of self-employed mortgages every year.",
  },
  {
    question: "What is the prepayment penalty for breaking my mortgage?",
    answer:
      "For fixed-rate mortgages, penalties are typically the greater of 3 months' interest or the Interest Rate Differential (IRD). IRD can be substantial if rates have dropped since you signed. Variable-rate mortgages typically have a flat 3-month interest penalty. We always calculate the exact break cost before recommending an early refinance.",
  },
];

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />

      <main>
        {/* Hero */}
        <section
          className="pt-24 pb-16 relative overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(46,95,146,0.12) 0%, transparent 60%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2e5f92]/20 border border-[#2e5f92]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
                <BookOpen className="w-3.5 h-3.5" />
                Mortgage education & market updates
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Resources
              </h1>
              <p className="text-lg text-muted-foreground">
                Rate updates, market news, buyer incentives, and plain-language answers to mortgage questions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="pb-16 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-xl font-bold text-foreground">Latest update</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl border border-[#27aae1]/15 hover:border-[#27aae1]/30 transition-all"
              style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, #0e1214 60%)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2.5 py-1 bg-[#27aae1]/15 text-[#27aae1] text-xs font-semibold rounded-full">
                  {featuredArticle.tag}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {featuredArticle.date}
                </span>
                <span className="text-xs text-muted-foreground">{featuredArticle.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{featuredArticle.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-5 max-w-3xl">{featuredArticle.excerpt}</p>
              <button className="group inline-flex items-center gap-2 text-sm font-semibold text-[#27aae1] hover:gap-3 transition-all">
                Read full update
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              className="text-2xl font-bold text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              Recent articles
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {newsItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/25 transition-all cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-3 h-3 text-[#006f7f]" />
                    <span className="text-xs text-[#006f7f] font-medium">{item.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground/60">{item.date} · {item.readTime}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-[#27aae1] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Government Incentives */}
        <section className="py-24 bg-[#0e1214]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Buyer incentives & programs</h2>
              <p className="text-muted-foreground max-w-2xl">
                Federal and provincial programs that can reduce the cost of your home purchase. Many clients leave money on the table by not knowing these exist.
              </p>
            </motion.div>

            <div className="space-y-4">
              {incentives.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-xl border border-[#27aae1]/10 hover:border-[#27aae1]/20 transition-all"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-2">{item.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
                      <p className="text-xs text-muted-foreground/70">
                        <span className="font-medium text-muted-foreground">Eligibility:</span> {item.eligibility}
                      </p>
                    </div>
                    <div className="md:text-right flex-shrink-0">
                      <span className="inline-block px-3 py-1.5 bg-[#006f7f]/15 border border-[#006f7f]/25 rounded-lg text-xs font-semibold text-[#27aae1]">
                        {item.benefit}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-xs text-muted-foreground/60 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Program terms and eligibility criteria are set by government and subject to change. Consult your mortgage broker and accountant for personalized advice.
            </motion.p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-24 bg-[#0a0d0e] border-t border-[#1a1f22]">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-3">Frequently asked questions</h2>
              <p className="text-muted-foreground">
                Plain-language answers to the mortgage questions we hear every week.
              </p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-xl border border-[#27aae1]/10 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#27aae1]/3 transition-colors"
                  >
                    <span className="text-sm font-semibold text-foreground pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-[#1a1f22] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0e1214] border-t border-[#1a1f22]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Still have questions?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Our brokers are available by phone or email. A 15-minute call can answer most questions and save you from costly mistakes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#27aae1] text-[#0e1214] font-semibold rounded-full transition-all hover:shadow-[0_0_30px_rgba(39,170,225,0.4)]"
                >
                  Speak to a broker
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[#2a3033] text-foreground font-semibold rounded-full hover:border-[#27aae1]/40 hover:bg-[#27aae1]/5 transition-all"
                >
                  Start an application
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
