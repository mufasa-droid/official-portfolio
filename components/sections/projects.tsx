"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Sparkles, Cpu, ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { projects } from "@/lib/data"

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const currentProject = projects[activeIndex] || projects[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      setActiveIndex((index + 1) % projects.length)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      setActiveIndex((index - 1 + projects.length) % projects.length)
    }
  }

  return (
    <section id="projects" className="py-24 relative border-t border-border scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <SectionHeading
            number="02"
            badge="FEATURED CASE STUDIES"
            title="Engineered Products & Architectural Case Studies"
            description="A curated showcase of production applications highlighting full-stack performance, type safety, and AI integration."
            align="left"
            className="mb-0 max-w-2xl"
          />

          {/* Quick Cycle Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <span className="font-mono text-xs text-muted-foreground mr-2 tabular-nums">
              0{activeIndex + 1} / 0{projects.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-[border-color,background-color,color] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/[0.08]"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-[border-color,background-color,color] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/[0.08]"
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Interactive Segmented Switcher */}
        <div
          role="tablist"
          aria-label="Select a project case study"
          className="flex items-center gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border mb-8 overflow-x-auto no-scrollbar scroll-smooth dark:bg-white/[0.03] dark:border-white/[0.08]"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={project.slug}
                role="tab"
                id={`tab-${project.slug}`}
                aria-selected={isActive}
                aria-controls={`panel-${project.slug}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-colors duration-150 shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectPill"
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 rounded-xl bg-card border border-border shadow-sm dark:bg-white/[0.1] dark:border-white/[0.15]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="opacity-50">0{idx + 1}.</span>
                  <span>{project.title.split("—")[0].trim()}</span>
                  {project.featured && (
                    <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-primary/15 text-primary border border-primary/30">
                      FLAGSHIP
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* Animated Project Stage */}
        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.slug}
              id={`panel-${currentProject.slug}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentProject.slug}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card overflow-hidden border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl dark:border-white/[0.12]"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left: Content & Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {currentProject.featured ? (
                      <Badge variant="accent" className="font-mono">
                        <Sparkles className="h-3 w-3 mr-1" />
                        FLAGSHIP CASE STUDY
                      </Badge>
                    ) : (
                      <Badge variant="mono" className="font-mono">
                        PRODUCTION SYSTEM
                      </Badge>
                    )}
                    <Badge variant="mono">
                      {currentProject.role || "Architect & Developer"}
                    </Badge>
                    {currentProject.duration && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {currentProject.duration}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 [text-wrap:balance]">
                      {currentProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {currentProject.problem}
                    </p>
                  </div>

                  {/* Impact Highlight Box */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-1.5 dark:bg-white/[0.03] dark:border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>Verifiable Production Impact</span>
                    </div>
                    <p className="text-lg font-bold text-foreground font-mono">
                      {currentProject.impact.metric}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {currentProject.impact.detail}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tech.map((t) => (
                      <span key={t} className="tech-chip text-xs">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      size="default"
                      variant="default"
                      href={`/projects/${currentProject.slug}`}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    {currentProject.liveUrl && (
                      <Button
                        size="default"
                        variant="outline"
                        href={currentProject.liveUrl}
                        external
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Platform</span>
                      </Button>
                    )}

                    {currentProject.githubUrl && (
                      <Button
                        size="default"
                        variant="ghost"
                        href={currentProject.githubUrl}
                        external
                      >
                        <Github className="h-4 w-4" />
                        <span>Source Code</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Visual Showcase Link */}
                <div className="lg:col-span-5">
                  <Link
                    href={`/projects/${currentProject.slug}`}
                    className="group block relative h-64 sm:h-80 lg:h-[390px] rounded-2xl overflow-hidden border border-border dark:border-white/[0.12] bg-muted/40 shadow-2xl"
                    aria-label={`Open case study for ${currentProject.title}`}
                  >
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out-custom"
                      priority={currentProject.featured}
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        ACTIVE PREVIEW
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 group-hover:border-primary/50 transition-colors">
                      <span>Explore Technical Breakdown</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-primary" />
                    </div>
                  </Link>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
