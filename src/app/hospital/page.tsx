import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import { SiteShell } from "@/components/SiteShell";
import { HospitalTherapiesSection } from "@/components/HospitalTherapiesSection";
import { HospitalAccommodationSection } from "@/components/HospitalAccommodationSection";
import { HospitalDoctorsSection } from "@/components/HospitalDoctorsSection";
import { Building2, ShieldCheck, HeartPulse, PhoneCall, Download, CheckCircle2, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: siteData.pages.hospital.seo.title,
  description: siteData.pages.hospital.seo.description,
};

export default function HospitalPage() {
  const hospitalData = siteData.pages.hospital;
  const hospitalContact = siteData.global.institution.hospitalContact;

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative w-full pt-36 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={hospitalData.hero.image}
            alt={hospitalData.hero.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-widest">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>{hospitalData.hero.eyebrow}</span>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight text-white">
              {hospitalData.hero.title}
            </h1>
            <p className="text-base sm:text-xl text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
              {hospitalData.hero.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/hospital/treatments"
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-2xl transition-all transform hover:scale-105"
            >
              Explore 60+ Therapies
            </Link>
            <a
              href={hospitalContact?.prospectusPdf || "#"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase border border-white/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Hospital Prospectus (PDF)</span>
            </a>
          </div>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-emerald-800/60 max-w-5xl">
            {hospitalData.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">{stat.value}</p>
                <p className="text-xs font-semibold text-emerald-200/80 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Overview Section */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                {hospitalData.overview.subHeading}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
                {hospitalData.overview.heading}
              </h2>
            </div>

            <div className="space-y-4 text-base text-gray-700 leading-relaxed font-medium">
              {hospitalData.overview.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              {hospitalData.overview.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-gray-900">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-xl space-y-6">
            <h3 className="text-xl font-black text-emerald-950 uppercase tracking-wide flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-emerald-700" />
              <span>Patient Desk & OPD Timings</span>
            </h3>

            <div className="space-y-4 text-sm text-gray-800 font-medium">
              <div className="p-4 bg-white rounded-2xl border border-emerald-100 space-y-1">
                <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Hospital OPD Hotline</p>
                <p className="text-lg font-black text-gray-950">{hospitalContact?.opdPhone}</p>
                <p className="text-xs text-gray-600">Direct hospital line for appointments and OPD consultation</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-100 space-y-1">
                <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Hospital Landline & WhatsApp</p>
                <p className="text-sm font-bold text-gray-900">Landline: {hospitalContact?.landline}</p>
                <p className="text-sm font-bold text-gray-900">WhatsApp: {hospitalContact?.whatsapp}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-emerald-100 space-y-1">
                <p className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Hospital Address</p>
                <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                  Opp. Hanuman Temple, Banahatti-Mudhol Road, Jagadal – 587311, Taluk Rabkavi-Banahatti, District Bagalkot, Karnataka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Therapies Section */}
      <HospitalTherapiesSection />

      {/* Accommodation & Rooms Section */}
      <HospitalAccommodationSection />

      {/* Medical Doctors Section */}
      <HospitalDoctorsSection />
    </SiteShell>
  );
}
