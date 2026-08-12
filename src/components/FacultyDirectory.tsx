"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { FacultyProfile } from "@/data/siteData";
import { useSiteContent } from "@/components/SiteContentProvider";

export const FacultyDirectory: React.FC<{ departments: string[]; profiles: FacultyProfile[] }> = ({ departments, profiles }) => {
  const labels = useSiteContent().shared.labels;
  const [department, setDepartment] = useState("All");
  const filteredProfiles = department === "All" ? profiles : profiles.filter((profile) => profile.department === department);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2" aria-label={labels.facultyDepartmentsLabel}>
        {departments.map((item) => <button key={item} type="button" onClick={() => setDepartment(item)} aria-pressed={department === item} className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${department === item ? "bg-[#047857] text-white" : "border border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:text-emerald-800"}`}>{item}</button>)}
      </div>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProfiles.map((profile) => (
          <article key={profile.id} className="micro-card group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative h-72 overflow-hidden bg-emerald-950">
              <Image src={profile.image} alt={profile.status === "verified" ? profile.name : labels.facultyPlaceholderAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${profile.status === "placeholder" ? "grayscale" : ""}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 to-transparent" />
              {profile.status === "placeholder" && <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">{labels.facultyPlaceholderBadge}</span>}
            </div>
            <div className="p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">{profile.department}</p>
              <h3 className="mt-2 text-lg font-black text-[#123b2a]">{profile.name}</h3>
              <p className="mt-1 text-sm font-semibold text-gray-700">{profile.role}</p>
              <p className="mt-1 text-xs text-gray-500">{profile.qualifications}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
