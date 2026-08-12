"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw, Search, X } from "lucide-react";

interface Lead {
  id: string;
  source: string;
  pageUrl?: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  fields?: Record<string, unknown>;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const fallbackStatuses = ["new", "contacted", "qualified", "admitted", "closed"];
const label = (value: string) => value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
const fieldValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};
const stringField = (lead: Lead, key: string, fallback = "") => typeof lead.fields?.[key] === "string" ? lead.fields[key] as string : fallback;
const studentName = (lead: Lead) => stringField(lead, "studentName", lead.name || "Unnamed student");
const studentMobile = (lead: Lead) => stringField(lead, "studentMobile", lead.phone || "");
const parentMobile = (lead: Lead) => stringField(lead, "parentMobile");

const LeadFormFields = ({ lead }: { lead: Lead }) => {
  const entries = Object.entries(lead.fields || {}).filter(([key]) => key !== "message");
  return <dl className="mt-3 divide-y rounded-2xl border px-4">
    <div className="grid gap-1 py-3 text-sm sm:grid-cols-[150px_1fr]"><dt className="font-bold text-gray-500">Source</dt><dd>{label(lead.source || "website")}</dd></div>
    {lead.pageUrl && <div className="grid gap-1 py-3 text-sm sm:grid-cols-[150px_1fr]"><dt className="font-bold text-gray-500">Page</dt><dd><a href={lead.pageUrl} target="_blank" rel="noreferrer" className="break-all font-bold text-emerald-700 underline">{lead.pageUrl}</a></dd></div>}
    {entries.map(([key, value]) => <div key={key} className="grid gap-1 py-3 text-sm sm:grid-cols-[150px_1fr]"><dt className="font-bold text-gray-500">{label(key)}</dt><dd className="break-words text-gray-800">{fieldValue(value)}</dd></div>)}
  </dl>;
};

