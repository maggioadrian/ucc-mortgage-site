"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { X, Send, MessageCircle, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  isTyping?: boolean;
}

const OPENING_MESSAGE: Message = {
  id: "open-0",
  role: "assistant",
  content:
    "Hi there! I'm Alex, UCC's mortgage advisor. I'm here to help you explore private mortgage options. Whether you're looking to borrow against your property or just have questions, I'm happy to help. What brings you in today?",
};

// ── Download CIM helper ───────────────────────────────────────────────────────

function downloadCIM(text: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `UCC-Private-Mortgage-CIM-${Date.now()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── CIM Preview card ──────────────────────────────────────────────────────────

function CIMCard({ text, emailSent }: { text: string; emailSent: boolean }) {
  return (
    <div className="mt-2 rounded-xl border border-[#27aae1]/20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(0,111,127,0.10) 0%, #161c1f 100%)" }}>
      <div className="px-4 py-3 border-b border-[#27aae1]/15 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#27aae1] uppercase tracking-wider">
          {emailSent ? "CIM sent to UCC team" : "Your Mortgage Summary"}
        </span>
        <button
          onClick={() => downloadCIM(text)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#27aae1] transition-colors">
          <Download className="w-3 h-3" /> Download
        </button>
      </div>
      <pre className="px-4 py-3 text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-48 overflow-y-auto">
        {text}
      </pre>
    </div>
  );
}

// ── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#27aae1]/60 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }} />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function Bubble({
  msg,
  cimText,
  emailSent,
}: {
  msg: Message;
  cimText?: string | null;
  emailSent?: boolean;
}) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#006f7f] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5 mr-2">
          A
        </div>
      )}
      <div className={`max-w-[78%] ${isUser ? "" : "flex-1"}`}>
        {msg.isTyping ? (
          <div className="rounded-2xl rounded-tl-sm bg-[#161c1f] border border-[#2a3033]">
            <TypingDots />
          </div>
        ) : (
          <>
            <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "rounded-tr-sm bg-[#27aae1] text-[#0e1214] font-medium"
                : "rounded-tl-sm bg-[#161c1f] border border-[#2a3033] text-foreground"
            }`}>
              {msg.content}
            </div>
            {!isUser && cimText && (
              <CIMCard text={cimText} emailSent={emailSent ?? false} />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────

export function AIChatWidget() {
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);

  // Allow other components to open the widget via custom event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("ucc:open-chat", handler);
    return () => window.removeEventListener("ucc:open-chat", handler);
  }, []);
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [cimText, setCimText]   = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // Suppress on pages that have their own full-screen chat
  if (pathname === "/apply" || pathname === "/solutions/private/submit-deal") return null;

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = useCallback(async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: userText };
    const typingMsg: Message = { id: "typing", role: "assistant", content: "", isTyping: true };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setLoading(true);

    // Build history for API (exclude typing indicator + opening message id)
    const history = [...messages, userMsg]
      .filter((m) => !m.isTyping)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, collectedData: {} }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Request failed");

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: data.message,
      };

      if (data.cimGenerated && data.cimText) {
        setCimText(data.cimText);
        setEmailSent(data.emailSent ?? false);
      }

      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), assistantMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Sorry, something went wrong on my end. Please try again or call us at (519) 252-1110.",
      };
      setMessages((prev) => [...prev.filter((m) => m.id !== "typing"), errMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#27aae1] text-[#0e1214] font-semibold text-sm shadow-[0_4px_24px_rgba(39,170,225,0.45)] hover:shadow-[0_4px_32px_rgba(39,170,225,0.65)] transition-shadow">
            <MessageCircle className="w-4 h-4" />
            Chat with Alex
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setOpen(false)} />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed z-50 flex flex-col
                bottom-0 left-0 right-0 h-[100dvh]
                md:bottom-6 md:right-6 md:left-auto md:w-[400px] md:h-[600px] md:rounded-2xl
                bg-[#0e1214] border border-[#2a3033] shadow-[0_8px_48px_rgba(0,0,0,0.6)]
                overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#1a1f22]"
                style={{ background: "linear-gradient(135deg, #161c1f 0%, #0e1214 100%)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#006f7f] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground leading-tight">Alex</div>
                    <div className="text-xs text-muted-foreground leading-tight">UCC Mortgage Advisor</div>
                  </div>
                  <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" title="Online" />
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2a3033] transition-colors text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
                {messages.map((msg, i) => (
                  <Bubble
                    key={msg.id}
                    msg={msg}
                    cimText={
                      !msg.isTyping && msg.role === "assistant" && i === messages.length - 1 && cimText
                        ? cimText
                        : null
                    }
                    emailSent={emailSent}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick starters (only when just the opening message is shown) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {[
                    "I need a private mortgage",
                    "What are your rates?",
                    "I want to invest in mortgages",
                  ].map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#27aae1]/30 text-[#27aae1] hover:bg-[#27aae1]/10 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Scroll to bottom hint */}
              <ChevronDown className="hidden" />

              {/* Input bar */}
              <div className="px-4 py-3 border-t border-[#1a1f22] bg-[#0a0d0e]">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Type a message…"
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#111618] border border-[#2a3033] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-[#27aae1]/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || loading}
                    className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#27aae1] text-[#0e1214] flex items-center justify-center transition-all hover:shadow-[0_0_16px_rgba(39,170,225,0.4)] disabled:opacity-40 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground/40 mt-2">
                  Powered by UCC AI · Not a commitment to lend
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
