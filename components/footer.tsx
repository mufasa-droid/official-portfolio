"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { personalInfo } from "@/lib/data"
import type { PersonalInfo } from "@/types/portfolio"

interface FooterProps {
  profile?: PersonalInfo
}

export function Footer({ profile = personalInfo }: FooterProps) {
  const currentProfile = profile || personalInfo

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 border-t border-border bg-card/40 text-xs font-mono text-muted-foreground dark:bg-black/40">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Colophon & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-semibold text-foreground">
              {currentProfile.name}
            </span>
            <span className="text-border hidden sm:inline">•</span>
            <span className="text-muted-foreground">
              Architected with Next.js 14, TypeScript & Tailwind CSS
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={currentProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={currentProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${currentProfile.email}`}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
            </a>

            <span className="text-border px-1">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="min-h-[44px] px-3 py-2 rounded-lg flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <p>© 2026 {currentProfile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Operational in Lagos, Nigeria (WAT / UTC+1)</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
