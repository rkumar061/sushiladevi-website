import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { InnerPageHero, SectionHeading } from "@/components/PagePrimitives";
import { ScrollReveal } from "@/components/ScrollReveal";
import { loadSiteContent } from "@/cms/public-content";
import { RichTextView } from "@/components/cms/RichTextView";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.facilities.seo); }

export default async function FacilitiesPage() {
  const content = await loadSiteContent();
  const page = content.pages.facilities;
  return (
    <SiteShell>
      <InnerPageHero content={page.hero} />
      <section className="bg-[#f8f5eb] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#academic" className="rounded-full bg-emerald-800 text-white px-5 py-2 text-xs font-black uppercase tracking-wider shadow-sm hover:bg-emerald-700 transition">
              Academic Facilities
            </a>
            <a href="#hospital" className="rounded-full bg-emerald-600 text-white px-5 py-2 text-xs font-black uppercase tracking-wider shadow-sm hover:bg-emerald-500 transition">
              Hospital Clinical Facilities
            </a>
          </div>

          <nav aria-label="Facility sections" className="flex flex-wrap justify-center gap-2 pt-2">
            {page.items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full border border-emerald-900/10 bg-white px-3.5 py-1.5 text-xs font-extrabold text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:text-white"
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl"><SectionHeading {...page.sections.overview} centered /></div>
        <div className="mx-auto mt-12 max-w-6xl space-y-14 sm:space-y-20">
          {page.items.map((item, index) => (
            <ScrollReveal key={item.id} direction={index % 2 === 0 ? "left" : "right"}>
              <article id={item.id} className="scroll-mt-36 grid overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white shadow-xl lg:grid-cols-2">
                <div className={`relative min-h-[340px] overflow-hidden ${index % 2 ? "lg:order-2" : ""}`}><Image src={item.image} alt={`${item.title} preview`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent" />{item.status === "placeholder" && <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-900">{content.shared.labels.detailsToConfirm}</span>}</div>
                <div className={`flex flex-col justify-center p-7 sm:p-10 lg:p-12 ${index % 2 ? "lg:order-1" : ""}`}><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">{item.eyebrow}</p><h2 className="mt-3 text-3xl font-black uppercase text-[#123b2a] sm:text-4xl">{item.title}</h2><RichTextView value={item.description} className="cms-rich-content mt-5 text-sm leading-7 text-gray-600 sm:text-base" /><div className="mt-6 space-y-3">{item.highlights.map((highlight) => <div key={highlight} className="flex items-center gap-3 text-sm font-bold text-[#365144]"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />{highlight}</div>)}</div></div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
