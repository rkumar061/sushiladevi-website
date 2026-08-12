import { z } from "zod";
import type { siteData } from "@/data/siteData";

export const documentKeys = [
  "global",
  "navigation",
  "shared",
  "page.home",
  "page.about",
  "page.chairman",
  "page.campusLife",
  "page.bnys",
  "page.whyChooseUs",
  "page.faqs",
  "page.faculty",
  "page.facilities",
  "page.contact",
] as const;

/**
 * The complete set of public, content-managed routes. Keeping this beside the
 * document contract makes it difficult to add a public page without also
 * giving the CMS a document to seed and publish.
 */
export const publicPageDocuments = {
  "page.home": { page: "home", path: "/" },
  "page.about": { page: "about", path: "/about" },
  "page.chairman": { page: "chairman", path: "/about/chairmans-desk" },
  "page.campusLife": { page: "campusLife", path: "/campus-life" },
  "page.bnys": { page: "bnys", path: "/bnys" },
  "page.whyChooseUs": { page: "whyChooseUs", path: "/why-choose-us" },
  "page.faqs": { page: "faqs", path: "/faqs" },
  "page.faculty": { page: "faculty", path: "/faculty" },
  "page.facilities": { page: "facilities", path: "/facilities" },
  "page.contact": { page: "contact", path: "/contact" },
} as const satisfies Record<`page.${string}`, { page: keyof typeof import("@/data/siteData").siteData.pages; path: string }>;

export const documentKeySchema = z.enum(documentKeys);
export type ContentDocumentKey = z.infer<typeof documentKeySchema>;
export type SiteContent = typeof siteData;

export const jsonValueSchema: z.ZodType<unknown> = z.lazy(() => z.union([
  z.string(), z.number(), z.boolean(), z.null(),
  z.array(jsonValueSchema),
  z.record(z.string(), jsonValueSchema),
]));

export const contentValueSchema = z.union([
  z.array(jsonValueSchema),
  z.record(z.string(), jsonValueSchema),
]);

export const richTextDocumentSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.record(z.string(), z.unknown())).optional(),
});
export type RichTextDocument = z.infer<typeof richTextDocumentSchema>;

export const mediaAssetReferenceSchema = z.object({
  id: z.string().uuid(),
  url: z.string(),
  alt: z.string(),
  kind: z.enum(["image", "pdf"]),
});
export type MediaAssetReference = z.infer<typeof mediaAssetReferenceSchema>;

export interface ContentDocumentEnvelope {
  key: ContentDocumentKey;
  draft: unknown;
  published: unknown;
  draftVersion: number;
  publishedVersion: number;
  draftUpdatedAt: Date;
  publishedAt: Date;
}
