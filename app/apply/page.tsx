"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Download, CheckCircle2, Shield, Clock, Building2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  isTyping?: boolean;
  cimText?: string;
  emailSent?: boolean;
}

const OPENING: Message = {
  id: "open-0",
  role: "assistant",
  content: "Hi! I'm Alex, UCC's mortgage advisor. I'm here to help you find the right financing solution. To get started — are you looking to borrow money secured by a property, or are you interested in investing in private mortgages?",
};

// ── Stages ────────────────────────────────────────────────────────────────────

const STAGES = [
  { n: 1, label: "Understanding your needs",  sub: "Determining the right mortgage type"    },
  { n: 2, label: "Property details",           sub: "Collecting property & deal information" },
  { n: 3, label: "Your profile",               sub: "Personal & financial information"        },
  { n: 4, label: "Review & submit",            sub: "Confirming your file for the UCC team"  },
];

// ── Download helper ───────────────────────────────────────────────────────────

function downloadCIM(text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `UCC-Mortgage-CIM-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── CIM card ──────────────────────────────────────────────────────────────────

function CIMCard({ text, emailSent }: { text: string; emailSent: boolean }) {
  return (
    <div className="mt-3 rounded-xl border border-[#006f7f]/20 overflow-hidden">
      <div className="px-4 py-3 border-b border-[#006f7f]/15 flex items-center justify-between"
        style={{ background: "rgba(0,111,127,0.12)" }}>
        <span className="text-xs font-semibold text-[#27aae1] uppercase tracking-wider">
          {emailSent ? "File sent to UCC team \u2713" : "Your Mortgage Summary"}
        </span>
        <button onClick={() => downloadCIM(text)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#27aae1] transition-colors">
          <Download className="w-3 h-3" /> Download
        </button>
      </div>
      <pre className="px-4 py-3 text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto bg-[#0e0c0a]">
        {text}
      </pre>
    </div>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#006f7f]/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }} />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#006f7f] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 mr-2.5">
          A
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? "" : "flex-1 min-w-0"}`}>
        {msg.isTyping ? (
          <div className="rounded-2xl rounded-tl-sm bg-[#242018] border border-[#2a2420] inline-block">
            <TypingDots />
          </div>
        ) : (
          <>
            <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "rounded-tr-sm bg-[#006f7f] text-[#141210] font-medium"
                : "rounded-tl-sm bg-[#242018] border border-[#2a2420] text-foreground"
            }`}>
              {msg.content}
            </div>
            {msg.cimText && (
              <CIMCard text={msg.cimText} emailSent={msg.emailSent ?? false} />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Left panel ────────────────────────────────────────────────────────────────

function LeftPanel({ stage, done }: { stage: number; done: boolean }) {
  return (
    <div className="hidden lg:flex flex-col w-[38%] flex-shrink-0 h-screen sticky top-0 px-12 py-10 border-r border-[#1a1610]"
      style={{ background: "linear-gradient(180deg, #0e0c0a 0%, #141210 100%)" }}>

      <Link href="/" className="inline-flex items-center gap-1 mb-12">
        <svg viewBox="0 0 80 28" className="h-7 w-auto" aria-label="UCC Mortgage">
          <text x="0" y="22" style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 600, fontSize: 28 }}>
            <tspan fill="#2e5f92">U</tspan>
            <tspan fill="#006f7f">C</tspan>
            <tspan fill="#27aae1">C</tspan>
          </text>
        </svg>
      </Link>

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-foreground leading-snug mb-3">
          Let&apos;s find the right mortgage for you.
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Alex will guide you through a quick conversation. Takes about 3&ndash;5 minutes.
        </p>
      </div>

      <div className="flex-1 space-y-1">
        {STAGES.map((s) => {
          const isActive   = stage === s.n && !done;
          const isComplete = done || stage > s.n;
          return (
            <div key={s.n} className={`flex items-start gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
              isActive ? "bg-[#006f7f]/12 border border-[#006f7f]/20" : ""
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-semibold border-2 transition-all ${
                isComplete
                  ? "bg-[#006f7f] border-[#006f7f] text-[#141210]"
                  : isActive
                  ? "border-[#006f7f] text-[#27aae1] bg-[#006f7f]/10"
                  : "border-[#2a2420] text-muted-foreground/50"
              }`}>
                {isComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.n}
              </div>
              <div>
                <div className={`text-sm font-semibold transition-colors ${
                  isActive ? "text-foreground" : isComplete ? "text-foreground/70" : "text-muted-foreground/40"
                }`}>
                  {s.label}
                </div>
                {isActive && (
                  <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-[#1a1610] space-y-3">
        {[
          { Icon: Building2, text: "50+ years serving Windsor-Essex" },
          { Icon: Shield,    text: "No hard credit pull at this stage" },
          { Icon: Clock,     text: "Response within 1 business day" },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <Icon className="w-3.5 h-3.5 text-[#006f7f]/60 flex-shrink-0" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  const [messages, setMessages] = useState<Message[]>([OPENING]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [stage, setStage]       = useState(1);
  const [done, setDone]         = useState(false);
  const messagesEndRef           = useRef<HTMLDivElement>(null);
  const inputRef                 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = useCallback(async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg: Message   = { id: `u-${Date.now()}`, role: "user",      content: userText };
    const typingMsg: Message = { id: "typing",           role: "assistant", content: "", isTyping: true };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setLoading(true);

    const history = [...messages, userMsg]
      .filter((m) => !m.isTyping)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat-apply", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: history, collectedData: {} }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");

      if (typeof data.stage === "number") setStage(data.stage);
      if (data.cimGenerated) { setDone(true); setStage(4); }

      const assistantMsg: Message = {
        id:        `a-${Date.now()}`,
        role:      "assistant",
        content:   data.message,
        cimText:   data.cimText   ?? undefined,
        emailSent: data.emailSent ?? false,
      };

      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), assistantMsg]);
    } catch (err) {
      const errMsg: Message = {
        id:      `err-${Date.now()}`,
        role:    "assistant",
        content: "Sorry, I ran into a technical issue. Please try again or call us at (519) 252-1110.",
      };
      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), errMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex min-h-screen bg-[#141210]">
      <LeftPanel stage={stage} done={done} />

      <div className="flex flex-col flex-1 min-w-0 h-screen">

        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-[#1a1610] bg-[#0e0c0a]">
          <Link href="/">
            <svg viewBox="0 0 80 28" className="h-6 w-auto" aria-label="UCC Mortgage">
              <text x="0" y="22" style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 600, fontSize: 28 }}>
                <tspan fill="#2e5f92">U</tspan>
                <tspan fill="#006f7f">C</tspan>
                <tspan fill="#006f7f">C</tspan>
              </text>
            </svg>
          </Link>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#006f7f]/20 border border-[#006f7f]/20 text-[#27aae1]">
            Stage {stage} of 4
          </span>
        </div>

        {/* Desktop chat header */}
        <div className="hidden lg:flex items-center gap-3 px-8 py-5 border-b border-[#1a1610]"
          style={{ background: "linear-gradient(135deg, #242018 0%, #141210 100%)" }}>
          <div className="w-10 h-10 rounded-full bg-[#006f7f] flex items-center justify-center font-bold text-white flex-shrink-0">
            A
          </div>
          <div>
            <div className="font-semibold text-foreground leading-tight">Alex</div>
            <div className="text-xs text-muted-foreground leading-tight">UCC Mortgage Advisor &middot; Online</div>
          </div>
          <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
          <div className="ml-auto text-xs text-muted-foreground/60">
            Need help now?{" "}
            <Link href="tel:5192521110" className="text-[#27aae1] hover:underline">(519) 252-1110</Link>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 lg:px-8 py-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => <Bubble key={msg.id} msg={msg} />)}
          </AnimatePresence>

          {/* Quick starters — only shown on first message */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-1 ml-10">
              {[
                "I need a private mortgage",
                "I want to buy a commercial property",
                "I\u2019m looking to refinance",
                "I want to invest in mortgages",
              ].map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs px-3.5 py-2 rounded-full border border-[#006f7f]/30 text-[#27aae1] hover:bg-[#006f7f]/10 transition-colors">
                  {s}
                </button>
              ))}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input bar */}
        <div className="px-5 lg:px-8 py-4 border-t border-[#1a1610] bg-[#0e0c0a]">
          <div className="flex items-center gap-3 max-w-3xl">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={done ? "Your file has been submitted." : "Type a message\u2026"}
              disabled={loading || done}
              className="flex-1 px-4 py-3 rounded-xl bg-[#1c1916] border border-[#2a2420] text-foreground text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-[#006f7f]/50 transition-colors disabled:opacity-50"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading || done}
              className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#006f7f] text-[#141210] flex items-center justify-center transition-all hover:shadow-[0_0_16px_rgba(0,111,127,0.4)] disabled:opacity-40 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-2 max-w-3xl">
            Powered by UCC AI &middot; No hard credit check &middot; Not a commitment to lend
          </p>
        </div>
      </div>
    </div>
  );
}
