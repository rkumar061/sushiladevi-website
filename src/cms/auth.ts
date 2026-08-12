import { hash, verify } from "argon2";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { and, count, eq, gt, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/cms/db";
import { loginAttempts, sessions, users } from "@/cms/schema";
import { ensureCmsInitialized } from "@/cms/initialize";

export const CMS_SESSION_COOKIE = "cms_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export interface CmsUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "admission_staff";
  active: boolean;
  mustChangePassword: boolean;
}

const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");
export const passwordIsStrong = (password: string) => password.length >= 12 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);

export async function createCmsUser(input: { email: string; name: string; password: string; role?: "admin" | "admission_staff"; mustChangePassword?: boolean }) {
  if (!passwordIsStrong(input.password)) throw new Error("WEAK_PASSWORD");
  const now = new Date();
  const record = {
    id: randomUUID(),
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
    role: input.role ?? "admin",
    passwordHash: await hash(input.password, { type: 2 }),
    active: true,
    mustChangePassword: input.mustChangePassword ?? true,
    createdAt: now,
    updatedAt: now,
  };
  await db.insert(users).values(record);
  return { id: record.id, email: record.email, name: record.name };
}

export async function isLoginRateLimited(email: string, ipAddress: string) {
  const since = new Date(Date.now() - 15 * 60 * 1000);
  const [result] = await db.select({ value: count() }).from(loginAttempts).where(and(
    eq(loginAttempts.email, email.trim().toLowerCase()),
    eq(loginAttempts.ipAddress, ipAddress),
    eq(loginAttempts.succeeded, false),
    gt(loginAttempts.createdAt, since),
  ));
  return result.value >= 8;
}

export async function authenticateUser(email: string, password: string, ipAddress: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await db.query.users.findFirst({ where: eq(users.email, normalizedEmail) });
  const valid = Boolean(user?.active && await verify(user.passwordHash, password).catch(() => false));
  await db.insert(loginAttempts).values({ id: randomUUID(), email: normalizedEmail, ipAddress, succeeded: valid, createdAt: new Date() });
  if (!valid || !user) return null;
  await db.update(users).set({ lastLoginAt: new Date(), updatedAt: new Date() }).where(eq(users.id, user.id));
  return user;
}

export async function createSession(userId: string, metadata: { ipAddress?: string; userAgent?: string }) {
  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  await db.insert(sessions).values({
    id: randomUUID(), userId, tokenHash: tokenHash(token),
    createdAt: now, lastSeenAt: now,
    expiresAt: new Date(now.getTime() + SESSION_DURATION_MS),
    ipAddress: metadata.ipAddress ?? null,
    userAgent: metadata.userAgent?.slice(0, 500) ?? null,
  });
  return token;
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(CMS_SESSION_COOKIE)?.value;
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash(token)));
  cookieStore.delete(CMS_SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<CmsUser | null> {
  await ensureCmsInitialized();
  const token = (await cookies()).get(CMS_SESSION_COOKIE)?.value;
  if (!token) return null;
  const [row] = await db.select({
    id: users.id, email: users.email, name: users.name, role: users.role, active: users.active,
    mustChangePassword: users.mustChangePassword, sessionId: sessions.id,
  }).from(sessions).innerJoin(users, eq(sessions.userId, users.id)).where(and(
    eq(sessions.tokenHash, tokenHash(token)),
    gt(sessions.expiresAt, new Date()),
    eq(users.active, true),
  )).limit(1);
  if (!row) return null;
  await db.update(sessions).set({ lastSeenAt: new Date() }).where(eq(sessions.id, row.sessionId));
  return { id: row.id, email: row.email, name: row.name, role: row.role, active: row.active, mustChangePassword: row.mustChangePassword };
}

export function isAdmin(user: CmsUser | null): user is CmsUser {
  return Boolean(user && user.role === "admin");
}

export function canManageLeads(user: CmsUser | null): user is CmsUser {
  return Boolean(user && (user.role === "admin" || user.role === "admission_staff"));
}

export async function requireCmsUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function requireAdminUser() {
  const user = await requireCmsUser();
  if (user.role !== "admin") redirect("/admin/leads");
  return user;
}

export async function requireLeadUser() {
  const user = await requireCmsUser();
  if (!canManageLeads(user)) redirect("/admin/login");
  return user;
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) throw new Error("INVALID_ORIGIN");
}

export async function activeUserCount(excludingId?: string) {
  const where = excludingId ? and(eq(users.active, true), ne(users.id, excludingId)) : eq(users.active, true);
  const [result] = await db.select({ value: count() }).from(users).where(where);
  return result.value;
}
