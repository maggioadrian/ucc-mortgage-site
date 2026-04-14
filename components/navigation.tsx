"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ArrowRight, ChevronDown,
  Building2, Landmark, Home, TrendingUp, Calendar, Handshake,
} from "lucide-react";

const borrowersLinks = [
  { label: "Commercial Financing", href: "/solutions/commercial",        icon: Building2, description: "Multi-unit, retail, industrial" },
  { label: "Private Mortgages",    href: "/solutions/private#borrowers", icon: Landmark,  description: "Fast approvals, any credit"    },
  { label: "Residential",          href: "/solutions/residential",       icon: Home,      description: "Purchase, renewal, refinance"  },
  { label: "All Solutions",        href: "/borrowers",                   icon: ArrowRight,description: "View all mortgage products"    },
];

const investorsLinks = [
  { label: "Private Mortgage Investing", href: "/investors",           icon: TrendingUp, description: "8–12% secured annual returns"   },
  { label: "Investment Process",         href: "/investors#process",   icon: ArrowRight, description: "How your money is deployed"      },
  { label: "Book Investor Call",         href: "/contact",             icon: Calendar,   description: "Talk to our investment team"     },
];

const mainLinks = [
  { label: "Borrowers", href: "/borrowers", dropdown: "borrowers" as const },
  { label: "Investors", href: "/investors", dropdown: "investors" as const },
  { label: "Partners",  href: "/partners"  },
  { label: "Tools",     href: "/tools"     },
  { label: "About",     href: "/about"     },
  { label: "Contact",   href: "/contact"   },
];

export function AnnouncementBanner() {
  return (
    <div className="h-9 bg-[#0e0c0a] flex items-center justify-center border-l-2 border-[#006f7f]">
      <p className="text-xs text-foreground/70">
        Windsor&apos;s only licensed mortgage administrator since 2008
        <span className="text-[#27aae1] ml-1">→</span>
      </p>
    </div>
  );
}

export function Navigation() {
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [mobileExpanded, setMobileExpanded]   = useState<string | null>(null);
  const [openDropdown, setOpenDropdown]       = useState<"borrowers" | "investors" | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname   = usePathname();

  const handleEnter = (name: "borrowers" | "investors") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };
  const keepOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const isActive = (href: string) =>
    href === "/borrowers"
      ? pathname === "/borrowers" || pathname.startsWith("/solutions")
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <AnnouncementBanner />
      <nav
        className="sticky top-0 z-50 h-[72px] border-b border-[#006f7f]/20"
        style={{
          background: "rgba(20,18,16,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="h-full max-w-7xl mx-auto px-8 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            <svg viewBox="0 0 80 28" className="h-7 w-auto" aria-label="UCC Mortgage">
              <text x="0" y="22" style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 600, fontSize: 28 }}>
                <tspan fill="#2e5f92">U</tspan>
                <tspan fill="#006f7f">C</tspan>
                <tspan fill="#006f7f">C</tspan>
              </text>
            </svg>
            <span className="text-foreground/80 text-sm font-medium tracking-tight ml-1 hidden sm:inline">
              Mortgage
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            {mainLinks.map((item) => {
              const hasDropdown = !!item.dropdown;
              const dropLinks = item.dropdown === "borrowers" ? borrowersLinks : investorsLinks;
              const active    = isActive(item.href);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={hasDropdown ? () => handleEnter(item.dropdown!) : undefined}
                  onMouseLeave={hasDropdown ? handleLeave : undefined}
                >
                  <Link
                    href={item.href}
                    className={`group relative inline-flex items-center gap-1 text-[13px] font-semibold transition-colors py-1 ${
                      active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {hasDropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.dropdown ? "rotate-180" : ""}`} />
                    )}
                    <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#006f7f] transition-transform origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>

                  {hasDropdown && openDropdown === item.dropdown && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-[#006f7f]/20 shadow-2xl overflow-hidden"
                      style={{ background: "rgba(20,18,16,0.97)", backdropFilter: "blur(20px)" }}
                      onMouseEnter={keepOpen}
                      onMouseLeave={handleLeave}
                    >
                      <div className="p-2">
                        {dropLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#006f7f]/6 transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              <div className="p-2 rounded-lg bg-[#006f7f]/10 flex-shrink-0 group-hover:bg-[#006f7f]/18 transition-colors">
                                <Icon className="w-3.5 h-3.5 text-[#006f7f]" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-foreground group-hover:text-[#27aae1] transition-colors leading-tight">
                                  {link.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">{link.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/apply"
              className="text-sm font-semibold text-[#006f7f] hover:text-[#006f7f] border border-[#006f7f]/50 hover:border-[#006f7f]/70 px-4 py-2 rounded-full transition-all whitespace-nowrap"
            >
              Apply now →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#006f7f] text-[#f5f0e8] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(0,111,127,0.3)] whitespace-nowrap"
            >
              Book a call
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden absolute top-[72px] left-0 right-0 border-b border-[#006f7f]/20 py-4 px-8 max-h-[80vh] overflow-y-auto"
            style={{ background: "rgba(20,18,16,0.97)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex flex-col gap-1">
              {/* Borrowers accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "borrowers" ? null : "borrowers")}
                  className="w-full flex items-center justify-between text-sm font-semibold text-foreground/70 hover:text-foreground py-3"
                >
                  Borrowers
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "borrowers" ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === "borrowers" && (
                  <div className="pl-4 space-y-1 mb-2">
                    {borrowersLinks.map((l) => (
                      <Link key={l.href} href={l.href}
                        className="block text-sm text-muted-foreground hover:text-[#27aae1] transition-colors py-2"
                        onClick={() => setMobileOpen(false)}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Investors accordion */}
              <div>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "investors" ? null : "investors")}
                  className="w-full flex items-center justify-between text-sm font-semibold text-foreground/70 hover:text-foreground py-3"
                >
                  Investors
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === "investors" ? "rotate-180" : ""}`} />
                </button>
                {mobileExpanded === "investors" && (
                  <div className="pl-4 space-y-1 mb-2">
                    {investorsLinks.map((l) => (
                      <Link key={l.href} href={l.href}
                        className="block text-sm text-muted-foreground hover:text-[#27aae1] transition-colors py-2"
                        onClick={() => setMobileOpen(false)}>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Flat links */}
              {mainLinks.filter(l => !l.dropdown).map((item) => (
                <Link key={item.label} href={item.href}
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors py-3"
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-[#1a1610] flex flex-col gap-3">
                <Link href="/apply"
                  className="text-sm font-semibold text-[#27aae1] transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  Apply now →
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#006f7f] text-[#f5f0e8] text-sm font-semibold rounded-full"
                  onClick={() => setMobileOpen(false)}>
                  Book a call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
