import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { FaqExplorer } from "@/components/FaqExplorer";
import { loadSiteContent } from "@/cms/public-content";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.faqs.seo); }

export default async function FaqsPage() {
  const page = (await loadSiteContent()).pages.faqs;
  const structuredData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl"><SectionHeading {...page.sections.explorer} /><FaqExplorer categories={page.categories} items={page.items} /></div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </SiteShell>
  );
}
