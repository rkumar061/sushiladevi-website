"use me";
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ChevronDown, Menu, X } from "lucide-react";
import { openAdmissionDialog } from "@/lib/admissionDialog";

export const Header: React.FC = () => {
  const siteData = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { institution } = siteData.global;
  const { navigation } = siteData;

  useEffect(() => {
    let frameId: number | null = null;

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY;

        // Separate thresholds prevent the header from rapidly switching styles
        // when the user scrolls near the transition point.
        setIsScrolled((currentlyScrolled) => {
          if (!currentlyScrolled && currentY >= 140) return true;
          if (currentlyScrolled && currentY <= 60) return false;
          return currentlyScrolled;
        });

        frameId = null;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <div className="sticky top-0 z-50 flex justify-center px-2 sm:px-4 w-full bg-transparent -mb-32 sm:-mb-40 md:-mb-44 lg:-mb-48 pointer-events-none">
      {/* 90% Width White Header Card Floating & Compact on Scroll */}
      <header
        className={`w-[92%] sm:w-[90%] lg:w-[90%] max-w-7xl bg-white shadow-2xl border border-t-0 border-gray-100/90 overflow-hidden lg:overflow-visible transition-all duration-500 ease-out pointer-events-auto transform-gpu ${
          isScrolled
            ? "rounded-b-2xl sm:rounded-b-3xl"
            : "rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px]"
        }`}
      >
        <div
          className={`transition-all duration-500 ease-out ${
            isScrolled
              ? "px-4 sm:px-6 py-2"
              : "px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-3 sm:pb-4"
          }`}
        >
          {/* Top Branding Section */}
          <div
            className={`flex items-center justify-between gap-3 transition-all duration-500 ease-out overflow-hidden ${
              isScrolled ? "max-h-12 py-0.5 opacity-95" : "max-h-32 py-1.5 opacity-100"
            }`}
          >
            {/* Left Emblem Seal */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div
                className={`rounded-full border-2 border-emerald-700 p-0.5 flex items-center justify-center bg-emerald-50 text-emerald-800 shadow-inner transition-all duration-500 ease-out ${
                  isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
                }`}
              >
                <svg className="w-full h-full text-emerald-700" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" fill="#f0fdf4" />
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                  <path d="M35 55 C35 45 42 35 50 35 C58 35 65 45 65 55 Z" fill="currentColor" opacity="0.8" />
                  <circle cx="50" cy="30" r="6" fill="currentColor" />
                  <path d="M30 68 Q50 62 70 68" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="50" y="85" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#047857">{institution.emblemName}</text>
                </svg>
              </div>
            </div>

            {/* Center-Left Institution Title */}
            <div className="text-left flex-1 px-1 sm:px-2">
              {!isScrolled && (
                <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-gray-700 uppercase transition-opacity duration-500">
                  {institution.foundationName}
                </p>
              )}
              <p
                className={`font-black tracking-tight text-gray-950 uppercase leading-tight font-sans transition-all duration-500 ease-out ${
                  isScrolled
                    ? "text-xs sm:text-sm line-clamp-1"
                    : "text-xs sm:text-base md:text-lg lg:text-xl mt-0.5"
                }`}
              >
                {institution.collegeName}
              </p>
              {!isScrolled && (
                <p className="text-[9px] sm:text-[11px] text-gray-600 font-medium max-w-4xl mt-1 leading-snug hidden sm:block transition-opacity duration-500">
                  {institution.accreditation}
                </p>
              )}
            </div>

            {/* Right Emblem Badge */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div
                className={`rounded-full border-2 border-amber-500 p-0.5 flex items-center justify-center bg-amber-50 text-amber-900 shadow-sm transition-all duration-500 ease-out ${
                  isScrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
                }`}
              >
                <svg className="w-full h-full text-amber-700" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="#d97706" strokeWidth="2.5" fill="#fffbeb" />
                  <path d="M50 22 C38 22 28 35 28 50 C28 65 38 78 50 78 C62 78 72 65 72 50 C72 35 62 22 50 22 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
                  <circle cx="50" cy="42" r="10" fill="#d97706" />
                  <path d="M36 65 Q50 55 64 65" stroke="#92400e" strokeWidth="3" fill="none" />
                  <text x="50" y="86" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#b45309">{institution.establishedLabel}</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Bar Section */}
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-out ${
              isScrolled ? "mt-1 pt-1 border-t border-gray-100" : "mt-3 pt-2.5 border-t border-gray-100"
            }`}
          >
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center font-semibold text-gray-800 hover:text-emerald-700 transition-all duration-300 ${
                      isScrolled ? "text-xs py-0.5" : "text-xs sm:text-sm py-1"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 w-3.5 h-3.5 text-gray-500 group-hover:text-emerald-700 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute left-0 top-full z-[80] hidden w-52 pt-2 group-hover:block group-focus-within:block">
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                        {item.dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Book Your Admission Button */}
            <div className="hidden sm:block">
              <button
                type="button"
                onClick={openAdmissionDialog}
                className={`micro-sheen inline-flex items-center justify-center rounded-full bg-[#00A651] hover:bg-[#008e46] text-white font-extrabold tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                  isScrolled ? "px-4 py-1.5 text-[11px]" : "px-6 py-2.5 text-xs sm:text-sm"
                }`}
              >
                BOOK YOUR ADMISSION
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex lg:hidden items-center justify-between w-full sm:w-auto">
              <span className="sm:hidden text-xs font-bold text-emerald-800">
                SUSHEELADEVI COLLEGE
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 border-t border-gray-200 pt-2 pb-2 space-y-1 bg-gray-50 rounded-xl px-3">
              {navigation.map((item) => (
                <div key={item.label} className="border-b border-gray-200/60 last:border-none py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-semibold text-gray-800 hover:text-emerald-700 py-1 block"
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="p-1 text-gray-500 hover:text-emerald-700"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.hasDropdown && activeDropdown === item.label && item.dropdownItems && (
                    <div className="pl-3 py-1 space-y-1 bg-white rounded-md my-1 border border-gray-100">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 px-2 text-[11px] font-medium text-gray-600 hover:text-emerald-700"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdmissionDialog();
                  }}
                  className="micro-sheen w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#00A651] text-white font-bold text-xs uppercase tracking-wide shadow"
                >
                  BOOK YOUR ADMISSION
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
