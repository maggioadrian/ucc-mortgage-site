"use client";

const rates = [
  { label: "5yr Fixed", rate: "4.49%" },
  { label: "3yr Fixed", rate: "4.89%" },
  { label: "Variable", rate: "5.10%" },
  { label: "HELOC", rate: "6.45%" },
  { label: "Private", rate: "7.99%" },
];

export function RateTicker() {
  return (
    <div className="h-10 bg-[#111618] flex items-center overflow-hidden border-b border-[#1a1f22]">
      <div className="flex items-center gap-3 px-6 shrink-0 border-r border-[#1a1f22]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006f7f] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006f7f]"></span>
        </span>
        <span className="text-xs font-semibold tracking-wider text-muted-foreground">
          LIVE RATES
        </span>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex animate-marquee">
          {[...rates, ...rates, ...rates].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-8 shrink-0">
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-[#27aae1]">{item.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
