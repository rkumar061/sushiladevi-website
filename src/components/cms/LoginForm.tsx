"use client";

import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setError(data.error || "Unable to sign in.");
    router.push("/admin");
    router.refresh();
  };
  return <form onSubmit={submit} className="mt-7 space-y-4"><div><label className="cms-label" htmlFor="email">Email</label><input id="email" name="email" type="email" required autoComplete="username" className="cms-input" /></div><div><label className="cms-label" htmlFor="password">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="cms-input" /></div>{error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}<button disabled={busy} className="cms-primary-button w-full justify-center py-3"><LockKeyhole />{busy ? "Signing in…" : "Sign in"}</button></form>;
};
