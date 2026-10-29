"use client";

import React from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Building2, Stethoscope, Sparkles, Phone, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import { openAdmissionDialog } from "@/lib/admissionDialog";

export const HospitalHomeSection: React.FC = () => {
  const siteData = useSiteContent();
  const hospitalData = siteData.pages.hospital;
  const hospitalContact = siteData.global.institution.hospitalContact;

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-extrabold uppercase tracking-widest border border-emerald-700/60">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>100+ Bed Multispecialty Naturopathy Hospital</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-white leading-tight">
              Susheeladevi Naturopathy Hospital & Research Centre
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-medium">
              Combining evidence-based Naturopathy, Yogic Sciences, Physiotherapy, and Ayurvedic Panchakarma under certified medical consultant supervision in Jagadal, Karnataka.
            </p>

            {/* Key Features Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-900/60 border border-emerald-800/60">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-emerald-100">Medically Supervised OPD & IPD</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-900/60 border border-emerald-800/60">
                <HeartPulse className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-emerald-100">60+ Natural Therapies & Rehab</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/hospital"
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-105"
              >
                <span>Explore Hospital Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={openAdmissionDialog}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-bold text-xs sm:text-sm tracking-wider uppercase border border-emerald-700/80 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Consultation: {hospitalContact?.opdPhone || "+91 8956575838"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Stats & Contact Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-emerald-900/90 border border-emerald-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
              <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
                <span>Hospital At A Glance</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {hospitalData.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 space-y-1">
                    <p className="text-2xl font-black text-emerald-400">{stat.value}</p>
                    <p className="text-xs font-semibold text-emerald-200/80">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-800/50 border border-emerald-700/50 space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">Direct OPD Hospital Desk</p>
                <div className="flex flex-col space-y-1 text-sm font-bold text-white">
                  <span>OPD Desk: {hospitalContact?.opdPhone}</span>
                  <span>Landline: {hospitalContact?.landline}</span>
                  <span>WhatsApp: {hospitalContact?.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
