"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FileText, ImageIcon, Pencil, RefreshCw, Search, Trash2, Upload, X } from "lucide-react";

interface Asset { id: string; originalName: string; publicUrl: string; mimeType: string; altText: string | null; caption: string | null; size: number; createdAt: string }

export const MediaLibrary = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState("all");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const response = await fetch(`/api/admin/media?search=${encodeURIComponent(search)}&kind=${kind}`);
    const data = await response.json();
    setAssets(data.assets || []);
  };
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { void load(); }, []);

  useEffect(() => {
    const newPreviews: { [key: string]: string } = {};
    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        newPreviews[`${file.name}-${file.size}`] = URL.createObjectURL(file);
      }
    });
    setPreviews(newPreviews);
    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const chosen = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...chosen]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      setMessage("Please select at least one photo or file to upload.");
      return;
    }
    setIsUploading(true);
    setMessage(`Uploading ${selectedFiles.length} file${selectedFiles.length > 1 ? "s" : ""}…`);

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));
    if (altText.trim()) formData.append("altText", altText.trim());
    if (caption.trim()) formData.append("caption", caption.trim());

    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Upload failed.");
        setIsUploading(false);
        return;
      }
      const count = data.count || (data.assets ? data.assets.length : 1);
      setSelectedFiles([]);
      setAltText("");
      setCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage(`Successfully uploaded ${count} file${count > 1 ? "s" : ""}.`);
      await load();
    } catch {
      setMessage("Upload failed due to a network or server error.");
    } finally {
      setIsUploading(false);
    }
  };

  const edit = async (asset: Asset) => {
    const updatedAlt = prompt("Alternative text", asset.altText || "");
    if (updatedAlt === null) return;
    const updatedCap = prompt("Caption", asset.caption || "");
    if (updatedCap === null) return;
    const response = await fetch(`/api/admin/media/${asset.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altText: updatedAlt, caption: updatedCap }),
    });
    const data = await response.json();
    setMessage(response.ok ? "Media details updated." : data.error);
    if (response.ok) await load();
  };

  const remove = async (id: string) => {
    if (!confirm("Move this unused file to trash?")) return;
    const response = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    const data = await response.json();
    setMessage(response.ok ? "File moved to trash." : data.error);
    if (response.ok) await load();
  };

  const totalSelectedSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

  return <div>
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Media</p>
        <h1 className="mt-1 text-3xl font-black">Media library</h1>
        <p className="mt-2 text-sm text-gray-600">Upload multiple photos & documents to manage your media assets.</p>
      </div>
      <button type="button" onClick={() => void load()} className="cms-secondary-button"><RefreshCw />Refresh</button>
    </div>

    {/* Batch Upload Area */}
    <div className="mt-7 rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Upload Media (Multiple Photos)</h2>

      <form onSubmit={upload} className="mt-3 flex flex-col gap-4">
        {/* Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragActive ? "border-emerald-600 bg-emerald-50" : "border-gray-300 hover:border-emerald-500 hover:bg-emerald-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">
            <Upload className="h-6 w-6" />
          </div>
          <p className="mt-2 text-sm font-bold text-gray-900">
            Drag & drop multiple photos or files here, or <span className="text-emerald-700 underline">browse</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports JPEG, PNG, WebP, AVIF (up to 10MB) and PDF (up to 25MB). You can select multiple images at once.
          </p>
        </div>

        {/* Selected Files Preview List */}
        {selectedFiles.length > 0 && (
          <div className="rounded-xl border bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-gray-700">
                Selected Files ({selectedFiles.length}) &bull; {Math.round(totalSelectedSize / 1024)} KB Total
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedFiles([]);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {selectedFiles.map((file, idx) => {
                const previewUrl = previews[`${file.name}-${file.size}`];
                return (
                  <div key={`${file.name}-${idx}`} className="relative flex items-center gap-3 rounded-lg border bg-white p-2 shadow-xs">
                    {previewUrl ? (
                      <img src={previewUrl} alt={file.name} className="h-12 w-12 rounded object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-red-50 text-red-700">
                        <FileText className="h-6 w-6" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-gray-900">{file.name}</p>
                      <p className="text-[10px] text-gray-500">{Math.round(file.size / 1024)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(idx);
                      }}
                      className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Inputs & Submit Button */}
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder={selectedFiles.length > 1 ? "Common Alt text prefix (optional - defaults to filename)" : "Image alt text (optional)"}
            className="cms-input"
          />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="cms-input"
          />
          <button
            type="submit"
            disabled={isUploading || selectedFiles.length === 0}
            className="cms-primary-button justify-center disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading…" : `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ""}`}
          </button>
        </div>
      </form>
    </div>

    {message && <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{message}</p>}

    {/* Filter & Search Bar */}
    <div className="mt-6 flex flex-col gap-2 rounded-2xl border bg-white p-4 sm:flex-row">
      <label className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search files"
          className="cms-input pl-10"
        />
      </label>
      <select value={kind} onChange={(event) => setKind(event.target.value)} className="cms-input sm:w-40">
        <option value="all">All files</option>
        <option value="image">Images</option>
        <option value="pdf">PDFs</option>
      </select>
      <button type="button" onClick={() => void load()} className="cms-secondary-button justify-center">Apply</button>
    </div>

    {/* Asset Grid */}
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {assets.map((asset) => (
        <article key={asset.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          {asset.mimeType.startsWith("image/") ? (
            <Image unoptimized src={asset.publicUrl} alt={asset.altText || ""} width={640} height={360} className="h-44 w-full object-cover" />
          ) : (
            <div className="flex h-44 items-center justify-center bg-red-50">
              <FileText className="h-14 w-14 text-red-700" />
            </div>
          )}
          <div className="p-4">
            <p className="truncate text-sm font-black">{asset.originalName}</p>
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">{asset.altText || asset.caption || "No description"}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">{Math.round(asset.size / 1024)} KB</span>
              <span className="flex">
                <button type="button" onClick={() => void edit(asset)} className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50" aria-label={`Edit ${asset.originalName}`}>
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => void remove(asset.id)} className="rounded-lg p-2 text-red-700 hover:bg-red-50" aria-label={`Delete ${asset.originalName}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </span>
            </div>
          </div>
        </article>
      ))}
      {assets.length === 0 && (
        <div className="col-span-full flex items-center justify-center gap-2 rounded-2xl border border-dashed p-12 text-sm text-gray-500">
          <ImageIcon className="h-5 w-5" />
          No files found in the media library.
        </div>
      )}
    </div>
  </div>;
};

