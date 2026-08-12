"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { FaqItem } from "@/data/siteData";
import { useSiteContent } from "@/components/SiteContentProvider";

export const FaqExplorer: React.FC<{ categories: string[]; items: FaqItem[] }> = ({ categories, items }) => {
  const labels = useSiteContent().shared.labels;
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<number | null>(items[0]?.id ?? null);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatches = category === "All" || item.category === category;
      const queryMatches = !normalizedQuery || `${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, items, query]);

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-emerald-900/10 bg-[#f8f5eb] p-4 sm:p-6">
        <label className="relative block">
          <span className="sr-only">{labels.faqSearchLabel}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-700" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.faqSearchPlaceholder} className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" />
        </label>
        <div className="mt-4 flex flex-wrap gap-2" aria-label={labels.faqCategoriesLabel}>
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2 text-xs font-extrabold transition ${category === item ? "bg-[#047857] text-white" : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-800"}`}>{item}</button>)}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filteredItems.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `faq-answer-${item.id}`;
          return (
            <article key={item.id} className="micro-card h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button type="button" onClick={() => setOpenId(isOpen ? null : item.id)} aria-expanded={isOpen} aria-controls={panelId} className="flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600">
                <span><span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-700">{item.category}</span><span className="text-sm font-black text-gray-950 sm:text-base">{item.question}</span></span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-emerald-700 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div id={panelId} className="border-t border-gray-100 bg-gray-50/70 px-5 py-5 text-sm leading-7 text-gray-600">{item.answer}</div>}
            </article>
          );
        })}
      </div>
      {filteredItems.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-10 text-center text-sm text-gray-600">{labels.faqEmptyMessage}</div>}
    </div>
  );
};
