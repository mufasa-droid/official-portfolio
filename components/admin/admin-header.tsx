'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ExternalLink, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { navItems } from '@/components/admin/admin-sidebar'

export function AdminHeader() {
  const pathname = usePathname()

  const currentItem = navItems.find((item) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)
  )

  const title = currentItem ? currentItem.name : 'CMS Control Center'

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 sm:px-8 border-b border-border bg-background/80 backdrop-blur-md">
      {/* Breadcrumb / Section Header */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground hidden sm:inline-block">
          CONTROL //
        </span>
        <h1 className="text-sm sm:text-base font-bold text-foreground font-mono">
          {title}
        </h1>
        <Badge variant="mono" className="text-[10px] hidden md:inline-flex">
          LIVE DB
        </Badge>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Environment Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PRODUCTION</span>
        </div>

        <ThemeToggle />

        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  )
}
