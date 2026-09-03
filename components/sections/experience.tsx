"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="py-24 relative border-t border-white/[0.08] scroll-mt-20 sm:scroll-mt-24">
      <div className="container-custom">
        <SectionHeading
          number="04"
          badge="CAREER & TRACK RECORD"
          title="Professional Experience & Production Impact"
          description="A track record of architecting scalable web applications, optimizing performance, and delivering verifiable business value."
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <Card hoverEffect className="p-6 sm:p-8 border border-white/[0.1] relative">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="text-sm font-mono text-zinc-300">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Role Description */}
                <div className="py-6 space-y-4">
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements Grid */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>Key Architectural Achievements</span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {exp.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Badges */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400 mr-2">TECH FOCUS:</span>
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "Architecture"].map((tech) => (
                    <span key={tech} className="tech-chip text-[11px] py-0.5 px-2">
                      {tech}
                    </span>
                  ))}
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
