import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { FeatureGrid, InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.campusLife.seo); }

export default async function CampusLifePage() {
  const content = await loadSiteContent();
  const page = content.pages.campusLife;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.journey} />
          <FeatureGrid cards={page.journey} columns={4} />
        </div>
      </section>

      <section className="bg-[#123b2a] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.support} light />
          <FeatureGrid cards={page.support} />
        </div>
      </section>

      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading {...page.sections.gallery} />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.gallery.map((item, index) => (
              <ScrollReveal key={item.title} direction="up" delay={index * 80}>
                <article className="micro-card group overflow-hidden rounded-3xl bg-white shadow-sm">
                  <div className="relative h-64 overflow-hidden">
                    <Image src={item.image!} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">{content.shared.labels.imagePlaceholder}</span>
                  </div>
                  <div className="p-6"><h3 className="text-lg font-black text-[#123b2a]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p></div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
