export type ContentStatus = "verified" | "placeholder";

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

export const siteData = {
  global: {
    siteUrl: "https://susheeladevinaturopathycollege.com",
    defaultSeo: {
      title: "Susheeladevi Naturopathy & Yogic Sciences Medical College",
      description: "Purposeful BNYS education combining medical science, naturopathy, yoga, practical learning and clinical exposure in Jagadal, Karnataka.",
    },
    institution: {
      foundationName: "AROGYA YOGPEETH FOUNDATION'S",
      emblemName: "AROGYA YOGPEETH",
      establishedLabel: "ESTD 2026",
      collegeName: "SUSHEELADEVI NATUROPATHY & YOGIC SCIENCES MEDICAL COLLEGE HOSPITAL & RESEARCH CENTER",
      shortName: "Susheeladevi College",
      accreditation: "Affiliated to Rajiv Gandhi University of Health Sciences, Bengaluru, Karnataka. Recognised by the Department of AYUSH, Ministry of Health and Family Welfare, Government of Karnataka.",
      addressTitle: "Susheeladevi Naturopathy and Yogic Sciences Medical College Hospital and Research Center, Jagadal",
      addressLine1: "Opp. Hanuman Temple, Banahatti-Mudhol Road, Jagadal – 587311",
      addressLine2: "Taluk: Rabkavi-Banahatti",
      addressLine3: "District: Bagalkot, Karnataka, India",
      phoneNumbers: [
        { num1: "98 80 976 151", num2: "88 61 326 857" },
        { num1: "89 56 575 838", num2: "89 56 575 837" },
      ],
      admissionYear: "2026–27",
      copyright: "© 2026 Susheeladevi Naturopathy and Yogic Sciences Medical College — Jagadal, Karnataka",
      socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com",
      },
      serviceRegions: ["Kolhapur", "Sangli", "Solapur", "Karad", "Belagavi", "Nippani", "Chikodi", "Rabkavi", "Mudhol"],
    },
  },

  navigation: [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      hasDropdown: true,
      dropdownItems: [
        { label: "Overview", href: "/about" },
        { label: "Chairman's Desk", href: "/about/chairmans-desk" },
        { label: "Campus Life", href: "/campus-life" },
      ],
    },
    { label: "BNYS", href: "/bnys" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "FAQ's", href: "/faqs" },
    { label: "Faculty", href: "/faculty" },
    {
      label: "Facilities",
      href: "/facilities",
      hasDropdown: true,
      dropdownItems: [
        { label: "Hostel", href: "/facilities#hostel" },
        { label: "Library", href: "/facilities#library" },
        { label: "Canteen", href: "/facilities#canteen" },
        { label: "Yoga Hall", href: "/facilities#yoga-hall" },
        { label: "Research Lab", href: "/facilities#research-lab" },
      ],
    },
    { label: "Contact Us", href: "/contact" },
  ] as NavLink[],

  shared: {
    labels: {
      regionalReach: "Serving students across South Maharashtra & North Karnataka",
      comingSoon: "Coming soon",
      detailsToConfirm: "Details to be confirmed",
      imagePlaceholder: "Image placeholder",
      officialAdmissionsDesk: "OFFICIAL ADMISSIONS DESK",
      activeFacilityPreview: "Active Facility Preview",
      hoverToView: "Hover to view",
      bnysCourseAdmissions: "BNYS COURSE ADMISSIONS",
      eligibilityIntroduction: "Candidates seeking admission to the Bachelor of Naturopathy and Yogic Sciences (BNYS) must fulfill the following criteria:",
      facultyPlaceholderAlt: "Faculty profile placeholder",
      facultyPlaceholderBadge: "Details coming soon",
      faqSearchLabel: "Search frequently asked questions",
      faqSearchPlaceholder: "Search questions...",
      faqCategoriesLabel: "FAQ categories",
      faqEmptyMessage: "No questions match your search.",
      facultyDepartmentsLabel: "Faculty departments",
    },
    admissionCta: {
      heading: "BNYS ADMISSION OPEN",
      subHeading: "BEGIN YOUR JOURNEY IN NATUROPATHY & YOGIC SCIENCES",
      badgeText: "ADMISSIONS OPEN FOR 2026–27",
      eyebrow: "APPLY ONLINE OR VISIT JAGADAL CAMPUS",
    },
    admissionForm: {
      eyebrow: "Admission enquiry",
      heading: "Begin your BNYS journey",
      description: "Share your details and our admission team will help you with eligibility, fees, and the application process.",
      fields: {
        studentName: "Student name",
        parentName: "Parent name",
        studentMobile: "Student mobile",
        parentMobile: "Parent mobile",
        city: "City",
        message: "Message",
      },
      optionalLabel: "optional",
      submitLabel: "Submit enquiry",
      successHeading: "Thank you for your enquiry",
      successDescription: "Your enquiry has been submitted. Our admission team will contact you shortly.",
      resetLabel: "Send another enquiry",
    },
    downloadProspectus: {
      heading: "DOWNLOAD THE PROSPECTUS",
      description: "Explore our BNYS programme, admission process, eligibility criteria, facilities, campus life, and everything you need to know about beginning your journey with us.",
      buttonText: "DOWNLOAD PROSPECTUS (PDF)",
      pdfUrl: "/prospectus",
    },
    footer: {
      heading: "HAVE QUESTIONS?",
      subHeading: "WE'RE HERE TO HELP",
      form: {
        studentNameLabel: "STUDENT NAME",
        parentNameLabel: "PARENT NAME",
        studentMobileLabel: "STUDENT MOBILE",
        parentMobileLabel: "PARENT MOBILE",
        cityLabel: "CITY",
        messageLabel: "MESSAGE",
        submitButton: "SUBMIT",
      },
      successHeading: "Thank You!",
      successDescription: "Your inquiry has been submitted successfully. Our admission team will contact you shortly.",
      quickLinksHeading: "QUICK LINKS",
    },
  },

  pages: {
    home: {
      heroSlides: [
        {
          id: 1,
          title: "MORE THAN A\nMEDICAL\nEDUCATION",
          subtitle: "Empowering future medical leaders in Naturopathy & Yogic Sciences with purposeful education and clinical exposure.",
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600",
          ctaText: "BOOK YOUR ADMISSION",
          ctaLink: "/contact",
        },
        {
          id: 2,
          title: "INTEGRATED HEALTHCARE\n& WELLNESS EDUCATION",
          subtitle: "Affiliated to Rajiv Gandhi University of Health Sciences and recognised by the Department of AYUSH.",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
          ctaText: "BOOK YOUR ADMISSION",
          ctaLink: "/contact",
        },
        {
          id: 3,
          title: "LEARN. PRACTISE.\nREFLECT. IMPROVE.",
          subtitle: "Build strong fundamentals, practical skills, professional discipline and confidence for a meaningful healthcare career.",
          image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1600",
          ctaText: "BOOK YOUR ADMISSION",
          ctaLink: "/contact",
        },
      ] as HeroSlide[],
      welcomeSection: {
        greenHeading: "WELCOME TO",
        subHeading: "A NEW GENERATION OF MEDICAL EDUCATION",
        description: "Here, learning goes beyond textbooks and classrooms. With faculty guidance, practical learning, clinical exposure and a supportive campus community, students are encouraged to become skilled, compassionate and responsible healthcare professionals.",
        features: [
          { id: 1, title: "Medical Education", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600" },
          { id: 2, title: "Naturopathy & Yoga", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600" },
          { id: 3, title: "Clinical Learning", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" },
          { id: 4, title: "Jagadal Campus", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600" },
        ] as FeatureItem[],
      },
      ctaBanner: {
        heading: "BNYS ADMISSION OPEN",
        subHeading: "BEGIN YOUR JOURNEY IN NATUROPATHY & YOGIC SCIENCES",
        description: "Discover a holistic approach to healthcare through integrated education in naturopathy, yoga and modern medical sciences.",
        badgeText: "ADMISSIONS OPEN FOR 2026–27",
      },
      eligibilityCriteria: {
        heading: "ELIGIBILITY CRITERIA",
        items: [
          "ACADEMIC QUALIFICATION: 10+2 WITH PHYSICS, CHEMISTRY & BIOLOGY (PCB), OR AN EQUIVALENT INTERNATIONAL QUALIFICATION.",
          "MINIMUM MARKS: 45% IN PCB (40% FOR ELIGIBLE RESERVED CATEGORIES), UNLESS SUPERSEDED BY REGULATORY UPDATES.",
          "LANGUAGE PROFICIENCY: ENGLISH (BASIC READING AND COMPREHENSION PREFERRED).",
          "AGE REQUIREMENT: 17 YEARS OR OLDER AT THE TIME OF ADMISSION.",
        ],
      },
      facilitiesSection: {
        heading: "FACILITIES",
        countLabel: "Facilities Available",
        readMoreLabel: "Read More...",
        items: [
          { id: 1, title: "HOSTEL", description: "A supportive student accommodation environment for focused learning and campus life.", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800" },
          { id: 2, title: "LIBRARY", description: "Academic resources for reading, research, reference study and continuous learning.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800" },
          { id: 3, title: "CANTEEN", description: "A campus dining environment supporting students through their academic schedules.", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=80&w=800" },
          { id: 4, title: "YOGA HALL", description: "A dedicated environment for yogic sciences, practice and wellbeing education.", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800" },
          { id: 5, title: "RESEARCH LAB", description: "A planned space supporting practical understanding and disciplined inquiry.", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=800" },
        ] as HomeFacilityItem[],
        readMoreLink: "/facilities",
      },
      testimonialsSection: {
        heading: "TESTIMONIAL",
        items: [
          { id: 1, quote: "The supportive faculty, practical learning opportunities and welcoming campus environment have helped me grow academically and personally.", author: "Student perspective", designation: "Sample content" },
          { id: 2, quote: "The programme creates opportunities to understand integrative healthcare through academic learning and guided practice.", author: "Student perspective", designation: "Sample content" },
          { id: 3, quote: "Clinical observation and yogic sciences can help students develop a thoughtful foundation for patient-centred care.", author: "Student perspective", designation: "Sample content" },
          { id: 4, quote: "A focused learning environment and consistent mentorship support steady academic and professional development.", author: "Student perspective", designation: "Sample content" },
        ] as TestimonialItem[],
      },
      faqsSection: {
        heading: "FAQ'S",
        items: [] as FaqItem[],
      },
    },

    about: {
      seo: { title: "About Susheeladevi Naturopathy College", description: "Learn about our approach to BNYS education, academic credibility, clinical maturity and community-focused healthcare.", path: "/about" } as SeoContent,
      hero: {
        eyebrow: "About Susheeladevi",
        title: "Building knowledge. Developing skills. Shaping healthcare professionals.",
        description: "An emerging destination for purposeful education across medical sciences, naturopathy, yogic sciences, healthcare and wellness.",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "About" }],
        primaryCta: "Talk to our admission team",
      } as PageHeroContent,
      sections: {
        education: { eyebrow: "How we educate", title: "Knowledge, discipline and responsible practice", description: "We want students to graduate with more than a qualification: with confidence, clinical maturity and professional responsibility." },
        credibilityEyebrow: "Affiliation & recognition",
      },
      introduction: {
        eyebrow: "Our institution",
        title: "Where medical science meets natural healing",
        paragraphs: [
          "Susheeladevi Naturopathy and Yogic Sciences Medical College is designed as a launchpad for careers across medical and wellness sciences.",
          "Our approach goes beyond textbooks. Students are encouraged to understand medical fundamentals, develop practical skills, communicate with confidence and apply their knowledge responsibly in real-world healthcare environments.",
        ],
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=85&w=1200",
      },
      values: [
        { title: "Academic Foundations", description: "Build depth in the medical sciences through structured learning and disciplined study.", icon: "graduation-cap" },
        { title: "Practical Learning", description: "Connect classroom concepts with observation, practice and clinical understanding.", icon: "stethoscope" },
        { title: "Faculty Mentorship", description: "Receive consistent academic guidance, honest feedback and professional encouragement.", icon: "users" },
        { title: "Ethical Patient Care", description: "Develop empathy, responsibility, communication and patient-centred behaviour.", icon: "heart-handshake" },
        { title: "Yoga & Wellness", description: "Explore health through yogic sciences, lifestyle and preventive-care perspectives.", icon: "leaf" },
        { title: "Community Focus", description: "Prepare to contribute meaningfully to healthcare and wellness in the wider community.", icon: "network" },
      ] as ContentCard[],
      credibility: {
        title: "A foundation built on academic credibility",
        description: "The college is affiliated to Rajiv Gandhi University of Health Sciences, Bengaluru, Karnataka, and recognised by the Department of AYUSH, Ministry of Health and Family Welfare, Government of Karnataka.",
        items: ["Rajiv Gandhi University of Health Sciences", "Department of AYUSH", "Government of Karnataka"],
        status: "verified" as ContentStatus,
      },
    },

    chairman: {
      seo: { title: "Chairman's Desk | Susheeladevi College", description: "Read the Chairman's message on disciplined medical education, compassion, mentorship and responsible healthcare.", path: "/about/chairmans-desk" } as SeoContent,
      hero: {
        eyebrow: "Leadership & vision",
        title: "Healing is a responsibility before it is a profession",
        description: "A message on knowledge, disciplined practice, compassion and the responsibility of serving patients and communities.",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Chairman's Desk" }],
      } as PageHeroContent,
      sections: {
        principles: { eyebrow: "Leadership principles", title: "Learn steadily. Practise responsibly. Serve compassionately." },
      },
      message: {
        heading: "FROM THE CHAIRMAN'S DESK",
        badge: "Wisdom · Wellness · Service",
        introduction: "A message rooted in ancient wisdom and shaped for the future of integrative healthcare.",
        visionLabel: "A vision for holistic medicine",
        quotation: "Vaidyo Narayano Hari",
        quotationMeaning: "A doctor is second only to God on Earth",
        expandLabel: "Read full message",
        collapseLabel: "Show less",
        expandedAnnouncement: "The full chairman message is visible.",
        collapsedAnnouncement: "The chairman message is collapsed.",
        chairman: {
          name: "DR. PARASHURAM H. RAWAL",
          role: "Chairman",
          qualifications: "BAMS, MS",
          image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=700",
        },
        salutation: "Dear Students and Parents,",
        previewText: "Healing is a responsibility as much as it is a profession. Medical education asks for patience with fundamentals, careful understanding and dependable practice.",
        fullText: "Healing is a responsibility as much as it is a profession.\n\nMedical education asks for patience with fundamentals: anatomy studied carefully, physiology understood deeply, and skills rehearsed until they become dependable.\n\nWe invite students who are willing to learn steadily, respect patients and grow into professionals whom the community can trust. At Susheeladevi Naturopathy and Yogic Sciences Medical College, our aim is to create an environment where students develop not only academic knowledge but also the discipline, compassion and responsibility required in healthcare.",
      },
      principles: [
        { title: "Learn steadily", description: "Build dependable knowledge through patience with fundamentals and continuous learning.", icon: "book-open" },
        { title: "Practise responsibly", description: "Rehearse skills with care until they can support confident professional practice.", icon: "activity" },
        { title: "Respect every patient", description: "Place compassion, communication and ethical responsibility at the centre of healthcare.", icon: "heart-handshake" },
      ] as ContentCard[],
    },

    campusLife: {
      seo: { title: "Campus Life | Susheeladevi College", description: "Explore the learning environment, student support, campus facilities and academic life at Susheeladevi College.", path: "/campus-life" } as SeoContent,
      hero: {
        eyebrow: "Campus life",
        title: "A supportive environment to learn, practise and grow",
        description: "Academic focus, practical learning, mentorship and student support come together at our Jagadal campus.",
        image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "Campus Life" }],
        primaryCta: "Plan a campus visit",
      } as PageHeroContent,
      sections: {
        journey: { eyebrow: "The student journey", title: "More than classrooms and textbooks", description: "Students learn within an environment shaped by focused study, practical understanding, mentorship and a supportive campus community." },
        support: { eyebrow: "Student support", title: "A structured and supportive start", description: "Support extends to students, parents and those adapting to a new academic and cultural environment." },
        gallery: { eyebrow: "Campus gallery", title: "See life at Jagadal", description: "The image structure is ready for verified campus photography supplied by the institution." },
      },
      journey: [
        { title: "Focused Learning", description: "Classroom and independent study environments designed to support strong academic foundations.", icon: "book-open" },
        { title: "Practical Experiences", description: "Opportunities to connect theoretical concepts with guided observation and practical understanding.", icon: "microscope" },
        { title: "Mentorship", description: "Structured academic guidance and professional encouragement throughout the student journey.", icon: "users" },
        { title: "Campus Community", description: "A learning community shaped by discipline, collaboration, wellbeing and mutual respect.", icon: "sparkles" },
      ] as ContentCard[],
      support: [
        { title: "Parent Communication", description: "Transparent communication about academic progress and the student's development journey.", icon: "message-circle" },
        { title: "International Student Support", description: "Guidance for accommodation, orientation, academic adaptation and cultural transition.", icon: "globe" },
        { title: "Student Accommodation", description: "A supportive hostel environment intended to help students focus on academics and campus life.", icon: "building" },
      ] as ContentCard[],
      gallery: [
        { title: "Campus learning spaces", description: "Verified campus photography will be added here.", image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=900", status: "placeholder" },
        { title: "Student life", description: "Verified student-life photography will be added here.", image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&q=80&w=900", status: "placeholder" },
        { title: "Practical learning", description: "Verified practical-learning photography will be added here.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=900", status: "placeholder" },
      ] as ContentCard[],
    },

    bnys: {
      seo: { title: "BNYS Course, Eligibility & Careers", description: "Explore the BNYS programme, subjects, eligibility, clinical learning, internships, careers and admission guidance.", path: "/bnys" } as SeoContent,
      hero: {
        eyebrow: "Bachelor of Naturopathy and Yogic Sciences",
        title: "A degree. A profession. A purpose.",
        description: "A professional healthcare programme bringing together medical sciences, naturopathy, yoga, lifestyle management and holistic approaches to wellbeing.",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "BNYS" }],
        primaryCta: "Apply for BNYS",
        secondaryCta: { label: "Check eligibility", href: "#eligibility" },
      } as PageHeroContent,
      sections: {
        programme: { eyebrow: "The programme", title: "Understand health from multiple perspectives" },
        subjects: { eyebrow: "What you can explore", title: "A broad academic foundation", description: "The programme spans medical sciences, natural-health disciplines, lifestyle management and patient-centred learning." },
        journey: { eyebrow: "Learning journey", title: "From foundations to clinical maturity" },
        eligibility: { eyebrow: "Eligibility criteria", title: "Know the requirements. Plan your admission.", description: "Current requirements should always be confirmed with the admission team against applicable regulatory updates." },
        careers: { eyebrow: "Career pathways", title: "Where can BNYS take you?", description: "Explore opportunities across healthcare, wellness, prevention and lifestyle management, subject to applicable professional regulations." },
        admission: { eyebrow: "Admission support", title: "Your future starts with one informed decision", description: "Our admission team can help students and parents understand the course, requirements and application journey." },
      },
      overview: {
        equation: ["Medical Science", "Naturopathy", "Yoga", "Nutrition", "Lifestyle", "Preventive Healthcare"],
        paragraphs: [
          "BNYS provides students with a foundation in medical sciences while introducing approaches focused on prevention, healthy living, lifestyle modification and natural wellbeing.",
          "Students develop knowledge and skills through academic learning, practical training and clinical exposure.",
        ],
      },
      subjects: ["Human Anatomy", "Human Physiology", "Biochemistry", "Pathology", "Microbiology", "Pharmacology", "Nutrition", "Yoga", "Naturopathy", "Lifestyle Management", "Preventive Healthcare", "Clinical Training", "Patient Care", "Community Health"],
      learningJourney: [
        { title: "Academic Foundations", description: "Develop clarity across core medical, naturopathy and yogic-science subjects.", icon: "graduation-cap" },
        { title: "Practical Learning", description: "Translate classroom concepts into disciplined skill and practical understanding.", icon: "microscope" },
        { title: "Clinical Exposure", description: "Observe patient care and build professional maturity in healthcare environments.", icon: "stethoscope" },
        { title: "Internship", description: "Develop practical understanding through internship exposure in multispecialty naturopathy hospital environments.", icon: "briefcase-medical" },
      ] as ContentCard[],
      eligibility: [
        { title: "Academic Qualification", description: "10+2 with Physics, Chemistry and Biology (PCB), or an equivalent international qualification.", icon: "graduation-cap", status: "verified" },
        { title: "Minimum Marks", description: "Minimum 45% in PCB and 40% for eligible reserved categories, unless superseded by applicable regulatory updates.", icon: "badge-check", status: "verified" },
        { title: "Language Proficiency", description: "Basic English reading and comprehension is preferred for academic learning and communication.", icon: "languages", status: "verified" },
        { title: "Age Requirement", description: "The student should be 17 years or older at the time of admission, subject to applicable regulations.", icon: "calendar-check", status: "verified" },
      ] as ContentCard[],
      careers: [
        { title: "Naturopathy & Wellness Practice", description: "Build a career in natural healthcare and wellness services.", icon: "leaf" },
        { title: "Yoga & Lifestyle Management", description: "Apply yoga and lifestyle knowledge in wellness-focused environments.", icon: "activity" },
        { title: "Wellness Resorts", description: "Explore work in resorts, retreats and holistic health centres.", icon: "palmtree" },
        { title: "Corporate Wellness", description: "Support employee wellbeing and preventive-health programmes.", icon: "building-2" },
        { title: "Integrative Healthcare", description: "Explore emerging intersections between healthcare and wellness approaches.", icon: "heart-pulse" },
        { title: "Community Health", description: "Contribute to awareness, prevention and community wellness programmes.", icon: "users" },
        { title: "Entrepreneurship", description: "Develop a wellness practice or healthcare-focused venture, subject to regulations.", icon: "lightbulb" },
      ] as ContentCard[],
      admissionSupport: ["Course information", "Eligibility guidance", "Admission process", "Required documents", "Campus information", "Hostel information", "Academic guidance", "Career counselling"],
    },

    whyChooseUs: {
      seo: { title: "Why Choose Susheeladevi College", description: "Discover our approach to eligibility guidance, mentorship, practical learning, clinical exposure and professional development.", path: "/why-choose-us" } as SeoContent,
      hero: {
        eyebrow: "Why choose Susheeladevi?",
        title: "An education designed around your future",
        description: "A focused academic environment combining medical science, naturopathy, yogic sciences, practical learning and professional mentorship.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "Why Choose Us" }],
        primaryCta: "Talk to a counsellor",
      } as PageHeroContent,
      sections: {
        reasons: { eyebrow: "Our difference", title: "Purposeful education for a meaningful healthcare career", description: "Choosing a college is a major decision. Our approach brings clarity, mentorship, practice and professional responsibility together." },
        parentsEyebrow: "Parents' corner",
      },
      reasons: [
        { title: "Eligibility Clarity", description: "Transparent guidance on PCB requirements, qualifying marks, English expectations and age criteria.", icon: "badge-check" },
        { title: "Mentorship", description: "Structured academic and professional guidance designed to develop confident, ethical practitioners.", icon: "users" },
        { title: "Career Breadth", description: "Pathways across naturopathy, yoga, wellness, preventive healthcare and community health.", icon: "route" },
        { title: "Practical Learning", description: "Connect theoretical concepts with observation, patient interaction and disciplined practice.", icon: "microscope" },
        { title: "Professional Development", description: "Build communication, clinical thinking, discipline and patient-centred behaviour.", icon: "briefcase-medical" },
        { title: "Clinical Excellence", description: "Learn beyond the classroom by connecting knowledge with real-world healthcare situations.", icon: "stethoscope" },
      ] as ContentCard[],
      parentsCorner: {
        title: "Because choosing a college is a family decision",
        description: "Parents deserve clarity about academics, eligibility, infrastructure, clinical exposure, student support and future opportunities.",
        commitments: ["Transparent communication", "Structured academic guidance", "Student mentorship", "Practical learning", "Professional discipline", "Responsible healthcare education"],
      },
    },

    faqs: {
      seo: { title: "BNYS Frequently Asked Questions", description: "Answers about the BNYS course, eligibility, admissions, campus facilities, careers and student support.", path: "/faqs" } as SeoContent,
      hero: {
        eyebrow: "Frequently asked questions",
        title: "Clarity for students and parents",
        description: "Explore clear answers about BNYS, admissions, eligibility, campus life, careers and student support.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "FAQs" }],
        primaryCta: "Ask our admission team",
      } as PageHeroContent,
      sections: {
        explorer: { eyebrow: "Explore answers", title: "Everything you need to make an informed decision", description: "Use the category filters or search across questions about the course, eligibility, campus and careers." },
      },
      categories: ["All", "Course", "Eligibility", "Admissions", "Campus", "Careers", "International Students"],
      items: [
        { id: 1, category: "Course", question: "What is BNYS?", answer: "BNYS stands for Bachelor of Naturopathy and Yogic Sciences, a professional healthcare programme combining medical sciences with naturopathy, yogic sciences, lifestyle management and preventive-health approaches." },
        { id: 2, category: "Eligibility", question: "Who can apply for BNYS?", answer: "Students who have completed 10+2 with Physics, Chemistry and Biology (PCB), or an equivalent qualification, can explore admission subject to applicable eligibility and regulatory requirements." },
        { id: 3, category: "Course", question: "Is BNYS a medical course?", answer: "BNYS is a professional healthcare education programme focused on naturopathy and yogic sciences, with foundations in medical sciences and practical or clinical learning." },
        { id: 4, category: "Careers", question: "What career opportunities are available after BNYS?", answer: "Graduates can explore naturopathy, wellness centres, yoga and lifestyle management, preventive healthcare, corporate wellness, resorts, community health and related areas, subject to applicable regulations." },
        { id: 5, category: "Admissions", question: "How can I apply for admission?", answer: "Contact the admission team for current eligibility, required documents, the admission procedure and course-related guidance." },
        { id: 6, category: "Campus", question: "Does the college provide hostel facilities?", answer: "The college provides student accommodation intended to offer a supportive environment for academic focus and campus life. Contact the college for current availability and details." },
        { id: 7, category: "Course", question: "Does the programme include practical and clinical learning?", answer: "The academic approach connects theoretical learning with practical understanding, clinical observation and professional discipline." },
        { id: 8, category: "International Students", question: "What support is available for international students?", answer: "Support may include visa-related guidance, accommodation assistance, campus orientation, academic guidance, cultural orientation and student support." },
        { id: 9, category: "Admissions", question: "Can I plan a campus visit before applying?", answer: "Yes. Contact the admission team to discuss a campus visit and receive current information about the course, facilities and application process." },
        { id: 10, category: "Eligibility", question: "What is the minimum age requirement?", answer: "Students should be 17 years or older at the time of admission, subject to applicable regulations." },
      ] as FaqItem[],
    },

    faculty: {
      seo: { title: "Faculty & Mentorship | Susheeladevi College", description: "Learn about the college's teaching philosophy, leadership and approach to faculty mentorship.", path: "/faculty" } as SeoContent,
      hero: {
        eyebrow: "Faculty & mentorship",
        title: "Guidance that goes beyond the classroom",
        description: "Our teaching approach combines encouragement, accountability, disciplined practice and meaningful mentorship.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "Faculty" }],
        primaryCta: "Meet our admission team",
      } as PageHeroContent,
      sections: {
        philosophy: { eyebrow: "Our teaching approach", title: "Learn. Practise. Reflect. Improve.", description: "Excellence is built through disciplined repetition, honest feedback and meaningful mentorship." },
        directory: { eyebrow: "Faculty directory", title: "People who guide the learning journey", description: "Verified faculty details will replace the clearly marked profile placeholders when supplied by the institution." },
      },
      philosophy: [
        { title: "Strong Fundamentals", description: "Teachers help students build clarity before moving towards complex clinical understanding.", icon: "book-open" },
        { title: "Honest Feedback", description: "Consistent feedback supports steady academic and professional improvement.", icon: "message-square" },
        { title: "Disciplined Practice", description: "Students are encouraged to repeat, reflect and strengthen practical skills.", icon: "repeat" },
        { title: "Professional Confidence", description: "Mentorship helps students approach healthcare situations with clarity and responsibility.", icon: "shield-check" },
      ] as ContentCard[],
      departments: ["All", "Leadership", "Medical Sciences", "Naturopathy", "Yogic Sciences", "Clinical Training"],
      profiles: [
        { id: 1, name: "Dr. Parashuram H. Rawal", role: "Chairman", qualifications: "BAMS, MS", department: "Leadership", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=700", status: "verified" },
        { id: 2, name: "Faculty profile to be confirmed", role: "Medical Sciences Faculty", qualifications: "Details coming soon", department: "Medical Sciences", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=700", status: "placeholder" },
        { id: 3, name: "Faculty profile to be confirmed", role: "Naturopathy Faculty", qualifications: "Details coming soon", department: "Naturopathy", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=700", status: "placeholder" },
        { id: 4, name: "Faculty profile to be confirmed", role: "Yogic Sciences Faculty", qualifications: "Details coming soon", department: "Yogic Sciences", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=700", status: "placeholder" },
        { id: 5, name: "Faculty profile to be confirmed", role: "Clinical Training Faculty", qualifications: "Details coming soon", department: "Clinical Training", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=700", status: "placeholder" },
      ] as FacultyProfile[],
    },

    facilities: {
      seo: { title: "Campus Facilities | Susheeladevi College", description: "Explore student accommodation, library, canteen, yoga, research, smart-lab and clinical-learning facilities.", path: "/facilities" } as SeoContent,
      hero: {
        eyebrow: "Infrastructure & facilities",
        title: "An environment designed for focused learning",
        description: "Spaces where students can study, practise, interact, collaborate and develop professionally.",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "Facilities" }],
        primaryCta: "Plan a campus visit",
      } as PageHeroContent,
      sections: {
        overview: { eyebrow: "Campus infrastructure", title: "Spaces for study, practice and student life", description: "Each environment supports a distinct part of the academic and personal development journey." },
      },
      items: [
        { id: "hostel", title: "Hostel", eyebrow: "Live and learn", description: "Student accommodation designed to provide a supportive environment where students can focus on their academic journey while experiencing campus life.", image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=85&w=1400", highlights: ["Student-focused environment", "Campus community", "Academic convenience"], status: "verified" },
        { id: "library", title: "Library", eyebrow: "Knowledge and independent learning", description: "Access to academic resources that encourage reading, research, reference study and continuous learning.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=85&w=1400", highlights: ["Reference study", "Independent learning", "Academic resources"], status: "verified" },
        { id: "canteen", title: "Canteen", eyebrow: "Everyday nutrition", description: "A campus dining environment designed to support students through their busy academic schedules.", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&q=85&w=1400", highlights: ["Campus dining", "Student convenience", "Daily support"], status: "verified" },
        { id: "yoga-hall", title: "Yoga Hall", eyebrow: "Practice and wellbeing", description: "A dedicated Yoga Hall is included in the campus facilities plan. Verified specifications and photography will be added when supplied by the institution.", image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=85&w=1400", highlights: ["Yogic-science learning", "Guided practice", "Details to be confirmed"], status: "placeholder" },
        { id: "research-lab", title: "Research Lab", eyebrow: "Inquiry and understanding", description: "A Research Lab is included in the campus facilities plan. Verified equipment, capacity and programme details will be added when supplied.", image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=85&w=1400", highlights: ["Practical inquiry", "Academic support", "Details to be confirmed"], status: "placeholder" },
        { id: "smart-lab", title: "Smart Lab", eyebrow: "Modern practical experiences", description: "Technology-enabled learning spaces designed to help students connect theoretical concepts with practical understanding.", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=85&w=1400", highlights: ["Technology-enabled learning", "Practical understanding", "Academic collaboration"], status: "verified" },
        { id: "clinical-learning", title: "Clinical Learning", eyebrow: "Learn beyond the classroom", description: "Clinical learning helps students connect knowledge with real-world situations, patient care, observation and professional discipline.", image: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&q=85&w=1400", highlights: ["Clinical observation", "Patient-care understanding", "Professional discipline"], status: "verified" },
      ] as FacilityItem[],
    },

    contact: {
      seo: { title: "Contact & Campus Visit | Susheeladevi College", description: "Contact the admission team, check eligibility, ask about BNYS and plan a visit to the Jagadal campus.", path: "/contact" } as SeoContent,
      hero: {
        eyebrow: "Contact us",
        title: "Your future in healthcare starts with one conversation",
        description: "Ask about BNYS, eligibility, documents, hostel information or planning a visit to the Jagadal campus.",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=85&w=1800",
        breadcrumbs: [{ label: "Home", href: "/" }, { label: "Contact Us" }],
        primaryCta: "Start an enquiry",
      } as PageHeroContent,
      sections: {
        reach: { eyebrow: "Reach our team", title: "Questions are welcome", description: "Speak with the admission team about eligibility, course information, documentation, accommodation or your campus visit." },
        guidance: { eyebrow: "Admission guidance", title: "How we can help" },
        visitEyebrow: "Plan your visit",
      },
      contactCards: {
        campusHeading: "Jagadal Campus",
        phoneHeading: "Call the admission team",
      },
      helpTopics: ["Course information", "Eligibility guidance", "Admission process", "Required documents", "Campus information", "Hostel information", "Academic guidance", "Career counselling"],
      map: {
        title: "Jagadal Campus",
        description: "Opp. Hanuman Temple, Banahatti-Mudhol Road, Jagadal – 587311, Taluk Rabkavi-Banahatti, District Bagalkot, Karnataka.",
        googleMapsEmbedUrl: "",
      },
    },
  },
};

// The homepage uses the same canonical FAQ records as the dedicated FAQ page.
siteData.pages.home.faqsSection.items = siteData.pages.faqs.items.slice(0, 8);
