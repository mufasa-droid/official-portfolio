"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { projects } from "@/lib/data"

export function Projects() {
  const featured = projects.find(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="py-24 relative">
      <div className="container-custom">
        <SectionHeading
          subtitle="Portfolio"
          title="Featured Work"
          description="Projects that showcase my expertise in building scalable solutions"
        />

        {/* Featured Project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <Link href={`/projects/${featured.slug}`}>
              <div className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-primary mb-2 uppercase font-semibold">Featured</p>
                      <h3 className="text-3xl font-bold mb-4">{featured.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        {featured.problem}
                      </p>

                      {/* Impact */}
                      <div className="mb-8 p-4 bg-white/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Impact</p>
                        <p className="text-lg font-semibold text-primary">
                          {featured.impact.metric}
                        </p>
                      </div>

                      {/* Tech */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featured.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {others.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="glass rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      {project.problem}
                    </p>

                    {/* Impact */}
                    <div className="mb-4 p-3 bg-white/5 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Impact</p>
                      <p className="text-sm font-semibold text-primary">
                        {project.impact.metric}
                      </p>
                    </div>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded bg-white/10 border border-white/20 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
