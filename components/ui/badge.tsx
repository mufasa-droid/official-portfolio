import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "mono" | "accent"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
        {
          "border border-transparent bg-primary/10 text-primary font-semibold": variant === "default",
          "border border-border bg-muted/70 text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300": variant === "secondary",
          "border border-border text-foreground dark:border-white/15 dark:text-zinc-300": variant === "outline",
          "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400": variant === "success",
          "border border-border bg-muted/80 font-mono text-[11px] text-foreground dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-300": variant === "mono",
          "border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300": variant === "accent",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
