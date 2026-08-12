import type { Metadata } from "next";
import { siteData, type SeoContent } from "@/data/siteData";

export const createPageMetadata = (seo: SeoContent): Metadata => {
  const url = new URL(seo.path, siteData.global.siteUrl).toString();
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: siteData.global.institution.shortName,
      type: "website",
    },
  };
};
