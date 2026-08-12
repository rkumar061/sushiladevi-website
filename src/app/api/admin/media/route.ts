import { NextResponse } from "next/server";
import { assertSameOrigin, getCurrentUser, isAdmin } from "@/cms/auth";
import { ensureCmsInitialized } from "@/cms/initialize";
import { listMedia, storeMedia } from "@/cms/media";
import { writeAudit } from "@/cms/audit";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureCmsInitialized();
  const url = new URL(request.url);
  return NextResponse.json({ assets: await listMedia(url.searchParams.get("search") || "", url.searchParams.get("kind") || "all") });
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
    const asset = await storeMedia(file, String(form.get("altText") || ""), String(form.get("caption") || ""), user.id);
    await writeAudit({ userId: user.id, action: "media.uploaded", entityType: "media", entityId: asset.id, metadata: { name: asset.originalName, size: asset.size } });
    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    const messages: Record<string, string> = {
      UNSUPPORTED_FILE_TYPE: "Only JPEG, PNG, WebP, AVIF, and PDF files are accepted.",
      FILE_TOO_LARGE: "Images must be at most 10 MB and PDFs at most 25 MB.",
      ALT_TEXT_REQUIRED: "Alternative text is required for images.",
      INVALID_IMAGE: "The uploaded image is invalid.",
      EXTENSION_MISMATCH: "The filename extension does not match the uploaded file content.",
    };
    return NextResponse.json({ error: messages[error instanceof Error ? error.message : ""] || "The file could not be uploaded." }, { status: 400 });
  }
}
