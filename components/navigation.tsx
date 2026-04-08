"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export function AnnouncementBanner() {
  return (
    <div className="h-9 bg-[#0d1e2a] flex items-center justify-center border-l-2 border-[#006f7f]">
      <p className="text-xs text-foreground/70">
        Windsor&apos;s only licensed mortgage administrator since 2008
        <span className="text-[#27aae1] ml-1">→</span>
      </p>
    </div>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Services");

  const navLinks = ["Services", "About", "Rates", "Resources", "Contact"];

  return (
    <>
      <AnnouncementBanner />
      <nav 
        className="sticky top-0 z-50 h-[72px] border-b border-[#27aae1]/15"
        style={{
          background: "rgba(14, 18, 20, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <svg viewBox="0 0 80 28" className="h-7 w-auto" aria-label="UCC Mortgage">
              <text x="0" y="22" className="font-semibold text-2xl" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <tspan fill="#2e5f92">U</tspan>
                <tspan fill="#006f7f">C</tspan>
                <tspan fill="#27aae1">C</tspan>
              </text>
            </svg>
            <span className="text-foreground/80 text-sm font-medium tracking-tight ml-1 hidden sm:inline">
              Mortgage
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveLink(item)}
                className="group relative text-[14px] font-semibold text-foreground/70 hover:text-foreground transition-colors py-1"
              >
                {item}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#27aae1] transition-transform origin-left ${activeLink === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#book"
              className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Book a call
            </Link>
            <Link
              href="#apply"
              className="group inline-flex items-center gap-1.5 px-5 py-2 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.3)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden absolute top-[72px] left-0 right-0 border-b border-[#27aae1]/15 py-4 px-8"
            style={{
              background: "rgba(14, 18, 20, 0.95)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#1a1f22] flex flex-col gap-3">
                <Link
                  href="#book"
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                >
                  Book a call
                </Link>
                <Link
                  href="#apply"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full"
                >
                  Apply now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
