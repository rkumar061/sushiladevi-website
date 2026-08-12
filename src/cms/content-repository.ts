import { randomUUID } from "node:crypto";
import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "@/cms/db";
import { contentDocuments, contentRevisions } from "@/cms/schema";
import { contentValueSchema, documentKeys, type ContentDocumentEnvelope, type ContentDocumentKey, type SiteContent } from "@/cms/content-types";
import { siteData } from "@/data/siteData";

const defaults: Record<ContentDocumentKey, unknown> = {
  global: siteData.global,
  navigation: siteData.navigation,
  shared: siteData.shared,
  "page.home": siteData.pages.home,
  "page.about": siteData.pages.about,
  "page.chairman": siteData.pages.chairman,
  "page.campusLife": siteData.pages.campusLife,
  "page.bnys": siteData.pages.bnys,
  "page.whyChooseUs": siteData.pages.whyChooseUs,
  "page.faqs": siteData.pages.faqs,
  "page.faculty": siteData.pages.faculty,
  "page.facilities": siteData.pages.facilities,
  "page.contact": siteData.pages.contact,
};

export function mergeContentDefaults<T>(fallback: T, stored: unknown): T {
  if (Array.isArray(fallback)) return (Array.isArray(stored) ? stored : fallback) as T;
  if (fallback && typeof fallback === "object" && !Array.isArray(fallback)) {
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return fallback;
    const storedRecord = stored as Record<string, unknown>;
    return Object.fromEntries(Object.entries(fallback as Record<string, unknown>).map(([key, defaultValue]) => [
      key,
      key in storedRecord ? mergeContentDefaults(defaultValue, storedRecord[key]) : defaultValue,
    ])) as T;
  }
  return (stored === undefined || stored === null ? fallback : stored) as T;
}

function parseContent(value: string, fallback: unknown) {
  try {
    const parsed = JSON.parse(value);
    return mergeContentDefaults(fallback, contentValueSchema.parse(parsed));
  } catch {
    return fallback;
  }
}

export function validateContentDocument(value: unknown) {
  return contentValueSchema.parse(value);
}

export async function seedContentDocuments() {
  const now = new Date();
  await db.insert(contentDocuments).values(documentKeys.map((key) => ({
    key,
    draftJson: JSON.stringify(defaults[key]),
    publishedJson: JSON.stringify(defaults[key]),
    draftVersion: 1,
    publishedVersion: 1,
    draftUpdatedAt: now,
    publishedAt: now,
  }))).onConflictDoNothing();
}

export async function getSiteContent(mode: "published" | "draft" = "published"): Promise<SiteContent> {
  const rows = await db.select().from(contentDocuments);
  const rowMap = new Map(rows.map((row) => [row.key, row]));
  const get = <T,>(key: ContentDocumentKey) => {
    const row = rowMap.get(key);
    const source = row ? (mode === "draft" ? row.draftJson : row.publishedJson) : JSON.stringify(defaults[key]);
    return parseContent(source, defaults[key]) as T;
  };

  return {
    global: get<SiteContent["global"]>("global"),
    navigation: get<SiteContent["navigation"]>("navigation"),
    shared: get<SiteContent["shared"]>("shared"),
    pages: {
      home: get<SiteContent["pages"]["home"]>("page.home"),
      about: get<SiteContent["pages"]["about"]>("page.about"),
      chairman: get<SiteContent["pages"]["chairman"]>("page.chairman"),
      campusLife: get<SiteContent["pages"]["campusLife"]>("page.campusLife"),
      bnys: get<SiteContent["pages"]["bnys"]>("page.bnys"),
      whyChooseUs: get<SiteContent["pages"]["whyChooseUs"]>("page.whyChooseUs"),
      faqs: get<SiteContent["pages"]["faqs"]>("page.faqs"),
      faculty: get<SiteContent["pages"]["faculty"]>("page.faculty"),
      facilities: get<SiteContent["pages"]["facilities"]>("page.facilities"),
      contact: get<SiteContent["pages"]["contact"]>("page.contact"),
    },
  };
}

export async function getContentDocument(key: ContentDocumentKey): Promise<ContentDocumentEnvelope | null> {
  const row = await db.query.contentDocuments.findFirst({ where: eq(contentDocuments.key, key) });
  if (!row) return null;
  return {
    key,
    draft: parseContent(row.draftJson, defaults[key]),
    published: parseContent(row.publishedJson, defaults[key]),
    draftVersion: row.draftVersion,
    publishedVersion: row.publishedVersion,
    draftUpdatedAt: row.draftUpdatedAt,
    publishedAt: row.publishedAt,
  };
}

export async function saveDraft(key: ContentDocumentKey, value: unknown, expectedVersion: number, userId: string) {
  const validated = validateContentDocument(value);
  const rows = await db.update(contentDocuments).set({
    draftJson: JSON.stringify(validated),
    draftVersion: expectedVersion + 1,
    draftUpdatedAt: new Date(),
    updatedBy: userId,
  }).where(and(eq(contentDocuments.key, key), eq(contentDocuments.draftVersion, expectedVersion))).returning();
  if (!rows.length) throw new Error("CONTENT_VERSION_CONFLICT");
  return rows[0];
}

export async function publishDocument(key: ContentDocumentKey, expectedDraftVersion: number, userId: string) {
  const now = new Date();
  const current = await db.query.contentDocuments.findFirst({ where: eq(contentDocuments.key, key) });
  if (!current || current.draftVersion !== expectedDraftVersion) throw new Error("CONTENT_VERSION_CONFLICT");

  const nextPublishedVersion = current.publishedVersion + 1;
  db.transaction((tx) => {
    tx.insert(contentRevisions).values({
      id: randomUUID(), documentKey: key, version: nextPublishedVersion,
      contentJson: current.draftJson, publishedBy: userId, publishedAt: now,
    }).run();
    tx.update(contentDocuments).set({
      publishedJson: current.draftJson,
      publishedVersion: nextPublishedVersion,
      publishedAt: now,
      publishedBy: userId,
    }).where(eq(contentDocuments.key, key)).run();

    const retained = tx.select({ version: contentRevisions.version }).from(contentRevisions)
      .where(eq(contentRevisions.documentKey, key)).orderBy(desc(contentRevisions.version)).limit(20).all();
    if (retained.length === 20) {
      tx.delete(contentRevisions).where(and(eq(contentRevisions.documentKey, key), lt(contentRevisions.version, retained[19].version))).run();
    }
  });
  return getContentDocument(key);
}

export async function listRevisions(key: ContentDocumentKey) {
  return db.select().from(contentRevisions).where(eq(contentRevisions.documentKey, key)).orderBy(desc(contentRevisions.version)).limit(20);
}

export async function restoreRevision(key: ContentDocumentKey, revisionId: string, expectedDraftVersion: number, userId: string) {
  const revision = await db.query.contentRevisions.findFirst({ where: and(eq(contentRevisions.id, revisionId), eq(contentRevisions.documentKey, key)) });
  if (!revision) throw new Error("REVISION_NOT_FOUND");
  return saveDraft(key, JSON.parse(revision.contentJson), expectedDraftVersion, userId);
}

export { defaults as defaultDocuments };
