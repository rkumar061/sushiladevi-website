"use me";
"use client";

import React from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { openAdmissionDialog } from "@/lib/admissionDialog";

export const AdmissionCtaSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, subHeading, description, badgeText } = siteData.pages.home.ctaBanner;

  return (
    <section id="admission-cta" className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Compact Height Green Card Container with Right BG Graphics */}
        <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#008E46] via-[#007A3D] to-[#005229] text-white shadow-xl overflow-hidden border border-emerald-400/30 group">
          {/* Ambient Background Glow Highlights */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-300/25 blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-black/25 blur-3xl pointer-events-none" />
          
          {/* Rich Geometric Naturopathy & Yoga Emblem Graphics on the Right BG */}
          <div className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-56 sm:w-72 md:w-96 h-56 sm:h-72 md:h-96 opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              {/* Concentric Decorative Rings */}
              <circle cx="100" cy="100" r="90" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
              <circle cx="100" cy="100" r="75" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
              
              {/* Stylized Lotus & Leaf Petals Pattern */}
              <path d="M100 40 C115 65 140 75 160 100 C140 125 115 135 100 160 C85 135 60 125 40 100 C60 75 85 65 100 40 Z" fill="currentColor" fillOpacity="0.15" strokeWidth="1.5" />
              <path d="M40 100 C65 115 75 140 100 160 C125 140 135 115 160 100 C135 85 125 60 100 40 C75 60 65 85 40 100 Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1" />

              {/* Center Emblem Details */}
              <circle cx="100" cy="100" r="24" fill="#008E46" stroke="currentColor" strokeWidth="2" />
              <path d="M100 82 L100 118 M82 100 L118 100" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

              {/* Floating Sparkle Particles */}
              <circle cx="145" cy="55" r="3" fill="#fef08a" opacity="0.9" />
              <circle cx="55" cy="145" r="2.5" fill="#a7f3d0" opacity="0.8" />
              <circle cx="160" cy="140" r="4" fill="#ffffff" opacity="0.7" />
              <circle cx="45" cy="60" r="3" fill="#fef08a" opacity="0.8" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl text-left space-y-3">
            {/* Live Admission Status Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-300/30 text-emerald-200 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{siteData.shared.labels.officialAdmissionsDesk}</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight uppercase leading-snug text-white drop-shadow-md">
              {heading}
            </h2>

            {/* Subheading */}
            <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-emerald-100 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>{subHeading}</span>
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-emerald-50/95 max-w-xl leading-relaxed font-medium">
              {description}
            </p>

            {/* Action Pill Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={openAdmissionDialog}
                className="micro-sheen micro-card inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-white hover:bg-gray-50 text-gray-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-xl border border-white/80"
              >
                <span>{badgeText}</span>
                <div className="w-6 h-6 rounded-full bg-[#008E46] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