export const LeadsManager = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [statuses, setStatuses] = useState(fallbackStatuses);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (status) params.set("status", status);
    const response = await fetch(`/api/admin/leads?${params}`);
    const data = await response.json();
    if (response.ok) {
      setLeads(data.leads || []);
      if (data.statuses?.length) setStatuses(data.statuses);
    } else setMessage(data.error || "Could not load leads.");
    setLoading(false);
  }, [search, status]);

  useEffect(() => { const timer = setTimeout(() => void load(), 250); return () => clearTimeout(timer); }, [load]);

  const update = async (lead: Lead, changes: Partial<Pick<Lead, "status" | "notes">>) => {
    setSaving(true); setMessage("");
    const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(changes) });
    const data = await response.json();
    if (response.ok) {
      const updated = data.lead || { ...lead, ...changes, updatedAt: new Date().toISOString() };
      setLeads((current) => current.map((item) => item.id === lead.id ? updated : item));
      setSelected((current) => current?.id === lead.id ? updated : current);
      setNotes(updated.notes || "");
      setMessage("Lead updated.");
    } else setMessage(data.error || "Could not update lead.");
    setSaving(false);
  };

  const open = (lead: Lead) => { setSelected(lead); setNotes(lead.notes || ""); setMessage(""); };
  const exportParams = new URLSearchParams();
  if (search.trim()) exportParams.set("search", search.trim());
  if (status) exportParams.set("status", status);
  const exportHref = `/api/admin/leads/export${exportParams.size ? `?${exportParams}` : ""}`;

  return <div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Admissions</p><h1 className="mt-1 text-3xl font-black">Leads</h1><p className="mt-2 text-sm text-gray-600">Review enquiries, track follow-ups and keep admission notes together.</p></div><div className="flex flex-wrap gap-2"><a href={exportHref} download className="cms-primary-button"><Download className="h-4 w-4" />Download CSV</a><button type="button" onClick={() => void load()} className="cms-secondary-button"><RefreshCw className="h-4 w-4" />Refresh</button></div></div>
    <div className="mt-7 grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[1fr_220px]"><label className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student, parent, mobile, city or message" className="cms-input w-full pl-10" /></label><select value={status} onChange={(event) => setStatus(event.target.value)} className="cms-input"><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></div>
    {message && <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{message}</p>}
    <div className="mt-5 overflow-x-auto rounded-2xl border bg-white"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500"><tr><th className="p-4">Student</th><th className="p-4">Mobile numbers</th><th className="p-4">Source</th><th className="p-4">Received</th><th className="p-4">Status</th><th className="p-4"></th></tr></thead><tbody>{loading ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading leads…</td></tr> : leads.length === 0 ? <tr><td colSpan={6} className="p-8 text-center text-gray-500">No leads match these filters.</td></tr> : leads.map((lead) => <tr key={lead.id} className="border-t align-top"><td className="p-4"><p className="font-black">{studentName(lead)}</p><p className="mt-1 max-w-xs truncate text-xs text-gray-500">{lead.message || "No message"}</p></td><td className="p-4 text-xs"><p>Student: {studentMobile(lead) || "—"}</p><p className="mt-1 text-gray-500">Parent: {parentMobile(lead) || "—"}</p></td><td className="p-4 text-xs font-semibold">{label(lead.source || "website")}</td><td className="p-4 text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</td><td className="p-4"><select aria-label={`Status for ${studentName(lead)}`} value={lead.status} disabled={saving} onChange={(event) => void update(lead, { status: event.target.value })} className="cms-input py-2 text-xs">{statuses.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></td><td className="p-4"><button type="button" onClick={() => open(lead)} className="cms-secondary-button">View</button></td></tr>)}</tbody></table></div>
    {selected && <div className="fixed inset-0 z-50 flex justify-end bg-black/35" role="dialog" aria-modal="true" aria-label="Lead details" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }}><div className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">{label(selected.source || "website")}</p><h2 className="mt-1 text-2xl font-black">{studentName(selected)}</h2></div><button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 hover:bg-gray-100" aria-label="Close"><X /></button></div><dl className="mt-7 grid gap-4 rounded-2xl bg-gray-50 p-5 text-sm sm:grid-cols-2"><div><dt className="text-xs font-bold uppercase text-gray-500">Student mobile</dt><dd className="mt-1">{studentMobile(selected) ? <a className="font-bold text-emerald-700 underline" href={`tel:${studentMobile(selected)}`}>{studentMobile(selected)}</a> : "—"}</dd></div><div><dt className="text-xs font-bold uppercase text-gray-500">Parent mobile</dt><dd className="mt-1">{parentMobile(selected) ? <a className="font-bold text-emerald-700 underline" href={`tel:${parentMobile(selected)}`}>{parentMobile(selected)}</a> : "—"}</dd></div><div><dt className="text-xs font-bold uppercase text-gray-500">Source / page</dt><dd className="mt-1">{label(selected.source || "website")}{selected.pageUrl ? ` · ${selected.pageUrl}` : ""}</dd></div><div><dt className="text-xs font-bold uppercase text-gray-500">Received</dt><dd className="mt-1">{new Date(selected.createdAt).toLocaleString()}</dd></div></dl><section className="mt-6"><h3 className="text-sm font-black">Form response</h3><p className="mt-2 whitespace-pre-wrap rounded-2xl border p-4 text-sm text-gray-700">{selected.message || "No message was provided."}</p><LeadFormFields lead={selected} /></section><label className="mt-6 block text-sm font-black">Internal notes<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={7} placeholder="Add call outcomes, next steps or other private notes…" className="cms-input mt-2 w-full resize-y" /></label><div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={saving} onClick={() => void update(selected, { notes })} className="cms-primary-button">{saving ? "Saving…" : "Save notes"}</button><select value={selected.status} disabled={saving} onChange={(event) => void update(selected, { status: event.target.value })} className="cms-input">{statuses.map((item) => <option key={item} value={item}>{label(item)}</option>)}</select></div></div></div>}
  </div>;
};
