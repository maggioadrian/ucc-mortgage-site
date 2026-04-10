import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// ── Branching system prompt ───────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are Alex, a senior mortgage advisor at UCC Mortgage Co. in Windsor, Ontario. You are conducting a structured mortgage intake to generate a Credit Information Memorandum (CIM) for the UCC team to review.

STAGE 1 — DETERMINE MORTGAGE TYPE:
First determine which category applies:
A) INVESTOR — wants to invest money in private mortgages (route to investor intake)
B) COMMERCIAL — needs financing for a commercial property (multi-unit 5+, retail, office, industrial, mixed-use, development)
C) PRIVATE — needs alternative/private lending (bruised credit, self-employed, fast closing, second mortgage, bridge)
D) RESIDENTIAL — standard purchase, renewal, or refinance with good credit

Ask: "Are you looking to borrow money secured by a property, or invest in mortgages?"
If borrowing: "Tell me a bit about what you're trying to do — are you buying a home, refinancing, or do you have a more unique situation?"
Based on their answer, classify them and proceed to the appropriate branch.

Output STAGE:1 at the very start of your first message. Output STAGE:2 when you've classified them and begin collecting property/deal details. Output STAGE:3 when you move to personal/financial info collection. Output STAGE:4 when you present the summary for confirmation.

STAGE 2A — COMMERCIAL BRANCH:
Collect: property type (multi-unit/retail/office/industrial/mixed-use/development), property address, estimated value, purchase or refinance, loan amount needed, current NOI or rental income, existing financing, term preference, urgency.

STAGE 2B — PRIVATE BRANCH:
Collect: property address, estimated value, existing mortgage balance, position (1st or 2nd), loan amount, purpose, term, amortization (interest only preferred for private), urgency, exit strategy, credit situation, self-employed status.

STAGE 2C — RESIDENTIAL BRANCH:
Collect: transaction type (purchase/renewal/refinance), property address, purchase price or estimated value, down payment amount (if purchase), existing mortgage balance and lender (if renewal/refi), desired loan amount, employment status, annual income (approximate), credit score range (excellent/good/fair/challenged), closing/funding timeline.

STAGE 2D — INVESTOR BRANCH:
Collect: investment amount range, investment timeline, preferred return type (monthly income vs lump sum), accredited investor status, previous mortgage investment experience, best time to call.

STAGE 3 — PERSONAL INFO:
Collect name, phone number, and email address. Keep this brief.

STAGE 4 — CONFIRMATION:
Before generating the CIM, summarize what you've collected:
"Here's what I have for your file: [brief 3-4 line summary]. Does everything look correct, or is there anything you'd like to change?"

When confirmed, respond with GENERATE_CIM:{"complete":true,"type":"commercial"} or "private", "residential", or "investor" based on the branch.

Rules:
- One question at a time
- If client gives multiple answers at once, acknowledge all and ask about what's still missing
- Be warm and professional
- Never promise approvals or specific rates
- For commercial: "Our commercial rates depend on the property and deal structure — Vince will prepare a detailed term sheet for you"
- For residential: "We work with 40+ lenders to find you the best rate — typically I can get you options within 24 hours"
- For private: "Private rates start at 7.99% for first mortgages — the exact rate depends on LTV and property type"
- Output STAGE:X on its own line when transitioning stages — the UI uses this to update the progress indicator`;

// ── Types ─────────────────────────────────────────────────────────────────────

type MortgageType = "commercial" | "private" | "residential" | "investor";

interface CIMResult {
  type: MortgageType;
  text: string;
  timestamp: string;
}

// ── Extraction prompts by type ────────────────────────────────────────────────

const EXTRACTION_PROMPTS: Record<MortgageType, string> = {
  commercial: `You are a data extraction assistant. Extract structured data from a mortgage intake conversation. Return ONLY valid JSON with these exact keys: borrowerName, phone, email, yearsInBusiness, propertyType, propertyAddress, estimatedValue (number or null), transaction (purchase/refinance), existingFinancing (number or null), loanAmount (number or null), noi (number or null), term, urgency, exitStrategy, notes. If a field was not clearly provided by the CLIENT (not the advisor), use null. Convert shorthand like $2.5M to 2500000.`,

  private: `You are a data extraction assistant. Extract structured data from a mortgage intake conversation. Return ONLY valid JSON with these exact keys: borrowerName, phone, email, propertyAddress, estimatedValue (number or null), existingMortgage (number or null), position (first/second/blanket), loanAmount (number or null), purpose, term, amortization (interest-only/standard), urgency, exitStrategy, creditSituation, selfEmployed (yes/no). If a field was not clearly provided by the CLIENT (not the advisor), use null. Convert shorthand like $500k to 500000.`,

  residential: `You are a data extraction assistant. Extract structured data from a mortgage intake conversation. Return ONLY valid JSON with these exact keys: borrowerName, phone, email, transactionType (purchase/renewal/refinance), propertyAddress, estimatedValue (number or null), downPayment (number or null), existingMortgage (number or null), existingLender, loanAmount (number or null), employment, annualIncome (number or null), creditProfile (excellent/good/fair/challenged), closingTimeline. If a field was not clearly provided by the CLIENT (not the advisor), use null. Convert shorthand like $95k to 95000.`,

  investor: `You are a data extraction assistant. Extract structured data from a mortgage intake conversation. Return ONLY valid JSON with these exact keys: investorName, phone, email, investmentRange, timeline, returnPreference (monthly-income/lump-sum/either), accreditedInvestor (yes/no/unknown), priorExperience, bestTimeToCall. If a field was not clearly provided by the CLIENT (not the advisor), use null.`,
};

// ── Field extraction ──────────────────────────────────────────────────────────

async function extractFields(
  client: Anthropic,
  messages: { role: string; content: string }[],
  type: MortgageType
): Promise<Record<string, unknown>> {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "CLIENT" : "ALEX"}: ${m.content}`)
    .join("\n\n");

  const res = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: EXTRACTION_PROMPTS[type],
    messages: [{ role: "user", content: transcript }],
  });

  const raw = res.content[0].type === "text" ? res.content[0].text : "{}";
  const jsonStr = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(jsonStr);
  } catch {
    console.error("[chat-apply/route] Extraction JSON parse failed:", jsonStr);
    return {};
  }
}

