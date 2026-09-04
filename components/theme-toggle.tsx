"use client"

import * as React from "react"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`p-2 rounded-lg text-muted-foreground border border-transparent transition-colors ${className || ""}`}
      >
        <span className="w-4 h-4 block" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 border border-transparent hover:border-border transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className || ""}`}
    >
      <div className="relative w-4 h-4 overflow-hidden">
        {isDark ? (
          <Sun className="h-4 w-4 transition-transform duration-200 ease-out rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-200 ease-out rotate-0 scale-100" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
