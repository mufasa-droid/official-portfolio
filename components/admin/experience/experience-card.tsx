'use client'

import { useState } from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle2, EyeOff, Edit, Trash2, Loader2, Check } from 'lucide-react'
import { toggleExperiencePublish, deleteExperience } from '@/app/admin/actions/experience'
import { ExperienceFormModal } from '@/components/admin/experience/experience-form-modal'
import { Badge } from '@/components/ui/badge'
import type { Database } from '@/types/database'

type ExperienceRow = Database['public']['Tables']['experiences']['Row']

interface ExperienceCardProps {
  experience: ExperienceRow
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleTogglePublish = async () => {
    setIsPublishing(true)
    try {
      await toggleExperiencePublish(experience.id, experience.is_published)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Permanently delete career entry for "${experience.role} at ${experience.company}"?`)) {
      setIsDeleting(true)
      try {
        await deleteExperience(experience.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border space-y-5 dark:border-white/[0.12] relative group">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-foreground font-mono">
                  {experience.role}
                </h3>
                <span className="text-muted-foreground font-mono text-xs">• {experience.company}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span>{experience.period}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{experience.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
            {/* Publish toggle */}
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPublishing}
              title={experience.is_published ? 'Hide from public portfolio' : 'Publish live'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                experience.is_published
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20 hover:bg-zinc-500/20'
              }`}
            >
              {isPublishing ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : experience.is_published ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <EyeOff className="h-3 w-3" />
              )}
              <span>{experience.is_published ? 'Live' : 'Draft'}</span>
            </button>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-xl border border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
              title="Edit experience"
            >
              <Edit className="h-4 w-4" />
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 rounded-xl border border-transparent hover:border-red-500/20 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
              title="Delete experience"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements Grid */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono font-bold text-foreground block">
            VERIFIABLE ACHIEVEMENTS ({experience.achievements.length})
          </span>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {experience.achievements.map((ach, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground/90 dark:bg-white/[0.02]"
              >
                <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ExperienceFormModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialData={experience}
      />
    </>
  )
}
