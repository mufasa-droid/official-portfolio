"use client"

import { motion } from "framer-motion"
import { Code2, Zap, Users } from "lucide-react"
import { SectionHeading } from "../ui/section-heading"

const values = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that teams love to work with",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimizing every interaction for speed and smooth user experience",
  },
  {
    icon: Users,
    title: "User-Centric",
    description: "Building interfaces that solve real problems and delight users",
  },
]

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container-custom">
        <SectionHeading
          subtitle="About Me"
          title="I solve problems through code"
          description="Specialized in turning complex business requirements into elegant, high-performance web applications"
        />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">What I Do</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I specialize in building modern web applications that are fast, 
                  accessible, and scalable. My expertise lies in frontend development 
                  with React and Next.js, but I&apos;m comfortable working across the full stack.
                </p>
                <p>
                  Every project I take on is an opportunity to push boundaries and 
                  deliver measurable results. I don&apos;t just write code—I build solutions 
                  that drive business growth and improve user experiences.
                </p>
                <p>
                  Currently focused on helping startups and established companies ship 
                  high-quality web products faster through modern tooling and best practices.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">What Sets Me Apart</h3>
              <ul className="space-y-3">
                {[
                  "Strong TypeScript expertise for type-safe, maintainable codebases",
                  "Performance optimization reducing load times by up to 60%",
                  "Component-driven development with reusable design systems",
                  "SEO-first approach ensuring maximum visibility",
                  "Agile methodology with clear communication and documentation",
                  "Continuous learning mindset staying ahead of tech trends",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
