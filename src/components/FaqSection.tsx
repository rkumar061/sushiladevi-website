"use me";
"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ChevronDown } from "lucide-react";

export const FaqSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, items } = siteData.pages.home.faqsSection;
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="w-full bg-[#C4C4C4] py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-wide mb-8 sm:mb-12">
          {heading}
        </h2>

        {/* 2-Column Accordion Grid matching 10_FAQ.png */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="micro-card bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200/80 transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-center space-x-3.5 pr-2">
                    {/* Number Badge matching black box style */}
                    <div className="micro-breathe flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-black text-white font-black text-sm flex items-center justify-center">
                      {item.id}
                    </div>

                    {/* Question Text */}
                    <span className="text-xs sm:text-sm md:text-base font-extrabold text-gray-900 uppercase tracking-tight leading-snug">
                      {item.question}
                    </span>
                  </div>

                  {/* Arrow Chevron */}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-800 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    <p className="pt-2">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