// ── CIM formatters ────────────────────────────────────────────────────────────

function fmtStr(v: unknown): string {
  return (v && typeof v === "string") ? v : "Not provided";
}

function fmtNum(v: unknown): string {
  if (v === null || v === undefined) return "Not provided";
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(/,/g, ""));
  if (isNaN(n)) return "Not provided";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
}

function calcLTV(loan: unknown, value: unknown): string {
  const l = typeof loan  === "number" ? loan  : 0;
  const v = typeof value === "number" ? value : 0;
  if (l <= 0 || v <= 0) return "N/A";
  return `${((l / v) * 100).toFixed(1)}%`;
}

function calcMonthly(loan: unknown, rate = 0.11): string {
  const l = typeof loan === "number" ? loan : 0;
  if (l <= 0) return "N/A";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(
    Math.round(l * rate / 12)
  );
}

function line(n = 60) { return "─".repeat(n); }

function buildCommercialCIM(f: Record<string, unknown>, timestamp: string): string {
  return `COMMERCIAL MORTGAGE SUMMARY
UCC Mortgage Co. — For Administration Review Only
Present to Vince Castagna or John Battaglia
${line()}

BORROWER:          ${fmtStr(f.borrowerName)}
PHONE:             ${fmtStr(f.phone)}
EMAIL:             ${fmtStr(f.email)}
YEARS IN BUSINESS: ${fmtStr(f.yearsInBusiness)}

PROPERTY TYPE:     ${fmtStr(f.propertyType)}
PROPERTY ADDRESS:  ${fmtStr(f.propertyAddress)}
ESTIMATED VALUE:   ${fmtNum(f.estimatedValue)}
TRANSACTION:       ${fmtStr(f.transaction)}
EXISTING FINANCING:${f.existingFinancing ? " " + fmtNum(f.existingFinancing) : " None"}

LOAN REQUESTED:    ${fmtNum(f.loanAmount)}
LTV:               ${calcLTV(f.loanAmount, f.estimatedValue)}
ANNUAL NOI/INCOME: ${fmtNum(f.noi)}
TERM:              ${fmtStr(f.term)}
URGENCY:           ${fmtStr(f.urgency)}
EXIT STRATEGY:     ${fmtStr(f.exitStrategy)}

NOTES:             ${fmtStr(f.notes)}

${line()}
Generated via UCC AI Intake — ${timestamp}
`;
}

