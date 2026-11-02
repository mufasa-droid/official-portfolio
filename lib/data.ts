import {
  PersonalInfo,
  SkillCategories,
  SkillCategoryWithSkills,
  Project,
  ExperienceItem,
  TestimonialItem,
  CurrentWork,
  CertificateItem,
} from "@/types/portfolio"

export const personalInfo: PersonalInfo = {
  name: "Abdulhammed Mustapha",
  role: "Senior Frontend Developer",
  tagline: "Building fast, scalable web applications with React & Next.js",
  description: "Specialized in crafting high-performance user interfaces and seamless digital experiences. Turning complex requirements into elegant, maintainable code.",
  location: "Lagos, Nigeria",
  email: "Abdulhammedmustapha@gmail.com",
  phone: "+234 915 7531 916",
  availableForWork: true,
  socials: {
    github: "https://github.com/mufasa-droid",
    linkedin: "https://linkedin.com/in/abdulhammed-mustapha-37454634b",
    twitter: "https://twitter.com/yourusername",
  }
}

export const skills: SkillCategories = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "Tailwind CSS", level: 72 },
    { name: "HTML5 & CSS3", level: 98 },
  ],
  backend: [
    { name: "Node.js", level: 82 },
    { name: "Express", level: 60 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "REST APIs", level: 85 },
    { name: "GraphQL", level: 72 },
  ],
  tools: [
    { name: "Git & GitHub", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Figma", level: 85 },
    { name: "Docker", level: 70 },
    { name: "Vercel", level: 88 },
    { name: "Firebase", level: 80 },
  ]
}

