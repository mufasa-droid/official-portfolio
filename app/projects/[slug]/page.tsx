"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects } from "@/lib/data"

interface ProjectPageProps {
  params: { slug: string }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => (p as any).slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Link href="/#projects" className="text-primary hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  const p = project as any

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Back Button */}
      <div className="container-custom mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-custom mb-16"
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{p.title}</h1>
          
          <div className="flex flex-wrap gap-8 mb-8 text-sm">
            {p.role && (
              <div>
                <p className="text-muted-foreground mb-1 uppercase">Role</p>
                <p className="font-semibold">{p.role}</p>
              </div>
            )}
            {p.duration && (
              <div>
                <p className="text-muted-foreground mb-1 uppercase">Duration</p>
                <p className="font-semibold">{p.duration}</p>
              </div>
            )}
            {p.team && (
              <div>
                <p className="text-muted-foreground mb-1 uppercase">Team</p>
                <p className="font-semibold">{p.team}</p>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Live Project
              </a>
            )}
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                <Github className="h-4 w-4" />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hero Image */}
      {p.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container-custom mb-16"
        >
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden glass">
            <Image
              src={p.image}
              alt={p.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* Content Grid */}
      <div className="container-custom mb-16">
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-12">
            {/* Problem & Solution */}
            {p.problem && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                <p className="text-lg text-muted-foreground">{p.problem}</p>
              </motion.div>
            )}

            {p.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-lg text-muted-foreground">{p.solution}</p>
              </motion.div>
            )}

            {/* Features */}
            {p.features && p.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <ul className="space-y-3">
                  {p.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Gallery */}
            {p.gallery && p.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {p.gallery.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden glass hover:shadow-lg transition-shadow"
                    >
                      <Image
                        src={image}
                        alt={`${p.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Impact */}
            {p.impact && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Impact</h3>
                <p className="text-2xl font-bold text-primary mb-3">{p.impact.metric}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.impact.detail}</p>
              </div>
            )}

            {/* Tech Stack */}
            {p.tech && p.tech.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container-custom py-16 text-center"
      >
        <div className="glass rounded-2xl p-12 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to start your project?</h2>
          <p className="text-muted-foreground mb-6">Let&apos;s work together to bring your ideas to life</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Get in Touch
            </a>
            <a
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
            >
              View More Projects
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
