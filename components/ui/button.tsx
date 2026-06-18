import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? "a" : "button"
    
    const baseStyles = cn(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30": variant === "default",
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
        "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
      },
      {
        "h-11 px-8 py-2": size === "default",
        "h-9 px-3 text-sm": size === "sm",
        "h-12 px-10 text-lg": size === "lg",
      },
      className
    )

    if (asChild) {
      return (
        <a className={baseStyles} ref={ref as any} {...props} />
      )
    }

    return (
      <button className={baseStyles} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button }
