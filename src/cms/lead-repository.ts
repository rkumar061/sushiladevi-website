import { createHash, randomUUID } from "node:crypto";
import { and, count, desc, eq, gte, like, or, type SQL } from "drizzle-orm";
import { db } from "@/cms/db";
import { leads } from "@/cms/schema";

export const leadStatuses = ["new", "contacted", "qualified", "admitted", "closed"] as const;
export type LeadStatus = typeof leadStatuses[number];

export function hashLeadIp(ip: string) {
  return createHash("sha256").update(`${process.env.CMS_IP_HASH_SALT ?? "cms-leads"}:${ip}`).digest("hex");
}

export async function isLeadRateLimited(ipHash: string) {
  const [recent] = await db.select({ value: count() }).from(leads).where(and(
    eq(leads.ipHash, ipHash),
    gte(leads.createdAt, new Date(Date.now() - 15 * 60 * 1000)),
  ));
  return recent.value >= 5;
}

export async function createLead(input: {
  name?: string; email?: string; phone?: string; source: string; pageUrl?: string;
  referrer?: string; fields: Record<string, string | number | boolean | null>; ipHash?: string; userAgent?: string;
}) {
  const now = new Date();
  const record = {
    id: randomUUID(), name: input.name || null, email: input.email || null, phone: input.phone || null,
    source: input.source, pageUrl: input.pageUrl || null, referrer: input.referrer || null,
    fieldsJson: JSON.stringify(input.fields), ipHash: input.ipHash || null,
    userAgent: input.userAgent?.slice(0, 500) || null, createdAt: now, updatedAt: now,
  };
  await db.insert(leads).values(record);
  return record.id;
}

function presentLead(row: typeof leads.$inferSelect) {
  let fields: Record<string, unknown> = {};
  try { fields = JSON.parse(row.fieldsJson) as Record<string, unknown>; } catch {}
  return { ...row, fields, message: typeof fields.message === "string" ? fields.message : "", fieldsJson: undefined, ipHash: undefined };
}

export async function listLeads(input: { search?: string; status?: LeadStatus; assignedTo?: string }, limit = 500) {
  const filters: SQL[] = [];
  if (input.status) filters.push(eq(leads.status, input.status));
  if (input.assignedTo) filters.push(eq(leads.assignedTo, input.assignedTo));
  if (input.search) {
    const term = `%${input.search.slice(0, 100)}%`;
    const searchFilter = or(like(leads.name, term), like(leads.email, term), like(leads.phone, term), like(leads.fieldsJson, term));
    if (searchFilter) filters.push(searchFilter);
  }
  const rows = await db.select().from(leads).where(filters.length ? and(...filters) : undefined).orderBy(desc(leads.createdAt)).limit(Math.min(Math.max(limit, 1), 10_000));
  return rows.map(presentLead);
}

export async function updateLead(id: string, changes: { status?: LeadStatus; notes?: string; assignedTo?: string | null }) {
  const [updated] = await db.update(leads).set({ ...changes, updatedAt: new Date() }).where(eq(leads.id, id)).returning();
  return updated ? presentLead(updated) : undefined;
}
