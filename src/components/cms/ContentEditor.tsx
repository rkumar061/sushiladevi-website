"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowUp, Copy, ExternalLink, Eye, Plus, RotateCcw, Save, Send, Trash2 } from "lucide-react";
import { MediaPicker } from "@/components/cms/MediaPicker";
import { RichTextEditor } from "@/components/cms/RichTextEditor";
import { contentCatalog, contentCatalogByKey } from "@/components/cms/contentCatalog";
import { draftRequest, previewUrl, publishRequest } from "@/components/cms/contentEditorActions";
import type { ContentDocumentEnvelope, ContentDocumentKey } from "@/cms/content-types";
import { getGoogleMapsEmbedUrl, GOOGLE_MAPS_SEARCH_URL } from "@/lib/googleMaps";

interface Revision { id: string; version: number; publishedAt: string | Date }
const labelFor = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/^./, (character) => character.toUpperCase());
const isRichPath = (documentKey: ContentDocumentKey, path: string) =>
  (documentKey === "page.chairman" && path.endsWith("message.fullText")) ||
  (documentKey === "page.about" && path.endsWith("credibility.description")) ||
  (documentKey === "page.facilities" && /\.items\.\d+\.description$/.test(path));
const isMediaField = (key: string) => /image|pdfurl/i.test(key);
const isIconField = (key: string) => /^(icon|iconName|iconToken)$/i.test(key);
const iconLibraryUrl = "https://lucide.dev/icons/";
const isGoogleMapsEmbedField = (documentKey: ContentDocumentKey, path: string) => documentKey === "page.contact" && path.endsWith(".map.googleMapsEmbedUrl");
const contactMapUrl = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const map = (value as Record<string, unknown>).map;
  if (!map || typeof map !== "object" || Array.isArray(map)) return "";
  const url = (map as Record<string, unknown>).googleMapsEmbedUrl;
  return typeof url === "string" ? url : "";
};

function blankLike(value: unknown): unknown {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, blankLike(nested)]));
  return "";
}