export const projects: Project[] = [
  {
    id: "project-anime-luxe",
    title: "Anime Luxe — Interactive 3D Anime Merchandise Store",
    slug: "anime-luxe",
    featured: true,
    duration: "Production MVP",
    team: "Solo Project",
    problem:
      "Most anime merchandise retailers use generic, static e-commerce templates that fail to capture the dynamic, cinematic excitement of modern anime culture. Conversely, highly stylized WebGL/3D showcase websites frequently suffer from slow initial load times, poor mobile responsiveness, and clunky user journeys that compromise core shopping usability and checkout conversion rates.",
    solution:
      "Anime Luxe merges a production-grade, fast e-commerce platform with an interactive 3D WebGL visual layer. Built on Next.js 16 (App Router), React 19, and React Three Fiber, it delivers rich anime-inspired aesthetics (procedural energy auras, custom GLSL shaders, and interactive 3D model inspection) while strictly preserving core commerce vitals—delivering instant page transitions, responsive touch controls, and resilient end-to-end purchasing flows.",
    role: "Full-Stack Engineer & Frontend Architect",
    impact: {
      metric: "100+ Static SSG Pages & 60 FPS 3D",
      detail:
        "Compiled 106 static and dynamic routes under Next.js 16 and React 19 with strict TypeScript verification. Achieved steady 60 FPS WebGL rendering with zero render-loop state thrashing, preserving sub-second navigation and mobile checkout usability with a fail-soft cloud architecture.",
    },
    tech: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Three.js",
      "React Three Fiber (R3F)",
      "@react-three/drei",
      "Zustand",
      "Supabase",
      "Clerk Auth",
      "Stripe / Flutterwave",
      "Algolia Search",
      "Cloudinary",
      "Framer Motion",
      "Lenis",
    ],
    features: [
      "Interactive 3D Visualizer & Procedural VFX: Embedded Three.js/R3F canvases featuring custom Fresnel shader shells, dynamic particle sparks, levitating GLB models, and pointer-reactive camera controls optimized for smooth 60 FPS rendering.",
      "End-to-End E-Commerce Flow: Multi-category filtering across 18+ anime franchises, instant search indexing via Algolia, persistent cart state with Zustand, and multi-step checkout with resilient dual-channel webhook order verification.",
      "Mobile-First Glassmorphic Design: Dark-first cyber/luxury UI using Tailwind CSS v4 and Framer Motion, complete with touch-snap product rails, expand/collapse category drawers, and safe-area sheet modals for mobile viewports (320px+).",
      "Resilient Hybrid Architecture & Developer Sandbox: Fail-soft, lazy-initialized SDK clients to eliminate third-party build-time blockers, paired with a dev-persona authentication engine for seamless local testing alongside live Clerk production auth.",
      "Admin Management & Inventory CRUD: Dedicated role-based dashboard for catalog management, stock tracking, review moderation, and promotional discount management with optimistic UI updates.",
    ],
    image: "/projects/anime-luxe/hero.jpg",
    gallery: [
      "/projects/anime-luxe/hero.jpg",
      "/projects/anime-luxe/shop.jpg",
      "/projects/anime-luxe/categories.jpg",
      "/projects/anime-luxe/universe.jpg",
    ],
    liveUrl: "https://anime-luxe.vercel.app/",
  },
  {
    id: "project-1",
    title: "TraderMind — AI Trading Performance Coach",
    duration: "6 weeks",
    team: "Solo Project",
    slug: "tradermind-ai-trading-coach",
    featured: true,
    problem: "Most traders lose money not because of bad market analysis, but because of poor psychology, emotional decision-making, and repeated behavioral mistakes. No existing tool analyzes the trader — they all analyze the market.",
    solution: "Built a full-stack AI-powered behavioral intelligence platform that tracks trader psychology, scores discipline, detects damaging patterns like revenge trading and FOMO entries, and delivers personalized AI coaching reports — without ever generating a single buy/sell signal.",
    role: "Full-Stack Developer & Product Architect",
    impact: {
      metric: "11-feature behavioral engine",
      detail: "Built a two-layer AI system: a deterministic engine that calculates 15+ behavioral metrics (discipline score, consistency score, risk quality, emotional stability) and a GPT-4o interpretation layer that converts raw analytics into personalized coach-voice reports — all deployed on a fully free stack."
    },
    tech: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "OpenAI GPT-4o",
      "Recharts",
      "MetaAPI",
      "Vercel"
    ],
    features: [
      "AI weekly & monthly behavioral coaching reports powered by GPT-4o",
      "Real-time trade evaluation engine — alignment score, discipline score, and risk warning before entry",
      "Behavioral intelligence engine detecting 12 pattern types: revenge trading, FOMO, post-win risk creep, overtrading and more",
      "Live broker sync via MetaAPI for MT4/MT5 trade history with zero manual logging",
      "Behavioral journaling with emotion tracking, confidence/stress/fear sliders, and per-trade reflection",
      "Session performance analytics — London vs New York vs Asian vs Overlap win rates",
      "Strategy performance breakdown with best-session correlation",
      "Goals & rule enforcement system with real-time compliance monitoring",
      "Interactive AI coach chat with full trading context injected per message",
      "Demo mode with pre-seeded realistic trade data and one-click guest access",
      "11-table PostgreSQL schema with Row Level Security — every user sees only their own data"
    ],
    image: "/projects/tradermind/hero.png",
    gallery: [
      "/projects/tradermind/hero.png",
      "/projects/tradermind/cockpit.jpg",
      "/projects/tradermind/trades.jpg",
      "/projects/tradermind/architecture.png",
    ],
    liveUrl: "https://trader-mind-kohl.vercel.app",
    githubUrl: "https://github.com/mufasa-droid/TraderMind",
  },
  {
    id: "project-kindnote",
    title: "KindNote — Privacy-First Anonymous Messaging Platform",
    slug: "kindnote-anonymous-messaging",
    featured: true,
    duration: "Production Release",
    team: "Solo Project",
    problem:
      "Modern communication platforms are susceptible to metadata leakage, identity tracking, and targeted harassment. When individuals wish to deliver honest, constructive feedback, gratitude, or sensitive notes, social friction and fear of exposure often prevent communication. Conversely, open anonymous platforms often suffer from spam floods, lack of abuse safeguards, and flawed privacy architectures where sender identities or precise timestamps can be reverse-engineered through database inspection or timing-correlation attacks.",
    solution:
      "KindNote delivers a zero-trust, anonymous one-way messaging platform designed with defense-in-depth principles. Sender anonymity is enforced at the database layer via PostgreSQL SECURITY DEFINER routines and strict Row-Level Security (RLS), ensuring sender metadata can never be leaked to recipients—even if database functions are queried directly. Messages are encrypted at rest using server-held AES-256-GCM with recipient and message IDs bound as authenticated data (AAD). Anti-harassment safeguards including concurrency-safe rolling-hour rate limits, uniform error masking, and coarse relative timestamps protect both senders and recipients.",
    role: "Full-Stack Engineer & System Architect",
    impact: {
      metric: "100% Spec Traceability & <600ms RTT",
      detail:
        "Backed by automated SQL verification suites run directly against PostgreSQL instances, proving zero sender leakage, RLS isolation, and data integrity. Co-located Vercel Serverless (dub1) and Supabase (eu-west-1) achieving warm page responses under 600ms cross-continentally with zero-bypass rate-limit concurrency.",
    },
    tech: [
      "Next.js (App Router)",
      "Server Actions",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (PostgreSQL)",
      "Row-Level Security (RLS)",
      "pg_trgm Trigram Indexing",
      "AES-256-GCM (AAD)",
      "Google OAuth 2.0",
      "Vitest & Playwright",
      "Vercel Serverless",
    ],
    features: [
      "Cryptographic Anonymity & AES-256-GCM Storage: Zero-leakage database architecture where sender identities are withheld by database functions; message content is encrypted at rest and tied cryptographically to recipient IDs.",
      "Coarse-Grained Timestamps (Anti-Correlation): Replaces exact timestamps with relative time buckets ('In the last day', 'This week', 'This month', 'Earlier') to eliminate de-anonymization via time-correlation attacks.",
      "Concurrency-Safe Rolling-Hour Rate Limits: Database-level transaction controls and advisory locks preventing more than 10 messages per sender per rolling hour and capping recipient inbox velocity.",
      "Trigram-Indexed Discovery & Uniform Error Masking: Fast search via pg_trgm indexes with query sanitization. Missing, suspended, deactivated, and self-lookup states return identical errors to prevent user enumeration.",
      "Sanitized One-Way Inbox: Focused inbox interface with unread count badges, pagination, and strict plain-text rendering that eliminates HTML/XSS and markdown injection attack vectors.",
      "Account Lifecycle & Suspension Guard: Integrated operational lifecycle controls with instant lockout for suspended accounts and cascade-safe deletion protocols.",
    ],
    image: "/projects/kindnote/hero.jpg",
    gallery: [
      "/projects/kindnote/hero.jpg",
      "/projects/kindnote/how-it-works.png",
      "/projects/kindnote/search.png",
      "/projects/kindnote/inbox.png",
      "/projects/kindnote/compose.png",
    ],
    liveUrl: "https://kindnote.vercel.app",
    githubUrl: "https://github.com/mufasa-droid/kindnote",
  },
  {
    id: "project-renew-you",
    title: "Renew You — Mindful Wellness & Reflection Sanctuary",
    slug: "renew-you",
    featured: true,
    duration: "Production Release",
    team: "Solo Project",
    problem:
      "Most wellness and mental-health applications create high friction with mandatory account registration, invasive telemetry, aggressive monetization, and cluttered gamification. Users seeking a quick, grounding moment to decompress or track their emotional state are often deterred by privacy concerns and complex onboarding.",
    solution:
      "Renew You provides an accessible, mobile-first wellness companion designed to help users pause, reflect, and practice guided self-care in under 30 seconds. Featuring an instant guest-first experience, users can log daily mood check-ins, journal reflections, and engage in customizable breathing exercises—with local-first client storage and optional Supabase cloud synchronization protected by strict Row Level Security (RLS).",
    role: "Full-Stack Engineer / Frontend Architect",
    impact: {
      metric: "Zero-Flicker SSR & Local-First Sync",
      detail:
        "Eliminated SSR hydration mismatches using React 19's useSyncExternalStore with memoized snapshot selectors for client-side storage. Architected an idempotent database migration pathway with PostgreSQL Row Level Security (RLS) guaranteeing strict cross-user data isolation and sub-second load times via Next.js Turbopack.",
    },
    tech: [
      "Next.js 16 (App Router)",
      "Turbopack",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Supabase (Auth & PostgreSQL)",
      "Row Level Security (RLS)",
      "@supabase/ssr",
      "useSyncExternalStore",
      "Lucide React",
    ],
    features: [
      "5-Tier Daily Mood Check-In & 7-Day History: Intuitive mood tracking (Radiant, Serene, Neutral, Low Energy, Overwhelmed) with same-day edits, notes, and a responsive visual timeline.",
      "Guided Breathwork Sanctuary: Interactive animated breathing orb with cadence presets (Gentle Balance 4-4, Calm Flow 4-6, Box Breathing 4-4-4-4), full playback controls, and prefers-reduced-motion compliance.",
      "Daily Reflection Journal: Contextual self-care prompts with instant local autosaving, editable entries, and chronological review.",
      "Guest-First Architecture & Supabase Migration: Seamless offline-ready guest mode using centralized localStorage management, with safe, duplicate-proof migration into Supabase PostgreSQL when creating an account.",
      "Non-Clinical Safety & Crisis Resources: Transparent data control/purging in Settings, clear disclaimers that the app is non-diagnostic, and integrated 988 Suicide & Crisis Lifeline hotline references.",
    ],
    image: "/projects/renew-you/hero.jpg",
    gallery: [
      "/projects/renew-you/hero.jpg",
      "/projects/renew-you/breathwork.jpg",
      "/projects/renew-you/journey.jpg",
    ],
    liveUrl: "https://renew-you.vercel.app",
    githubUrl: "https://github.com/mufasa-droid/renew-you",
  },
  {
    id: "project-lashed-by-beejay",
    title: "Lashed by Beejay — Premium Lash Studio Website",
    slug: "lashed-by-beejay",
    featured: false,
    duration: "Client Production",
    team: "Solo Project",
    problem:
      "Lashed by Beejay needed a professional online presence where potential clients could easily discover its lash services, compare prices, view previous work, and understand studio booking policies without relying solely on fragmented social media channels.",
    solution:
      "Designed and developed a responsive, editorial lash studio website unifying service catalogues, tier-based pricing, portfolio galleries, client reviews, and care policies into a single cohesive destination with streamlined direct WhatsApp booking conversions.",
    role: "Frontend Developer & UI Designer",
    impact: {
      metric: "Unified Multi-Tier Service Catalogue",
      detail:
        "Delivered an accessible, mobile-first client experience bringing services, pricing, and salon policies into one branded location with zero friction WhatsApp appointment scheduling.",
    },
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Lucide React",
      "Three.js",
      "Vercel",
    ],
    features: [
      "Multi-Tier Service & Refill Catalogue: Detailed display of classic, hybrid, and Russian volume full sets with 2-3 week maintenance refills and add-ons.",
      "High-Resolution Portfolio Gallery: Curated photographic showcase highlighting bespoke lash styling across diverse facial and eye curvatures.",
      "Mobile-First Editorial Aesthetic: Tailored typography (Cormorant Garamond & Plus Jakarta Sans) paired with responsive micro-interactions.",
      "Integrated Studio Policies & Care Guides: Transparent guidelines covering retention guarantees, sanitation protocols, and booking prerequisites.",
      "Direct WhatsApp Booking Action: Low-friction enquiry funnel directing ready-to-book clients straight into WhatsApp with prefilled service context.",
    ],
    image: "/projects/lashed-by-beejay/hero.jpg",
    gallery: [
      "/projects/lashed-by-beejay/hero.jpg",
      "/projects/lashed-by-beejay/services.jpg",
      "/projects/lashed-by-beejay/pricing.png",
    ],
    liveUrl: "https://lashedbybeejay.vercel.app/",
  }
]

