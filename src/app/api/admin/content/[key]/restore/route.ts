import { z } from "zod";
import { NextResponse } from "next/server";
import { assertSameOrigin, getCurrentUser, isAdmin } from "@/cms/auth";
import { documentKeySchema } from "@/cms/content-types";
import { restoreRevision } from "@/cms/content-repository";
import { writeAudit } from "@/cms/audit";

const schema = z.object({ revisionId: z.string().uuid(), expectedDraftVersion: z.number().int().positive() });
export async function POST(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const key = documentKeySchema.parse(decodeURIComponent((await params).key));
    const input = schema.parse(await request.json());
    const result = await restoreRevision(key, input.revisionId, input.expectedDraftVersion, user.id);
    await writeAudit({ userId: user.id, action: "content.revision_restored", entityType: "content", entityId: key, metadata: { revisionId: input.revisionId } });
    return NextResponse.json({ ok: true, draftVersion: result.draftVersion });
  } catch (error) {
    if (error instanceof Error && error.message === "CONTENT_VERSION_CONFLICT") return NextResponse.json({ error: "This content changed in another session. Reload before restoring." }, { status: 409 });
    return NextResponse.json({ error: "The revision could not be restored." }, { status: 400 });
  }
}
