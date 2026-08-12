import { NextResponse } from "next/server";
import { z } from "zod";
import { canManageLeads, getCurrentUser } from "@/cms/auth";
import { leadStatuses, listLeads } from "@/cms/lead-repository";

const querySchema = z.object({ search: z.string().max(100).optional(), status: z.enum(leadStatuses).optional(), assignedTo: z.string().uuid().optional() });

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!canManageLeads(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) return NextResponse.json({ error: "Invalid filters." }, { status: 400 });
  return NextResponse.json({ leads: await listLeads(parsed.data), statuses: leadStatuses });
}
