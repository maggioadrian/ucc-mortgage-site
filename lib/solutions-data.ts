export type SolutionBenefit = {
  title: string;
  description: string;
  iconId: string;
};

export type SolutionStep = {
  number: string;
  title: string;
  description: string;
};

export type SolutionStat = {
  value: string;
  label: string;
};

export type Solution = {
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  heroIconId: string;
  benefits: SolutionBenefit[];
  eligibility: string[];
  steps: SolutionStep[];
  stats: SolutionStat[];
};

export const solutions: Solution[] = [
  {
    slug: "residential",
    title: "Residential Mortgages",
    tagline: "Your home. Your rate. Our expertise.",
    badge: "First home or fifth",
    description:
      "Whether you're buying your first home, renewing, or refinancing — we compare hundreds of products from 40+ lenders to find the mortgage that fits your life, not just your credit score.",
    heroIconId: "Home",
    benefits: [
      {
        title: "Best rate from 40+ lenders",
        description: "We compare products from major banks, credit unions, MICs, and trust companies — all at zero cost to you.",
        iconId: "Search",
      },
      {
        title: "First-time buyer programs",
        description: "Guidance through every incentive and rebate program available, including the First Home Savings Account.",
        iconId: "Key",
      },
      {
        title: "Renewals & refinancing",
        description: "Don't auto-renew at your bank's posted rate. We find better. Most clients save thousands over the term.",
        iconId: "RefreshCw",
      },
      {
        title: "Investment properties",
        description: "Multi-unit, cottages, vacation homes, and revenue properties financed with competitive terms.",
        iconId: "Building2",
      },
      {
        title: "Self-employed welcome",
        description: "Stated income, alt-doc, and BFS (business-for-self) programs available through our lender network.",
        iconId: "Briefcase",
      },
      {
        title: "Pre-approval in 24 hours",
        description: "Know your maximum purchase price and lock in a rate before you start shopping.",
        iconId: "Clock",
      },
    ],
    eligibility: [
      "Canadian resident, age 18 or older",
      "Stable employment income or proven self-employment income",
      "Minimum credit score of 580 (lower scores considered with larger down payment)",
      "Property must be located in Ontario",
      "Minimum 5% down payment (insured) or 20% (conventional)",
      "Property must pass lender appraisal",
    ],
    steps: [
      {
        number: "01",
        title: "Free consultation",
        description: "Tell us your goals: first purchase, renewal, refinance, or investment. No obligation.",
      },
      {
        number: "02",
        title: "We shop 40+ lenders",
        description: "Our brokers compare hundreds of products and present you with the top options ranked by total cost.",
      },
      {
        number: "03",
        title: "Application & documents",
        description: "We guide you through the paperwork, communicate with lawyers and lenders, and keep you updated.",
      },
      {
        number: "04",
        title: "Approval & keys",
        description: "Receive your commitment letter, sign the final docs, and get ready to close.",
      },
    ],
    stats: [
      { value: "4.39%", label: "Best current 5yr fixed" },
      { value: "$1.2B+", label: "Mortgages placed since 1974" },
      { value: "24 hrs", label: "Average pre-approval time" },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Mortgages",
    tagline: "Large transactions. Expert execution.",
    badge: "Financing for every asset class",
    description:
      "From multi-unit residential to industrial facilities — our commercial team has the lender relationships and deal experience to finance your investment or business property.",
    heroIconId: "Building2",
    benefits: [
      {
        title: "Multi-unit residential",
        description: "5+ unit apartment buildings, mixed residential, and large rental portfolios financed competitively.",
        iconId: "Building2",
      },
      {
        title: "Retail & mixed-use",
        description: "Strip malls, main street storefronts, and mixed commercial-residential properties welcome.",
        iconId: "Landmark",
      },
      {
        title: "Office & industrial",
        description: "Professional office space, warehouses, manufacturing, and distribution facilities.",
        iconId: "Factory",
      },
      {
        title: "Financing up to $50M",
        description: "Large-scale commercial transactions handled with discretion and speed through our senior broker team.",
        iconId: "DollarSign",
      },
      {
        title: "Bridge & construction loans",
        description: "Short-term capital for property transitions, land assemblies, and phased developments.",
        iconId: "Hammer",
      },
      {
        title: "Nationwide lender network",
        description: "Access to Schedule A banks, credit unions, MICs, life companies, and private commercial capital.",
        iconId: "Users",
      },
    ],
    eligibility: [
      "Business entity or individual commercial investor",
      "Property generating or projected to generate income",
      "Minimum 20–35% down payment depending on property type and use",
      "Clean environmental assessment (Phase I / II if required)",
      "Demonstrated ability to service the debt (DSCR analysis)",
      "Ontario commercial real estate property",
    ],
    steps: [
      {
        number: "01",
        title: "Property & deal review",
        description: "Share the property details, purchase price, existing leases, and your business plan with our team.",
      },
      {
        number: "02",
        title: "Lender matching",
        description: "We approach specialized commercial lenders with a professionally packaged investment summary.",
      },
      {
        number: "03",
        title: "Due diligence",
        description: "Environmental review, appraisal coordination, and financial underwriting completed in parallel.",
      },
      {
        number: "04",
        title: "Closing & funding",
        description: "Legal coordination, mortgage registration, and final drawdown handled seamlessly.",
      },
    ],
    stats: [
      { value: "Up to $50M", label: "Single transaction financing" },
      { value: "30+", label: "Specialized commercial lenders" },
      { value: "20+ yrs", label: "Commercial lending expertise" },
    ],
  },
  {
    slug: "private",
    title: "Private Mortgages",
    tagline: "Alternative lending when the bank says no.",
    badge: "When traditional lenders say no",
    description:
      "Life doesn't always fit a bank's credit model. Our private mortgage solutions provide fast, flexible financing for unique situations — with a clear path back to A-lending.",
    heroIconId: "Landmark",
    benefits: [
      {
        title: "Credit challenges accepted",
        description: "Bruised credit, past bankruptcies, consumer proposals, and collections considered on a case-by-case basis.",
        iconId: "Shield",
      },
      {
        title: "Non-traditional income",
        description: "Self-employed, rental income, pension, asset-based lending — we look at the full picture.",
        iconId: "Briefcase",
      },
      {
        title: "Rapid 7–10 day approval",
        description: "When you need funds fast, our private lender network moves at the speed your situation demands.",
        iconId: "Zap",
      },
      {
        title: "Bridge loan solutions",
        description: "Short-term capital while you qualify for conventional financing or sell an existing property.",
        iconId: "ArrowUpRight",
      },
      {
        title: "Flexible 1–3 year terms",
        description: "Short terms designed around your exit strategy — not a 25-year commitment.",
        iconId: "Calendar",
      },
      {
        title: "Guided path to A-lending",
        description: "We actively work with you to improve your financial profile so the next renewal goes through a bank.",
        iconId: "Target",
      },
    ],
    eligibility: [
      "Minimum 35% equity in an Ontario property",
      "Clear and credible exit strategy (refinance or sale plan)",
      "Property in good, marketable condition",
      "No active foreclosure or power of sale proceedings",
      "Identity verification and clear title (or clearable title)",
      "Ability to cover higher private lending rates during the term",
    ],
    steps: [
      {
        number: "01",
        title: "Equity assessment",
        description: "Quick review of your property value, equity position, and current financial situation.",
      },
      {
        number: "02",
        title: "Lender matching",
        description: "We present your file to our network of private lenders — individuals, syndicates, and MICs.",
      },
      {
        number: "03",
        title: "Term agreement",
        description: "Negotiate rate, LTV, term, and exit conditions that work for your specific situation.",
      },
      {
        number: "04",
        title: "Rapid funding",
        description: "Close in as little as 7–10 business days. Funds in your lawyer's trust account.",
      },
    ],
    stats: [
      { value: "7–10 days", label: "Average approval timeline" },
      { value: "Up to 85%", label: "LTV available" },
      { value: "Since 1974", label: "Private mortgage experience" },
    ],
  },
  {
    slug: "debt-consolidation",
    title: "Debt Consolidation",
    tagline: "One payment. Breathing room. A fresh start.",
    badge: "One payment. Less stress.",
    description:
      "High-interest debt is expensive and exhausting. By rolling credit cards, car loans, and personal lines into your mortgage, we can dramatically reduce your monthly payments and total interest cost.",
    heroIconId: "PiggyBank",
    benefits: [
      {
        title: "Merge all high-interest debts",
        description: "Credit cards at 19%+, car loans, lines of credit, and personal loans rolled into one mortgage payment.",
        iconId: "Wallet",
      },
      {
        title: "Reduce monthly payments",
        description: "Most clients reduce their total monthly debt payments by $400–$800 per month after consolidation.",
        iconId: "TrendingDown",
      },
      {
        title: "Lower overall interest rate",
        description: "Replacing 19–29% credit card debt with mortgage-rate borrowing saves thousands annually.",
        iconId: "Percent",
      },
      {
        title: "Improve cash flow",
        description: "Free up money every month for savings, investments, family needs, or simply peace of mind.",
        iconId: "BarChart3",
      },
      {
        title: "Potential credit score improvement",
        description: "Lowering your credit utilization by paying off revolving balances often improves your score significantly.",
        iconId: "CheckCircle",
      },
      {
        title: "Access up to 80% LTV",
        description: "Use your built-up home equity as the vehicle for consolidation — you earned it.",
        iconId: "Home",
      },
    ],
    eligibility: [
      "Homeowner with minimum 20% equity in an Ontario property",
      "Combined debts of $10,000 or more in high-interest obligations",
      "Stable income sufficient to service the new consolidated mortgage payment",
      "Ontario residential property in good condition",
      "Willingness to close consolidated revolving credit accounts",
      "No active foreclosure or power of sale proceedings",
    ],
    steps: [
      {
        number: "01",
        title: "Debt inventory",
        description: "We review all your existing debts: balances, interest rates, minimum payments, and total monthly cost.",
      },
      {
        number: "02",
        title: "Equity analysis",
        description: "We assess your home's value and available equity to determine what can be consolidated.",
      },
      {
        number: "03",
        title: "Consolidation structure",
        description: "Design the optimal mortgage structure to maximize savings while meeting lender requirements.",
      },
      {
        number: "04",
        title: "Fund & close accounts",
        description: "Receive funds through your lawyer, debts are paid out, and you're left with one clean payment.",
      },
    ],
    stats: [
      { value: "Up to 80%", label: "LTV for consolidation" },
      { value: "$600/mo", label: "Average monthly savings" },
      { value: "1 payment", label: "Replaces multiple debts" },
    ],
  },
  {
    slug: "refinancing",
    title: "Refinancing",
    tagline: "Make your equity work as hard as you do.",
    badge: "Access equity. Lower your rate.",
    description:
      "Your mortgage doesn't have to stay the way it was written. Refinancing lets you access built-up equity, lower your rate, restructure your payments, or consolidate debt — all on your timeline.",
    heroIconId: "RefreshCw",
    benefits: [
      {
        title: "Access home equity",
        description: "Tap into equity you've built for renovations, investments, education, or any major expense.",
        iconId: "Banknote",
      },
      {
        title: "Lower your interest rate",
        description: "When rates drop or your credit improves, refinancing can save thousands over the remaining term.",
        iconId: "Percent",
      },
      {
        title: "Change your amortization",
        description: "Extend to lower monthly payments or shorten to build equity and become mortgage-free sooner.",
        iconId: "RefreshCw",
      },
      {
        title: "Fund major renovations",
        description: "Use your equity to invest back into your property — often adding more value than you spend.",
        iconId: "Hammer",
      },
      {
        title: "Early renewal analysis",
        description: "We model the break cost vs. savings to tell you exactly whether breaking your mortgage makes financial sense.",
        iconId: "BarChart3",
      },
      {
        title: "Debt consolidation built in",
        description: "Roll high-interest debts into your refinanced mortgage while you're restructuring anyway.",
        iconId: "PiggyBank",
      },
    ],
    eligibility: [
      "Existing homeowner in Ontario",
      "Minimum 20% equity remaining after refinancing (for cashout)",
      "Current on existing mortgage payments (no arrears)",
      "Income to qualify for the new, potentially larger mortgage amount",
      "Property in good condition with no active foreclosure",
      "Ability to pay prepayment penalty if breaking term early",
    ],
    steps: [
      {
        number: "01",
        title: "Goal clarification",
        description: "What are you trying to accomplish? Lower rate, access cash, restructure, or consolidate?",
      },
      {
        number: "02",
        title: "Break cost analysis",
        description: "We calculate your exact prepayment penalty and model whether breaking early saves money overall.",
      },
      {
        number: "03",
        title: "New mortgage placement",
        description: "Shop our lender network for the best refinancing terms and structure.",
      },
      {
        number: "04",
        title: "Registration & funding",
        description: "New mortgage registered, old one discharged. You receive your funds at closing.",
      },
    ],
    stats: [
      { value: "Up to 80%", label: "LTV for cashout refinancing" },
      { value: "4.39%", label: "Best available rate today" },
      { value: "100% free", label: "Cost of our advisory service" },
    ],
  },
  {
    slug: "loans",
    title: "Loans & Credit Lines",
    tagline: "Flexible access to the equity you've earned.",
    badge: "Flexible borrowing solutions",
    description:
      "A Home Equity Line of Credit (HELOC) or home equity loan gives you flexible, low-rate access to the equity in your home — on a revolving or fixed-term basis.",
    heroIconId: "CreditCard",
    benefits: [
      {
        title: "HELOC up to 65% LTV",
        description: "Revolving credit secured against your home equity — draw, repay, and redraw as needed.",
        iconId: "LineChart",
      },
      {
        title: "Flexible draw structure",
        description: "Access funds precisely when you need them. No need to take a lump sum upfront.",
        iconId: "RotateCcw",
      },
      {
        title: "Interest-only payment options",
        description: "During the draw period, pay only interest on what you've actually used.",
        iconId: "Coins",
      },
      {
        title: "Investment property HELOCs",
        description: "Access equity in rental properties to fund new acquisitions or improvements.",
        iconId: "Building2",
      },
      {
        title: "Home improvement financing",
        description: "Purpose-specific products for renovation financing, often with better terms than personal loans.",
        iconId: "Hammer",
      },
      {
        title: "Business capital access",
        description: "Use personal home equity to fund business operations, inventory, or expansion.",
        iconId: "Briefcase",
      },
    ],
    eligibility: [
      "Homeowner in Ontario with available equity",
      "Minimum credit score of 680 for HELOC products",
      "Verified income and stable employment history",
      "Combined LTV not exceeding 65% for a HELOC (80% for home equity loan)",
      "Property in good condition and insured",
      "No restrictions from first mortgage lender on secondary financing",
    ],
    steps: [
      {
        number: "01",
        title: "Equity & needs review",
        description: "Assess your available equity, credit profile, and what you need the funds to accomplish.",
      },
      {
        number: "02",
        title: "Product selection",
        description: "HELOC, home equity loan, or blended mortgage — we match you to the right structure.",
      },
      {
        number: "03",
        title: "Lender submission",
        description: "Submit a complete application with property appraisal and supporting financial documentation.",
      },
      {
        number: "04",
        title: "Approval & access",
        description: "Credit facility approved. Access funds immediately as your needs arise.",
      },
    ],
    stats: [
      { value: "Up to 65%", label: "HELOC LTV available" },
      { value: "Prime+0.5%", label: "Starting HELOC rate" },
      { value: "$0", label: "Annual fee options available" },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
