"use me";
"use client";

import React from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { GraduationCap, Award, Languages, UserCheck, CheckCircle2, ShieldCheck } from "lucide-react";

export const EligibilityCriteriaSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, items } = siteData.pages.home.eligibilityCriteria;

  // Icon mapping for criteria items
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <GraduationCap className="w-6 h-6 text-[#008E46]" />;
      case 1:
        return <Award className="w-6 h-6 text-[#008E46]" />;
      case 2:
        return <Languages className="w-6 h-6 text-[#008E46]" />;
      case 3:
        return <UserCheck className="w-6 h-6 text-[#008E46]" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-[#008E46]" />;
    }
  };

  return (
    <section id="eligibility" className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-6xl mx-auto text-left">
        {/* Header Title with Emerald Accent Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-gray-200 pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#008E46]" />
              <span>{siteData.shared.labels.bnysCourseAdmissions}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-wide">
              {heading}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-md leading-relaxed">
            {siteData.shared.labels.eligibilityIntroduction}
          </p>
        </div>

        {/* Redesigned 2x2 Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {items.map((item: string, index: number) => {
            // Split title and description if colon exists
            const parts = item.split(":");
            const hasColon = parts.length > 1;
            const categoryTitle = hasColon ? parts[0].trim() : `CRITERION 0${index + 1}`;
            const categoryDescription = hasColon ? parts.slice(1).join(":").trim() : item;

            return (
              <div
                key={index}
                className="micro-card relative bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 group overflow-hidden"
              >
                {/* Left Emerald Glowing Stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#008E46] rounded-l-2xl group-hover:w-2 transition-all duration-300" />

                <div className="flex items-start space-x-4 pl-2">
                  {/* Icon Container Badge */}
                  <div className="micro-icon-turn w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#008E46] group-hover:text-white transition-all duration-300">
                    <span className="group-hover:hidden">{getIcon(index)}</span>
                    <CheckCircle2 className="w-6 h-6 text-white hidden group-hover:block" />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-800">
                        {categoryTitle}
                      </h3>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full">
                        REQ 0{index + 1}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-800 font-semibold leading-relaxed uppercase">
                      {categoryDescription}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
