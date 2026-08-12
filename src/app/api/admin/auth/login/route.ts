import { z } from "zod";
import { NextResponse } from "next/server";
import { assertSameOrigin, authenticateUser, createSession, isLoginRateLimited, setSessionCookie } from "@/cms/auth";
import { ensureCmsInitialized } from "@/cms/initialize";
import { writeAudit } from "@/cms/audit";

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    await ensureCmsInitialized();
    const input = loginSchema.parse(await request.json());
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (await isLoginRateLimited(input.email, ipAddress)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
    const user = await authenticateUser(input.email, input.password, ipAddress);
    if (!user) {
      await writeAudit({ action: "login.failed", entityType: "user", metadata: { email: input.email }, ipAddress });
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const token = await createSession(user.id, { ipAddress, userAgent: request.headers.get("user-agent") || undefined });
    await setSessionCookie(token);
    await writeAudit({ userId: user.id, action: "login.succeeded", entityType: "user", entityId: user.id, ipAddress });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 400 });
  }
}
