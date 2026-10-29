"use client";

import React from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Stethoscope, Award, CheckCircle2, PhoneCall } from "lucide-react";
import { openAdmissionDialog } from "@/lib/admissionDialog";

export const HospitalDoctorsSection: React.FC = () => {
  const siteData = useSiteContent();
  const hospitalData = siteData.pages.hospital;
  const doctors = hospitalData.doctors;

  return (
    <section id="doctors" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-500/30">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Clinical Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Medical Consultants & Doctors
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-medium">
            Experienced medical practitioners guiding your diagnosis, natural therapeutic protocols, and recovery.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-800/90 rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-2xl flex flex-col justify-between space-y-6 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 flex-shrink-0 shadow-lg">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold text-xs border border-emerald-800">
                    {doc.qualifications}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{doc.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wide">
                    {doc.role}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-700/60">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                    Specialty & Expertise:
                  </span>
                  <p className="text-sm font-bold text-gray-200">
                    {doc.specialty}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={openAdmissionDialog}
                  className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
