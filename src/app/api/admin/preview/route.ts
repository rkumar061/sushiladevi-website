import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/cms/auth";

const allowedPaths = new Set(["/", "/about", "/about/chairmans-desk", "/campus-life", "/bnys", "/why-choose-us", "/faqs", "/faculty", "/facilities", "/contact"]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("exit") === "1") {
    (await draftMode()).disable();
    const user = await getCurrentUser();
    return NextResponse.redirect(new URL(isAdmin(user) ? "/admin/content" : "/admin/login", request.url));
  }
  const user = await getCurrentUser();
  if (!isAdmin(user)) return NextResponse.redirect(new URL("/admin", request.url));
  const requestedPath = url.searchParams.get("path") || "/";
  const path = allowedPaths.has(requestedPath) ? requestedPath : "/";
  (await draftMode()).enable();
  const previewUrl = new URL(path, request.url);
  previewUrl.searchParams.set("cms-preview", "1");
  return NextResponse.redirect(previewUrl);
}

export async function DELETE() {
  const user = await getCurrentUser();
  if (!isAdmin(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  (await draftMode()).disable();
  return NextResponse.json({ ok: true });
}
