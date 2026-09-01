import {
  PersonalInfo,
  SkillCategories,
  Project,
  ExperienceItem,
  TestimonialItem,
  CurrentWork,
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
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1642790106117-e829d14b6cce?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    ],
    liveUrl: "https://trader-mind-kohl.vercel.app",
    githubUrl: "https://github.com/mufasa-droid/TraderMind",
  },
  {
    id: "project-2",
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    featured: false,
    problem: "Small businesses lack affordable, feature-rich e-commerce solutions",
    solution: "Developed a full-stack e-commerce platform with Stripe integration, inventory management, and analytics",
    role: "Full-Stack Developer",
    impact: {
      metric: "$50K+ in sales",
      detail: "Platform processed over $50,000 in transactions within first 3 months of launch"
    },
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    features: [
      "Stripe payment gateway integration",
      "Real-time inventory tracking",
      "Admin dashboard with sales analytics",
      "Customer review and rating system",
      "Email notifications for orders"
    ],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
    liveUrl: "https://demo-shop.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce",
  },
  {
    id: "project-4",
    title: "Task Management App",
    slug: "task-management",
    featured: false,
    problem: "Teams lose productivity due to scattered task tracking across multiple tools",
    solution: "Built a unified task management system with Kanban boards, time tracking, and team collaboration features",
    role: "Frontend Developer",
    impact: {
      metric: "30% productivity boost",
      detail: "Teams reported 30% improvement in task completion rates"
    },
    tech: ["React", "Firebase", "Material-UI", "TypeScript"],
    features: [
      "Drag-and-drop Kanban boards",
      "Time tracking and reporting",
      "Real-time collaboration",
      "Custom labels and filters",
      "Calendar integration"
    ],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    liveUrl: "https://task-manager-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/task-manager",
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
