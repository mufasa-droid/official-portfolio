"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, Check, Copy, Terminal, Sparkles, Code2 } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { personalInfo } from "@/lib/data"

export function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-technical">
      {/* Subtle radial spotlight (pure CSS, no CPU animation loops) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-blue-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Introduction */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Metadata Status Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for high-impact roles & contracts</span>
              </div>

              <span className="text-xs font-mono text-zinc-500 hidden sm:inline-block">
                Lagos, NG (UTC+1)
              </span>
            </motion.div>

            {/* Master Headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Senior Frontend Engineer{" "}
                <span className="heading-gradient">crafting resilient web systems</span>{" "}
                & AI interfaces.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
                Specialized in <span className="text-foreground font-medium">React, Next.js, and TypeScript</span> architectures. 
                I turn complex behavioral analytics and machine learning workflows into crisp, sub-100ms digital products.
              </p>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="grid grid-cols-3 gap-4 pt-2 border-y border-border py-4 max-w-xl"
            >
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-foreground tabular-nums">100%</p>
                <p className="text-xs text-muted-foreground font-mono">TypeScript / Type-Safe</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-primary tabular-nums">11-Feature</p>
                <p className="text-xs text-muted-foreground font-mono">AI Behavioral Engine</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">&lt;100ms</p>
                <p className="text-xs text-muted-foreground font-mono">Target Interaction Latency</p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3 pt-2"
            >
              <Button size="lg" variant="default" href="#projects" className="w-full sm:w-auto justify-center">
                <span>View Featured Work</span>
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline" href="#contact" className="w-full sm:w-auto justify-center">
                <span>Get In Touch</span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={copyEmail}
                className="w-full sm:w-auto justify-center text-xs font-mono text-muted-foreground hover:text-foreground"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Social Proof & Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex items-center gap-4 text-xs text-muted-foreground/80 font-mono"
            >
              <span>CONNECT:</span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-3.5 w-3.5" />
                <span>mufasa-droid</span>
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
            </motion.div>
          </div>

          {/* Right Column: Interactive System Architecture & Code Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-5"
          >
            <div className="glass-card overflow-hidden shadow-2xl border border-border dark:border-white/[0.12]">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/70 dark:border-white/[0.08] dark:bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground dark:text-zinc-400">
                    tradermind.architecture.ts
                  </span>
                </div>
                <Badge variant="mono" className="text-[10px] py-0 px-2">
                  PRODUCTION
                </Badge>
              </div>

              {/* Code / Architecture Window */}
              <div
                tabIndex={0}
                role="region"
                aria-label="Interactive architecture code snippet"
                className="p-5 font-mono text-xs text-zinc-300 space-y-3 bg-zinc-950 dark:bg-black/60 overflow-x-auto leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 rounded-b-2xl"
              >
                <div className="text-zinc-500">{"// Two-Layer AI Performance Architecture"}</div>
                
                <div>
                  <span className="text-purple-400">interface</span>{" "}
                  <span className="text-yellow-200">BehavioralDiagnostics</span> {"{"}
                  <div className="pl-4 text-zinc-400">
                    disciplineScore: <span className="text-blue-300">number</span>;{" "}
                    <span className="text-zinc-600">{"// 0-100"}</span>
                    <br />
                    fomoDetection: <span className="text-blue-300">boolean</span>;
                    <br />
                    revengeRiskIndex: <span className="text-blue-300">number</span>;
                  </div>
                  {"}"}
                </div>

                <div className="pt-1">
                  <span className="text-purple-400">async function</span>{" "}
                  <span className="text-blue-400">evaluateTraderSession</span>(
                  <span className="text-zinc-300">trades</span>: Trade[]
                  ) {"{"}
                  <div className="pl-4">
                    <span className="text-zinc-500">{"// 1. Deterministic Rule Engine"}</span>
                    <br />
                    <span className="text-purple-400">const</span> metrics ={" "}
                    <span className="text-yellow-300">calculateDiscipline</span>(trades);
                    <br />
                    <br />
                    <span className="text-zinc-500">{"// 2. GPT-4o Coaching Synthesis"}</span>
                    <br />
                    <span className="text-purple-400">return</span>{" "}
                    <span className="text-yellow-300">generateCoachVoiceReport</span>(metrics);
                  </div>
                  {"}"}
                </div>

                {/* Status Output Box */}
                <div className="mt-4 p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span>Primary Project</span>
                    </span>
                    <span className="text-white font-semibold">TraderMind AI</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Engine Stack</span>
                    <span className="text-zinc-200">Next.js 15 • Supabase • GPT-4o</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Broker Sync</span>
                    <span className="text-emerald-400 font-medium">MetaAPI Live MT4/MT5</span>
                  </div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 bg-muted/70 dark:bg-black/40 border-t border-border dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
                  <span>Ready for execution</span>
                </span>
                <span className="text-foreground/80 font-medium">Abdulhammed Mustapha</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
