"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Terminal, MapPin } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"

export function About() {
  return (
    <section id="about" className="py-24 relative border-t border-border scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <SectionHeading
          number="01"
          badge="PROFILE & PHILOSOPHY"
          title="Engineering resilient software with high craft & systems thinking."
          description="I specialize in building production-grade web applications that combine architectural rigor with fluid, responsive user experiences."
        />

        {/* Narrative & Technical Ledger */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card p-8 md:p-12 border border-border rounded-3xl"
        >
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Story & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-primary">
                <Terminal className="h-3.5 w-3.5" />
                <span>{"// WHO I AM & HOW I BUILD"}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug [text-wrap:balance]">
                Senior Frontend Engineer dedicated to turning complex domains into effortless interfaces.
              </h3>

              <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  With years of specialized experience across <span className="text-foreground font-medium">React, Next.js, and TypeScript</span>, 
                  I build web systems where reliability meets delight. I treat software craftsmanship not merely as making things work, 
                  but ensuring every state transition, data query, and edge-case feels intentional.
                </p>
                <p>
                  My flagship work on <span className="text-foreground font-semibold">TraderMind</span> demonstrates this ethos: building an 11-feature 
                  deterministic calculation engine paired with a GPT-4o interpretation layer to analyze trader psychology without latency bottlenecks.
                </p>
                <p>
                  Whether architecting scalable frontend component libraries, eliminating layout shifts, or integrating AI workflows, 
                  I focus on delivering verifiable business impact and maintainable codebases that teams enjoy shipping.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <span className="text-border">•</span>
                <a
                  href="https://github.com/mufasa-droid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>View GitHub Repositories</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Technical Ledger */}
            <div className="lg:col-span-5 space-y-4 lg:pl-6 lg:border-l border-border">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-2 border-b border-border">
                <span>ENGINEERING SNAPSHOT</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  ACTIVE
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border dark:bg-white/[0.02] dark:border-white/[0.06] space-y-1">
                  <div className="text-muted-foreground/80">PRIMARY STACK</div>
                  <div className="text-foreground font-medium">Next.js 14/15 App Router • React 19 • TypeScript</div>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/40 border border-border dark:bg-white/[0.02] dark:border-white/[0.06] space-y-1">
                  <div className="text-muted-foreground/80">ARCHITECTURE & AI</div>
                  <div className="text-foreground font-medium">RSC • Server Actions • LLM Pipelines • Supabase</div>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/40 border border-border dark:bg-white/[0.02] dark:border-white/[0.06] space-y-1">
                  <div className="text-muted-foreground/80">LOCATION & AVAILABILITY</div>
                  <div className="text-foreground flex items-center gap-1.5 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>Lagos, Nigeria (UTC+1) • Global Remote Roles</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-muted/40 border border-border dark:bg-white/[0.02] dark:border-white/[0.06] space-y-1">
                  <div className="text-muted-foreground/80">ENGINEERING ETHOS</div>
                  <div className="text-foreground font-medium">Sub-100ms INP • Strict Types • WCAG AA Accessible</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
