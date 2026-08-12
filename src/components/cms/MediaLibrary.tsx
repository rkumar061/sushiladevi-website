"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, Pencil, RefreshCw, Search, Trash2, Upload } from "lucide-react";

interface Asset { id: string; originalName: string; publicUrl: string; mimeType: string; altText: string | null; caption: string | null; size: number; createdAt: string }

export const MediaLibrary = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState("all");
  const [message, setMessage] = useState("");
  const load = async () => {
    const response = await fetch(`/api/admin/media?search=${encodeURIComponent(search)}&kind=${kind}`);
    const data = await response.json();
    setAssets(data.assets || []);
  };
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { void load(); }, []);

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage("Uploading…");
    const formElement = event.currentTarget;
    const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(formElement) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error || "Upload failed.");
    formElement.reset(); setMessage("Upload complete."); await load();
  };
  const edit = async (asset: Asset) => {
    const altText = prompt("Alternative text", asset.altText || "");
    if (altText === null) return;
    const caption = prompt("Caption", asset.caption || "");
    if (caption === null) return;
    const response = await fetch(`/api/admin/media/${asset.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ altText, caption }) });
    const data = await response.json(); setMessage(response.ok ? "Media details updated." : data.error);
    if (response.ok) await load();
  };
  const remove = async (id: string) => {
    if (!confirm("Move this unused file to trash?")) return;
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    const data = await response.json(); setMessage(response.ok ? "File moved to trash." : data.error);
    if (response.ok) await load();
  };

  return <div>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Media</p><h1 className="mt-1 text-3xl font-black">Media library</h1><p className="mt-2 text-sm text-gray-600">Reusable images and PDFs stored on the server.</p></div><button type="button" onClick={() => void load()} className="cms-secondary-button"><RefreshCw />Refresh</button></div>
    <form onSubmit={upload} className="mt-7 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-[1fr_1fr_1fr_auto]"><input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/avif,application/pdf" className="cms-input" /><input name="altText" placeholder="Image alt text" className="cms-input" /><input name="caption" placeholder="Caption (optional)" className="cms-input" /><button className="cms-primary-button justify-center"><Upload />Upload</button></form>
    {message && <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{message}</p>}
    <div className="mt-6 flex flex-col gap-2 rounded-2xl border bg-white p-4 sm:flex-row"><label className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search files" className="cms-input pl-10" /></label><select value={kind} onChange={(event) => setKind(event.target.value)} className="cms-input sm:w-40"><option value="all">All files</option><option value="image">Images</option><option value="pdf">PDFs</option></select><button type="button" onClick={() => void load()} className="cms-secondary-button justify-center">Apply</button></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{assets.map((asset) => <article key={asset.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">{asset.mimeType.startsWith("image/") ? <Image unoptimized src={asset.publicUrl} alt={asset.altText || ""} width={640} height={360} className="h-44 w-full object-cover" /> : <div className="flex h-44 items-center justify-center bg-red-50"><FileText className="h-14 w-14 text-red-700" /></div>}<div className="p-4"><p className="truncate text-sm font-black">{asset.originalName}</p><p className="mt-1 line-clamp-2 text-xs text-gray-500">{asset.altText || asset.caption || "No description"}</p><div className="mt-3 flex items-center justify-between"><span className="text-[10px] font-bold text-gray-400">{Math.round(asset.size / 1024)} KB</span><span className="flex"><button type="button" onClick={() => void edit(asset)} className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50" aria-label={`Edit ${asset.originalName}`}><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => void remove(asset.id)} className="rounded-lg p-2 text-red-700 hover:bg-red-50" aria-label={`Delete ${asset.originalName}`}><Trash2 className="h-4 w-4" /></button></span></div></div></article>)}</div>
  </div>;
};
