"use me";
"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, items } = siteData.pages.home.testimonialsSection;
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % items.length);
  };

  // Visible items carousel logic (showing 3 on desktop, 1-2 on smaller screens)
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(items[(startIndex + i) % items.length]);
    }
    return visible;
  };

  return (
    <section className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-[#007A3D] uppercase tracking-wide mb-10">
          {heading}
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {getVisibleItems().map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="micro-card group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:shadow-2xl flex flex-col justify-between min-h-[300px]"
              >
                <div>
                  <Quote className="micro-icon-turn w-8 h-8 text-emerald-200 mb-3" />
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {item.quote}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-base font-bold text-gray-900">
                    {item.author}
                  </h4>
                  {item.designation && (
                    <p className="text-xs text-emerald-700">{item.designation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls on Bottom Left matching reference */}
          <div className="mt-8 flex items-center space-x-4">
            <button
              onClick={prevSlide}
              className="micro-control w-12 h-12 rounded-full bg-[#008E46] hover:bg-[#007a3d] text-white flex items-center justify-center shadow-lg focus:outline-none"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>
            <button
              onClick={nextSlide}
              className="micro-control w-12 h-12 rounded-full bg-[#008E46] hover:bg-[#007a3d] text-white flex items-center justify-center shadow-lg focus:outline-none"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
