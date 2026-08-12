"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Send, X } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ADMISSION_DIALOG_EVENT } from "@/lib/admissionDialog";
import { ScrollReveal } from "@/components/ScrollReveal";
import { submitLead } from "@/lib/leads";

const initialFormData = {
  studentName: "",
  parentName: "",
  studentMobile: "",
  parentMobile: "",
  city: "",
  message: "",
};

export const AdmissionBannerSection: React.FC = () => {
  const siteData = useSiteContent();
  const { heading, subHeading, badgeText } = siteData.shared.admissionCta;
  const formContent = siteData.shared.admissionForm;
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const dialogTriggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const closeDialog = () => {
    const dialogTrigger = dialogTriggerRef.current;
    setIsOpen(false);
    setSubmitted(false);
    window.requestAnimationFrame(() => dialogTrigger?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    const handleOpenDialog = () => {
      dialogTriggerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIsOpen(true);
    };
    window.addEventListener(ADMISSION_DIALOG_EVENT, handleOpenDialog);
    return () => window.removeEventListener(ADMISSION_DIALOG_EVENT, handleOpenDialog);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstInputRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitLead({ ...formData, source: "admission-dialog" });
      setSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ScrollReveal direction="scale">
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#065f46] px-4 py-9 text-white shadow-xl sm:px-6 sm:py-12 lg:px-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

        <div className="pointer-events-none absolute right-4 top-1/2 flex h-48 w-48 -translate-y-1/2 items-center justify-center text-white/15 sm:right-10 sm:h-64 sm:w-64 md:right-16 md:h-80 md:w-80">
          <svg className="h-full w-full" viewBox="0 0 200 200" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="100" cy="100" r="85" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="70" strokeWidth="1" />
            <path d="M100 30 C120 55 145 65 170 100 C145 135 120 145 100 170 C80 145 55 135 30 100 C55 65 80 55 100 30 Z" fill="currentColor" fillOpacity="0.16" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="18" fill="#047857" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/40 bg-emerald-950/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100 sm:text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {siteData.shared.admissionCta.eyebrow}
            </div>
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl">
              {heading}
            </h2>
            <p className="max-w-2xl text-sm font-bold uppercase tracking-wide text-emerald-50 sm:text-base md:text-lg">
              {subHeading}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              dialogTriggerRef.current = event.currentTarget;
              setIsOpen(true);
            }}
            className="micro-sheen micro-card group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-wide text-[#064e3b] shadow-xl hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:text-sm"
          >
            <span>{badgeText}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
      </ScrollReveal>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031b13]/75 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) closeDialog();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admission-dialog-title"
            aria-describedby="admission-dialog-description"
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-emerald-100 bg-white p-6 text-gray-900 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={closeDialog}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-label="Close contact form"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-10 text-center" aria-live="polite">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 id="admission-dialog-title" className="mt-5 text-2xl font-black text-[#064e3b]">
                  Thank you!
                </h2>
                <p id="admission-dialog-description" className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
                  Your admission enquiry has been recorded. Our team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="mt-7 rounded-full bg-[#047857] px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-[#065f46]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="pr-12">
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                    {formContent.eyebrow}
                  </p>
                  <h2 id="admission-dialog-title" className="mt-2 text-2xl font-black text-[#064e3b] sm:text-3xl">
                    {formContent.heading}
                  </h2>
                  <p id="admission-dialog-description" className="mt-2 text-sm leading-6 text-gray-600">
                    {formContent.description}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                  <div>
                    <label htmlFor="cta-student-name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">
                      {formContent.fields.studentName}
                    </label>
                    <input
                      ref={firstInputRef}
                      id="cta-student-name"
                      type="text"
                      required
                      autoComplete="section-student name"
                      value={formData.studentName}
                      onChange={(event) => setFormData({ ...formData, studentName: event.target.value })}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cta-student-mobile" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">
                        {formContent.fields.studentMobile}
                      </label>
                      <input
                        id="cta-student-mobile"
                        type="tel"
                        required
                        inputMode="tel"
                        autoComplete="section-student tel"
                        value={formData.studentMobile}
                        onChange={(event) => setFormData({ ...formData, studentMobile: event.target.value })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="cta-parent-name" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">
                        {formContent.fields.parentName}
                      </label>
                      <input
                        id="cta-parent-name"
                        required
                        autoComplete="section-parent name"
                        value={formData.parentName}
                        onChange={(event) => setFormData({ ...formData, parentName: event.target.value })}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><label htmlFor="cta-parent-mobile" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{formContent.fields.parentMobile}</label><input id="cta-parent-mobile" type="tel" required inputMode="tel" autoComplete="section-parent tel" value={formData.parentMobile} onChange={(event) => setFormData({ ...formData, parentMobile: event.target.value })} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" /></div>
                    <div><label htmlFor="cta-city" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">{formContent.fields.city}</label><input id="cta-city" required autoComplete="address-level2" value={formData.city} onChange={(event) => setFormData({ ...formData, city: event.target.value })} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" /></div>
                  </div>

                  <div>
                    <label htmlFor="cta-message" className="mb-1.5 block text-xs font-extrabold uppercase tracking-wide text-gray-700">
                      {formContent.fields.message} <span className="font-medium normal-case tracking-normal text-gray-500">({formContent.optionalLabel})</span>
                    </label>
                    <textarea
                      id="cta-message"
                      rows={3}
                      value={formData.message}
                      onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                      className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    />
                  </div>

                  {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{submitError}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#047857] px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#065f46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
                  >
                    {submitting ? "Sending…" : formContent.submitLabel}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
