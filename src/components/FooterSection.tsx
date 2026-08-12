"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import { MapPin, Phone, Compass } from "lucide-react";
import { submitLead } from "@/lib/leads";

export const FooterSection: React.FC = () => {
  const siteData = useSiteContent();
  const { institution } = siteData.global;
  const { navigation } = siteData;
  const footerSection = siteData.shared.footer;
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    studentMobile: "",
    parentMobile: "",
    city: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitLead({ ...formData, source: "footer" });
      setSubmitted(true);
      setFormData({ studentName: "", parentName: "", studentMobile: "", parentMobile: "", city: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="w-full bg-[#C4C4C4] pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-gray-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Title & Divider */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase tracking-tight leading-none">
              {footerSection.heading}
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide mt-1">
              {footerSection.subHeading}
            </p>
          </div>
          <div className="hidden md:block flex-1 ml-10 border-t border-gray-400" />
        </div>

        {/* 2-Column Main Footer Section matching footer.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Card inside White Container Box */}
          <div className="micro-card lg:col-span-6 bg-[#E8E8E8] rounded-3xl p-6 sm:p-8 shadow-md border border-white/60">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-900">{footerSection.successHeading}</h3>
                <p className="text-sm text-gray-700">
                  {footerSection.successDescription}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="footer-student-name" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                    {footerSection.form.studentNameLabel}
                  </label>
                  <input
                    id="footer-student-name"
                    type="text"
                    required
                    autoComplete="section-student name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="footer-parent-name" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                    {footerSection.form.parentNameLabel}
                  </label>
                  <input
                    id="footer-parent-name"
                    type="text"
                    required
                    autoComplete="section-parent name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="footer-student-mobile" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                    {footerSection.form.studentMobileLabel}
                  </label>
                  <input
                    id="footer-student-mobile"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="section-student tel"
                    value={formData.studentMobile}
                    onChange={(e) => setFormData({ ...formData, studentMobile: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
                  />
                </div>

                <div>
                  <label htmlFor="footer-parent-mobile" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">{footerSection.form.parentMobileLabel}</label>
                  <input id="footer-parent-mobile" type="tel" required inputMode="tel" autoComplete="section-parent tel" value={formData.parentMobile} onChange={(e) => setFormData({ ...formData, parentMobile: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs" />
                </div>

                <div>
                  <label htmlFor="footer-city" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">{footerSection.form.cityLabel}</label>
                  <input id="footer-city" type="text" required autoComplete="address-level2" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs" />
                </div>

                {/* Your Message (Optional) */}
                <div>
                  <label htmlFor="footer-message" className="block text-xs font-extrabold text-gray-700 uppercase tracking-wide mb-1.5">
                    {footerSection.form.messageLabel}
                  </label>
                  <textarea
                    id="footer-message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
                  />
                </div>

                {/* Green Submit Button */}
                {submitError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{submitError}</p>}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 rounded-xl bg-[#00A651] hover:bg-[#008e46] text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-md transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : footerSection.form.submitButton}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Address, Phone, Quick Links & Social Links */}
          <div className="lg:col-span-6 space-y-6 pt-2">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-800 flex-shrink-0 mt-1">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {institution.addressTitle}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {institution.addressLine1}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {institution.addressLine2}
                </p>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {institution.addressLine3}
                </p>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-800 flex-shrink-0">
                <Phone className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-1 text-base sm:text-lg font-bold text-gray-900">
                <p>{institution.phoneNumbers[0].num1} &nbsp;|&nbsp; {institution.phoneNumbers[0].num2}</p>
                <p>{institution.phoneNumbers[1].num1} &nbsp;|&nbsp; {institution.phoneNumbers[1].num2}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-start space-x-4 pt-2">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-800 flex-shrink-0 mt-0.5">
                <Compass className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  {footerSection.quickLinksHeading}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4">
                  {navigation.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-emerald-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-4 pl-14">
              <a
                href={institution.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="micro-control w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={institution.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="micro-control w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={institution.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="micro-control w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="pt-8 border-t border-gray-400 text-center">
          <p className="text-xs sm:text-sm font-semibold text-gray-800">
            {institution.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
