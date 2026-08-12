import { createHash, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";
import { and, desc, eq, isNull, like, or } from "drizzle-orm";
import { db } from "@/cms/db";
import { contentDocuments, mediaAssets } from "@/cms/schema";

export const uploadRoot = resolve(/* turbopackIgnore: true */ process.env.CMS_UPLOAD_DIR || "storage/uploads");
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const allowedTypes = new Set([...imageTypes, "application/pdf"]);

export async function storeMedia(file: File, altText: string, caption: string, userId: string) {
  const input = Buffer.from(await file.arrayBuffer());
  const detected = await fileTypeFromBuffer(input);
  if (!detected || !allowedTypes.has(detected.mime)) throw new Error("UNSUPPORTED_FILE_TYPE");
  const declaredExtension = extname(file.name).toLowerCase();
  const acceptedExtensions: Record<string, string[]> = {
    "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"], "image/webp": [".webp"],
    "image/avif": [".avif"], "application/pdf": [".pdf"],
  };
  if (!acceptedExtensions[detected.mime]?.includes(declaredExtension)) throw new Error("EXTENSION_MISMATCH");
  const isImage = imageTypes.has(detected.mime);
  const maxSize = isImage ? 10 * 1024 * 1024 : 25 * 1024 * 1024;
  if (input.byteLength > maxSize) throw new Error("FILE_TOO_LARGE");
  if (isImage && !altText.trim()) throw new Error("ALT_TEXT_REQUIRED");

  let width: number | null = null;
  let height: number | null = null;
  if (isImage) {
    const metadata = await sharp(input).metadata();
    width = metadata.width ?? null;
    height = metadata.height ?? null;
    if (!width || !height) throw new Error("INVALID_IMAGE");
  }

  const now = new Date();
  const id = randomUUID();
  const storedName = `${randomUUID()}.${detected.ext}`;
  const relativeDirectory = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const directory = join(uploadRoot, relativeDirectory);
  const storagePath = join(relativeDirectory, storedName).replace(/\\/g, "/");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, storedName), input, { flag: "wx" });
  const safeOriginal = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120) || `file.${detected.ext}`;
  const publicUrl = `/media/${id}/${encodeURIComponent(safeOriginal)}`;
  const record = {
    id, originalName: safeOriginal, storedName, storagePath, publicUrl,
    mimeType: detected.mime, size: input.byteLength, width, height,
    altText: altText.trim() || null, caption: caption.trim() || null,
    checksum: createHash("sha256").update(input).digest("hex"),
    uploadedBy: userId, createdAt: now,
  };
  await db.insert(mediaAssets).values(record);
  return record;
}

export async function listMedia(search = "", kind = "all") {
  const filters = [isNull(mediaAssets.trashedAt)];
  if (search) filters.push(or(like(mediaAssets.originalName, `%${search}%`), like(mediaAssets.altText, `%${search}%`))!);
  if (kind === "image") filters.push(like(mediaAssets.mimeType, "image/%"));
  if (kind === "pdf") filters.push(eq(mediaAssets.mimeType, "application/pdf"));
  return db.select().from(mediaAssets).where(and(...filters)).orderBy(desc(mediaAssets.createdAt)).limit(250);
}

export async function mediaIsReferenced(id: string, publicUrl: string) {
  const documents = await db.select({ draft: contentDocuments.draftJson, published: contentDocuments.publishedJson }).from(contentDocuments);
  return documents.some((document) => document.draft.includes(id) || document.published.includes(id) || document.draft.includes(publicUrl) || document.published.includes(publicUrl));
}

export async function trashMedia(id: string) {
  const asset = await db.query.mediaAssets.findFirst({ where: and(eq(mediaAssets.id, id), isNull(mediaAssets.trashedAt)) });
  if (!asset) throw new Error("MEDIA_NOT_FOUND");
  if (await mediaIsReferenced(asset.id, asset.publicUrl)) throw new Error("MEDIA_IN_USE");
  await db.update(mediaAssets).set({ trashedAt: new Date() }).where(eq(mediaAssets.id, id));
  return asset;
}

export function resolveMediaPath(storagePath: string) {
  const fullPath = resolve(uploadRoot, storagePath);
  const rootWithSeparator = `${uploadRoot}${process.platform === "win32" ? "\\" : "/"}`;
  if (fullPath !== uploadRoot && !fullPath.startsWith(rootWithSeparator)) throw new Error("INVALID_MEDIA_PATH");
  return fullPath;
}

export const extensionFromName = (name: string) => extname(name).toLowerCase();
