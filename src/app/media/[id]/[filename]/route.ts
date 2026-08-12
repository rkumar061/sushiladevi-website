import { readFile } from "node:fs/promises";
import { and, eq, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/cms/db";
import { mediaAssets } from "@/cms/schema";
import { ensureCmsInitialized } from "@/cms/initialize";
import { resolveMediaPath } from "@/cms/media";

export async function GET(_: Request, { params }: { params: Promise<{ id: string; filename: string }> }) {
  await ensureCmsInitialized();
  const { id } = await params;
  const asset = await db.query.mediaAssets.findFirst({ where: and(eq(mediaAssets.id, id), isNull(mediaAssets.trashedAt)) });
  if (!asset) return new NextResponse("Not found", { status: 404 });
  try {
    const file = await readFile(resolveMediaPath(asset.storagePath));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": asset.mimeType,
        "Content-Length": String(asset.size),
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(asset.mimeType === "application/pdf" ? { "Content-Disposition": `attachment; filename="${asset.originalName}"` } : {}),
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
