"use client"

import { motion } from "framer-motion"
import { Flame, Code2, Sparkles, ArrowRight } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

export function CurrentWork() {
  return (
    <section className="py-16 relative border-t border-white/[0.08]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-10 border border-white/[0.12] relative overflow-hidden"
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2.5">
                <Badge variant="accent" className="font-mono">
                  <Flame className="h-3.5 w-3.5 mr-1 text-orange-400" />
                  ACTIVE FOCUS
                </Badge>
                <span className="text-xs font-mono text-emerald-400">
                  {"// CURRENT SPRINT"}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Building AI-Native Financial Intelligence Tools & Next.js 15 Architectures
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Currently expanding TraderMind&apos;s real-time broker execution pipeline, exploring 
                React 19 Server Actions streaming, and optimizing low-latency LLM agent tool-calling for trading psychology.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-zinc-400 mr-1">STACK:</span>
                {["Next.js 15", "React 19", "TypeScript", "OpenAI GPT-4o", "Supabase RLS"].map((tech) => (
                  <span key={tech} className="tech-chip text-[11px] py-0.5 px-2">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] w-full max-w-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">STATUS</span>
                  <span className="text-emerald-400 font-semibold">IN PROGRESS</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full w-[80%]" />
                </div>
              </div>

              <Button variant="outline" href="#projects" className="w-full max-w-xs justify-center">
                <span>View Flagship Project</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