const FieldNode: React.FC<{ fieldKey: string; value: unknown; path: string; documentKey: ContentDocumentKey; onChange: (value: unknown) => void }> = ({ fieldKey, value, path, documentKey, onChange }) => {
  const [picker, setPicker] = useState<"image" | "pdf" | null>(null);
  if (isRichPath(documentKey, path)) return <div><label className="cms-label">{labelFor(fieldKey)}</label><RichTextEditor value={value} onChange={onChange} /></div>;

  if (Array.isArray(value)) return <fieldset className="cms-fieldset"><legend>{labelFor(fieldKey)} <span>{value.length} items</span></legend><div className="space-y-3">{value.map((item, index) => <div key={index} className="rounded-xl border border-gray-200 bg-white p-3"><div className="mb-2 flex justify-end gap-1"><button type="button" title="Move up" disabled={index === 0} onClick={() => { const next = [...value]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; onChange(next); }} className="cms-icon-button"><ArrowUp /></button><button type="button" title="Move down" disabled={index === value.length - 1} onClick={() => { const next = [...value]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; onChange(next); }} className="cms-icon-button"><ArrowDown /></button><button type="button" title="Duplicate" onClick={() => { const next = [...value]; next.splice(index + 1, 0, structuredClone(item)); onChange(next); }} className="cms-icon-button"><Copy /></button><button type="button" title="Delete" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="cms-icon-button text-red-700"><Trash2 /></button></div><FieldNode fieldKey={`${fieldKey} ${index + 1}`} value={item} path={`${path}.${index}`} documentKey={documentKey} onChange={(nextItem) => onChange(value.map((entry, itemIndex) => itemIndex === index ? nextItem : entry))} /></div>)}</div><button type="button" onClick={() => onChange([...value, blankLike(value[value.length - 1] ?? "")])} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"><Plus className="h-4 w-4" />Add item</button></fieldset>;

  if (value && typeof value === "object") return <fieldset className="cms-fieldset"><legend>{labelFor(fieldKey)}</legend><div className="grid gap-4">{Object.entries(value as Record<string, unknown>).map(([key, nested]) => <FieldNode key={key} fieldKey={key} value={nested} path={`${path}.${key}`} documentKey={documentKey} onChange={(nextValue) => onChange({ ...(value as Record<string, unknown>), [key]: nextValue })} />)}</div></fieldset>;

  if (typeof value === "boolean") return <label className="flex items-center gap-3 rounded-xl border bg-white p-3 text-sm font-bold"><input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />{labelFor(fieldKey)}</label>;
  if (typeof value === "number") return <label><span className="cms-label">{labelFor(fieldKey)}</span><input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} className="cms-input" /></label>;

  const stringValue = value == null ? "" : String(value);
  const mediaKind = /pdf/i.test(fieldKey) ? "pdf" : "image";
  const isMapField = isGoogleMapsEmbedField(documentKey, path);
  return <div><div className="flex flex-wrap items-center justify-between gap-2"><label className="cms-label">{labelFor(fieldKey)}</label>{isIconField(fieldKey) && <a href={iconLibraryUrl} target="_blank" rel="noopener noreferrer" className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900">Search Lucide icons<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}{isMapField && <a href={GOOGLE_MAPS_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-900">Find location on Google Maps<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>}</div><div className="flex gap-2">{stringValue.length > 120 ? <textarea rows={5} value={stringValue} onChange={(event) => onChange(event.target.value)} className="cms-input resize-y" /> : <input value={stringValue} onChange={(event) => onChange(event.target.value)} placeholder={isMapField ? "https://www.google.com/maps/embed?..." : undefined} className="cms-input" />}{isMediaField(fieldKey) && <button type="button" onClick={() => setPicker(mediaKind)} className="shrink-0 rounded-xl bg-gray-900 px-3 text-xs font-bold text-white">Media</button>}</div>{isIconField(fieldKey) && <p className="mt-1.5 text-xs text-gray-500">Copy the icon name in kebab-case, for example <code className="rounded bg-gray-100 px-1 py-0.5">graduation-cap</code>.</p>}{isMapField && <p className={`mt-1.5 text-xs ${stringValue && !getGoogleMapsEmbedUrl(stringValue) ? "font-semibold text-red-700" : "text-gray-500"}`}>{stringValue && !getGoogleMapsEmbedUrl(stringValue) ? "This is not a valid Google Maps embed URL." : "In Google Maps, choose Share → Embed a map, then paste the URL from the iframe src attribute."}</p>}{picker && <MediaPicker kind={picker} onClose={() => setPicker(null)} onSelect={(url) => { onChange(url); setPicker(null); }} />}</div>;
};

