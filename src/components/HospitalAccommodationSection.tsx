"use client";

import React from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Bed, ShieldCheck, CheckCircle, Home } from "lucide-react";

export const HospitalAccommodationSection: React.FC = () => {
  const siteData = useSiteContent();
  const hospitalData = siteData.pages.hospital;
  const accommodations = hospitalData.accommodations;

  return (
    <section id="accommodation" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-widest">
            <Home className="w-3.5 h-3.5" />
            <span>In-Patient Stay (IPD)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight uppercase">
            Healing Accommodation & Rooms
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Designed for deep rest, therapeutic recovery, and family support in a quiet, natural environment.
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-gray-50/80 rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={acc.image}
                  alt={acc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-600/90 text-[11px] font-bold tracking-wide uppercase">
                    {acc.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-white">{acc.title}</h3>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {acc.description}
                  </p>

                  {/* Room Highlights */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    {acc.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-gray-800">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal For Badge */}
                <div className="pt-4 border-t border-gray-200/80 flex items-center space-x-2.5 text-xs text-emerald-900 font-bold bg-emerald-50/60 p-3 rounded-2xl">
                  <Bed className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Ideal for: {acc.idealFor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
