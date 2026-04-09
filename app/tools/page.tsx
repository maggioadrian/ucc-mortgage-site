import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { Calculator, FileText, TrendingUp, HelpCircle, ArrowRight } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Mortgage Calculator",
    description: "Estimate your monthly payment based on loan amount, interest rate, and amortization period.",
    href: "/tools/mortgage-calculator",
    cta: "Calculate payment",
    tag: "Borrowers",
  },
  {
    icon: FileText,
    title: "Deal Submission",
    description: "Submit your deal details directly to our brokers. We'll review and respond within 4 business hours.",
    href: "/tools/deal-submission",
    cta: "Submit a deal",
    tag: "Borrowers",
  },
  {
    icon: TrendingUp,
    title: "Investor Yield Calculator",
    description: "See your estimated annual and monthly returns based on investment amount and current private mortgage rates.",
    href: "/tools/investor-calculator",
    cta: "Calculate yield",
    tag: "Investors",
  },
  {
    icon: HelpCircle,
    title: "Find Your Product",
    description: "Answer 5 quick questions and we'll match you with the right UCC mortgage product for your situation.",
    href: "/tools/qualify",
    cta: "Find my product",
    tag: "All",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="pt-24 pb-20"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)" }}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#006f7f]/20 border border-[#006f7f]/30 rounded-full text-xs font-medium text-[#27aae1] mb-6">
              <span className="w-1.5 h-1.5 bg-[#27aae1] rounded-full animate-pulse" />
              Tools & calculators
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Everything you need to move faster.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Free tools for borrowers, investors, and partners — no login required.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#0a0d0e]">
          <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-2 gap-6">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title}
                  className="group p-8 rounded-2xl border border-[#27aae1]/10 hover:border-[#27aae1]/30 transition-all"
                  style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="p-3 rounded-xl bg-[#27aae1]/10">
                      <Icon className="w-5 h-5 text-[#27aae1]" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#006f7f]/15 border border-[#006f7f]/20 text-[#27aae1]">
                      {t.tag}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#27aae1] transition-colors">
                    {t.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.description}</p>
                  <Link href={t.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.35)]">
                    {t.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
