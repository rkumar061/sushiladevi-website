import { CheckCircle2, Plus } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";

import { EligibilityCriteriaSection } from "@/components/EligibilityCriteriaSection";
import { AdmissionCtaSection } from "@/components/AdmissionCtaSection";
import { DownloadProspectusSection } from "@/components/DownloadProspectusSection";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.bnys.seo); }

export default async function BnysPage() {
  const page = (await loadSiteContent()).pages.bnys;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />

      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.programme} description={page.overview.paragraphs.join(" ")} centered />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {page.overview.equation.map((item, index) => <div key={item} className="flex items-center gap-3"><span className="micro-card rounded-2xl border border-emerald-900/10 bg-white px-5 py-3 text-sm font-black text-emerald-900 shadow-sm">{item}</span>{index < page.overview.equation.length - 1 && <Plus className="h-4 w-4 text-amber-600" />}</div>)}
          </div>
        </div>
      </section>

      {/* BNYS Admission Banner CTA */}
      <ScrollReveal direction="scale">
        <AdmissionCtaSection />
      </ScrollReveal>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.subjects} />
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {page.subjects.map((subject, index) => <ScrollReveal key={subject} direction="up" delay={(index % 4) * 45}><div className="micro-card flex h-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm font-bold text-[#244637] shadow-sm"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">{index + 1}</span>{subject}</div></ScrollReveal>)}
          </div>
        </div>
      </section>

      {/* Detailed Eligibility Criteria Component */}
      <ScrollReveal direction="left">
        <EligibilityCriteriaSection />
      </ScrollReveal>

      <section className="bg-[#123b2a] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.journey} light />
          <FeatureGrid cards={page.learningJourney} columns={4} />
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-32 bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.eligibility} />
          <FeatureGrid cards={page.eligibility} columns={4} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.careers} />
          <FeatureGrid cards={page.careers} />
        </div>
      </section>

      {/* Download Prospectus CTA */}
      <ScrollReveal direction="right">
        <DownloadProspectusSection />
      </ScrollReveal>

      <ScrollReveal direction="scale">
        <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] bg-white p-7 shadow-xl sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14">
            <div><p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">{page.sections.admission.eyebrow}</p><h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#123b2a]">{page.sections.admission.title}</h2><p className="mt-4 text-sm leading-7 text-gray-600">{page.sections.admission.description}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">{page.admissionSupport.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-950"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />{item}</div>)}</div>
          </div>
        </section>
      </ScrollReveal>
    </SiteShell>
  );
}
