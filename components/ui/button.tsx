import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "terminal"
  size?: "default" | "sm" | "lg" | "icon"
  href?: string
  external?: boolean
  asChild?: boolean
}

export const buttonVariants = ({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: "default" | "secondary" | "outline" | "ghost" | "terminal"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
} = {}) => {
  return cn(
    // Base styles with Emil Kowalski active press feedback and precision easing
    "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium select-none",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-out-custom",
    "active:scale-[0.97] cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    {
      // Variants
      "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm shadow-primary/20 border border-primary/40":
        variant === "default",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border":
        variant === "secondary",
      "border border-border bg-card/60 text-foreground hover:bg-muted hover:text-foreground dark:border-white/15 dark:bg-white/[0.03] dark:text-zinc-200 dark:hover:bg-white/[0.08] dark:hover:border-white/25 dark:hover:text-white":
        variant === "outline",
      "text-muted-foreground hover:text-foreground hover:bg-muted/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-white/[0.06]":
        variant === "ghost",
      "bg-zinc-900 border border-emerald-500/30 font-mono text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-950/20 text-xs tracking-wide":
        variant === "terminal",
    },
    {
      // Sizes
      "h-10 px-5 py-2": size === "default",
      "h-8 px-3.5 text-xs rounded-lg": size === "sm",
      "h-12 px-7 text-base rounded-xl": size === "lg",
      "h-9 w-9 p-0 rounded-lg": size === "icon",
    },
    className
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", href, external, asChild, children, ...props }, ref) => {
    const styles = buttonVariants({ variant, size, className })

    if (href) {
      if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
          <a
            href={href}
            target={external || href.startsWith("http") ? "_blank" : undefined}
            rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={styles}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={styles}>
          {children}
        </Link>
      )
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(styles, (children as React.ReactElement<{ className?: string }>).props.className),
      })
    }

    return (
      <button className={styles} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
