import { z } from "zod";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { assertSameOrigin, getCurrentUser, isAdmin } from "@/cms/auth";
import { db } from "@/cms/db";
import { mediaAssets } from "@/cms/schema";
import { trashMedia } from "@/cms/media";
import { writeAudit } from "@/cms/audit";

const updateSchema = z.object({ altText: z.string().max(500).optional(), caption: z.string().max(1000).optional() });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const id = z.string().uuid().parse((await params).id);
    const input = updateSchema.parse(await request.json());
    const [asset] = await db.update(mediaAssets).set({ altText: input.altText, caption: input.caption }).where(eq(mediaAssets.id, id)).returning();
    await writeAudit({ userId: user.id, action: "media.updated", entityType: "media", entityId: id });
    return NextResponse.json({ asset });
  } catch {
    return NextResponse.json({ error: "The media details could not be updated." }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const id = z.string().uuid().parse((await params).id);
    await trashMedia(id);
    await writeAudit({ userId: user.id, action: "media.trashed", entityType: "media", entityId: id });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "MEDIA_IN_USE") return NextResponse.json({ error: "This file is referenced by site content and cannot be deleted." }, { status: 409 });
    return NextResponse.json({ error: "The file could not be deleted." }, { status: 400 });
  }
}
