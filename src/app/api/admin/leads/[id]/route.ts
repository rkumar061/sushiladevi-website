import { NextResponse } from "next/server";
import { z } from "zod";
import { assertSameOrigin, canManageLeads, getCurrentUser } from "@/cms/auth";
import { leadStatuses, updateLead } from "@/cms/lead-repository";
import { writeAudit } from "@/cms/audit";

const patchSchema = z.object({
  status: z.enum(leadStatuses).optional(),
  notes: z.string().max(10_000).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
}).refine((value) => Object.keys(value).length > 0);

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!canManageLeads(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = await context.params;
    const changes = patchSchema.parse(await request.json());
    const updated = await updateLead(id, changes);
    if (!updated) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    await writeAudit({ userId: user.id, action: "lead.updated", entityType: "lead", entityId: id, metadata: changes });
    return NextResponse.json({ lead: updated });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Invalid lead update." }, { status: 400 });
    return NextResponse.json({ error: "The lead could not be updated." }, { status: 400 });
  }
}
