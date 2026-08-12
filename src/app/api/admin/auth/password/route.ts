import { hash, verify } from "argon2";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { assertSameOrigin, getCurrentUser, passwordIsStrong } from "@/cms/auth";
import { db } from "@/cms/db";
import { users } from "@/cms/schema";
import { writeAudit } from "@/cms/audit";

const schema = z.object({ currentPassword: z.string(), newPassword: z.string() });
export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const input = schema.parse(await request.json());
    if (!passwordIsStrong(input.newPassword)) return NextResponse.json({ error: "Use at least 12 characters with upper/lowercase letters and a number." }, { status: 400 });
    const user = await db.query.users.findFirst({ where: eq(users.id, currentUser.id) });
    if (!user || !await verify(user.passwordHash, input.currentPassword)) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    await db.update(users).set({ passwordHash: await hash(input.newPassword, { type: 2 }), mustChangePassword: false, updatedAt: new Date() }).where(eq(users.id, user.id));
    await writeAudit({ userId: user.id, action: "password.changed", entityType: "user", entityId: user.id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to change password." }, { status: 400 });
  }
}
