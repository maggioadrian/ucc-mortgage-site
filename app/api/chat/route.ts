import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import nodemailer from "nodemailer";

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

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseCIMFields(messages: { role: string; content: string }[]) {
  const conversation = messages.map((m) => `${m.role === "user" ? "Client" : "Alex"}: ${m.content}`).join("\n");

  const extract = (patterns: RegExp[]) => {
    for (const re of patterns) {
      const m = conversation.match(re);
      if (m) return m[1]?.trim() ?? "";
    }
    return "Not provided";
  };

  const name     = extract([/(?:my name is|I(?:'m| am)|name[:\s]+)([A-Z][a-z]+ [A-Z][a-z]+)/i, /Client: (?:Hi,? )?I(?:'m| am) ([A-Z][a-z]+ [A-Z][a-z]+)/i]);
  const phone    = extract([/(\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4})/]);
  const email    = extract([/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/]);
  const address  = extract([/(\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Drive|Dr|Road|Rd|Blvd|Boulevard|Way|Court|Ct|Lane|Ln)[^,\n]*(?:,\s*[A-Za-z\s]+)?)/i]);
  const value    = extract([/(?:worth|value[d]?|appraise[d]?|estimate[d]?)[^\d]*\$?([\d,]+(?:k|K|M)?)/i, /\$?([\d,]+(?:k|K|M)?)\s*(?:is the value|value)/i]);
  const balance  = extract([/(?:existing|current|outstanding)\s+mortgage[^\d]*\$?([\d,]+(?:k|K|M)?)/i, /owe[s]?[^\d]*\$?([\d,]+(?:k|K|M)?)/i]);
  const position = extract([/(\bfirst\b|\bsecond\b|\b1st\b|\b2nd\b)\s+(?:mortgage|position)/i]);
  const amount   = extract([/(?:borrow|need|loan|mortgage)[^\d]*\$?([\d,]+(?:k|K|M)?)/i, /\$?([\d,]+(?:k|K|M)?)\s+(?:mortgage|loan)/i]);
  const purpose  = extract([/(?:for|to use (?:it )?for|purpose[:\s]+)([a-zA-Z ,]+?)(?:\.|,|\n|$)/i]);
  const term     = extract([/(6[\s-]months?|1[\s-]year|2[\s-]years?|open[\s-]term)/i]);
  const amort    = extract([/(interest[\s-]only|standard|regular)\s*(?:amortization|payments?)?/i]);
  const urgency  = extract([/(?:need|close|fund)[^\n]*(?:within|in|by)\s+([^\n.]+)/i, /timing[:\s]+([^\n.]+)/i]);
  const exit     = extract([/(?:exit strategy|plan to repay|pay (?:it )?(?:off|back))[:\s]*([^\n.]+)/i]);
  const credit   = extract([/(?:credit[:\s]+|my credit is|credit situation[:\s]*)([^\n.]+)/i]);
  const selfEmp  = /self[\s-]employed/i.test(conversation) ? "Yes" : /not self[\s-]employed|employee|employed (?:full|part)/i.test(conversation) ? "No" : "Not specified";

  // LTV calculation
  const parseAmt = (s: string) => {
    if (s === "Not provided") return 0;
    const clean = s.replace(/,/g, "").replace(/k/i, "000").replace(/m/i, "000000");
    return parseFloat(clean) || 0;
  };
  const v = parseAmt(value);
  const b = parseAmt(balance);
  const a = parseAmt(amount);
  const ltv = v > 0 ? Math.round(((b + a) / v) * 100) : 0;

  // Monthly payment estimate at 11%
  const r = 0.11 / 12;
  const monthlyEst = a > 0 ? Math.round(a * r) : 0;

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return { name, phone, email, address, value, balance, position, amount, purpose, term, amort, urgency, exit, credit, selfEmp, ltv, monthlyEst, timestamp };
}

function formatCIM(f: ReturnType<typeof parseCIMFields>): string {
  return `PRIVATE MORTGAGE INVESTMENT SUMMARY
UCC Mortgage Co. — For Administration Review Only
Not a guarantee of approval. Present to Vince Castagna or John Battaglia.
${"─".repeat(60)}

BORROWER: ${f.name}
PHONE:    ${f.phone}
EMAIL:    ${f.email}

PROPERTY:          ${f.address}
ESTIMATED VALUE:   $${f.value}
EXISTING MORTGAGE: $${f.balance}
LTV:               ${f.ltv}%

POSITION:          ${f.position}
AMOUNT REQUESTED:  $${f.amount}
PURPOSE:           ${f.purpose}
TERM:              ${f.term}
AMORTIZATION:      ${f.amort}
EST. MONTHLY PMT:  $${f.monthlyEst.toLocaleString()} (at 11% — indicative only)

FUNDING DATE:      ${f.urgency}
EXIT STRATEGY:     ${f.exit}
CREDIT SITUATION:  ${f.credit}
SELF-EMPLOYED:     ${f.selfEmp}

${"─".repeat(60)}
Generated via UCC AI Intake — ${f.timestamp}
`;
}

async function sendCIMEmail(fields: ReturnType<typeof parseCIMFields>, cimText: string) {
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

  const subject = `New Private Mortgage CIM — ${fields.name} — $${fields.amount} — ${fields.address}`;

  // To UCC team
  await transporter.sendMail({
    from: `"UCC AI Intake" <${smtpUser}>`,
    to: recipient,
    subject,
    text: cimText,
    html: `<pre style="font-family:monospace;white-space:pre-wrap;font-size:13px">${cimText}</pre>`,
  });

  // Confirmation to borrower
  if (fields.email && fields.email !== "Not provided" && fields.email.includes("@")) {
    await transporter.sendMail({
      from: `"UCC Mortgage Co." <${smtpUser}>`,
      to: fields.email,
      subject: "Your UCC Mortgage file has been received",
      text: `Hi ${fields.name.split(" ")[0]},\n\nThank you for connecting with UCC Mortgage Co. Your file has been received and Vince or a member of our team will be in touch within 1 business day.\n\nIf you have urgent questions in the meantime, you can call us at (519) 252-1110.\n\nWarm regards,\nUCC Mortgage Co.\n3200 Deziel Drive, Suite 508\nWindsor, ON N8W 5K8`,
    });
  }

  return true;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Detect CIM trigger
    const triggerMatch = text.includes("GENERATE_CIM:{\"complete\":true}");
    let cimData: ReturnType<typeof parseCIMFields> | null = null;
    let cimText = "";
    let emailSent = false;

    if (triggerMatch) {
      const allMessages = [
        ...messages,
        { role: "assistant" as const, content: text },
      ];
      cimData = parseCIMFields(allMessages);
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
    console.error("[chat/route]", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
