"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Terminal, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { personalInfo } from "@/lib/data"

export function Hero() {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-grid-technical">
      {/* Subtle radial spotlight (pure CSS, no CPU animation loops) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Focus */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Metadata Status Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for high-impact roles & contracts</span>
              </div>

              <span className="text-xs font-mono text-muted-foreground/80 hidden sm:inline-block">
                Lagos, NG (UTC+1)
              </span>
            </motion.div>

            {/* Master Headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] [text-wrap:balance]">
                Senior Frontend Engineer{" "}
                <span className="heading-gradient">crafting resilient web systems</span>{" "}
                & AI interfaces.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed max-w-2xl [text-wrap:pretty]">
                Specialized in <span className="text-foreground font-medium">React, Next.js, and TypeScript</span> architectures. 
                I turn complex behavioral analytics and machine learning workflows into crisp, sub-100ms digital products.
              </p>
            </motion.div>

            {/* Action Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-5 pt-1"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button size="lg" variant="default" href="#projects" className="justify-center">
                  <span>View Featured Work</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>

                <Button size="lg" variant="outline" href="#contact" className="justify-center">
                  <span>Get In Touch</span>
                </Button>
              </div>

              {/* Verified Connect Links */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono pt-1">
                <span className="text-muted-foreground/60">CONNECT:</span>
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <span className="text-border">•</span>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sleek Flagship Code & Architecture Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-card overflow-hidden shadow-2xl border border-border dark:border-white/[0.12]">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/60 dark:border-white/[0.08] dark:bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground dark:text-zinc-400">
                    tradermind.engine.ts
                  </span>
                </div>
                <Badge variant="accent" className="text-[10px] py-0 px-2 font-mono">
                  <Sparkles className="h-2.5 w-2.5 mr-1" />
                  FLAGSHIP
                </Badge>
              </div>

              {/* Code Snippet */}
              <div
                tabIndex={0}
                role="region"
                aria-label="Interactive architecture code snippet"
                className="p-5 font-mono text-xs text-zinc-300 space-y-2.5 bg-zinc-950 dark:bg-black/60 overflow-x-auto leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
              >
                <div className="text-zinc-500">{"// Deterministic + LLM Two-Layer Pipeline"}</div>
                
                <div>
                  <span className="text-purple-400">async function</span>{" "}
                  <span className="text-blue-400">evaluateTraderSession</span>(
                  <span className="text-zinc-300">trades</span>: Trade[]
                  ) {"{"}
                  <div className="pl-4">
                    <span className="text-purple-400">const</span> metrics ={" "}
                    <span className="text-yellow-300">calculateDiscipline</span>(trades);
                    <br />
                    <span className="text-purple-400">const</span> report ={" "}
                    <span className="text-yellow-300">generateCoachVoice</span>(metrics);
                    <br />
                    <span className="text-purple-400">return</span> {"{ metrics, report }"};
                  </div>
                  {"}"}
                </div>
              </div>

              {/* Case Study Callout Bar */}
              <Link
                href="/projects/tradermind-ai-trading-coach"
                className="p-3.5 bg-muted/40 hover:bg-muted border-t border-border dark:bg-black/40 dark:hover:bg-white/[0.04] flex items-center justify-between transition-colors group"
                aria-label="Explore TraderMind AI Case Study"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-medium text-foreground group-hover:text-primary transition-colors">
                    TraderMind AI // Full Architecture
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-primary font-medium">
                  <span>Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
