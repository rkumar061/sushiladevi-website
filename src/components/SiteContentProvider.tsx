"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/cms/content-types";
import { siteData } from "@/data/siteData";

const SiteContentContext = createContext<SiteContent>(siteData);

export function SiteContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
