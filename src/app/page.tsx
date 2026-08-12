import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { AdmissionCtaSection } from "@/components/AdmissionCtaSection";
import { EligibilityCriteriaSection } from "@/components/EligibilityCriteriaSection";
import { FacilitiesSection } from "@/components/FacilitiesSection";
import { DownloadProspectusSection } from "@/components/DownloadProspectusSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ChairmansDeskSection } from "@/components/ChairmansDeskSection";
import { FaqSection } from "@/components/FaqSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteShell } from "@/components/SiteShell";

export default function Home() {
  return (
    <SiteShell>
      {/* 1. Hero Section Slideshow */}
      <HeroSection />

      {/* 2. Welcome Section */}
      <ScrollReveal direction="up">
        <WelcomeSection />
      </ScrollReveal>

      {/* 3. BNYS Admission Open CTA */}
      <ScrollReveal direction="scale">
        <AdmissionCtaSection />
      </ScrollReveal>

      {/* 4. Eligibility Criteria Section */}
      <ScrollReveal direction="left">
        <EligibilityCriteriaSection />
      </ScrollReveal>

      {/* 5. Facilities Section */}
      <ScrollReveal direction="up">
        <FacilitiesSection />
      </ScrollReveal>

      {/* 6. Download Prospectus CTA */}
      <ScrollReveal direction="right">
        <DownloadProspectusSection />
      </ScrollReveal>

      {/* 7. Testimonials Section */}
      <ScrollReveal direction="up">
        <TestimonialsSection />
      </ScrollReveal>

      {/* 8. From The Chairman's Desk */}
      <ScrollReveal direction="scale">
        <ChairmansDeskSection />
      </ScrollReveal>

      {/* 9. FAQs Section */}
      <ScrollReveal direction="up">
        <FaqSection />
      </ScrollReveal>

    </SiteShell>
  );
}
