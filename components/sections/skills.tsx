"use client"

import { motion } from "framer-motion"
import { Layout, Database, Wrench } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"

const skillCategories = [
  {
    icon: Layout,
    title: "Frontend Systems & Core Web",
    description: "Architecting responsive, type-safe client architectures with sub-100ms perceived performance.",
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
    icon: Database,
    title: "Backend, Cloud & AI Systems",
    description: "Building scalable serverless APIs, type-safe RPC layers, and low-latency LLM orchestration.",
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
    icon: Wrench,
    title: "DevOps, Performance & Standards",
    description: "Ensuring zero-drift deployments, WCAG accessibility, and pristine Core Web Vitals.",
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

export function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-border scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <SectionHeading
          number="03"
          badge="CAPABILITIES & ECOSYSTEM"
          title="Technical Capabilities Matrix"
          description="A curated overview of technologies, frameworks, and engineering standards I leverage to build production web systems."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="glass-card h-full p-6 sm:p-8 rounded-3xl border border-border hover:border-border/80 transition-[border-color,background-color,box-shadow] duration-200 flex flex-col justify-between dark:border-white/[0.1] dark:hover:border-white/20">
                <div className="space-y-4 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-muted/60 border border-border flex items-center justify-center text-primary dark:bg-white/[0.04] dark:border-white/[0.08]">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-normal mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-foreground/90 bg-muted/60 border border-border hover:border-primary/40 hover:text-foreground hover:bg-muted transition-[border-color,color,background-color] duration-150 cursor-default dark:text-zinc-300 dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:text-white dark:hover:bg-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
