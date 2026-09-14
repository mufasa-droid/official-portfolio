'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Flame,
  CheckCircle,
  AlertCircle,
  Save,
  Plus,
  X,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react'
import { updateCurrentWork } from '@/app/admin/actions/current-work'
import type { Database } from '@/types/database'

type CurrentWorkRow = Database['public']['Tables']['current_work']['Row']

interface CurrentWorkFormProps {
  initialWork: CurrentWorkRow
}

const STATUS_PRESETS = [
  'In Progress',
  'Code Review',
  'Architecture Planning',
  'Beta Testing',
  'Production Hardening',
  'Completed',
]

export function CurrentWorkForm({ initialWork }: CurrentWorkFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    id: initialWork.id,
    title: initialWork.title || '',
    description: initialWork.description || '',
    tech: initialWork.tech || ['Next.js 14', 'Framer Motion', 'TypeScript'],
    status: initialWork.status || 'In Progress',
    progress: initialWork.progress ?? 75,
    is_active: initialWork.is_active ?? true,
  })

  const [newTech, setNewTech] = useState('')

  const handleAddTech = () => {
    if (!newTech.trim()) return
    if (!formData.tech.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        tech: [...prev.tech, newTech.trim()],
      }))
    }
    setNewTech('')
  }

  const handleRemoveTech = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((_, idx) => idx !== indexToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    startTransition(async () => {
      const res = await updateCurrentWork(formData)
      if (res.success) {
        setSuccess(true)
        router.refresh()
        setTimeout(() => setSuccess(false), 4000)
      } else {
        setError(res.error || 'Failed to update current sprint focus.')
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
          <span>Current work focus updated and published to public site!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <Flame className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                  Active Sprint Focus
                </h2>
              </div>

              {/* Active Switch */}
              <label className="flex items-center gap-2 text-xs font-mono text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
                />
                <span className={formData.is_active ? 'text-primary font-semibold' : 'text-muted-foreground'}>
                  {formData.is_active ? 'Widget Active' : 'Widget Hidden'}
                </span>
              </label>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                Sprint / Initiative Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono text-foreground"
                placeholder="e.g. Building a Developer Portfolio Template"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                Initiative Description & Architecture Highlights *
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono text-foreground resize-y leading-relaxed"
                placeholder="Briefly describe what challenges and systems are currently being engineered..."
              />
            </div>

            {/* Status & Progress */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-muted-foreground mb-1.5">
                  Development Status
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-xs font-mono text-foreground"
                    placeholder="Custom status..."
                  />
                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {STATUS_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: preset })}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md border transition-colors ${
                          formData.status === preset
                            ? 'bg-primary/15 border-primary/30 text-primary font-semibold'
                            : 'bg-muted/30 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-muted-foreground">
                    Completion Progress
                  </label>
                  <span className="text-xs font-mono font-bold text-primary">
                    {formData.progress}%
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({ ...formData, progress: Number(e.target.value) })
                    }
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="h-2 w-full bg-muted/60 rounded-full overflow-hidden border border-border">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${formData.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Tags */}
            <div className="pt-2 border-t border-border space-y-3">
              <label className="block text-xs font-mono text-muted-foreground">
                Active Technology Stack Tags
              </label>

              <div className="flex flex-wrap gap-2">
                {formData.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-primary/10 text-primary border border-primary/20"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(idx)}
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
                  placeholder="e.g. Supabase RLS"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTech()
                    }
                  }}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-3 py-1.5 rounded-xl border border-border text-xs font-mono text-foreground hover:bg-muted/50 flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Live Preview Card & Actions */}
        <div className="space-y-6">
          {/* Public Preview Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur border border-border space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-mono font-bold tracking-tight text-foreground uppercase">
                Public Live Preview
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-background border border-border shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold">
                  {formData.status}
                </span>
                <span className="text-[11px] font-mono font-bold text-foreground">
                  {formData.progress}%
                </span>
              </div>

              <p className="text-xs font-mono font-bold text-foreground line-clamp-2">
                {formData.title || 'Untitled Sprint'}
              </p>

              <p className="text-[11px] font-mono text-muted-foreground line-clamp-3 leading-relaxed">
                {formData.description || 'No description provided...'}
              </p>

              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${formData.progress}%` }}
                />
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {formData.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border"
                  >
                    {t}
                  </span>
                ))}
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
              <span>{isPending ? 'Publishing Focus...' : 'Save Current Sprint'}</span>
            </button>

            <a
              href="/#about"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border font-mono text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Preview On Live Site</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  )
}