export const ContentEditor: React.FC<{ initialDocument: ContentDocumentEnvelope; initialRevisions: Revision[] }> = ({ initialDocument, initialRevisions }) => {
  const router = useRouter();
  const [value, setValue] = useState(initialDocument.draft);
  const [savedValue, setSavedValue] = useState(initialDocument.draft);
  const [draftVersion, setDraftVersion] = useState(initialDocument.draftVersion);
  const [publishedVersion, setPublishedVersion] = useState(initialDocument.publishedVersion);
  const [revisions, setRevisions] = useState(initialRevisions);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const dirty = useMemo(() => JSON.stringify(value) !== JSON.stringify(savedValue), [savedValue, value]);
  const currentCatalogItem = contentCatalogByKey.get(initialDocument.key);

  const changeDocument = (nextKey: string) => {
    if (nextKey === initialDocument.key) return;
    if (dirty && !window.confirm("You have unsaved changes. Leave this document and discard them?")) return;
    router.push(`/admin/content/${encodeURIComponent(nextKey)}`);
  };

  const save = async (): Promise<boolean> => {
    const mapUrl = initialDocument.key === "page.contact" ? contactMapUrl(value) : "";
    if (mapUrl && !getGoogleMapsEmbedUrl(mapUrl)) {
      setStatus("Enter a valid Google Maps embed URL before saving.");
      return false;
    }
    setBusy(true); setStatus("Saving…");
    const response = await fetch(`/api/admin/content/${encodeURIComponent(initialDocument.key)}`, draftRequest(value, draftVersion));
    const data = await response.json(); setBusy(false);
    if (!response.ok) { setStatus(data.error || "Save failed."); return false; }
    setDraftVersion(data.draftVersion); setSavedValue(structuredClone(value)); setStatus("Draft saved.");
    return true;
  };
  const publish = async () => {
    if (dirty) return setStatus("Save the draft before publishing.");
    if (!window.confirm("Publish this document to the live site?")) return;
    setBusy(true); setStatus("Publishing…");
    const response = await fetch(`/api/admin/content/${encodeURIComponent(initialDocument.key)}/publish`, publishRequest(draftVersion));
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setStatus(data.error || "Publish failed.");
    setPublishedVersion(data.document.publishedVersion);
    const refreshed = await fetch(`/api/admin/content/${encodeURIComponent(initialDocument.key)}`).then((result) => result.json());
    setRevisions(refreshed.revisions || []); setStatus("Published successfully.");
  };
  const openPreview = async () => {
    const url = previewUrl(initialDocument.key);
    if (!url) return;
    const popup = window.open("about:blank", "_blank");
    if (!popup) return setStatus("Allow pop-ups to open the draft preview.");
    popup.document.title = "Preparing draft preview…";
    if (dirty && !await save()) {
      popup.close();
      return;
    }
    popup.location.href = url;
  };
  const restore = async (revisionId: string) => {
    if (!window.confirm("Restore this revision as the current draft?")) return;
    const response = await fetch(`/api/admin/content/${encodeURIComponent(initialDocument.key)}/restore`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revisionId, expectedDraftVersion: draftVersion }) });
    const data = await response.json();
    if (!response.ok) return setStatus(data.error || "Restore failed.");
    window.location.reload();
  };

  return <div className="grid gap-6 xl:grid-cols-[1fr_270px]">
    <div><div className="sticky top-0 z-20 mb-5 rounded-2xl border bg-white/95 p-4 shadow-sm backdrop-blur"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{currentCatalogItem?.label ?? initialDocument.key}</p><p className="mt-1 text-xs text-gray-500">Draft v{draftVersion} · Published v{publishedVersion} {dirty && "· Unsaved changes"}</p></div><div className="flex flex-wrap gap-2">{previewUrl(initialDocument.key) && <button type="button" onClick={() => void openPreview()} disabled={busy} className="cms-secondary-button"><Eye />{dirty ? "Save & preview" : "Preview draft"}</button>}<button type="button" onClick={() => void save()} disabled={busy || !dirty} className="cms-secondary-button"><Save />Save draft</button><button type="button" onClick={publish} disabled={busy || dirty} className="cms-primary-button"><Send />Publish</button></div></div><div className="mt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3"><Link href="/admin/content" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"><ArrowLeft className="h-3.5 w-3.5" />All content</Link><label className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-sm"><span className="sr-only">Change content document</span><select value={initialDocument.key} onChange={(event) => changeDocument(event.target.value)} className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-800"><optgroup label="Choose content to edit">{contentCatalog.flatMap((group) => group.items).map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</optgroup></select></label></div></div>{status && <p className={`mb-4 rounded-xl px-4 py-3 text-sm font-semibold ${/failed|changed|before|pop-up/i.test(status) ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>{status}</p>}<div className="space-y-5"><FieldNode fieldKey={initialDocument.key} value={value} path={initialDocument.key} documentKey={initialDocument.key} onChange={setValue} /></div></div>
    <aside className="h-fit rounded-2xl border bg-white p-4 xl:sticky xl:top-5"><h2 className="font-black text-gray-950">Revision history</h2><p className="mt-1 text-xs text-gray-500">The latest 20 publications are retained.</p><div className="mt-4 space-y-2">{revisions.map((revision) => <div key={revision.id} className="rounded-xl bg-gray-50 p-3"><p className="text-xs font-bold">Published v{revision.version}</p><p className="mt-1 text-[10px] text-gray-500">{new Date(revision.publishedAt).toLocaleString()}</p><button type="button" onClick={() => void restore(revision.id)} className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700"><RotateCcw className="h-3.5 w-3.5" />Restore to draft</button></div>)}{!revisions.length && <p className="text-xs text-gray-500">No revisions yet.</p>}</div></aside>
  </div>;
};
