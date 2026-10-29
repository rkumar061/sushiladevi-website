import { BadgeCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, RegionStrip, SectionHeading, SplitStory } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";
import { RichTextView } from "@/components/cms/RichTextView";
import { DownloadProspectusSection } from "@/components/DownloadProspectusSection";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.about.seo); }

export default async function AboutPage() {
  const content = await loadSiteContent();
  const page = content.pages.about;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <SplitStory {...page.introduction} />

      {/* Vertical Branches Section: College & Hospital */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Two Pillars of Excellence</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 uppercase tracking-tight">
              Academic Education & Clinical Healthcare
            </h2>
            <p className="text-base text-gray-600 font-medium">
              Discover our two core verticals: nurturing future healthcare professionals through BNYS medical education, and providing holistic healing to patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* College Branch Card */}
            <div className="bg-emerald-50/70 rounded-3xl p-8 border border-emerald-100/80 shadow-lg flex flex-col justify-between space-y-6 hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider">
                  Academic Vertical
                </span>
                <h3 className="text-2xl font-black text-gray-950">
                  BNYS Medical College
                </h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Affiliated to Rajiv Gandhi University of Health Sciences (RGUHS) and recognized by the Department of AYUSH. Providing rigorous medical science education, clinical exposure, and practical skill development.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href="/bnys" className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100">BNYS Degree</a>
                  <a href="/faculty" className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100">Academic Faculty</a>
                  <a href="/campus-life" className="text-xs font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100">Campus Life</a>
                </div>
              </div>

              <a
                href="/bnys"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Explore BNYS College →
              </a>
            </div>

            {/* Hospital Branch Card */}
            <div className="bg-gray-900 text-white rounded-3xl p-8 border border-gray-800 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl transition-all">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs uppercase tracking-wider">
                  Clinical Care Vertical
                </span>
                <h3 className="text-2xl font-black text-white">
                  Hospital & Research Centre
                </h3>
                <p className="text-sm text-gray-300 font-medium leading-relaxed">
                  A 100-bed multispecialty facility providing over 60 evidence-informed treatments, Hydrotherapy, Panchakarma, Physiotherapy, and in-patient accommodation in serene cottages and suites.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href="/hospital/treatments" className="text-xs font-bold text-emerald-300 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700">60+ Therapies</a>
                  <a href="/hospital#accommodation" className="text-xs font-bold text-emerald-300 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700">IPD Cottages & Suites</a>
                  <a href="/hospital#doctors" className="text-xs font-bold text-emerald-300 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-700">Medical Consultants</a>
                </div>
              </div>

              <a
                href="/hospital"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Explore Naturopathy Hospital →
              </a>
            </div>
          </div>

          {/* Quick Leadership & Desk Link */}
          <div className="p-6 bg-[#f8f5eb] rounded-2xl border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-black text-gray-950 uppercase">Leadership & Vision</h4>
              <p className="text-xs text-gray-700 font-medium">Read the Chairman's message on disciplined practice, compassion, and healthcare responsibility.</p>
            </div>
            <a
              href="/about/chairmans-desk"
              className="px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs uppercase tracking-wider flex-shrink-0 transition-colors"
            >
              Chairman's Desk →
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.education} />
          <FeatureGrid cards={page.values} />
        </div>
      </section>

      <ScrollReveal direction="scale">
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] bg-[#123b2a] p-7 text-white shadow-2xl sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:p-14">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-300">{page.sections.credibilityEyebrow}</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">{page.credibility.title}</h2>
              <RichTextView value={page.credibility.description} className="cms-rich-content mt-5 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base" />
            </div>
            <div className="space-y-3">
              {page.credibility.items.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-amber-300" />
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <DownloadProspectusSection />
      </ScrollReveal>

      <RegionStrip regions={content.global.institution.serviceRegions} />
    </SiteShell>
  );
}
