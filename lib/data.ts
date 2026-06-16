export const personalInfo = {
  name: "Abdulhammed Mustapha",
  role: "Senior Frontend Developer",
  tagline: "Building fast, scalable web applications with React & Next.js",
  description: "Specialized in crafting high-performance user interfaces and seamless digital experiences. Turning complex requirements into elegant, maintainable code.",
  location: "Lagos, Nigeria",
  email: "Abdulhammedmustapha@gmail.com",
  phone: "+234 915 7531 916",
  availableForWork: true,
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
}

export const skills = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HTML5 & CSS3", level: 98 },
  ],
  backend: [
    { name: "Node.js", level: 82 },
    { name: "Express", level: 80 },
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
    { name: "Vercel/Netlify", level: 88 },
    { name: "Firebase", level: 80 },
  ]
}

export const projects = [
  {
    id: "project-1",
    title: "SaaS Analytics Dashboard",
    slug: "saas-analytics-dashboard",
    featured: true,
    problem: "Companies struggle to visualize complex data and make data-driven decisions quickly",
    solution: "Built a real-time analytics platform with interactive charts, custom filters, and AI-powered insights",
    role: "Lead Frontend Developer",
    impact: {
      metric: "40% faster decision-making",
      detail: "Reduced average time-to-insight from 2 hours to 72 minutes through optimized data visualization"
    },
    tech: ["Next.js", "TypeScript", "Recharts", "TailwindCSS", "PostgreSQL"],
    features: [
      "Real-time data sync with WebSocket integration",
      "Custom drag-and-drop dashboard builder",
      "AI-powered anomaly detection alerts",
      "Export reports in PDF, CSV, and Excel formats",
      "Role-based access control (RBAC)"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    ],
    liveUrl: "https://demo-analytics.vercel.app",
    githubUrl: "https://github.com/yourusername/analytics-dashboard",
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
    id: "project-3",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    featured: false,
    problem: "Content creators spend hours generating and optimizing content",
    solution: "Created an AI-powered tool that generates SEO-optimized blog posts, social media content, and ad copy",
    role: "Frontend Developer & AI Integration",
    impact: {
      metric: "10x content output",
      detail: "Users generate 10x more content in same timeframe with 85% quality retention"
    },
    tech: ["Next.js", "OpenAI API", "TypeScript", "TailwindCSS", "Supabase"],
    features: [
      "Multi-format content generation (blog, social, ads)",
      "SEO keyword optimization",
      "Tone and style customization",
      "Content history and versioning",
      "Export in multiple formats"
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveUrl: "https://ai-content-gen.vercel.app",
    githubUrl: "https://github.com/yourusername/ai-content-gen",
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

export const experience = [
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

export const testimonials = [
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

export const currentWork = {
  title: "Building a Developer Portfolio Template",
  description: "Creating an open-source Next.js portfolio template with advanced animations and SEO optimization",
  tech: ["Next.js 14", "Framer Motion", "TypeScript"],
  status: "In Progress",
  progress: 75
}
