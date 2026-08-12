import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { ChairmansDeskSection } from "@/components/ChairmansDeskSection";
import { loadSiteContent } from "@/cms/public-content";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.chairman.seo); }

export default async function ChairmansDeskPage() {
  const page = (await loadSiteContent()).pages.chairman;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <ChairmansDeskSection />
      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.principles} centered />
          <FeatureGrid cards={page.principles} />
        </div>
      </section>
    </SiteShell>
  );
}