export const experience: ExperienceItem[] = [
  {
    company: "Freelance",
    role: "Senior Frontend Developer",
    period: "2023 - Present",
    location: "Remote",
    description: "Building custom web applications for international clients. Specializing in React, Next.js, and TypeScript solutions.",
    achievements: [
      "Delivered 10+ production-ready applications",
      "Maintained 98% client satisfaction rate",
      "Reduced client development costs by 40% through efficient architecture"
    ]
  },
  {
    company: "Tech Startup (Contract)",
    role: "Frontend Developer",
    period: "2022 - 2023",
    location: "Remote",
    description: "Led frontend development for a fast-growing SaaS platform serving 5,000+ users.",
    achievements: [
      "Improved page load speed by 60% through code optimization",
      "Implemented CI/CD pipeline reducing deployment time by 50%",
      "Mentored 2 junior developers"
    ]
  }
]

export const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    text: "Abdulhammed delivered a complex dashboard 2 weeks ahead of schedule. His attention to detail and clean code made collaboration seamless. Highly recommend for any serious project."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupHub",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    text: "Working with Abdulhammed was a game-changer. He not only built our MVP but suggested architectural improvements that saved us months of technical debt. A true senior-level engineer."
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    company: "DesignStudio",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    text: "Best developer I've worked with. Fast, reliable, and communicates clearly. He transformed our Figma designs into a pixel-perfect, performant web app."
  }
]

