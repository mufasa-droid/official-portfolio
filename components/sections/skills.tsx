"use client"

import { motion } from "framer-motion"
import { Code2, Layout, Database, Wrench, ShieldCheck, CheckCircle2 } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

interface SkillGroup {
  icon: typeof Code2
  title: string
  subtitle: string
  skills: { name: string; tag?: string; level?: string }[]
}

const skillClusters: SkillGroup[] = [
  {
    icon: Code2,
    title: "Core Languages & Runtime",
    subtitle: "Foundational mastery of the web runtime and modern language features.",
    skills: [
      { name: "TypeScript", tag: "Strict", level: "Primary" },
      { name: "JavaScript (ES2024+)", tag: "Async / OOP", level: "Expert" },
      { name: "HTML5 Semantic DOM", tag: "A11y / SEO", level: "Expert" },
      { name: "CSS3 & Modern Layouts", tag: "Grid / Flex", level: "Expert" },
      { name: "Node.js Runtime", tag: "V8 Engine", level: "Proficient" },
      { name: "SQL & Querying", tag: "Postgres", level: "Proficient" },
    ],
  },
  {
    icon: Layout,
    title: "Frontend Systems & State",
    subtitle: "High-performance component architecture, SSR, and reactive state management.",
    skills: [
      { name: "React 18 / 19", tag: "Hooks / Suspense", level: "Primary" },
      { name: "Next.js (App Router)", tag: "RSC / SSR", level: "Primary" },
      { name: "Tailwind CSS", tag: "Design Systems", level: "Primary" },
      { name: "Framer Motion", tag: "Micro-interactions", level: "Advanced" },
      { name: "TanStack Query", tag: "Cache & Fetch", level: "Advanced" },
      { name: "Zustand & Redux Toolkit", tag: "Client State", level: "Advanced" },
    ],
  },
  {
    icon: Database,
    title: "Backend, Database & AI",
    subtitle: "Cloud architecture, schema design, and AI model orchestration.",
    skills: [
      { name: "Supabase & Postgres", tag: "RLS Security", level: "Primary" },
      { name: "OpenAI GPT-4o API", tag: "AI Pipelines", level: "Advanced" },
      { name: "Next.js Server Actions", tag: "Type-Safe RPC", level: "Primary" },
      { name: "RESTful API Design", tag: "HTTP Spec", level: "Primary" },
      { name: "GraphQL", tag: "Schema / Query", level: "Proficient" },
      { name: "MetaAPI & Financial Feeds", tag: "MT4/MT5 Sync", level: "Production" },
    ],
  },
  {
    icon: Wrench,
    title: "Tooling, DevOps & Craft",
    subtitle: "Performance optimization, testing, build pipelines, and accessibility standards.",
    skills: [
      { name: "Vercel & Edge Network", tag: "CI / CD", level: "Primary" },
      { name: "Git & GitHub Actions", tag: "Workflows", level: "Primary" },
      { name: "Docker Containerization", tag: "DevOps", level: "Proficient" },
      { name: "Web Accessibility (WCAG AA)", tag: "ARIA / Focus", level: "Advanced" },
      { name: "Core Web Vitals & Perf", tag: "LCP / CLS / INP", level: "Expert" },
      { name: "Figma to Code", tag: "Pixel-Perfect", level: "Expert" },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 relative border-t border-white/[0.08]">
      <div className="container-custom">
        <SectionHeading
          number="02"
          badge="CAPABILITIES & ECOSYSTEM"
          title="Technical Capabilities Matrix"
          description="A categorized breakdown of tools, frameworks, and architecture patterns I leverage to build production web systems."
        />

        {/* 4 Skill Clusters */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {skillClusters.map((cluster, index) => (
            <motion.div
              key={cluster.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card hoverEffect className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary">
                      <cluster.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cluster.title}</CardTitle>
                      <p className="text-xs text-zinc-400 font-normal mt-1">{cluster.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="tech-chip group"
                      >
                        <span className="font-semibold text-zinc-100 group-hover:text-white">
                          {skill.name}
                        </span>
                        {skill.tag && (
                          <span className="text-[10px] text-zinc-500 font-mono">
                            • {skill.tag}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Engineering Standards Assurance Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400"
        >
          <div className="flex items-center gap-2 text-white font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>ARCHITECTURE COMMITMENT:</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Strict TypeScript</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Zero Cascading Re-renders</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
              <span>WCAG 2.1 AA Accessible</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
              <span>Lighthouse 95+ Score</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
