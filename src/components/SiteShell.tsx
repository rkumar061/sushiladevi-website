import React from "react";
import { Header } from "@/components/Header";
import { AdmissionBannerSection } from "@/components/AdmissionBannerSection";
import { FooterSection } from "@/components/FooterSection";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export const SiteShell: React.FC<{ children: React.ReactNode; showBottomCta?: boolean }> = ({
  children,
  showBottomCta = true,
}) => (
  <main className="flex min-h-screen flex-col overflow-x-clip bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
    <Header />
    {children}
    {showBottomCta && <AdmissionBannerSection />}
    <FooterSection />
    <WhatsAppWidget />
  </main>
);
