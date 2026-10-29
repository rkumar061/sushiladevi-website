import React from "react";
import { HeroSection } from "@/components/HeroSection";
import { HospitalHomeSection } from "@/components/HospitalHomeSection";
import { HospitalTherapiesSection } from "@/components/HospitalTherapiesSection";
import { HospitalAccommodationSection } from "@/components/HospitalAccommodationSection";
import { HospitalDoctorsSection } from "@/components/HospitalDoctorsSection";
import { FacilitiesSection } from "@/components/FacilitiesSection";
import { AdmissionCtaSection } from "@/components/AdmissionCtaSection";
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

      {/* 2. Hospital Overview & OPD/IPD Highlight */}
      <ScrollReveal direction="up">
        <HospitalHomeSection />
      </ScrollReveal>

      {/* 3. Clinical Therapies & 60+ Treatments Explorer */}
      <ScrollReveal direction="up">
        <HospitalTherapiesSection />
      </ScrollReveal>

      {/* 4. In-Patient Accommodation Showcase (Cottages, Suites, Deluxe, Dormitories) */}
      <ScrollReveal direction="up">
        <HospitalAccommodationSection />
      </ScrollReveal>

      {/* 5. Medical Consultants & Doctors */}
      <ScrollReveal direction="up">
        <HospitalDoctorsSection />
      </ScrollReveal>

      {/* 6. Facilities Section (Clinical & Campus Infrastructure) */}
      <ScrollReveal direction="up">
        <FacilitiesSection />
      </ScrollReveal>

      {/* 7. Consultation & Admissions CTA Banner */}
      <ScrollReveal direction="scale">
        <AdmissionCtaSection />
      </ScrollReveal>

      {/* 8. From The Chairman's Desk */}
      <ScrollReveal direction="scale">
        <ChairmansDeskSection />
      </ScrollReveal>

      {/* 9. Patient & Student Testimonials Section */}
      <ScrollReveal direction="up">
        <TestimonialsSection />
      </ScrollReveal>

      {/* 10. FAQs Section (Hospital Care & Admissions) */}
      <ScrollReveal direction="up">
        <FaqSection />
      </ScrollReveal>
    </SiteShell>
  );
}


