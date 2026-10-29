import type { ContentDocumentKey } from "@/cms/content-types";

export interface ContentCatalogItem {
  key: ContentDocumentKey;
  label: string;
  description: string;
}

export interface ContentCatalogGroup {
  label: string;
  description: string;
  items: ContentCatalogItem[];
}

export const contentCatalog: ContentCatalogGroup[] = [
  {
    label: "Global",
    description: "College identity, contact details, social links and default search metadata.",
    items: [{ key: "global", label: "Global settings", description: "Manage institution-wide details, contact info, social links, WhatsApp widget and default search metadata." }],
  },
  {
    label: "Navigation",
    description: "Links and calls to action that help visitors move around the website.",
    items: [{ key: "navigation", label: "Header navigation", description: "Manage the main menu, dropdowns and header actions." }],
  },
  {
    label: "Shared",
    description: "Reusable content displayed across multiple pages.",
    items: [{ key: "shared", label: "Shared sections", description: "Manage the footer, admission prompts and other reusable sections." }],
  },
  {
    label: "Pages",
    description: "Choose a public page to edit all of its page-specific content.",
    items: [
      { key: "page.home", label: "Home", description: "Hero slides, welcome content, highlights and homepage sections." },
      { key: "page.about", label: "About", description: "College overview, mission, vision and institutional information." },
      { key: "page.chairman", label: "Chairman's Desk", description: "Chairman's message, profile and page introduction." },
      { key: "page.campusLife", label: "Campus Life", description: "Campus experience, student activities and related highlights." },
      { key: "page.bnys", label: "BNYS Course", description: "Course overview, curriculum, eligibility and programme details." },
      { key: "page.whyChooseUs", label: "Why Choose Us", description: "Reasons, benefits and differentiators for prospective students." },
      { key: "page.faqs", label: "Frequently Asked Questions", description: "Questions, answers, categories and page introduction." },
      { key: "page.faculty", label: "Faculty", description: "Faculty page introduction and staff profiles." },
      { key: "page.facilities", label: "Facilities", description: "Facility descriptions, images, features and highlights." },
      { key: "page.contact", label: "Contact", description: "Contact page text, enquiry guidance and location details." },
    ],
  },
];

export const contentCatalogByKey = new Map(
  contentCatalog.flatMap((group) => group.items).map((item) => [item.key, item] as const),
);
