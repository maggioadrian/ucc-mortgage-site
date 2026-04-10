import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Alex, a friendly and knowledgeable mortgage advisor at UCC Mortgage Co. in Windsor, Ontario. UCC has been Windsor's trusted mortgage broker since 1974 and is the only licensed mortgage administrator in Windsor-Essex County.

Your job is to have a natural conversation with clients to understand their mortgage needs — specifically for private mortgages. You are warm, professional, and concise. Never use jargon without explaining it. Never ask more than one question at a time.

You need to collect the following information to prepare a Private Mortgage Investment Summary for the UCC team:
1. Borrower full name
2. Borrower phone number
3. Borrower email address
4. Property address (full address)
5. Estimated property value
6. Existing mortgage balance on the property (could be $0)
7. Mortgage position needed (first or second mortgage)
8. Loan amount requested
9. Purpose of the loan (what will the money be used for?)
10. Preferred term (6 months, 1 year, 2 years, or open)
11. Amortization preference (interest only or standard)
12. Funding urgency (how quickly do they need the funds?)
13. Exit strategy (how do they plan to repay or exit this mortgage?)
14. Credit situation (brief description — you don't need a score, just context)
15. Are they self-employed? Yes or no.

Rules:
- Ask one question at a time, naturally woven into conversation
- If the client volunteers multiple pieces of information at once, acknowledge all of it and ask about what's still missing
- Be encouraging — many clients are nervous about private mortgages
- Never make promises about rates or approvals
- If asked about rates, say "Our current private mortgage rates start at 7.99% for first mortgages — Vince will confirm the exact rate for your situation"
- If asked about approval chances, say "Based on what you've shared, this sounds like something we can work with — Vince will review your file personally"
- When you have collected all 15 fields, say: "Perfect, I have everything I need to prepare your file for Vince. I'll send this over to the UCC team right now and someone will be in touch within 1 business day. Is there anything else you'd like to add?"
- After they confirm or add anything, respond with exactly this JSON on its own line (the app uses this to trigger CIM generation): GENERATE_CIM:{"complete":true}

Track which fields you have collected. If the conversation stalls or the client seems unsure, gently guide them back.

Always sign off warmly. You represent a trusted 50-year-old Windsor institution.`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface CIMFields {
  borrowerName:     string | null;
  phone:            string | null;
  email:            string | null;
  propertyAddress:  string | null;
  estimatedValue:   number | null;
  existingMortgage: number | null;
  position:         string | null;
  loanAmount:       number | null;
  purpose:          string | null;
  term:             string | null;
  amortization:     string | null;
  urgency:          string | null;
  exitStrategy:     string | null;
  creditSituation:  string | null;
  selfEmployed:     string | null;
  // computed
  ltv:              string;
  monthlyEst:       string;
  timestamp:        string;
}

// ── AI-powered field extractor ────────────────────────────────────────────────

const EXTRACTION_SYSTEM = `You are a data extraction assistant. Extract structured data from a mortgage intake conversation. Return ONLY valid JSON with these exact keys: borrowerName, phone, email, propertyAddress, estimatedValue (number only), existingMortgage (number only), position (first/second/blanket), loanAmount (number only), purpose, term, amortization (interest-only/standard), urgency, exitStrategy, creditSituation, selfEmployed (yes/no). If a field was not clearly provided by the CLIENT (not the advisor), use null. Convert shorthand like $500k to 500000. Do not include question text — only client answers.`;

async function extractCIMFields(
  client: Anthropic,
  messages: { role: string; content: string }[]
): Promise<CIMFields> {
  const transcript = messages
    .map((m) => `${m.role === "user" ? "CLIENT" : "ALEX"}: ${m.content}`)
    .join("\n\n");

  const extraction = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: EXTRACTION_SYSTEM,
    messages: [{ role: "user", content: transcript }],
  });

  const raw = extraction.content[0].type === "text" ? extraction.content[0].text : "{}";

  // Strip markdown code fences if present
  const jsonStr = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();

  let extracted: Partial<CIMFields>;
  try {
    extracted = JSON.parse(jsonStr);
  } catch {
    console.error("[chat/route] Failed to parse extraction JSON:", jsonStr);
    extracted = {};
  }

  // Derived calculations
  const v = typeof extracted.estimatedValue === "number" && extracted.estimatedValue > 0
    ? extracted.estimatedValue : null;
  const a = typeof extracted.loanAmount === "number" && extracted.loanAmount > 0
    ? extracted.loanAmount : null;

  const ltv = v && a
    ? `${((a / v) * 100).toFixed(1)}%`
    : "N/A";

  const monthlyEst = a
    ? new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })
        .format(Math.round(a * 0.11 / 12))
    : "N/A";

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    borrowerName:     extracted.borrowerName     ?? null,
    phone:            extracted.phone            ?? null,
    email:            extracted.email            ?? null,
    propertyAddress:  extracted.propertyAddress  ?? null,
    estimatedValue:   v,
    existingMortgage: typeof extracted.existingMortgage === "number" ? extracted.existingMortgage : null,
    position:         extracted.position         ?? null,
    loanAmount:       a,
    purpose:          extracted.purpose          ?? null,
    term:             extracted.term             ?? null,
    amortization:     extracted.amortization     ?? null,
    urgency:          extracted.urgency          ?? null,
    exitStrategy:     extracted.exitStrategy     ?? null,
    creditSituation:  extracted.creditSituation  ?? null,
    selfEmployed:     extracted.selfEmployed     ?? null,
    ltv,
    monthlyEst,
    timestamp,
  };
}

// ── CIM formatter ─────────────────────────────────────────────────────────────

function fmtNum(n: number | null): string {
  if (n === null) return "Not provided";
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);
}

function fmtStr(s: string | null): string {
  return s ?? "Not provided";
}

function formatCIM(f: CIMFields): string {
  return `PRIVATE MORTGAGE INVESTMENT SUMMARY
UCC Mortgage Co. — For Administration Review Only
Not a guarantee of approval. Present to Vince Castagna or John Battaglia.
${"─".repeat(60)}

BORROWER: ${fmtStr(f.borrowerName)}
PHONE:    ${fmtStr(f.phone)}
EMAIL:    ${fmtStr(f.email)}

PROPERTY:          ${fmtStr(f.propertyAddress)}
ESTIMATED VALUE:   ${fmtNum(f.estimatedValue)}
EXISTING MORTGAGE: ${fmtNum(f.existingMortgage)}
LTV:               ${f.ltv}

POSITION:          ${fmtStr(f.position)}
AMOUNT REQUESTED:  ${fmtNum(f.loanAmount)}
PURPOSE:           ${fmtStr(f.purpose)}
TERM:              ${fmtStr(f.term)}
AMORTIZATION:      ${fmtStr(f.amortization)}
EST. MONTHLY PMT:  ${f.monthlyEst} (at 11% — indicative only)

FUNDING DATE:      ${fmtStr(f.urgency)}
EXIT STRATEGY:     ${fmtStr(f.exitStrategy)}
CREDIT SITUATION:  ${fmtStr(f.creditSituation)}
SELF-EMPLOYED:     ${fmtStr(f.selfEmployed)}

${"─".repeat(60)}
Generated via UCC AI Intake — ${f.timestamp}
`;
}

async function sendCIMEmail(fields: CIMFields, cimText: string) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");
  const recipient = process.env.CIM_RECIPIENT ?? "info@uccmortgageco.com";

  if (!smtpUser || !smtpPass) return false;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const amountStr = fields.loanAmount
    ? `$${fields.loanAmount.toLocaleString("en-CA")}`
    : "Amount TBD";
  const subject = `New Private Mortgage CIM — ${fields.borrowerName ?? "Unknown"} — ${amountStr} — ${fields.propertyAddress ?? "Address TBD"}`;

  // To UCC team
  await transporter.sendMail({
    from: `"UCC AI Intake" <${smtpUser}>`,
    to: recipient,
    subject,
    text: cimText,
    html: `<pre style="font-family:monospace;white-space:pre-wrap;font-size:13px">${cimText}</pre>`,
  });

  // Confirmation to borrower
  if (fields.email && fields.email.includes("@")) {
    const firstName = fields.borrowerName ? fields.borrowerName.split(" ")[0] : "there";
    await transporter.sendMail({
      from: `"UCC Mortgage Co." <${smtpUser}>`,
      to: fields.email,
      subject: "Your UCC Mortgage file has been received",
      text: `Hi ${firstName},\n\nThank you for connecting with UCC Mortgage Co. Your file has been received and Vince or a member of our team will be in touch within 1 business day.\n\nIf you have urgent questions in the meantime, you can call us at (519) 252-1110.\n\nWarm regards,\nUCC Mortgage Co.\n3200 Deziel Drive, Suite 508\nWindsor, ON N8W 5K8`,
    });
  }

  return true;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  console.log("[chat/route] Chat API called");
  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[chat/route] ANTHROPIC_API_KEY is not set");
      return NextResponse.json({ error: "ANTHROPIC_API_KEY environment variable is not configured" }, { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Detect CIM trigger
    const triggerMatch = text.includes("GENERATE_CIM:{\"complete\":true}");
    let cimData: CIMFields | null = null;
    let cimText = "";
    let emailSent = false;

    if (triggerMatch) {
      const allMessages = [
        ...messages,
        { role: "assistant" as const, content: text },
      ];
      cimData = await extractCIMFields(client, allMessages);
      cimText = formatCIM(cimData);

      try {
        emailSent = await sendCIMEmail(cimData, cimText);
      } catch {
        // Email failure is non-fatal — CIM still returned for in-chat preview
      }
    }

    // Strip the trigger token from user-visible text
    const visibleText = text.replace(/GENERATE_CIM:\{"complete":true\}/g, "").trim();

    return NextResponse.json({
      message: visibleText,
      cimGenerated: triggerMatch,
      cimText: triggerMatch ? cimText : null,
      cimData: triggerMatch ? cimData : null,
      emailSent,
    });
  } catch (err: unknown) {
    // Surface full Anthropic API error details for easier debugging
    if (err instanceof Anthropic.APIError) {
      console.error("[chat/route] Anthropic API error", {
        status: err.status,
        message: err.message,
        name: err.name,
      });
      return NextResponse.json(
        { error: `Anthropic API error ${err.status}: ${err.message}` },
        { status: err.status ?? 500 }
      );
    }
    console.error("[chat/route] Unexpected error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
