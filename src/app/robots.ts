import type { MetadataRoute } from "next";
import { loadSiteContent } from "@/cms/public-content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteData = await loadSiteContent();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteData.global.siteUrl).toString(),
  };
}
