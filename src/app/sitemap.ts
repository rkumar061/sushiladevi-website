import type { MetadataRoute } from "next";
import { loadSiteContent } from "@/cms/public-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteData = await loadSiteContent();
  const paths = [
    "/",
    siteData.pages.about.seo.path,
    siteData.pages.chairman.seo.path,
    siteData.pages.campusLife.seo.path,
    siteData.pages.bnys.seo.path,
    siteData.pages.whyChooseUs.seo.path,
    siteData.pages.faqs.seo.path,
    siteData.pages.faculty.seo.path,
    siteData.pages.facilities.seo.path,
    siteData.pages.contact.seo.path,
  ];

  return paths.map((path) => ({
    url: new URL(path, siteData.global.siteUrl).toString(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
