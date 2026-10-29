import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import { SiteShell } from "@/components/SiteShell";
import { HospitalTherapiesSection } from "@/components/HospitalTherapiesSection";
import { ArrowLeft, Sparkles, CheckCircle2, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Treatments & Therapies | Susheeladevi Naturopathy Hospital",
  description: "Explore 60+ natural healing treatments including Hydrotherapy, Manipulative Massage, Panchakarma, Physiotherapy, Acupuncture, and Yoga Therapy at Jagadal, Karnataka.",
};

export default function TreatmentsPage() {
  const hospitalData = siteData.pages.hospital;
  const categories = hospitalData.therapyCategories;
  const hospitalContact = siteData.global.institution.hospitalContact;

  return (
    <SiteShell>
      {/* Treatments Hero */}
      <section className="relative w-full pt-36 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <Link
            href="/hospital"
            className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Hospital Overview</span>
          </Link>

          <div className="space-y-3 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-widest border border-emerald-500/30">
              Complete Treatment Index
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Hospital Therapies & Treatment Directory
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 font-medium">
              Discover our full range of evidence-informed natural healing treatments, physical rehabilitation protocols, and Ayurvedic body therapies.
            </p>
          </div>
        </div>
      </section>

      {/* Full Therapies Directory */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-16">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-gray-200/80 space-y-6"
            >
              <div className="space-y-2 border-b border-gray-100 pb-4">
                <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Therapy Category</span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-950">{cat.title}</h2>
                <p className="text-sm sm:text-base text-gray-600 font-medium">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/60 hover:bg-emerald-50/50 hover:border-emerald-200 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Consultation CTA Banner */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-emerald-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Need Help Choosing A Treatment Regime?</h3>
              <p className="text-sm sm:text-base text-emerald-200 font-medium">
                Our certified Naturopathy and Ayurvedic doctors evaluate your health history to prescribe customized OPD/IPD therapies.
              </p>
            </div>

            <a
              href={`tel:${hospitalContact?.opdPhone}`}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-transform hover:scale-105 flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call OPD Desk: {hospitalContact?.opdPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
