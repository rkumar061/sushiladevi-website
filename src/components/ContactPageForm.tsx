"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { submitLead } from "@/lib/leads";

const initialData = { studentName: "", parentName: "", studentMobile: "", parentMobile: "", city: "", message: "" };

export const ContactPageForm = () => {
  const siteData = useSiteContent();
  const content = siteData.shared.admissionForm;
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitLead({ ...formData, source: "contact-page" });
      setSubmitted(true);
      setFormData(initialData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <div className="flex min-h-[460px] flex-col items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-xl" aria-live="polite"><CheckCircle2 className="h-14 w-14 text-emerald-600" /><h2 className="mt-5 text-2xl font-black text-[#123b2a]">{content.successHeading}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">{content.successDescription}</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 rounded-full bg-[#047857] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white">{content.resetLabel}</button></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">{content.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-[#123b2a] sm:text-3xl">{content.heading}</h2>
      <div className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label htmlFor="contact-student-name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.studentName}</label><input id="contact-student-name" required autoComplete="section-student name" value={formData.studentName} onChange={(event) => setFormData({ ...formData, studentName: event.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
          <div><label htmlFor="contact-parent-name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.parentName}</label><input id="contact-parent-name" required autoComplete="section-parent name" value={formData.parentName} onChange={(event) => setFormData({ ...formData, parentName: event.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
          <div><label htmlFor="contact-student-mobile" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.studentMobile}</label><input id="contact-student-mobile" type="tel" required inputMode="tel" autoComplete="section-student tel" value={formData.studentMobile} onChange={(event) => setFormData({ ...formData, studentMobile: event.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
          <div><label htmlFor="contact-parent-mobile" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.parentMobile}</label><input id="contact-parent-mobile" type="tel" required inputMode="tel" autoComplete="section-parent tel" value={formData.parentMobile} onChange={(event) => setFormData({ ...formData, parentMobile: event.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
        </div>
        <div><label htmlFor="contact-city" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.city}</label><input id="contact-city" required autoComplete="address-level2" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
        <div><label htmlFor="contact-message" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{content.fields.message}</label><textarea id="contact-message" rows={4} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" /></div>
        {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{submitError}</p>}
        <button disabled={submitting} className="micro-sheen inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#047857] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white hover:bg-[#065f46] disabled:cursor-not-allowed disabled:opacity-60" type="submit">{submitting ? "Sending…" : content.submitLabel} <Send className="h-4 w-4" /></button>
      </div>
    </form>
  );
};
