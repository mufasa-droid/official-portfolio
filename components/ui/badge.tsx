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
          "border border-transparent bg-primary/15 text-blue-400": variant === "default",
          "border border-white/10 bg-white/[0.04] text-zinc-300": variant === "secondary",
          "border border-white/15 text-zinc-300": variant === "outline",
          "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400": variant === "success",
          "border border-white/10 bg-zinc-900/80 font-mono text-[11px] text-zinc-300": variant === "mono",
          "border border-indigo-500/30 bg-indigo-500/10 text-indigo-300": variant === "accent",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
