import { hash } from "argon2";
import { and, asc, count, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { NextResponse } from "next/server";
import { assertSameOrigin, createCmsUser, getCurrentUser, isAdmin, passwordIsStrong } from "@/cms/auth";
import { db } from "@/cms/db";
import { users } from "@/cms/schema";
import { writeAudit } from "@/cms/audit";

const roleSchema = z.enum(["admin", "admission_staff"]);
const createSchema = z.object({ email: z.string().email(), name: z.string().min(2).max(100), password: z.string(), role: roleSchema.default("admin") });
export async function GET() {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const records = await db.select({ id: users.id, email: users.email, name: users.name, role: users.role, active: users.active, mustChangePassword: users.mustChangePassword, createdAt: users.createdAt, lastLoginAt: users.lastLoginAt }).from(users).orderBy(asc(users.name));
  return NextResponse.json({ users: records, currentUserId: user.id });
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const input = createSchema.parse(await request.json());
    if (!passwordIsStrong(input.password)) return NextResponse.json({ error: "Use at least 12 characters with upper/lowercase letters and a number." }, { status: 400 });
    const created = await createCmsUser({ ...input, mustChangePassword: true });
    await writeAudit({ userId: user.id, action: "user.created", entityType: "user", entityId: created.id });
    return NextResponse.json({ user: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && /unique/i.test(error.message) ? "That email address is already in use." : "The user could not be created.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

const patchSchema = z.object({ id: z.string().uuid(), active: z.boolean().optional(), role: roleSchema.optional(), temporaryPassword: z.string().optional() });
export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);
    const currentUser = await getCurrentUser();
    if (!isAdmin(currentUser)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const input = patchSchema.parse(await request.json());
    if (input.id === currentUser.id && input.active === false) return NextResponse.json({ error: "You cannot deactivate your own account." }, { status: 400 });
    if (input.id === currentUser.id && input.role && input.role !== "admin") return NextResponse.json({ error: "You cannot change your own administrator role." }, { status: 400 });
    const target = await db.query.users.findFirst({ where: eq(users.id, input.id) });
    if (!target) return NextResponse.json({ error: "User not found." }, { status: 404 });
    const removesActiveAdmin = target.active && target.role === "admin" && (input.active === false || input.role === "admission_staff");
    if (removesActiveAdmin) {
      const [remaining] = await db.select({ value: count() }).from(users).where(and(eq(users.active, true), eq(users.role, "admin"), ne(users.id, input.id)));
      if (remaining.value === 0) return NextResponse.json({ error: "The final active administrator cannot be removed or reassigned." }, { status: 400 });
    }
    const changes: { active?: boolean; role?: "admin" | "admission_staff"; passwordHash?: string; mustChangePassword?: boolean; updatedAt: Date } = { updatedAt: new Date() };
    if (input.active !== undefined) changes.active = input.active;
    if (input.role !== undefined) changes.role = input.role;
    if (input.temporaryPassword) {
      if (!passwordIsStrong(input.temporaryPassword)) return NextResponse.json({ error: "Use at least 12 characters with upper/lowercase letters and a number." }, { status: 400 });
      changes.passwordHash = await hash(input.temporaryPassword, { type: 2 });
      changes.mustChangePassword = true;
    }
    const [updated] = await db.update(users).set(changes).where(eq(users.id, input.id)).returning({ id: users.id, active: users.active });
    if (!updated) return NextResponse.json({ error: "User not found." }, { status: 404 });
    const activeUsers = await db.select({ id: users.id }).from(users).where(eq(users.active, true));
    if (!activeUsers.length) {
      await db.update(users).set({ active: true }).where(eq(users.id, input.id));
      return NextResponse.json({ error: "The final active account cannot be deactivated." }, { status: 400 });
    }
    await writeAudit({ userId: currentUser.id, action: input.temporaryPassword ? "user.password_reset" : "user.status_changed", entityType: "user", entityId: input.id, metadata: { active: input.active } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The user could not be updated." }, { status: 400 });
  }
}
