import fs from "node:fs";
import path from "node:path";
import { siteData as currentSiteData } from "../src/data/siteData";

const liveDataPath = path.resolve(process.cwd(), "live_siteData_reconstructed.json");
const liveData = JSON.parse(fs.readFileSync(liveDataPath, "utf-8"));

// Unified Navigation for both College & Hospital verticals
const unifiedNavigation = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    hasDropdown: true,
    dropdownItems: [
      { label: "College Overview", href: "/about" },
      { label: "Hospital Overview", href: "/hospital" },
      { label: "Chairman's Desk", href: "/about/chairmans-desk" },
      { label: "Leadership & Team", href: "/faculty" },
      { label: "Campus Life", href: "/campus-life" },
    ],
  },
  { label: "BNYS Degree", href: "/bnys" },
  {
    label: "Hospital Care",
    href: "/hospital",
    hasDropdown: true,
    dropdownItems: [
      { label: "Hospital Overview", href: "/hospital" },
      { label: "Therapies & Treatments", href: "/hospital/treatments" },
      { label: "Accommodation & IPD", href: "/hospital#accommodation" },
      { label: "Medical Consultants", href: "/hospital#doctors" },
    ],
  },
  {
    label: "Facilities",
    href: "/facilities",
    hasDropdown: true,
    dropdownItems: [
      { label: "All Infrastructure", href: "/facilities" },
      { label: "Academic Facilities", href: "/facilities#academic" },
      { label: "Hospital Clinical Facilities", href: "/facilities#hospital" },
      { label: "Hostel Accommodation", href: "/facilities#hostel" },
    ],
  },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "FAQ's", href: "/faqs" },
  { label: "Faculty & Doctors", href: "/faculty" },
  { label: "Contact Us", href: "/contact" },
];

// Merged Facilities (Academic + Hospital Clinical)
const baseFacilities = liveData.facilities?.items || currentSiteData.pages.facilities.items;
const hospitalClinicalFacilities = [
  {
    id: "hydrotherapy-unit",
    title: "Hydrotherapy & Ozone Therapy Unit",
    eyebrow: "Clinical Water Care",
    description: "Equipped with spinal baths, sauna with ozone, steam chambers, deluxe hydro massage, and thermal packs for metabolic detoxification.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1400",
    highlights: ["Ozone Steam Baths", "Spinal Spray Units", "Detoxification Packs"],
    status: "verified",
  },
  {
    id: "panchakarma-theatre",
    title: "Ayurvedic Panchakarma Procedure Room",
    eyebrow: "Purification & Rejuvenation",
    description: "Dedicated treatment suites for Sarvanga Abhyanga, Shirodhara, Patra Pinda Sweda, and specialized Basti therapies.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=1400",
    highlights: ["Traditional Shirodhara Setup", "Medicated Oil Massages", "Purificatory Care"],
    status: "verified",
  },
  {
    id: "physiotherapy-center",
    title: "Physical Rehabilitation & Physiotherapy Center",
    eyebrow: "Movement & Pain Rehab",
    description: "Advanced electrotherapy devices including Cervical & Lumbar Traction, IFT, TENS, Ultrasound, and post-stroke rehabilitation apparatus.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1400",
    highlights: ["Spinal Traction Unit", "Neuromuscular Rehab", "Sports Injury Recovery"],
    status: "verified",
  },
  {
    id: "ipd-cottages",
    title: "IPD Cottages & Deluxe Recovery Suites",
    eyebrow: "In-Patient Accommodation",
    description: "Private standalone cottages and suites with verandahs, en-suite baths, 24/7 nursing call, and customized therapeutic meals.",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=85&w=1400",
    highlights: ["Private Verandahs", "24/7 Medical Care", "Therapeutic Diet Delivery"],
    status: "verified",
  },
];

// Combine facilities ensuring no duplicates
const mergedFacilityItems = [...baseFacilities];
for (const hf of hospitalClinicalFacilities) {
  if (!mergedFacilityItems.some((item: any) => item.id === hf.id)) {
    mergedFacilityItems.push(hf);
  }
}

