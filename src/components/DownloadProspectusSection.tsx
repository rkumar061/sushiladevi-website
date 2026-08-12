"use me";
"use client";

import React from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Download } from "lucide-react";

export const DownloadProspectusSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, description, buttonText, pdfUrl } = siteData.shared.downloadProspectus;

  return (
    <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#007A3D] uppercase tracking-wide">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-700 max-w-4xl leading-relaxed">
          {description}
        </p>

        {/* Download Button */}
        <div className="pt-4">
          <a
            href={pdfUrl}
            download
            className="micro-sheen micro-card inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-[#008E46] hover:bg-[#007a3d] text-white font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-lg"
          >
            <span>{buttonText}</span>
            <Download className="micro-icon-bob w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
