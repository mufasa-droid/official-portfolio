"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Sparkles, Cpu, ChevronLeft, ChevronRight, Layers } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { projects as fallbackProjects } from "@/lib/data"
import type { Project } from "@/types/portfolio"

interface ProjectsProps {
  initialProjects?: Project[]
}

export function Projects({ initialProjects = fallbackProjects }: ProjectsProps) {
  const projectList = initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects
  const [activeIndex, setActiveIndex] = useState(0)
  const currentProject = projectList[activeIndex] || projectList[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectList.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectList.length) % projectList.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      setActiveIndex((index + 1) % projectList.length)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      setActiveIndex((index - 1 + projectList.length) % projectList.length)
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

          {/* Quick Cycle Controls - Desktop only */}
          <div className="hidden md:flex items-center gap-2 self-start md:self-end shrink-0">
            <span className="font-mono text-xs text-muted-foreground mr-2 tabular-nums">
              0{activeIndex + 1} / 0{projectList.length}
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

        {/* Mobile-First Project Experience (< 768px) */}
        {(() => {
          const featuredProject = projectList.find((p) => p.featured) || projectList[0]
          const secondaryProjects = projectList.filter((p) => p.slug !== featuredProject.slug)

          return (
            <div className="block md:hidden space-y-8">
              {/* Flagship Visual Priority Card */}
              <div className="glass-card overflow-hidden border border-border rounded-2xl p-5 shadow-xl dark:border-white/[0.12] space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="accent" className="font-mono text-[10px]">
                    <Sparkles className="h-3 w-3 mr-1" />
                    FEATURED PROJECT
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {featuredProject.duration || "Flagship"}
                  </span>
                </div>

                {/* Large Project Visual */}
                <Link
                  href={`/projects/${featuredProject.slug}`}
                  className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border dark:border-white/[0.1] bg-muted/40 shadow-md group active:scale-[0.99] transition-transform"
                  aria-label={`View case study for ${featuredProject.title}`}
                >
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out-custom"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      LIVE PLATFORM
                    </span>
                  </div>
                </Link>

                {/* Title & Concise Value Prop */}
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {featuredProject.title.split("—")[0].trim()}
                  </h3>
                  <p className="text-xs font-mono text-primary font-semibold">
                    {featuredProject.title.includes("—")
                      ? featuredProject.title.split("—")[1].trim()
                      : "AI Trading Performance Coach"}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {featuredProject.solution || featuredProject.problem}
                  </p>
                </div>

                {/* Technology Summary Chips */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {featuredProject.tech.slice(0, 5).map((t) => (
                    <span key={t} className="tech-chip text-[11px] py-0.5 px-2">
                      {t}
                    </span>
                  ))}
                  {featuredProject.tech.length > 5 && (
                    <span className="text-[11px] font-mono text-muted-foreground self-center px-1">
                      +{featuredProject.tech.length - 5}
                    </span>
                  )}
                </div>

                {/* Primary Action Button */}
                <div className="pt-2">
                  <Button
                    size="default"
                    variant="default"
                    href={`/projects/${featuredProject.slug}`}
                    className="w-full justify-center min-h-[44px]"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </div>
              </div>

              {/* Secondary Projects - Visually Lighter Cards */}
              {secondaryProjects.length > 0 && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Other Production Systems
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      0{secondaryProjects.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {secondaryProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="block glass-card p-4 rounded-xl border border-border dark:border-white/[0.08] hover:border-primary/40 active:scale-[0.99] transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                {project.title.split("—")[0].trim()}
                              </h4>
                              <span className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 rounded bg-muted/60 border border-border shrink-0">
                                {project.role || "Full-Stack"}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {project.problem}
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {project.tech.slice(0, 3).map((t) => (
                                <span key={t} className="tech-chip text-[10px] py-0 px-1.5">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })()}

        {/* Desktop Interactive Segmented Switcher (>= 768px) */}
        <div
          role="tablist"
          aria-label="Select a project case study"
          className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border mb-8 overflow-x-auto no-scrollbar scroll-smooth dark:bg-white/[0.03] dark:border-white/[0.08]"
        >
          {projectList.map((project, idx) => {
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

        {/* Animated Project Stage (Desktop Only >= 768px) */}
        <div className="hidden md:block relative min-h-[520px]">
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
