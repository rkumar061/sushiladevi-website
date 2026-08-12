"use me";
"use client";

import React from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/SiteContentProvider";

export const WelcomeSection: React.FC = () => {
  const siteData = useSiteContent();
  const { greenHeading, subHeading, description, features } = siteData.pages.home.welcomeSection;

  return (
    <section id="welcome" className="w-full bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Left-Aligned Header Content matching 2_welcome_section.png */}
        <div className="text-left space-y-2 max-w-4xl">
          {/* Green Section Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#007A3D] uppercase tracking-wide">
            {greenHeading}
          </h2>

          {/* Subheading */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 uppercase tracking-tight">
            {subHeading}
          </h3>

          {/* Paragraph Description */}
          <p className="pt-2 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* 4 Circular Feature Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 justify-items-center">
          {features.map((item, index) => (
            <div
              key={item.id}
              className="micro-float flex flex-col items-center group cursor-pointer"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              {/* Circle Image Wrapper */}
              <div className="micro-card relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden shadow-md border-2 border-gray-100 group-hover:border-[#007A3D] transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 128px, 176px"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Title below circle */}
              <h4 className="mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-800 text-center leading-snug group-hover:text-[#007A3D] transition-colors max-w-[160px]">
                {item.title.includes("&") ? (
                  <>
                    {item.title.split("&")[0]} <br /> & {item.title.split("&")[1]}
                  </>
                ) : item.title.includes(" ") ? (
                  <>
                    {item.title.split(" ")[0]} <br /> {item.title.split(" ").slice(1).join(" ")}
                  </>
                ) : (
                  item.title
                )}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
