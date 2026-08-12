import { NextResponse } from "next/server";
import { assertSameOrigin, clearSession, getCurrentUser } from "@/cms/auth";
import { writeAudit } from "@/cms/audit";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await getCurrentUser();
    await clearSession();
    if (user) await writeAudit({ userId: user.id, action: "logout", entityType: "user", entityId: user.id });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to sign out." }, { status: 400 });
  }
}
