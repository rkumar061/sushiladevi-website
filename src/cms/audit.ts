import { randomUUID } from "node:crypto";
import { db } from "@/cms/db";
import { auditLogs } from "@/cms/schema";

export async function writeAudit(input: {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: unknown;
  ipAddress?: string | null;
}) {
  await db.insert(auditLogs).values({
    id: randomUUID(),
    userId: input.userId ?? null,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId ?? null,
    metadataJson: input.metadata === undefined ? null : JSON.stringify(input.metadata),
    ipAddress: input.ipAddress ?? null,
    createdAt: new Date(),
  });
}
