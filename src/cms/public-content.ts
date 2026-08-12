import { cache } from "react";
import { draftMode } from "next/headers";
import { ensureCmsInitialized } from "@/cms/initialize";
import { getSiteContent } from "@/cms/content-repository";
import { siteData } from "@/data/siteData";

export const loadSiteContent = cache(async () => {
  try {
    await ensureCmsInitialized();
    const preview = await draftMode();
    return getSiteContent(preview.isEnabled ? "draft" : "published");
  } catch (error) {
    console.error("CMS content fallback activated", error);
    return siteData;
  }
});
