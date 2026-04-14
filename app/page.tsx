import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { RateTicker } from "@/components/rate-ticker";
import { StatsSection } from "@/components/stats-section";
import { ServicesSection } from "@/components/services-section";
import { RecentDeals } from "@/components/recent-deals";
import { ToolsPreview } from "@/components/tools-preview";
import { InvestSection } from "@/components/invest-section";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#141210]">
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <RateTicker />
        <StatsSection />
        <ServicesSection />
        <RecentDeals />
        <ToolsPreview />
        <InvestSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
