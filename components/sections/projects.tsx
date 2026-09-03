"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Sparkles, Layers, Cpu } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { projects } from "@/lib/data"

export function Projects() {
  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 relative border-t border-white/[0.08] scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <SectionHeading
          number="02"
          badge="FEATURED CASE STUDIES"
          title="Engineered Products & Architectural Case Studies"
          description="A selection of high-impact production applications showcasing full-stack performance, type safety, and AI integration."
        />

        {/* Flagship Case Study: TraderMind */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mb-16"
          >
            <div className="glass-card overflow-hidden border border-white/[0.14] rounded-3xl p-6 sm:p-8 lg:p-10">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left: Content & Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant="accent" className="font-mono">
                      <Sparkles className="h-3 w-3 mr-1" />
                      FLAGSHIP CASE STUDY
                    </Badge>
                    <Badge variant="mono">
                      {featured.team || "Solo Architect"}
                    </Badge>
                    <span className="text-xs font-mono text-zinc-500">
                      {featured.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
                      {featured.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {featured.problem}
                    </p>
                  </div>

                  {/* Impact Highlight Box */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase">
                      <Cpu className="h-3.5 w-3.5" />
                      <span>Architectural Breakthrough</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {featured.impact.metric}
                    </p>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {featured.impact.detail}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2">
                    {featured.tech.map((t) => (
                      <span key={t} className="tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      size="default"
                      variant="default"
                      href={`/projects/${featured.slug}`}
                    >
                      <span>Deep Dive Case Study</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    {featured.liveUrl && (
                      <Button
                        size="default"
                        variant="outline"
                        href={featured.liveUrl}
                        external
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Live Platform</span>
                      </Button>
                    )}

                    {featured.githubUrl && (
                      <Button
                        size="default"
                        variant="ghost"
                        href={featured.githubUrl}
                        external
                      >
                        <Github className="h-4 w-4" />
                        <span>Source Code</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right: Visual Showcase */}
                <div className="lg:col-span-5">
                  <Link
                    href={`/projects/${featured.slug}`}
                    className="group block relative h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden border border-white/[0.12] bg-zinc-900 shadow-2xl"
                  >
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out-custom"
                      priority
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                      <span>Click to view full architecture</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card hoverEffect className="h-full flex flex-col justify-between overflow-hidden group">
                <div>
                  <div className="relative h-48 sm:h-56 overflow-hidden border-b border-white/[0.08] bg-zinc-900">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out-custom"
                      sizes="(max-width: 768px) 100vw, 500px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="mono">{project.role}</Badge>
                      <span className="text-xs font-mono text-primary font-semibold">
                        {project.impact.metric}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {project.problem}
                    </p>
                  </CardHeader>
                </div>

                <CardContent className="pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="tech-chip text-[11px] py-0.5 px-2">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:text-white transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                          aria-label={`View live ${project.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
