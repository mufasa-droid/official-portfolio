'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Layers,
  User,
  Flame,
  Mail,
  Sliders,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react'
import { logoutAdmin } from '@/app/admin/actions/auth'

export const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Skills Matrix', href: '/admin/skills', icon: Layers },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Profile & Bio', href: '/admin/profile', icon: User },
  { name: 'Current Work', href: '/admin/current-work', icon: Flame },
  { name: 'Messages', href: '/admin/messages', icon: Mail },
  { name: 'SEO & Settings', href: '/admin/seo', icon: Sliders },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const isCurrentActive = (item: typeof navItems[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const navContent = (
    <div className="flex flex-col justify-between h-full p-4 sm:p-5">
      {/* Top Branding */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <span className="font-mono text-xs font-bold tracking-tight text-foreground bg-primary/15 border border-primary/30 px-2.5 py-1 rounded-md text-primary">
              CMS
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-foreground">
                Mufasa Control
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Single-Owner v2.0
              </span>
            </div>
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground border border-border"
              aria-label="Close admin menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = isCurrentActive(item)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-colors ${
                  isActive
                    ? 'text-primary font-semibold bg-primary/10 border border-primary/20 dark:bg-primary/15'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="space-y-3 pt-4 border-t border-border">
        {/* Live Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-border transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Public Site</span>
          </span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* Single Owner Badge */}
        <div className="p-2.5 rounded-xl bg-muted/40 border border-border flex items-center gap-2.5 dark:bg-white/[0.02]">
          <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-mono font-bold shrink-0">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-mono font-semibold text-foreground truncate">
              Abdulhammed
            </p>
            <p className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
              <Shield className="h-2.5 w-2.5 text-emerald-500" />
              <span>Owner Session</span>
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-mono text-red-500 dark:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Terminate Session</span>
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card/60 backdrop-blur-xl shrink-0 h-screen sticky top-0 dark:bg-black/40">
        {navContent}
      </aside>

      {/* Mobile Menu Trigger Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between p-4 bg-background/90 backdrop-blur-md border-b border-border">
        <Link href="/admin" className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
          <span className="bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded">CMS</span>
          <span>Abdulhammed.dev</span>
        </Link>
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-lg text-foreground border border-border"
          aria-label="Open CMS Navigation Menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-4/5 max-w-xs bg-background border-r border-border h-full z-10 shadow-2xl"
            >
              {navContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
