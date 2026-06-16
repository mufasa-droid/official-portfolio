"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
}

export function SectionHeading({ title, subtitle, description, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-4 text-center mb-16", className)}
    >
      {subtitle && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold gradient-text">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  )
}
