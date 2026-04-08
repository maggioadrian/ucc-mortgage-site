"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Home, Building2, Landmark, PiggyBank, RefreshCw, CreditCard } from "lucide-react";

const solutionsLinks = [
  { label: "Residential Mortgages", href: "/solutions/residential", icon: Home, description: "Purchase, renewal, refinancing" },
  { label: "Commercial Mortgages", href: "/solutions/commercial", icon: Building2, description: "Multi-unit, retail, industrial" },
  { label: "Private Mortgages", href: "/solutions/private", icon: Landmark, description: "Alternative lending, fast approvals" },
  { label: "Debt Consolidation", href: "/solutions/debt-consolidation", icon: PiggyBank, description: "One payment, lower interest" },
  { label: "Refinancing", href: "/solutions/refinancing", icon: RefreshCw, description: "Access equity, lower your rate" },
  { label: "Loans & Credit Lines", href: "/solutions/loans", icon: CreditCard, description: "HELOC and home equity access" },
];

const mainLinks = [
  { label: "Solutions", href: "#", hasDropdown: true },
  { label: "Rates", href: "/rates" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDesktopDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdownOpen(false), 120);
  };

  const isActive = (href: string) => {
    if (href === "#") return pathname.startsWith("/solutions");
    return pathname === href;
  };

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
              <text x="0" y="22" className="font-semibold text-2xl" style={{ fontFamily: "Open Sans, sans-serif" }}>
                <tspan fill="#2e5f92">U</tspan>
                <tspan fill="#006f7f">C</tspan>
                <tspan fill="#27aae1">C</tspan>
              </text>
            </svg>
            <span className="text-foreground/80 text-sm font-medium tracking-tight ml-1 hidden sm:inline">
              Mortgage
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {mainLinks.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`group relative inline-flex items-center gap-1 text-[14px] font-semibold transition-colors py-1 ${
                      isActive(item.href) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#27aae1] transition-transform origin-left ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  {desktopDropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] rounded-2xl border border-[#27aae1]/15 shadow-2xl overflow-hidden"
                      style={{
                        background: "rgba(14,18,20,0.97)",
                        backdropFilter: "blur(20px)",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-3 grid grid-cols-2 gap-1">
                        {solutionsLinks.map((sol) => {
                          const Icon = sol.icon;
                          return (
                            <Link
                              key={sol.href}
                              href={sol.href}
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#27aae1]/6 transition-colors"
                              onClick={() => setDesktopDropdownOpen(false)}
                            >
                              <div className="p-2 rounded-lg bg-[#27aae1]/10 flex-shrink-0 group-hover:bg-[#27aae1]/18 transition-colors">
                                <Icon className="w-4 h-4 text-[#27aae1]" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-foreground group-hover:text-[#27aae1] transition-colors">
                                  {sol.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">{sol.description}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="border-t border-[#1a1f22] px-4 py-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Not sure which product? We&apos;ll help.</span>
                        <Link
                          href="/contact"
                          className="text-xs font-semibold text-[#27aae1] hover:underline"
                          onClick={() => setDesktopDropdownOpen(false)}
                        >
                          Book a call →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative text-[14px] font-semibold transition-colors py-1 ${
                    isActive(item.href) ? "text-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#27aae1] transition-transform origin-left ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/contact"
              className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
            >
              Book a call
            </Link>
            <Link
              href="/apply"
              className="group inline-flex items-center gap-1.5 px-5 py-2 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full transition-all hover:shadow-[0_0_20px_rgba(39,170,225,0.3)]"
            >
              Apply now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Toggle */}
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
            className="md:hidden absolute top-[72px] left-0 right-0 border-b border-[#27aae1]/15 py-4 px-8 max-h-[80vh] overflow-y-auto"
            style={{
              background: "rgba(14, 18, 20, 0.97)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col gap-1">
              {/* Solutions accordion */}
              <div>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors py-3"
                >
                  Solutions
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileDropdownOpen && (
                  <div className="pl-4 space-y-1 mb-2">
                    {solutionsLinks.map((sol) => (
                      <Link
                        key={sol.href}
                        href={sol.href}
                        className="block text-sm text-muted-foreground hover:text-[#27aae1] transition-colors py-2"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDropdownOpen(false);
                        }}
                      >
                        {sol.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {mainLinks.slice(1).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-[#1a1f22] flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book a call
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#27aae1] text-[#0e1214] text-sm font-semibold rounded-full"
                  onClick={() => setMobileMenuOpen(false)}
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
