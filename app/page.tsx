import { ScrollProgress } from "@/components/scroll-progress";
import { Navigation } from "@/components/navigation";
import { RateTicker } from "@/components/rate-ticker";
import { HeroSection } from "@/components/hero-section";
import { StatsSection } from "@/components/stats-section";
import { ServicesSection } from "@/components/services-section";
import { HowItWorks } from "@/components/how-it-works";
import { InvestSection } from "@/components/invest-section";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e1214]">
      <ScrollProgress />
      <Navigation />
      <RateTicker />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <HowItWorks />
        <InvestSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
