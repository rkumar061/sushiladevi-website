import { NextResponse } from "next/server";
import { z } from "zod";
import { writeAudit } from "@/cms/audit";
import { canManageLeads, getCurrentUser } from "@/cms/auth";
import { leadStatuses, listLeads } from "@/cms/lead-repository";
import { leadsToCsv } from "@/cms/leads-csv";

const querySchema = z.object({
  search: z.string().max(100).optional(),
  status: z.enum(leadStatuses).optional(),
});

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!canManageLeads(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return NextResponse.json({ error: "Invalid filters." }, { status: 400 });

  const leads = await listLeads(parsed.data, 10_000);
  await writeAudit({
    userId: user.id,
    action: "leads.exported",
    entityType: "lead",
    metadata: { count: leads.length, filters: parsed.data },
  });
  const filename = `admission-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  return new NextResponse(leadsToCsv(leads), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
