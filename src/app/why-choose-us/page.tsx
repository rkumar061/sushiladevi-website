import { CheckCircle2 } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, RegionStrip, SectionHeading } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.whyChooseUs.seo); }

export default async function WhyChooseUsPage() {
  const content = await loadSiteContent();
  const page = content.pages.whyChooseUs;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.reasons} />
          <FeatureGrid cards={page.reasons} />
        </div>
      </section>

      <ScrollReveal direction="scale">
        <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-xl lg:grid-cols-2">
            <div className="bg-[#123b2a] p-8 text-white sm:p-12">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-300">{page.sections.parentsEyebrow}</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight">{page.parentsCorner.title}</h2>
              <p className="mt-5 text-sm leading-7 text-emerald-50 sm:text-base">{page.parentsCorner.description}</p>
            </div>
            <div className="grid gap-3 p-8 sm:grid-cols-2 sm:p-12">
              {page.parentsCorner.commitments.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-950"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />{item}</div>)}
            </div>
          </div>
        </section>
      </ScrollReveal>
      <RegionStrip regions={content.global.institution.serviceRegions} />
    </SiteShell>
  );
}
