import { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Github, CheckCircle2, Cpu, Layers, Sparkles } from "lucide-react"
import { projects, personalInfo } from "@/lib/data"
import { Project } from "@/types/portfolio"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ArchitectureExplorer } from "@/components/projects/architecture-explorer"

interface ProjectPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} — Case Study | ${personalInfo.name}`,
    description: project.problem,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.solution,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug)
  if (projectIndex === -1) {
    notFound()
  }

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main className="min-h-screen bg-background pt-24 pb-24 bg-grid-technical">
      {/* Top Header & Breadcrumb */}
      <div className="container-custom mb-12">
        <div className="flex items-center justify-between py-4 border-b border-white/[0.08]">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>

          <span className="font-mono text-xs text-primary font-semibold">
            CASE STUDY // 0{projectIndex + 1}
          </span>
        </div>
      </div>

      {/* Case Study Hero */}
      <div className="container-custom mb-16">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {project.featured && (
              <Badge variant="accent" className="font-mono">
                <Sparkles className="h-3 w-3 mr-1" />
                FLAGSHIP PROJECT
              </Badge>
            )}
            <Badge variant="mono">{project.role}</Badge>
            {project.duration && (
              <span className="text-xs font-mono text-zinc-500">• {project.duration}</span>
            )}
            {project.team && (
              <span className="text-xs font-mono text-zinc-500">• {project.team}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed">
            {project.solution}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <Button size="lg" variant="default" href={project.liveUrl} external>
                <ExternalLink className="h-4 w-4" />
                <span>Visit Live Platform</span>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="lg" variant="outline" href={project.githubUrl} external>
                <Github className="h-4 w-4" />
                <span>View Source Code</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Image */}
      {project.image && (
        <div className="container-custom mb-20">
          <div className="relative h-80 sm:h-96 md:h-[480px] rounded-3xl overflow-hidden border border-white/[0.12] bg-zinc-900 shadow-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </div>
      )}

      {/* Interactive System Architecture Explorer (For TraderMind / Flagship) */}
      {project.slug === "tradermind-ai-trading-coach" && (
        <div className="container-custom mb-20">
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-primary">
              <Cpu className="h-4 w-4" />
              <span>{"// ARCHITECTURAL BLUEPRINT"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive System Architecture & Engine Pipeline
            </h2>
          </div>
          <ArchitectureExplorer />
        </div>
      )}

      {/* Problem & Solution Deep Dive */}
      <div className="container-custom mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400">
              <span>{"// THE CHALLENGE & CONSTRAINTS"}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">The Problem</h3>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {project.problem}
            </p>
          </Card>

          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{"// ARCHITECTURAL RESOLUTION"}</span>
            </div>
            <h3 className="text-2xl font-bold text-white">The Engineering Solution</h3>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {project.solution}
            </p>
          </Card>
        </div>
      </div>

      {/* Key Features & Impact */}
      <div className="container-custom mb-20">
        <div className="glass-card p-8 md:p-12 border border-white/[0.12] rounded-3xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono text-primary uppercase tracking-wider">
                Capabilities Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Engineered Features & Capabilities
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] max-w-sm">
              <p className="text-xs font-mono text-zinc-400 uppercase">Impact Metric</p>
              <p className="text-lg font-bold text-primary">{project.impact.metric}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-zinc-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="container-custom mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-primary">
            <Layers className="h-4 w-4" />
            <span>{"// TECH STACK & INTEGRATIONS"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Technologies & Tools Employed
          </h2>

          <div className="flex flex-wrap gap-2.5">
            {project.tech.map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] font-mono text-xs text-zinc-200"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Gallery (If Available) */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="container-custom mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interface & Visual Gallery
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.08] bg-zinc-900"
                >
                  <Image
                    src={img}
                    alt={`${project.title} interface preview ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 ease-out-custom"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Next Project & Bottom CTA */}
      <div className="container-custom pt-12 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
          <div>
            <p className="text-xs font-mono text-zinc-400 uppercase">NEXT CASE STUDY</p>
            <h3 className="text-xl font-bold text-white mt-1">{nextProject.title}</h3>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" href="/#projects">
              <span>All Projects</span>
            </Button>
            <Button variant="default" href={`/projects/${nextProject.slug}`}>
              <span>Next Study</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
