import Link from "next/link";
import { FileEdit, Images, Users } from "lucide-react";
import { documentKeys } from "@/cms/content-types";
import { ensureCmsInitialized } from "@/cms/initialize";
import { db } from "@/cms/db";
import { mediaAssets, users } from "@/cms/schema";
import { count, eq } from "drizzle-orm";
import { requireAdminUser } from "@/cms/auth";

export default async function AdminDashboard() {
  await requireAdminUser();
  await ensureCmsInitialized();
  const [[media], [userCount]] = await Promise.all([db.select({ value: count() }).from(mediaAssets), db.select({ value: count() }).from(users).where(eq(users.active, true))]);
  return <div className="mx-auto max-w-6xl"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Overview</p><h1 className="mt-2 text-3xl font-black">Website CMS</h1><p className="mt-2 text-sm text-gray-600">Edit structured content, save drafts, preview changes and publish to the live site.</p></div><div className="mt-7 grid gap-4 sm:grid-cols-3"><div className="cms-stat"><FileEdit /><strong>{documentKeys.length}</strong><span>Content documents</span></div><div className="cms-stat"><Images /><strong>{media.value}</strong><span>Media assets</span></div><div className="cms-stat"><Users /><strong>{userCount.value}</strong><span>Active users</span></div></div><section className="mt-8 rounded-2xl border bg-white p-5"><h2 className="text-lg font-black">Content documents</h2><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{documentKeys.map((key) => <Link key={key} href={`/admin/content/${encodeURIComponent(key)}`} className="rounded-xl border border-gray-200 p-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow"><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{key.startsWith("page.") ? "Page" : "Shared"}</p><p className="mt-1 font-black text-gray-950">{key.replace("page.", "").replace(/([A-Z])/g, " $1")}</p></Link>)}</div></section></div>;
}