export const currentWork: CurrentWork = {
  title: "Building a Developer Portfolio Template",
  description: "Creating an open-source Next.js portfolio template with advanced animations and SEO optimization",
  tech: ["Next.js 14", "Framer Motion", "TypeScript"],
  status: "In Progress",
  progress: 75
}

export const certificates: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Meta Frontend Developer Professional Certificate",
    issuer: "Meta / Coursera",
    issueDate: "2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/",
    imageUrl: "https://images.unsplash.com/photo-1589330694653-dad6d3240a2b?w=800&h=600&fit=crop",
    description: "Comprehensive multi-course specialization covering advanced React, JavaScript architectures, UI/UX engineering, automated testing, and web standards.",
    displayOrder: 1,
    isVisible: true,
  },
  {
    id: "cert-2",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    credentialUrl: "https://aws.amazon.com/verification",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    description: "Cloud computing infrastructure, serverless architecture, AWS security protocols, resilience patterns, and billing models.",
    displayOrder: 2,
    isVisible: true,
  },
  {
    id: "cert-3",
    title: "Advanced React & Next.js Architecture",
    issuer: "Vercel / EpicWeb",
    issueDate: "2024",
    credentialUrl: "https://epicweb.dev",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    description: "Mastery of React Server Components, Streaming SSR, Next.js App Router performance optimization, and distributed data caching.",
    displayOrder: 3,
    isVisible: true,
  },
  {
    id: "cert-4",
    title: "TypeScript Pro & Type-Level Engineering",
    issuer: "Total TypeScript",
    issueDate: "2023",
    credentialUrl: "https://totaltypescript.com",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "Advanced conditional typing, generics, template literals, type narrowing, and enterprise library design.",
    displayOrder: 4,
    isVisible: true,
  },
]

