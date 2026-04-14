"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { HelpCircle, ArrowRight, ChevronRight } from "lucide-react";

type Question = {
  id: string;
  text: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    id: "purpose",
    text: "What are you looking for?",
    options: [
      { label: "I need mortgage financing",      value: "borrow" },
      { label: "I want to invest in mortgages",  value: "invest" },
      { label: "I want to refer a client",       value: "partner" },
    ],
  },
  {
    id: "propertyType",
    text: "What type of property is involved?",
    options: [
      { label: "Residential (home or condo)",         value: "residential" },
      { label: "Commercial or investment property",    value: "commercial" },
      { label: "Farm or agricultural land",            value: "farm" },
      { label: "Vacant land",                          value: "vacant" },
    ],
  },
  {
    id: "creditProfile",
    text: "How would you describe your credit / financial profile?",
    options: [
      { label: "Strong — employed, good credit",               value: "strong" },
      { label: "OK — some challenges or self-employed",        value: "ok" },
      { label: "Difficult — past issues or non-traditional",   value: "difficult" },
    ],
  },
  {
    id: "timeline",
    text: "How quickly do you need this?",
    options: [
      { label: "ASAP — within 2 weeks",    value: "urgent" },
      { label: "Within a month",           value: "soon" },
      { label: "1–3 months",               value: "normal" },
      { label: "Just exploring",           value: "exploring" },
    ],
  },
  {
    id: "amount",
    text: "Approximate loan or investment amount?",
    options: [
      { label: "Under $250,000",           value: "small" },
      { label: "$250,000 – $750,000",      value: "medium" },
      { label: "$750,000 – $2M",           value: "large" },
      { label: "Over $2M",                 value: "xlarge" },
    ],
  },
];

type Answers = Record<string, string>;

function getRecommendation(answers: Answers): {
  title: string;
  description: string;
  href: string;
  cta: string;
} {
  if (answers.purpose === "invest") {
    return {
      title: "Private Mortgage Investing",
      description: "UCC manages a portfolio of first and second mortgage investments across Windsor-Essex. Earn 8–11% annual returns secured by real property.",
      href: "/investors",
      cta: "Learn about investing",
    };
  }
  if (answers.purpose === "partner") {
    return {
      title: "Partner Referral Program",
      description: "Submit your client's deal through our partner portal. We follow up within 4 business hours and keep you in the loop throughout.",
      href: "/partners",
      cta: "Become a partner",
    };
  }
  if (answers.creditProfile === "difficult" || answers.timeline === "urgent") {
    return {
      title: "Private Mortgage",
      description: "Fast approvals in 24–48 hours. All credit profiles welcome. Ideal for bridge financing, equity access, and non-traditional borrowers.",
      href: "/solutions/private",
      cta: "Get a private mortgage",
    };
  }
  if (answers.propertyType === "commercial" || answers.amount === "large" || answers.amount === "xlarge") {
    return {
      title: "Commercial Financing",
      description: "Multi-unit residential, retail plazas, mixed-use, and industrial properties across Ontario. Competitive rates from 15+ institutional and private lenders.",
      href: "/solutions/commercial",
      cta: "Explore commercial financing",
    };
  }
  if (answers.propertyType === "farm") {
    return {
      title: "Farm & Agriculture Financing",
      description: "Financing for farmland, greenhouses, and agricultural operations across Ontario. Flexible terms for traditional and non-traditional farm income.",
      href: "/solutions/farm-agriculture",
      cta: "Explore farm financing",
    };
  }
  if (answers.propertyType === "vacant") {
    return {
      title: "Vacant Land Financing",
      description: "Private and commercial lenders for vacant land purchases, development lots, and rural properties.",
      href: "/solutions/vacant-land",
      cta: "Explore vacant land",
    };
  }
  return {
    title: "Residential Mortgage",
    description: "First-time buyers, renewals, refinancing, and investment properties. We compare rates from 40+ lenders to find your best option.",
    href: "/solutions/residential",
    cta: "See residential options",
  };
}

export default function QualifyPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[current];
  const totalAnswered = Object.keys(answers).length;
  const progress = (current / questions.length) * 100;

  const answer = (value: string) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setAnswers({});
    setCurrent(0);
    setDone(false);
  };

  const rec = done ? getRecommendation(answers) : null;

  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />
      <main>
        <section className="pt-24 pb-16"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,111,127,0.12) 0%, transparent 60%)" }}>
          <div className="max-w-xl mx-auto px-6 text-center">
            <div className="inline-flex p-3 rounded-xl bg-[#006f7f]/10 mb-6">
              <HelpCircle className="w-6 h-6 text-[#006f7f]" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Find Your Product</h1>
            <p className="text-muted-foreground">Answer 5 quick questions and we&apos;ll match you with the right UCC solution.</p>
          </div>
        </section>

        <section className="pb-24 bg-[#0e0c0a]">
          <div className="max-w-xl mx-auto px-6">
            {!done ? (
              <div className="p-8 rounded-2xl border border-[#006f7f]/10"
                style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}>

                {/* Progress */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-muted-foreground">Question {current + 1} of {questions.length}</span>
                  <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-1 bg-[#2a2420] rounded-full mb-8">
                  <div className="h-full bg-[#006f7f] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }} />
                </div>

                <h2 className="text-xl font-bold text-foreground mb-6">{question.text}</h2>
                <div className="space-y-3">
                  {question.options.map((opt) => (
                    <button key={opt.value} onClick={() => answer(opt.value)}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-[#2a2420] text-left text-sm text-foreground hover:border-[#006f7f]/40 hover:bg-[#006f7f]/5 transition-all group">
                      {opt.label}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#27aae1] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : rec && (
              <div className="p-8 rounded-2xl border border-[#006f7f]/20"
                style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.08) 0%, #242018 100%)" }}>
                <p className="text-xs font-semibold text-[#27aae1] uppercase tracking-wider mb-2">Your best match</p>
                <h2 className="text-2xl font-bold text-foreground mb-3">{rec.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{rec.description}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href={rec.href}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#006f7f] text-[#141210] font-semibold rounded-full transition-all hover:shadow-[0_0_24px_rgba(0,111,127,0.35)]">
                    {rec.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button onClick={restart}
                    className="flex-1 py-3.5 border border-[#2a2420] text-foreground font-semibold rounded-full hover:border-[#006f7f]/40 transition-all text-sm">
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
