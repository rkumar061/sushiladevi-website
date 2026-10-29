"use client";

import React, { useState } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { Sparkles, Droplets, Activity, Target, HeartPulse, Sun, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles className="w-5 h-5" />,
  droplets: <Droplets className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  "heart-pulse": <HeartPulse className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
};

interface HospitalTherapiesSectionProps {
  showFullList?: boolean;
}

export const HospitalTherapiesSection: React.FC<HospitalTherapiesSectionProps> = ({ showFullList = false }) => {
  const siteData = useSiteContent();
  const hospitalData = siteData.pages.hospital;
  const categories = hospitalData.therapyCategories;

  const [activeTab, setActiveTab] = useState(categories[0]?.id || "manipulative");

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-emerald-50/20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Medically Supervised Treatments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight uppercase">
            Clinical Therapies & Natural Healing
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Over 60 evidence-informed treatments, Ayurvedic Panchakarma, and rehabilitation programs tailored for your individual health condition.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/25 scale-[1.02]"
                    : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 border border-gray-200/80 shadow-xs"
                }`}
              >
                <span className={isActive ? "text-white" : "text-emerald-600"}>
                  {iconMap[cat.icon] || <Sparkles className="w-4 h-4" />}
                </span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category Detail Card */}
        {currentCategory && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100/60 transition-all duration-500 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  {iconMap[currentCategory.icon] || <Sparkles className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                    {currentCategory.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-medium mt-1">
                    {currentCategory.description}
                  </p>
                </div>
              </div>

              {!showFullList && (
                <Link
                  href="/hospital/treatments"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs uppercase tracking-wider transition-colors flex-shrink-0"
                >
                  <span>View All 60+ Therapies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* List of Therapy Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 p-3.5 rounded-xl bg-gray-50/90 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-emerald-950">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
