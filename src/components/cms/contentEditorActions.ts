import type { ContentDocumentKey } from "@/cms/content-types";

export const previewPaths: Partial<Record<ContentDocumentKey, string>> = {
  "page.home": "/", "page.about": "/about", "page.chairman": "/about/chairmans-desk",
  "page.campusLife": "/campus-life", "page.bnys": "/bnys", "page.whyChooseUs": "/why-choose-us",
  "page.faqs": "/faqs", "page.faculty": "/faculty", "page.facilities": "/facilities", "page.contact": "/contact",
};

export const draftRequest = (value: unknown, draftVersion: number): RequestInit => ({
  method: "PUT", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ value, expectedVersion: draftVersion }),
});

export const publishRequest = (draftVersion: number): RequestInit => ({
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ expectedDraftVersion: draftVersion }),
});

export const previewUrl = (key: ContentDocumentKey): string | undefined => {
  const path = previewPaths[key];
  return path && `/api/admin/preview?path=${encodeURIComponent(path)}`;
};