// Merged FAQs (Academic + Hospital)
const baseFaqs = liveData.faqs?.items || currentSiteData.pages.faqs.items;
const hospitalFaqs = [
  {
    id: 101,
    category: "Hospital Care",
    question: "What medical therapies are offered at Susheeladevi Naturopathy Hospital?",
    answer: "We offer over 60 evidence-informed natural treatments including Hydrotherapy, Manipulative Massages, Panchakarma, Physiotherapy, Electronic Acupuncture, Ozone Therapy, and Clinical Yoga under physician supervision.",
  },
  {
    id: 102,
    category: "Hospital Care",
    question: "How can I book an OPD consultation or hospital treatment?",
    answer: "You can call our direct Hospital OPD Desk at +91 8956575838 or 08353 200151, or visit our Jagadal campus directly.",
  },
  {
    id: 103,
    category: "IPD Stay",
    question: "What accommodation options are available for in-patients?",
    answer: "We offer standalone private Cottages, Executive Suites, Deluxe Rooms, and shared Dormitories with round-the-clock nursing care and customized naturopathic dietary plans.",
  },
  {
    id: 104,
    category: "IPD Stay",
    question: "Are in-patient stays medically supervised?",
    answer: "Yes. Every patient receives a thorough clinical evaluation by Dr. Parashuram K Rawal (BAMS, MS AYU) and Dr. Vijetha A (BNYS) before a customized treatment and diet plan is prescribed.",
  },
];

const mergedFaqItems = [...baseFaqs];
for (const hfaq of hospitalFaqs) {
  if (!mergedFaqItems.some((f: any) => f.question === hfaq.question)) {
    mergedFaqItems.push(hfaq);
  }
}

// Merged Faculty Profiles (Academic + Hospital Doctors)
const baseFaculty = liveData.faculty?.profiles || currentSiteData.pages.faculty.profiles;
const doctorProfiles = [
  {
    id: 10,
    name: "Dr. Parashuram K Rawal",
    role: "Specialist & Chief Medical Officer",
    qualifications: "BAMS, MS (AYU)",
    department: "Hospital Medical Consultants",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=700",
    status: "verified",
  },
  {
    id: 11,
    name: "Dr. Vijetha A",
    role: "Naturopathy Consultant",
    qualifications: "BNYS",
    department: "Hospital Medical Consultants",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=700",
    status: "verified",
  },
];

const mergedFacultyProfiles = [...baseFaculty];
for (const dp of doctorProfiles) {
  if (!mergedFacultyProfiles.some((fp: any) => fp.name === dp.name && fp.department === dp.department)) {
    mergedFacultyProfiles.push(dp);
  }
}

// Pages Data
const pagesData = {
  home: liveData.home || currentSiteData.pages.home,
  about: liveData.about || currentSiteData.pages.about,
  chairman: liveData.chairman || currentSiteData.pages.chairman,
  campusLife: liveData.campusLife || currentSiteData.pages.campusLife,
  bnys: liveData.bnys || currentSiteData.pages.bnys,
  hospital: currentSiteData.pages.hospital,
  whyChooseUs: liveData.whyChooseUs || currentSiteData.pages.whyChooseUs,
  faqs: {
    ...currentSiteData.pages.faqs,
    categories: ["All", "Hospital Care", "IPD Stay", "BNYS Course", "Eligibility", "Admissions", "Campus", "Careers"],
    items: mergedFaqItems,
  },
  faculty: {
    ...currentSiteData.pages.faculty,
    departments: ["All", "Leadership", "Hospital Medical Consultants", "Medical Sciences", "Naturopathy", "Yogic Sciences", "Clinical Training"],
    profiles: mergedFacultyProfiles,
  },
  facilities: {
    ...currentSiteData.pages.facilities,
    items: mergedFacilityItems,
  },
  contact: liveData.contact || currentSiteData.pages.contact,
};

const globalData = liveData.global || currentSiteData.global;
if (!globalData.institution.hospitalContact) {
  globalData.institution.hospitalContact = currentSiteData.global.institution.hospitalContact;
}

const mergedSiteData = {
  global: globalData,
  navigation: unifiedNavigation,
  shared: liveData.shared || currentSiteData.shared,
  pages: pagesData,
};

function json(val: any): string {
  return JSON.stringify(val, null, 2);
}

