
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { LogosSection } from "@/components/sections/LogosSection";
import { WorkingSection } from "@/components/sections/WorkingSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import "./globals.css";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <Testimonials />
      <CTASection />
      <PricingSection />
      <WorkingSection />

      {/* Optional Call to Action Section */}
      <LogosSection />
      <ContactSection />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </>
  );
}