export const skillCategories: SkillCategoryWithSkills[] = [
  {
    id: "cat-1",
    name: "Frontend Systems & Core Web",
    slug: "frontend",
    description: "Architecting responsive, type-safe client architectures with sub-100ms perceived performance.",
    iconName: "Layout",
    skills: [
      "TypeScript",
      "React 19 / 18",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Query",
      "Zustand",
      "JavaScript (ES2024+)",
      "HTML5 Semantic DOM",
    ],
  },
  {
    id: "cat-2",
    name: "Backend, Cloud & AI Systems",
    slug: "backend",
    description: "Building scalable serverless APIs, type-safe RPC layers, and low-latency LLM orchestration.",
    iconName: "Database",
    skills: [
      "Supabase & PostgreSQL",
      "OpenAI GPT-4o API",
      "Next.js Server Actions",
      "Node.js Runtime",
      "RESTful API Design",
      "GraphQL",
      "MetaAPI Financial Feeds",
      "SQL Schema Design",
    ],
  },
  {
    id: "cat-3",
    name: "DevOps, Performance & Standards",
    slug: "devops",
    description: "Ensuring zero-drift deployments, WCAG accessibility, and pristine Core Web Vitals.",
    iconName: "Wrench",
    skills: [
      "Vercel Edge Platform",
      "Git & GitHub Actions",
      "Docker",
      "Core Web Vitals (LCP/INP/CLS)",
      "Web Accessibility (WCAG AA)",
      "CI / CD Pipelines",
      "Figma to Pixel-Perfect Code",
    ],
  },
]

export async function getPortfolioProfile(): Promise<PersonalInfo> {
  return personalInfo
}

export async function getPublishedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.isPublished !== false)
}

export async function getProjectBySlug(
  slug: string,
  _options?: { allowDraft?: boolean }
): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) || null
}

export async function getSkillCategoriesWithSkills(): Promise<SkillCategoryWithSkills[]> {
  return skillCategories
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  return experience
}

export async function getCurrentWork(): Promise<CurrentWork> {
  return currentWork
}

export async function getCertificates(): Promise<CertificateItem[]> {
  return certificates.filter((c) => c.isVisible !== false)
}

