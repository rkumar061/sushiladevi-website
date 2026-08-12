"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Leaf } from "lucide-react";
import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";
import { openAdmissionDialog } from "@/lib/admissionDialog";
import { ScrollReveal } from "@/components/ScrollReveal";
import { type ContentCard, type PageHeroContent } from "@/data/siteData";
import { useSiteContent } from "@/components/SiteContentProvider";

const validIconNames = new Set<string>(iconNames);

export const PageIcon: React.FC<{ name?: string; className?: string }> = ({
  name = "leaf",
  className = "h-6 w-6",
}) => {
  if (!validIconNames.has(name)) return <Leaf className={className} aria-hidden="true" />;
  return <DynamicIcon name={name as IconName} className={className} aria-hidden="true" />;
};

export const InnerPageHero: React.FC<{ content: PageHeroContent }> = ({ content }) => (
  <section className="relative flex min-h-[570px] items-end overflow-hidden bg-[#062d20] px-4 pb-16 pt-52 text-white sm:px-6 sm:pb-20 sm:pt-56 lg:px-8">
    <div
      className="absolute inset-0 scale-105 bg-cover bg-center"
      style={{ backgroundImage: `url(${content.image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#031b13]/95 via-[#052e22]/78 to-[#052e22]/30" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
    <svg aria-hidden="true" className="micro-rotate-slow absolute -right-32 -top-24 h-[34rem] w-[34rem] text-white/[0.09]" viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="200" r="112" stroke="currentColor" strokeDasharray="5 8" />
      {Array.from({ length: 12 }).map((_, index) => (
        <ellipse key={index} cx="200" cy="108" rx="28" ry="86" stroke="currentColor" transform={`rotate(${index * 30} 200 200)`} />
      ))}
    </svg>

    <div className="hero-copy-enter relative z-10 mx-auto w-full max-w-6xl">
      <nav aria-label="Breadcrumb" className="hero-title-enter mb-5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-100">
        {content.breadcrumbs.map((item, index) => (
          <React.Fragment key={item.label}>
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-emerald-300" />}
            {item.href ? <Link href={item.href} className="hover:text-white">{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </React.Fragment>
        ))}
      </nav>
      <p className="hero-title-enter text-xs font-extrabold uppercase tracking-[0.24em] text-amber-300 sm:text-sm">{content.eyebrow}</p>
      <h1 className="hero-subtitle-enter mt-4 max-w-4xl text-4xl font-black uppercase leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl">{content.title}</h1>
      <p className="hero-cta-enter mt-5 max-w-2xl text-sm font-medium leading-7 text-emerald-50 sm:text-lg">{content.description}</p>
      {(content.primaryCta || content.secondaryCta) && (
        <div className="hero-cta-enter mt-8 flex flex-wrap gap-3">
          {content.primaryCta && (
            <button type="button" onClick={openAdmissionDialog} className="micro-sheen rounded-full bg-[#00A651] px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#008e46] sm:text-sm">
              {content.primaryCta}
            </button>
          )}
          {content.secondaryCta && (
            <Link href={content.secondaryCta.href} className="rounded-full border border-white/55 bg-white/10 px-7 py-3 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-white hover:text-emerald-900 sm:text-sm">
              {content.secondaryCta.label}
            </Link>
          )}
        </div>
      )}
    </div>
  </section>
);

export const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  centered?: boolean;
}> = ({ eyebrow, title, description, light = false, centered = false }) => (
  <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
    <p className={`text-xs font-extrabold uppercase tracking-[0.22em] ${light ? "text-emerald-200" : "text-emerald-700"}`}>{eyebrow}</p>
    <h2 className={`mt-3 text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-[#123b2a]"}`}>{title}</h2>
    {description && <p className={`mt-4 text-sm leading-7 sm:text-base ${light ? "text-emerald-50" : "text-[#46554d]"}`}>{description}</p>}
  </div>
);

export const FeatureGrid: React.FC<{
  cards: ContentCard[];
  columns?: 3 | 4;
}> = ({ cards, columns = 3 }) => {
  const siteData = useSiteContent();
  return (
  <div className={`mt-10 grid gap-5 ${columns === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"}`}>
    {cards.map((card, index) => (
      <ScrollReveal key={`${card.title}-${index}`} direction="up" delay={(index % 4) * 70}>
        <article className="micro-card group h-full rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-sm">
          <div className="micro-icon-turn flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <PageIcon name={card.icon} />
          </div>
          <div className="mt-5 flex items-start justify-between gap-3">
            <h3 className="text-lg font-black text-[#153c2c]">{card.title}</h3>
            {card.status === "placeholder" && <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-amber-800">{siteData.shared.labels.comingSoon}</span>}
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">{card.description}</p>
        </article>
      </ScrollReveal>
    ))}
  </div>
  );
};

export const SplitStory: React.FC<{
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string;
  reverse?: boolean;
}> = ({ eyebrow, title, paragraphs, image, reverse = false }) => (
  <ScrollReveal direction="up">
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
      <div className={reverse ? "lg:order-2" : ""}>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-6 space-y-4 text-sm leading-7 text-[#46554d] sm:text-base">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <div className={`relative min-h-[360px] overflow-hidden rounded-[2rem] shadow-2xl ${reverse ? "lg:order-1" : ""}`}>
        <Image src={image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/45 to-transparent" />
      </div>
    </section>
  </ScrollReveal>
);

export const RegionStrip: React.FC<{ regions: string[] }> = ({ regions }) => {
  const siteData = useSiteContent();
  return (
  <section className="overflow-hidden bg-[#123b2a] px-4 py-10 text-white sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <p className="text-center text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-200">{siteData.shared.labels.regionalReach}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {regions.map((region) => <span key={region} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white">{region}</span>)}
      </div>
    </div>
  </section>
  );
};
