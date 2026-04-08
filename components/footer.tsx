import Link from "next/link";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Residential",       href: "/solutions/residential" },
      { label: "Commercial",        href: "/solutions/commercial" },
      { label: "Private Mortgages", href: "/solutions/private" },
      { label: "Debt Consolidation",href: "/solutions/debt-consolidation" },
      { label: "Refinancing",       href: "/solutions/refinancing" },
      { label: "Loans & Credit Lines", href: "/solutions/loans" },
      { label: "Farm & Agriculture",href: "/solutions/farm-agriculture" },
      { label: "Vacant Land",       href: "/solutions/vacant-land" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us",  href: "/about" },
      { label: "Invest",    href: "/invest" },
      { label: "Rates",     href: "/rates" },
      { label: "Contact",   href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resources & FAQ", href: "/resources" },
      { label: "Apply Online",    href: "/apply" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-[#006f7f] bg-[#0a0d0e] shadow-[0_-4px_20px_rgba(0,111,127,0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1">
              <svg viewBox="0 0 80 28" className="h-7 w-auto" aria-label="UCC Mortgage">
                <text x="0" y="22" style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 600, fontSize: 28 }}>
                  <tspan fill="#2e5f92">U</tspan>
                  <tspan fill="#006f7f">C</tspan>
                  <tspan fill="#27aae1">C</tspan>
                </text>
              </svg>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">Est. 1974</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Windsor&apos;s trusted mortgage broker for over 50 years.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70 leading-relaxed">
              3200 Deziel Drive, Suite 508<br />
              Windsor, ON N8W 5K8
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-[#27aae1] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#1a1f22] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UCC Mortgage Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#27aae1] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-[#27aae1] transition-colors">Terms of Service</Link>
            <span className="text-xs text-muted-foreground">Brokerage #10675 | Administrator #11657</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
