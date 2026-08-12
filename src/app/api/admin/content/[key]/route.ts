import { z } from "zod";
import { NextResponse } from "next/server";
import { assertSameOrigin, getCurrentUser, isAdmin } from "@/cms/auth";
import { documentKeySchema } from "@/cms/content-types";
import { getContentDocument, listRevisions, saveDraft } from "@/cms/content-repository";
import { ensureCmsInitialized } from "@/cms/initialize";
import { writeAudit } from "@/cms/audit";

const saveSchema = z.object({ value: z.unknown(), expectedVersion: z.number().int().positive() });

export async function GET(_: Request, { params }: { params: Promise<{ key: string }> }) {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureCmsInitialized();
  const key = documentKeySchema.parse(decodeURIComponent((await params).key));
  const [document, revisions] = await Promise.all([getContentDocument(key), listRevisions(key)]);
  return NextResponse.json({ document, revisions });
}

export async function PUT(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const key = documentKeySchema.parse(decodeURIComponent((await params).key));
    const input = saveSchema.parse(await request.json());
    const result = await saveDraft(key, input.value, input.expectedVersion, user.id);
    await writeAudit({ userId: user.id, action: "content.draft_saved", entityType: "content", entityId: key, metadata: { version: result.draftVersion } });
    return NextResponse.json({ ok: true, draftVersion: result.draftVersion, updatedAt: result.draftUpdatedAt });
  } catch (error) {
    if (error instanceof Error && error.message === "CONTENT_VERSION_CONFLICT") return NextResponse.json({ error: "This content changed in another session. Reload before saving." }, { status: 409 });
    return NextResponse.json({ error: "The content could not be saved." }, { status: 400 });
  }
}
