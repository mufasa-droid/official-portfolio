"use client"

import { motion } from "framer-motion"
import { Layers, Zap, Cpu, ArrowUpRight, Terminal, MapPin } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

const pillars = [
  {
    icon: Layers,
    badge: "ARCHITECTURE",
    title: "Resilient System Architecture",
    description:
      "Strict type systems, composable component hierarchies, and clean server/client boundaries designed for long-term maintainability.",
  },
  {
    icon: Zap,
    badge: "PERFORMANCE",
    title: "Sub-100ms Interaction UX",
    description:
      "Eliminating waterfalls, optimizing Core Web Vitals (LCP, CLS, INP), and engineering buttery 60fps GPU-accelerated micro-interactions.",
  },
  {
    icon: Cpu,
    badge: "AI & SYSTEMS",
    title: "AI Product Engineering",
    description:
      "Bridging deterministic computation engines with LLM reasoning layers (like GPT-4o) to turn complex data into actionable user intelligence.",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 relative border-t border-white/[0.08]">
      <div className="container-custom">
        <SectionHeading
          number="01"
          badge="PROFILE & PHILOSOPHY"
          title="Engineering resilient software with high craft & systems thinking."
          description="I specialize in building production-grade web applications that combine architectural rigor with fluid, responsive user experiences."
        />

        {/* 3 Core Engineering Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card hoverEffect className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="mono">{pillar.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-400">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Narrative & Technical Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 md:p-12 border border-white/[0.12]"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Story & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary">
                <Terminal className="h-3.5 w-3.5" />
                <span>{"// WHO I AM & HOW I BUILD"}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                Senior Frontend Engineer dedicated to turning complex domains into effortless interfaces.
              </h3>

              <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                <p>
                  With years of specialized experience across <span className="text-zinc-200 font-medium">React, Next.js, and TypeScript</span>, 
                  I build web systems where reliability meets delight. I treat software craftsmanship not merely as making things work, 
                  but ensuring every state transition, data query, and edge-case feels intentional.
                </p>
                <p>
                  My flagship work on <span className="text-white font-medium">TraderMind</span> demonstrates this ethos: building an 11-feature 
                  deterministic calculation engine paired with a GPT-4o interpretation layer to analyze trader psychology without latency bottlenecks.
                </p>
                <p>
                  Whether architecting scalable frontend component libraries, reducing layout shifts, or integrating AI workflows, 
                  I focus on delivering verifiable business impact and maintainable codebases that teams enjoy shipping.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-white transition-colors"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="text-zinc-700">•</span>
                <a
                  href="https://github.com/mufasa-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <span>View GitHub Repositories</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Technical Ledger */}
            <div className="lg:col-span-5 space-y-4 lg:pl-6 lg:border-l border-white/[0.08]">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 border-b border-white/[0.08]">
                <span>ENGINEERING SNAPSHOT</span>
                <span className="text-emerald-400 font-semibold">ACTIVE</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="text-zinc-500">PRIMARY FOCUS</div>
                  <div className="text-zinc-200 font-medium">Next.js 14/15 App Router • TypeScript • AI Interfaces</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="text-zinc-500">LOCATION & AVAILABILITY</div>
                  <div className="text-zinc-200 flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>Lagos, Nigeria (UTC+1) • Global Remote</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="text-zinc-500">CORE ETHOS</div>
                  <div className="text-zinc-200 font-medium">Type Safety • Zero Cascading Re-renders • Accessible WCAG AA</div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <div className="text-zinc-500">COLLABORATION</div>
                  <div className="text-zinc-200 font-medium">Clear Async Communication • Rigorous PR Reviews • Agile Flow</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
