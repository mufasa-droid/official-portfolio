'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sliders,
  CheckCircle,
  AlertCircle,
  Save,
  Plus,
  X,
  Globe,
  Search,
  Share2,
  Mail,
  ExternalLink,
} from 'lucide-react'
import { updateSiteSettings } from '@/app/admin/actions/seo'
import type { Database } from '@/types/database'

type SiteSettingsRow = Database['public']['Tables']['site_settings']['Row']

interface SeoFormProps {
  initialSettings: SiteSettingsRow
}

export function SeoForm({ initialSettings }: SeoFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    id: initialSettings.id,
    site_title:
      initialSettings.site_title ||
      'Abdulhammed Mustapha — Senior Frontend Developer & Architect',
    site_description:
      initialSettings.site_description ||
      'Senior Frontend Developer specializing in React, Next.js, and TypeScript architectures.',
    keywords: initialSettings.keywords || [
      'Abdulhammed Mustapha',
      'Senior Frontend Developer',
      'React',
      'Next.js',
      'TypeScript',
    ],
    canonical_url: initialSettings.canonical_url || 'https://abdulhammedmustapha.com',
    og_image_url: initialSettings.og_image_url || '',
    admin_email: initialSettings.admin_email || 'Abdulhammedmustapha@gmail.com',
  })

  const [newKeyword, setNewKeyword] = useState('')

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return
    if (!formData.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }))
    }
    setNewKeyword('')
  }

  const handleRemoveKeyword = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, idx) => idx !== indexToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const res = await updateSiteSettings(formData)
      if (res.success) {
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 4000)
      } else {
        setError(res.error || 'Failed to update site settings.')
      }
    })
  }

  const titleLength = formData.site_title.length
  const descLength = formData.site_description.length

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>SEO settings updated and search feeds revalidated!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Metadata Editors */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <Search className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Search Engine Metadata (SERP)
              </h2>
            </div>

            {/* Site Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-muted-foreground">
                  Global Site Title *
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    titleLength > 60 ? 'text-amber-500 font-bold' : 'text-muted-foreground'
                  }`}
                >
                  {titleLength}/60 chars
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.site_title}
                onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono text-foreground"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-muted-foreground">
                  Meta Description *
                </label>
                <span
                  className={`text-[11px] font-mono ${
                    descLength > 160 ? 'text-amber-500 font-bold' : 'text-muted-foreground'
                  }`}
                >
                  {descLength}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.site_description}
                onChange={(e) =>
                  setFormData({ ...formData, site_description: e.target.value })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono text-foreground resize-y leading-relaxed"
              />
            </div>

            {/* Canonical & OG Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Canonical Base URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="url"
                    required
                    value={formData.canonical_url}
                    onChange={(e) =>
                      setFormData({ ...formData, canonical_url: e.target.value })
                    }
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Admin Notification Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={formData.admin_email}
                    onChange={(e) =>
                      setFormData({ ...formData, admin_email: e.target.value })
                    }
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Custom OG Image URL */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                OpenGraph Cover Image URL (Optional override)
              </label>
              <input
                type="url"
                value={formData.og_image_url}
                onChange={(e) =>
                  setFormData({ ...formData, og_image_url: e.target.value })
                }
                placeholder="Leave blank to use dynamic /opengraph-image endpoint"
                className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Keyword Tags */}
            <div className="pt-2 border-t border-border space-y-3">
              <label className="block text-xs font-mono text-muted-foreground">
                Target SEO Meta Keywords
              </label>

              <div className="flex flex-wrap gap-2">
                {formData.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                  >
                    <span>{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(idx)}
                      className="text-primary/70 hover:text-primary focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 max-w-sm">
                <input
                  type="text"
                  placeholder="e.g. Next.js Architect"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddKeyword()
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-1.5 rounded-xl border border-border text-xs font-mono text-foreground hover:bg-muted/50 flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Live SERP Preview & Actions */}
        <div className="space-y-6">
          {/* Google SERP Snippet Preview */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Search className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Google SERP Snippet
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border space-y-1.5 shadow-inner">
              <div className="flex items-center gap-1.5 text-[11px] font-sans text-muted-foreground truncate">
                <span>{formData.canonical_url.replace(/^https?:\/\//, '')}</span>
              </div>
              <h3 className="text-sm font-sans font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {formData.site_title || 'Website Title'}
              </h3>
              <p className="text-xs font-sans text-muted-foreground line-clamp-2 leading-relaxed">
                {formData.site_description || 'Website description...'}
              </p>
            </div>
          </div>

          {/* Social Share Preview Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Share2 className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Social Card (OG / Twitter)
              </h2>
            </div>

            <div className="rounded-xl bg-background border border-border overflow-hidden shadow-inner">
              <div className="h-28 bg-muted/80 flex items-center justify-center border-b border-border p-3 text-center">
                <span className="font-mono text-xs text-muted-foreground">
                  {formData.og_image_url
                    ? 'Custom OG Image Specified'
                    : 'Dynamic Generated /opengraph-image'}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">
                  {formData.canonical_url.replace(/^https?:\/\//, '')}
                </p>
                <p className="text-xs font-mono font-bold text-foreground line-clamp-1">
                  {formData.site_title}
                </p>
                <p className="text-[11px] font-mono text-muted-foreground line-clamp-2">
                  {formData.site_description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="p-5 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-all shadow-sm"
            >
              <Save className="h-4 w-4" />
              <span>{isPending ? 'Publishing SEO...' : 'Save Site Settings'}</span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-border font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <span>View Sitemap Feed</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}
