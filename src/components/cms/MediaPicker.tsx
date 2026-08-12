"use client";

import React, { useEffect, useState } from "react";
import { FileText, ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";

interface Asset { id: string; originalName: string; publicUrl: string; mimeType: string; altText: string | null; size: number }

export const MediaPicker: React.FC<{ kind: "image" | "pdf"; onSelect: (url: string) => void; onClose: () => void }> = ({ kind, onSelect, onClose }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const load = async () => { const response = await fetch(`/api/admin/media?kind=${kind}&search=${encodeURIComponent(search)}`); const data = await response.json(); setAssets(data.assets || []); };
  // The first fetch hydrates this modal-only library from the protected API.
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { void load(); }, []);

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(event.currentTarget) });
    const data = await response.json();
    if (!response.ok) return setError(data.error || "Upload failed.");
    onSelect(data.asset.publicUrl);
  };

  return <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-label="Media library">
    <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Media library</p><h2 className="text-2xl font-black text-gray-950">Choose or upload {kind === "image" ? "an image" : "a PDF"}</h2></div><button type="button" onClick={onClose} className="rounded-full bg-gray-100 p-2"><X className="h-5 w-5" /></button></div>
      <form onSubmit={upload} className="mt-5 grid gap-3 rounded-2xl bg-gray-50 p-4 sm:grid-cols-[1fr_1fr_auto]">
        <input name="file" type="file" required accept={kind === "image" ? "image/jpeg,image/png,image/webp,image/avif" : "application/pdf"} className="rounded-xl border bg-white p-2 text-sm" />
        <input name="altText" required={kind === "image"} placeholder={kind === "image" ? "Alternative text (required)" : "Description"} className="rounded-xl border px-3 text-sm" />
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white"><Upload className="h-4 w-4" />Upload</button>
      </form>
      {error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
      <div className="mt-5 flex gap-2"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search media" className="flex-1 rounded-xl border px-4 py-2 text-sm" /><button type="button" onClick={() => void load()} className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white">Search</button></div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{assets.map((asset) => <button type="button" key={asset.id} onClick={() => onSelect(asset.publicUrl)} className="overflow-hidden rounded-2xl border text-left transition hover:-translate-y-1 hover:shadow-lg">{asset.mimeType.startsWith("image/") ? <Image unoptimized src={asset.publicUrl} alt={asset.altText || ""} width={640} height={360} className="h-36 w-full object-cover" /> : <div className="flex h-36 items-center justify-center bg-red-50"><FileText className="h-12 w-12 text-red-700" /></div>}<div className="p-3"><p className="truncate text-xs font-bold text-gray-900">{asset.originalName}</p><p className="mt-1 text-[10px] text-gray-500">{Math.round(asset.size / 1024)} KB</p></div></button>)}</div>
      {!assets.length && <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-dashed p-12 text-sm text-gray-500"><ImageIcon className="h-5 w-5" />No matching files.</div>}
    </div>
  </div>;
};
