"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { personalInfo } from "@/lib/data"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 border-t border-white/[0.08] bg-black/40 text-xs font-mono text-zinc-400">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Colophon & Identity */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-semibold text-white">
              {personalInfo.name}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400">
              Architected with Next.js 14, TypeScript & Tailwind CSS
            </span>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-white transition-colors"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
            </a>

            <span className="text-zinc-700">|</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <p>© 2026 {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>Operational in Lagos, Nigeria (WAT / UTC+1)</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
