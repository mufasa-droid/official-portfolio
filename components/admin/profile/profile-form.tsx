'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  Trash2,
} from 'lucide-react'
import { updateProfile } from '@/app/admin/actions/profile'
import type { Database } from '@/types/database'

type ProfileRow = Database['public']['Tables']['portfolio_profile']['Row']

interface ProfileFormProps {
  initialProfile: ProfileRow
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState<{
    id?: string
    name: string
    role: string
    tagline: string
    description: string
    location: string
    email: string
    phone: string
    available_for_work: boolean
    show_email: boolean
    show_phone: boolean
    socials: {
      github: string
      linkedin: string
      twitter: string
      [key: string]: string
    }
  }>({
    id: initialProfile.id,
    name: initialProfile.name || '',
    role: initialProfile.role || '',
    tagline: initialProfile.tagline || '',
    description: initialProfile.description || '',
    location: initialProfile.location || 'Lagos, Nigeria',
    email: initialProfile.email || '',
    phone: initialProfile.phone || '',
    available_for_work: initialProfile.available_for_work ?? true,
    show_email: initialProfile.show_email ?? true,
    show_phone: initialProfile.show_phone ?? true,
    socials: {
      ...(initialProfile.socials || {}),
      github: initialProfile.socials?.github || 'https://github.com/mufasa-droid',
      linkedin: initialProfile.socials?.linkedin || 'https://linkedin.com/in/abdulhammed-mustapha-37454634b',
      twitter: initialProfile.socials?.twitter || 'https://twitter.com/yourusername',
    },
  })

  // State for adding custom social key
  const [customPlatform, setCustomPlatform] = useState('')
  const [customUrl, setCustomUrl] = useState('')

  const handleAddCustomSocial = () => {
    if (!customPlatform.trim() || !customUrl.trim()) return
    const key = customPlatform.trim().toLowerCase().replace(/\s+/g, '_')
    setFormData((prev) => ({
      ...prev,
      socials: {
        ...prev.socials,
        [key]: customUrl.trim(),
      },
    }))
    setCustomPlatform('')
    setCustomUrl('')
  }

  const handleRemoveSocial = (key: string) => {
    setFormData((prev) => {
      const nextSocials = { ...prev.socials }
      delete nextSocials[key]
      return { ...prev, socials: nextSocials }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const res = await updateProfile(formData)
      if (res.success) {
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 4000)
      } else {
        setError(res.error || 'Failed to update profile.')
      }
    })
  }

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
          <span>Profile configuration successfully saved and published!</span>
        </div>
      )}

      {/* Grid: Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Core Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Developer Identity */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <User className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Identity & Bio
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Professional Title / Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                Hero Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                placeholder="Building fast, scalable web applications with React & Next.js"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                Detailed Biography & Technical Focus
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground resize-y leading-relaxed"
                placeholder="Specialized in crafting high-performance user interfaces..."
              />
            </div>
          </div>

          {/* Section 2: Contact Methods & Visibility */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <Mail className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Contact Methods & Location
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Toggles */}
            <div className="pt-2 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 text-xs font-mono text-foreground cursor-pointer min-h-[44px] p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.available_for_work}
                  onChange={(e) =>
                    setFormData({ ...formData, available_for_work: e.target.checked })
                  }
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <span>Available for Work</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-mono text-foreground cursor-pointer min-h-[44px] p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.show_email}
                  onChange={(e) => setFormData({ ...formData, show_email: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <span>Show Email in Public</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-mono text-foreground cursor-pointer min-h-[44px] p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.show_phone}
                  onChange={(e) => setFormData({ ...formData, show_phone: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <span>Show Phone in Public</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Socials & Actions */}
        <div className="space-y-6">
          {/* Section 3: Social Profiles */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border">
              <Globe className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Social Profiles
              </h2>
            </div>

            <div className="space-y-3">
              {/* GitHub */}
              <div>
                <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="url"
                    value={formData.socials.github || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, github: e.target.value },
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="url"
                    value={formData.socials.linkedin || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              {/* Twitter / X */}
              <div>
                <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                  Twitter / X Profile URL
                </label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 sm:top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="url"
                    value={formData.socials.twitter || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-xs font-mono text-foreground"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>

              {/* Dynamic additional socials */}
              {Object.entries(formData.socials).map(([key, val]) => {
                if (['github', 'linkedin', 'twitter'].includes(key)) return null
                return (
                  <div key={key} className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-mono uppercase text-muted-foreground mb-0.5">
                        {key}
                      </label>
                      <input
                        type="url"
                        value={val}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socials: { ...formData.socials, [key]: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSocial(key)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 mt-4"
                      aria-label={`Remove ${key}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )
              })}

              {/* Add Custom Social */}
              <div className="pt-3 border-t border-border/60 space-y-2.5">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  Add Custom Platform
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g. Bluesky)"
                    value={customPlatform}
                    onChange={(e) => setCustomPlatform(e.target.value)}
                    className="px-3 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground"
                  />
                  <input
                    type="url"
                    placeholder="https://..."
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="px-3 py-2.5 sm:py-1.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomSocial}
                  disabled={!customPlatform || !customUrl}
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-border text-xs font-mono text-foreground hover:bg-muted/50 disabled:opacity-40 transition-colors font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Attach Platform</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-5 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-3">
            <button
              type="submit"
              disabled={isPending}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-all shadow-sm"
            >
              <Save className="h-4 w-4" />
              <span>{isPending ? 'Publishing Changes...' : 'Save Profile Settings'}</span>
            </button>

            <a
              href="/#about"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview Live Profile</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}
