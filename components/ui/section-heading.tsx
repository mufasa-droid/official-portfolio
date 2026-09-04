"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  number?: string
  badge?: string
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  number,
  badge,
  title,
  subtitle,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "space-y-3 mb-16",
        isCenter ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
        className
      )}
    >
      {(number || badge || subtitle) && (
        <div
          className={cn(
            "flex items-center gap-2",
            isCenter ? "justify-center" : "justify-start"
          )}
        >
          {number && (
            <span className="font-mono text-xs text-primary font-semibold tracking-wider">
              {number}
            </span>
          )}
          {(badge || subtitle) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/60 border border-border text-[11px] font-mono uppercase tracking-widest text-muted-foreground dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {badge || subtitle}
            </span>
          )}
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight [text-wrap:balance]">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed [text-wrap:pretty]">
          {description}
        </p>
      )}
    </motion.div>
  )
}
