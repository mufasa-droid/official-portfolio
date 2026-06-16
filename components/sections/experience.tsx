"use client"

import { motion } from "framer-motion"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"
import { experience } from "@/lib/data"

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container-custom">
        <SectionHeading
          subtitle="Career"
          title="Professional Experience"
          description="Building solutions that make an impact"
        />

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                  </div>
                  <p className="text-lg font-semibold text-foreground/80">{exp.company}</p>
                </div>
                <div className="mt-2 md:mt-0 text-sm text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-foreground/80 mb-4">{exp.description}</p>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">KEY ACHIEVEMENTS:</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
