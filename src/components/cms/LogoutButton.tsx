"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
export const LogoutButton = () => { const router = useRouter(); return <button type="button" onClick={async () => { await fetch("/api/admin/auth/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white"><LogOut className="h-4 w-4" />Sign out</button>; };
