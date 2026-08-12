"use me";
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "@/components/SiteContentProvider";

export const FacilitiesSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, items, readMoreLink } = siteData.pages.home.facilitiesSection;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle expanded facility card when not hovered
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, items.length]);

  return (
    <section id="facilities" className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Solid Green Box Container matching reference */}
        <div className="bg-[#008E46] rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Header Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide">
              {heading}
            </h2>
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-emerald-100 bg-emerald-800/40 px-3 py-1 rounded-full border border-emerald-400/30">
              {items.length} {siteData.pages.home.facilitiesSection.countLabel}
            </span>
          </div>

          {/* Interactive Expanding Facility Cards Flex Layout */}
          <div
            className="mt-8 sm:mt-10 flex flex-col md:flex-row gap-4 sm:gap-5 min-h-[420px] md:min-h-[460px] transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {items.map((facility, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={facility.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`micro-card relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-500 ease-in-out group ${
                    isActive
                      ? "md:flex-[3.5] flex-1 border-white shadow-2xl z-10"
                      : "md:flex-1 flex-1 border-white/20 opacity-85 hover:opacity-100 hover:border-white/60"
                  }`}
                  style={{ minHeight: "360px" }}
                >
                  {/* Card Background Image */}
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Shadow Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/85 via-black/30 to-black/10"
                        : "bg-gradient-to-t from-black/80 via-black/40 to-black/30 group-hover:from-black/75"
                    }`}
                  />

                  {/* Top Facility Title Header */}
                  <div className="absolute top-4 left-4 right-4 z-20 text-center md:text-left">
                    <h3 className={`font-black uppercase tracking-wider text-white transition-all duration-300 ${
                      isActive ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                    }`}>
                      {facility.title}
                    </h3>
                  </div>

                  {/* Bottom Expanded Info Content */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col justify-end">
                    {isActive ? (
                      <div className="space-y-2 animate-fadeIn">
                        {facility.description && (
                          <p className="text-xs sm:text-sm text-emerald-100 font-medium line-clamp-2 leading-relaxed bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                            {facility.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wide pt-1">
                          <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                          <span>{siteData.shared.labels.activeFacilityPreview}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center md:text-left">
                        <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-emerald-200 opacity-80 group-hover:opacity-100">
                          {siteData.shared.labels.hoverToView}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Right Read More Link */}
          <div className="mt-8 text-right">
            <Link
              href={readMoreLink}
              className="inline-block text-base sm:text-lg font-bold text-white underline underline-offset-4 hover:text-emerald-100 transition-colors"
            >
              {siteData.pages.home.facilitiesSection.readMoreLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