function buildPrivateCIM(f: Record<string, unknown>, timestamp: string): string {
  return `PRIVATE MORTGAGE INVESTMENT SUMMARY
UCC Mortgage Co. — For Administration Review Only
Not a guarantee of approval. Present to Vince Castagna or John Battaglia.
${line()}

BORROWER:          ${fmtStr(f.borrowerName)}
PHONE:             ${fmtStr(f.phone)}
EMAIL:             ${fmtStr(f.email)}

PROPERTY:          ${fmtStr(f.propertyAddress)}
ESTIMATED VALUE:   ${fmtNum(f.estimatedValue)}
EXISTING MORTGAGE: ${fmtNum(f.existingMortgage)}
LTV:               ${calcLTV(f.loanAmount, f.estimatedValue)}

POSITION:          ${fmtStr(f.position)}
AMOUNT REQUESTED:  ${fmtNum(f.loanAmount)}
PURPOSE:           ${fmtStr(f.purpose)}
TERM:              ${fmtStr(f.term)}
AMORTIZATION:      ${fmtStr(f.amortization)}
EST. MONTHLY PMT:  ${calcMonthly(f.loanAmount)} (at 11% — indicative only)

URGENCY:           ${fmtStr(f.urgency)}
EXIT STRATEGY:     ${fmtStr(f.exitStrategy)}
CREDIT SITUATION:  ${fmtStr(f.creditSituation)}
SELF-EMPLOYED:     ${fmtStr(f.selfEmployed)}

${line()}
Generated via UCC AI Intake — ${timestamp}
`;
}

function buildResidentialCIM(f: Record<string, unknown>, timestamp: string): string {
  const dp   = typeof f.downPayment    === "number" ? f.downPayment    : 0;
  const val  = typeof f.estimatedValue === "number" ? f.estimatedValue : 0;
  const dpPct = val > 0 && dp > 0 ? ` (${((dp / val) * 100).toFixed(1)}%)` : "";

  return `RESIDENTIAL MORTGAGE SUMMARY
UCC Mortgage Co. — For Administration Review Only
${line()}

BORROWER:          ${fmtStr(f.borrowerName)}
PHONE:             ${fmtStr(f.phone)}
EMAIL:             ${fmtStr(f.email)}

TRANSACTION TYPE:  ${fmtStr(f.transactionType)}
PROPERTY:          ${fmtStr(f.propertyAddress)}
VALUE/PRICE:       ${fmtNum(f.estimatedValue)}
DOWN PAYMENT:      ${fmtNum(f.downPayment)}${dpPct}
EXISTING MORTGAGE: ${fmtNum(f.existingMortgage)} ${f.existingLender ? `with ${f.existingLender}` : ""}

LOAN REQUESTED:    ${fmtNum(f.loanAmount)}
LTV:               ${calcLTV(f.loanAmount, f.estimatedValue)}
EMPLOYMENT:        ${fmtStr(f.employment)}
ANNUAL INCOME:     ${fmtNum(f.annualIncome)}
CREDIT PROFILE:    ${fmtStr(f.creditProfile)}
CLOSING DATE:      ${fmtStr(f.closingTimeline)}

${line()}
Generated via UCC AI Intake — ${timestamp}
`;
}

function buildInvestorCIM(f: Record<string, unknown>, timestamp: string): string {
  return `INVESTOR INQUIRY
UCC Mortgage Co. — For Administration Review Only
${line()}

INVESTOR:            ${fmtStr(f.investorName)}
PHONE:               ${fmtStr(f.phone)}
EMAIL:               ${fmtStr(f.email)}

INVESTMENT RANGE:    ${fmtStr(f.investmentRange)}
TIMELINE:            ${fmtStr(f.timeline)}
RETURN PREFERENCE:   ${fmtStr(f.returnPreference)}
ACCREDITED INVESTOR: ${fmtStr(f.accreditedInvestor)}
PRIOR EXPERIENCE:    ${fmtStr(f.priorExperience)}
BEST TIME TO CALL:   ${fmtStr(f.bestTimeToCall)}

${line()}
Generated via UCC AI Intake — ${timestamp}
`;
}

// ── Email ─────────────────────────────────────────────────────────────────────

