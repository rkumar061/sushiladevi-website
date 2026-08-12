import { Compass, MapPin, Phone } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { SiteShell } from "@/components/SiteShell";
import { InnerPageHero, RegionStrip, SectionHeading } from "@/components/PagePrimitives";
import { ContactPageForm } from "@/components/ContactPageForm";
import { loadSiteContent } from "@/cms/public-content";
import { getGoogleMapsEmbedUrl } from "@/lib/googleMaps";

export async function generateMetadata() { return createPageMetadata((await loadSiteContent()).pages.contact.seo); }

export default async function ContactPage() {
  const content = await loadSiteContent();
  const page = content.pages.contact;
  const institution = content.global.institution;
  const phoneNumbers = institution.phoneNumbers.flatMap((pair) => [pair.num1, pair.num2]);
  const mapEmbedUrl = getGoogleMapsEmbedUrl(page.map.googleMapsEmbedUrl);
  return (
    <SiteShell showBottomCta={false}>
      <InnerPageHero content={page.hero} />
      <section className="bg-[#f8f5eb] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading {...page.sections.reach} />
            <div className="mt-8 space-y-4">
              <div className="micro-card flex gap-4 rounded-2xl bg-white p-5 shadow-sm"><MapPin className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" /><div><h3 className="font-black text-[#123b2a]">{page.contactCards.campusHeading}</h3><p className="mt-2 text-sm leading-6 text-gray-600">{institution.addressLine1}<br />{institution.addressLine2}<br />{institution.addressLine3}</p></div></div>
              <div className="micro-card flex gap-4 rounded-2xl bg-white p-5 shadow-sm"><Phone className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" /><div><h3 className="font-black text-[#123b2a]">{page.contactCards.phoneHeading}</h3><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{phoneNumbers.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-bold text-emerald-700 hover:underline">{phone}</a>)}</div></div></div>
            </div>
          </div>
          <ContactPageForm />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"><div className="mx-auto max-w-6xl"><SectionHeading {...page.sections.guidance} /><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{page.helpTopics.map((topic) => <div key={topic} className="micro-card flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-sm font-bold text-[#365144] shadow-sm"><Compass className="h-5 w-5 shrink-0 text-emerald-600" />{topic}</div>)}</div></div></section>

      <section className="bg-[#123b2a] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"><div className={`mx-auto grid max-w-6xl gap-8 ${mapEmbedUrl ? "lg:grid-cols-[1fr_1.2fr] lg:items-center" : ""}`}><div><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">{page.sections.visitEyebrow}</p><h2 className="mt-3 text-3xl font-black uppercase sm:text-4xl">{page.map.title}</h2><p className="mt-4 text-sm leading-7 text-emerald-50">{page.map.description}</p></div>{mapEmbedUrl && <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl"><iframe src={mapEmbedUrl} title={`${page.map.title} location map`} className="h-80 w-full border-0 sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>}</div></section>
      <RegionStrip regions={institution.serviceRegions} />
    </SiteShell>
  );
}
