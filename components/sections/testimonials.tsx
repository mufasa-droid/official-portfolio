"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Zap, GitPullRequest, ArrowUpRight, Github, Check } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { personalInfo } from "@/lib/data"

const principles = [
  {
    icon: ShieldCheck,
    badge: "RELIABILITY",
    title: "Type Safety & Zero Runtime Drift",
    description:
      "I enforce strict TypeScript across all layers. Component props, API payloads, and state mutations are validated to eliminate entire classes of runtime bugs before shipping to production.",
    points: ["100% Strict Compiler Config", "Safe Discriminated Unions", "Zero 'any' In Production"],
  },
  {
    icon: Zap,
    badge: "SPEED",
    title: "Sub-100ms Perceived Performance",
    description:
      "Fast interfaces build trust. I architect around Core Web Vitals (LCP < 1.2s, CLS < 0.05, INP < 100ms), eliminating data waterfalls and ensuring animations run off the main thread on the GPU.",
    points: ["Eliminating Cascading Fetches", "Hardware-Accelerated Motion", "Minimal Client Bundle Size"],
  },
  {
    icon: GitPullRequest,
    badge: "COLLABORATION",
    title: "High-Velocity Async Delivery",
    description:
      "Writing great code is only half the job. I communicate clearly and asynchronously, submit atomic pull requests with comprehensive context, and provide architectural clarity for cross-functional teams.",
    points: ["Structured PR Breakdowns", "Clear Architecture Notes", "Proactive Trade-off Analysis"],
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative border-t border-white/[0.08]">
      <div className="container-custom">
        <SectionHeading
          number="05"
          badge="CRAFTSMANSHIP & STANDARDS"
          title="Engineering Principles & Delivery Standards"
          description="How I approach software engineering: predictable systems, relentless performance optimization, and transparent collaboration."
        />

        {/* 3 Principles Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {principles.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card hoverEffect className="h-full flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="mono">{p.badge}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-snug">{p.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-white/[0.06]">
                    {p.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Collaboration & Peer Verification Callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 rounded-2xl border border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Looking for a Senior Frontend Engineer who delivers with craft?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Check out my code directly on GitHub or connect with me on LinkedIn to discuss your team&apos;s goals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" href={personalInfo.socials.github} external>
              <Github className="h-4 w-4" />
              <span>Explore GitHub</span>
            </Button>
            <Button variant="default" href="#contact">
              <span>Start a Conversation</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
