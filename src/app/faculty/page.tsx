import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { FacultyDirectory } from "@/components/FacultyDirectory";
import { loadSiteContent } from "@/cms/public-content";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.faculty.seo); }

export default async function FacultyPage() {
  const page = (await loadSiteContent()).pages.faculty;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-6xl"><SectionHeading {...page.sections.philosophy} /><FeatureGrid cards={page.philosophy} columns={4} /></div></section>
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-6xl"><SectionHeading {...page.sections.directory} /><FacultyDirectory departments={page.departments} profiles={page.profiles} /></div></section>
    </SiteShell>
  );
}
