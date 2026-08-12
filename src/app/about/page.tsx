import { BadgeCheck } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, RegionStrip, SectionHeading, SplitStory } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";
import { RichTextView } from "@/components/cms/RichTextView";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.about.seo); }

export default async function AboutPage() {
  const content = await loadSiteContent();
  const page = content.pages.about;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <SplitStory {...page.introduction} />

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

      <RegionStrip regions={content.global.institution.serviceRegions} />
    </SiteShell>
  );
}
