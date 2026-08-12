"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Leaf, Quote, Sparkles } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { RichTextView } from "@/components/cms/RichTextView";

export const ChairmansDeskSection: React.FC = () => {
  const siteData = useSiteContent();
  const message = siteData.pages.chairman.message;
  const { heading, chairman, salutation, previewText, fullText } = message;
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="chairmans-desk"
      className="relative isolate w-full overflow-hidden bg-[#f8f5eb] px-4 py-16 text-[#17251f] sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Soft botanical background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <svg
          aria-hidden="true"
          className="micro-rotate-slow absolute right-[-7rem] top-[-6rem] h-[32rem] w-[32rem] text-emerald-900/[0.055]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="155" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="5 8" />
          {Array.from({ length: 12 }).map((_, index) => (
            <ellipse
              key={index}
              cx="200"
              cy="105"
              rx="30"
              ry="90"
              stroke="currentColor"
              strokeWidth="1.5"
              transform={`rotate(${index * 30} 200 200)`}
            />
          ))}
          <circle cx="200" cy="200" r="36" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mb-9 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8eb6a0] bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#14532d] shadow-sm sm:text-xs">
              <Leaf className="h-3.5 w-3.5" />
              {message.badge}
            </div>
            <h2 className="max-w-3xl text-3xl font-black uppercase leading-[1.08] tracking-tight text-[#123b2a] sm:text-4xl md:text-5xl">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-relaxed text-[#3f4d46] sm:text-right">
            {message.introduction}
          </p>
        </div>

        <article className="relative overflow-hidden rounded-[2rem] border border-[#d7e2da] bg-white shadow-[0_28px_80px_-32px_rgba(20,83,45,0.35)] sm:rounded-[2.5rem]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* Chairman portrait */}
            <div className="relative min-h-[390px] overflow-hidden bg-[#164e38] sm:min-h-[470px] lg:min-h-full">
              <Image
                src={chairman.image}
                alt={`${chairman.name}, ${chairman.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031b13] via-[#082f22]/50 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#031b13] via-[#031b13]/95 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
                <div className="mb-5 h-px w-16 bg-amber-300" />
                <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#fde68a]">
                  {chairman.role}
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  {chairman.name}
                </h3>
                <p className="mt-1 text-sm font-bold tracking-wide text-white">
                  {chairman.qualifications}
                </p>
              </div>

              <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md sm:left-7 sm:top-7">
                <Leaf className="micro-float h-6 w-6" />
              </div>
            </div>

            {/* Message */}
            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <div className="absolute right-8 top-8 hidden text-emerald-900/[0.06] sm:block">
                <Quote className="h-24 w-24 fill-current" />
              </div>

              <div className="relative z-10">
                <div className="mb-7 flex items-center gap-3 text-emerald-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                    <Sparkles className="micro-icon-turn h-4 w-4" />
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#166534]">
                    {message.visionLabel}
                  </span>
                </div>

                <p className="text-lg font-bold text-[#173d2d] sm:text-xl">{salutation}</p>

                <blockquote className="my-6 border-l-4 border-[#d97706] bg-[#fff9e8] py-4 pl-5 pr-4 text-xl font-bold italic leading-relaxed text-[#1c2822] sm:text-2xl">
                  “{message.quotation}”
                  <footer className="mt-2 text-xs not-italic font-extrabold uppercase tracking-[0.16em] text-[#14532d]">
                    {message.quotationMeaning}
                  </footer>
                </blockquote>

                {expanded ? <RichTextView value={fullText} className="text-sm font-medium leading-7 text-[#34433b] sm:text-base sm:leading-8" /> : <p className="whitespace-pre-line text-sm font-medium leading-7 text-[#34433b] sm:text-base sm:leading-8">{previewText}</p>}

                <button
                  type="button"
                  onClick={() => setExpanded((current) => !current)}
                  aria-expanded={expanded}
                  aria-controls="chairman-full-message"
                  className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#123b2a] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#1b5e43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                >
                  {expanded ? message.collapseLabel : message.expandLabel}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                  />
                </button>
                <span id="chairman-full-message" className="sr-only">
                  {expanded ? message.expandedAnnouncement : message.collapsedAnnouncement}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
