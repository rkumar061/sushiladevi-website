import { z } from "zod";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { assertSameOrigin, getCurrentUser, isAdmin } from "@/cms/auth";
import { documentKeySchema, type ContentDocumentKey } from "@/cms/content-types";
import { publishDocument } from "@/cms/content-repository";
import { writeAudit } from "@/cms/audit";

const schema = z.object({ expectedDraftVersion: z.number().int().positive() });
const paths: Partial<Record<ContentDocumentKey, string>> = {
  "page.home": "/", "page.about": "/about", "page.chairman": "/about/chairmans-desk",
  "page.campusLife": "/campus-life", "page.bnys": "/bnys", "page.whyChooseUs": "/why-choose-us",
  "page.faqs": "/faqs", "page.faculty": "/faculty", "page.facilities": "/facilities", "page.contact": "/contact",
};

export async function POST(request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const key = documentKeySchema.parse(decodeURIComponent((await params).key));
    const input = schema.parse(await request.json());
    const document = await publishDocument(key, input.expectedDraftVersion, user.id);
    revalidatePath(paths[key] || "/", "layout");
    await writeAudit({ userId: user.id, action: "content.published", entityType: "content", entityId: key, metadata: { version: document?.publishedVersion } });
    return NextResponse.json({ ok: true, document });
  } catch (error) {
    if (error instanceof Error && error.message === "CONTENT_VERSION_CONFLICT") return NextResponse.json({ error: "This content changed in another session. Reload before publishing." }, { status: 409 });
    return NextResponse.json({ error: "The content could not be published." }, { status: 400 });
  }
}