const tsContent = `export type ContentStatus = "verified" | "placeholder";

export interface SeoContent {
  title: string;
  description: string;
  path: string;
}

export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  breadcrumbs: { label: string; href?: string }[];
  primaryCta?: string;
  secondaryCta?: { label: string; href: string };
}

export interface ContentCard {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  status?: ContentStatus;
  highlights?: string[];
}

export interface FaqItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export interface FacultyProfile {
  id: number;
  name: string;
  role: string;
  qualifications: string;
  department: string;
  image: string;
  status: ContentStatus;
}

export interface FacilityItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  highlights: string[];
  status: ContentStatus;
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  image: string;
}

export interface HomeFacilityItem {
  id: number;
  title: string;
  description?: string;
  image: string;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  designation?: string;
}

export interface HospitalDoctor {
  id: number;
  name: string;
  qualifications: string;
  role: string;
  specialty: string;
  description: string;
  image: string;
}

export interface HospitalTherapyCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export interface HospitalAccommodation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  idealFor: string;
}

export const siteData = {
  global: ${json(mergedSiteData.global)},
  navigation: ${json(mergedSiteData.navigation)} as NavLink[],
  shared: ${json(mergedSiteData.shared)},
  pages: {
    home: ${json(mergedSiteData.pages.home)},
    about: {
      seo: ${json(mergedSiteData.pages.about.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.about.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.about.sections)},
      introduction: ${json(mergedSiteData.pages.about.introduction)},
      values: ${json(mergedSiteData.pages.about.values)} as ContentCard[],
      credibility: {
        ...${json(mergedSiteData.pages.about.credibility)},
        status: "${mergedSiteData.pages.about.credibility?.status || "verified"}" as ContentStatus,
      },
    },
    chairman: {
      seo: ${json(mergedSiteData.pages.chairman.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.chairman.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.chairman.sections)},
      message: ${json(mergedSiteData.pages.chairman.message)},
      principles: ${json(mergedSiteData.pages.chairman.principles)} as ContentCard[],
    },
    campusLife: {
      seo: ${json(mergedSiteData.pages.campusLife.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.campusLife.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.campusLife.sections)},
      journey: ${json(mergedSiteData.pages.campusLife.journey)} as ContentCard[],
      support: ${json(mergedSiteData.pages.campusLife.support)} as ContentCard[],
      gallery: ${json(mergedSiteData.pages.campusLife.gallery)} as ContentCard[],
    },
    bnys: {
      seo: ${json(mergedSiteData.pages.bnys.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.bnys.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.bnys.sections)},
      overview: ${json(mergedSiteData.pages.bnys.overview)},
      subjects: ${json(mergedSiteData.pages.bnys.subjects)},
      learningJourney: ${json(mergedSiteData.pages.bnys.learningJourney)} as ContentCard[],
      eligibility: ${json(mergedSiteData.pages.bnys.eligibility)} as ContentCard[],
      careers: ${json(mergedSiteData.pages.bnys.careers)} as ContentCard[],
      admissionSupport: ${json(mergedSiteData.pages.bnys.admissionSupport)},
    },
    whyChooseUs: {
      seo: ${json(mergedSiteData.pages.whyChooseUs.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.whyChooseUs.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.whyChooseUs.sections)},
      reasons: ${json(mergedSiteData.pages.whyChooseUs.reasons)} as ContentCard[],
      parentsCorner: ${json(mergedSiteData.pages.whyChooseUs.parentsCorner)},
    },
    faqs: {
      seo: ${json(mergedSiteData.pages.faqs.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.faqs.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.faqs.sections)},
      categories: ${json(mergedSiteData.pages.faqs.categories)},
      items: ${json(mergedSiteData.pages.faqs.items)} as FaqItem[],
    },
    faculty: {
      seo: ${json(mergedSiteData.pages.faculty.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.faculty.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.faculty.sections)},
      philosophy: ${json(mergedSiteData.pages.faculty.philosophy)} as ContentCard[],
      departments: ${json(mergedSiteData.pages.faculty.departments)},
      profiles: ${json(mergedSiteData.pages.faculty.profiles)} as FacultyProfile[],
    },
    facilities: {
      seo: ${json(mergedSiteData.pages.facilities.seo)} as SeoContent,
      hero: ${json(mergedSiteData.pages.facilities.hero)} as PageHeroContent,
      sections: ${json(mergedSiteData.pages.facilities.sections)},
      items: ${json(mergedSiteData.pages.facilities.items)} as FacilityItem[],
    },
    hospital: ${json(mergedSiteData.pages.hospital)},
    contact: ${json(mergedSiteData.pages.contact)},
  },
};

// The homepage uses the same canonical FAQ records as the dedicated FAQ page.
siteData.pages.home.faqsSection.items = siteData.pages.faqs.items.slice(0, 8);
`;

const targetFile = path.resolve(process.cwd(), "src/data/siteData.ts");
fs.writeFileSync(targetFile, tsContent, "utf-8");
console.log(`Updated ${targetFile} with unified navigation & merged facilities/faqs/faculty!`);
