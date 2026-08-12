"use me";
"use client";

import React, { useState, useEffect } from "react";
import { useSiteContent } from "@/components/SiteContentProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { openAdmissionDialog } from "@/lib/admissionDialog";

export const HeroSection: React.FC = () => {
  const siteData = useSiteContent();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = siteData.pages.home.heroSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gray-900 text-white min-h-[580px] sm:min-h-[640px] md:min-h-[700px] lg:min-h-[750px] flex items-center pt-36 sm:pt-44 md:pt-52 lg:pt-56 pb-16">
      {/* Background Image Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image overlay */}
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              index === currentSlide ? "hero-image-active" : "scale-105"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Dark gradient shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div key={slides[currentSlide].id} className="max-w-2xl hero-copy-enter">
          {/* Headline matching reference image */}
          <h1 className="hero-title-enter text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none drop-shadow-md whitespace-pre-line">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle-enter mt-4 text-sm sm:text-base md:text-lg text-gray-200 font-medium max-w-xl drop-shadow">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Button matching green pill style */}
          <div className="hero-cta-enter mt-6 sm:mt-8">
            <button
              type="button"
              onClick={openAdmissionDialog}
              className="micro-sheen inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#00A651] hover:bg-[#008e46] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-1"
            >
              {slides[currentSlide].ctaText}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hero-arrow micro-control absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs border border-white/20 focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="hero-arrow micro-control absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs border border-white/20 focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "micro-breathe w-8 h-2.5 bg-[#00A651]"
                : "w-2.5 h-2.5 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
