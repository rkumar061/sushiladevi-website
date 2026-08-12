import { redirect } from "next/navigation";
import { getCurrentUser } from "@/cms/auth";
import { LoginForm } from "@/components/cms/LoginForm";

export const dynamic = "force-dynamic";
export default async function AdminLoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return <main className="flex min-h-screen items-center justify-center bg-[#082f22] p-4"><div className="w-full max-w-md rounded-[2rem] bg-white p-7 shadow-2xl sm:p-9"><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-700">CMS access</p><h1 className="mt-2 text-3xl font-black text-gray-950">Welcome back</h1><p className="mt-2 text-sm leading-6 text-gray-600">Sign in to edit, preview and publish website content.</p><LoginForm /></div></main>;
}