async function sendCIMEmail(
  type: MortgageType,
  fields: Record<string, unknown>,
  cimText: string
) {
  const smtpUser  = process.env.SMTP_USER;
  const smtpPass  = process.env.SMTP_PASS;
  const smtpHost  = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort  = parseInt(process.env.SMTP_PORT ?? "587");
  const recipient = process.env.CIM_RECIPIENT ?? "info@uccmortgageco.com";

  if (!smtpUser || !smtpPass) return false;

  const transporter = nodemailer.createTransport({
    host: smtpHost, port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const nameField = type === "investor" ? fields.investorName : fields.borrowerName;
  const name      = typeof nameField === "string" ? nameField : "Unknown";
  const amount    = typeof fields.loanAmount      === "number"
    ? `$${fields.loanAmount.toLocaleString("en-CA")}`
    : typeof fields.investmentRange === "string" ? fields.investmentRange : "Amount TBD";
  const address   = typeof fields.propertyAddress === "string" ? fields.propertyAddress : "";
  const typeLabel = { commercial: "Commercial", private: "Private", residential: "Residential", investor: "Investor" }[type];
  const subject   = `New ${typeLabel} CIM — ${name} — ${amount}${address ? ` — ${address}` : ""}`;

  await transporter.sendMail({
    from: `"UCC AI Intake" <${smtpUser}>`,
    to: recipient,
    subject,
    text: cimText,
    html: `<pre style="font-family:monospace;white-space:pre-wrap;font-size:13px">${cimText}</pre>`,
  });

  const emailField = typeof fields.email === "string" ? fields.email : "";
  if (emailField.includes("@")) {
    const firstName = name.split(" ")[0];
    await transporter.sendMail({
      from: `"UCC Mortgage Co." <${smtpUser}>`,
      to: emailField,
      subject: "Your UCC Mortgage file has been received",
      text: `Hi ${firstName},\n\nThank you for connecting with UCC Mortgage Co. Your file has been received and a member of our team will be in touch within 1 business day.\n\nIf you have urgent questions, call us at (519) 252-1110.\n\nWarm regards,\nUCC Mortgage Co.\n3200 Deziel Drive, Suite 508\nWindsor, ON N8W 5K8`,
    });
  }

  return true;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  console.log("[chat-apply/route] Apply chat API called");
  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[chat-apply/route] ANTHROPIC_API_KEY not set");
      return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    // Trim history to last 20 messages to avoid context overflow
    const trimmedMessages = messages.slice(-20);

    // Wrap the API call with a 25-second timeout
    const timeoutSignal = AbortSignal.timeout(25_000);
    let response: Awaited<ReturnType<typeof client.messages.create>>;
    try {
      response = await client.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: trimmedMessages,
      }, { signal: timeoutSignal });
    } catch (apiErr: unknown) {
      if (apiErr instanceof Anthropic.APIError) {
        console.error("[chat-apply/route] Anthropic API error", {
          status:  apiErr.status,
          message: apiErr.message,
          name:    apiErr.name,
        });
        return NextResponse.json(
          { error: `Anthropic API error ${apiErr.status}: ${apiErr.message}` },
          { status: apiErr.status ?? 500 }
        );
      }
      const isTimeout = apiErr instanceof Error && (apiErr.name === "TimeoutError" || apiErr.name === "AbortError");
      if (isTimeout) {
        console.error("[chat-apply/route] Anthropic call timed out after 25s");
        return NextResponse.json(
          { error: "The request timed out. Please try again." },
          { status: 504 }
        );
      }
      throw apiErr; // re-throw for outer catch
    }

    const rawText = response.content[0].type === "text" ? response.content[0].text : "";

    // Extract STAGE:X marker
    const stageMatch = rawText.match(/^STAGE:([1-4])$/m);
    const stage = stageMatch ? parseInt(stageMatch[1]) : null;

    // Extract GENERATE_CIM trigger with type
    const cimMatch = rawText.match(/GENERATE_CIM:\{"complete":true,"type":"(commercial|private|residential|investor)"\}/);
    const cimTriggered = !!cimMatch;
    const cimType = (cimMatch?.[1] ?? "private") as MortgageType;

    let cimResult: CIMResult | null = null;
    let emailSent = false;

    if (cimTriggered) {
      const allMessages = [...messages, { role: "assistant" as const, content: rawText }];
      const fields    = await extractFields(client, allMessages, cimType);
      const timestamp = new Date().toLocaleString("en-CA", {
        timeZone: "America/Toronto", dateStyle: "medium", timeStyle: "short",
      });

      const builders: Record<MortgageType, (f: Record<string, unknown>, t: string) => string> = {
        commercial:  buildCommercialCIM,
        private:     buildPrivateCIM,
        residential: buildResidentialCIM,
        investor:    buildInvestorCIM,
      };

      const cimText = builders[cimType](fields, timestamp);
      cimResult = { type: cimType, text: cimText, timestamp };

      try {
        emailSent = await sendCIMEmail(cimType, fields, cimText);
      } catch (e) {
        console.error("[chat-apply/route] Email send failed:", e);
      }
    }

    // Strip markers from visible text
    const visibleText = rawText
      .replace(/^STAGE:[1-4]\s*\n?/m, "")
      .replace(/GENERATE_CIM:\{[^}]+\}/g, "")
      .trim();

    return NextResponse.json({
      message: visibleText,
      stage,
      cimGenerated: cimTriggered,
      cimType: cimTriggered ? cimType : null,
      cimText: cimResult?.text ?? null,
      emailSent,
    });
  } catch (err: unknown) {
    if (err instanceof Anthropic.APIError) {
      console.error("[chat-apply/route] Anthropic API error", { status: err.status, message: err.message });
      return NextResponse.json(
        { error: `Anthropic API error ${err.status}: ${err.message}` },
        { status: err.status ?? 500 }
      );
    }
    console.error("[chat-apply/route] Unexpected error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
