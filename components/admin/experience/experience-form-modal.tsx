'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Plus, AlertCircle, Check, Briefcase } from 'lucide-react'
import { createExperience, updateExperience, type ExperienceFormState } from '@/app/admin/actions/experience'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type ExperienceRow = Database['public']['Tables']['experiences']['Row']

interface ExperienceFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: ExperienceRow | null
}

export function ExperienceFormModal({
  isOpen,
  onClose,
  initialData,
}: ExperienceFormModalProps) {
  const isEditing = Boolean(initialData?.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<ExperienceFormState | null>(null)

  const [achievements, setAchievements] = useState<string[]>(
    initialData?.achievements || [
      'Delivered production-grade applications with strict TypeScript and Next.js',
      'Improved page load performance and eliminated layout shifts across core routes',
    ]
  )
  const [newAchievement, setNewAchievement] = useState('')

  const addAchievement = () => {
    const trimmed = newAchievement.trim()
    if (trimmed) {
      setAchievements([...achievements, trimmed])
      setNewAchievement('')
    }
  }

  const removeAchievement = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    formData.set('achievements', achievements.join('\n'))

    try {
      let result: ExperienceFormState
      if (isEditing && initialData?.id) {
        result = await updateExperience(initialData.id, null, formData)
      } else {
        result = await createExperience(null, formData)
      }

      setFormState(result)
      if (result.success) {
        onClose()
      }
    } catch {
      setFormState({
        success: false,
        message: 'An unexpected server error occurred.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-2xl bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-foreground">
                {isEditing ? 'Edit Career Experience' : 'Add Career Experience'}
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                Verified work history entry
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground border border-border"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {formState && !formState.success && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{formState.message}</p>
              {formState.errors && (
                <ul className="mt-1 list-disc list-inside">
                  {Object.entries(formState.errors).map(([k, errs]) =>
                    errs?.map((e, idx) => (
                      <li key={`${k}-${idx}`}>
                        {k}: {e}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="company" className="block text-xs font-mono text-muted-foreground">
                ORGANIZATION / COMPANY *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                defaultValue={initialData?.company || ''}
                placeholder="e.g. TechCorp / Freelance"
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="role" className="block text-xs font-mono text-muted-foreground">
                ROLE / TITLE *
              </label>
              <input
                id="role"
                name="role"
                type="text"
                required
                defaultValue={initialData?.role || 'Senior Frontend Developer'}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="period" className="block text-xs font-mono text-muted-foreground">
                PERIOD / TIMELINE *
              </label>
              <input
                id="period"
                name="period"
                type="text"
                required
                defaultValue={initialData?.period || '2023 - Present'}
                placeholder="e.g. 2023 - Present"
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="location" className="block text-xs font-mono text-muted-foreground">
                LOCATION *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                defaultValue={initialData?.location || 'Remote'}
                placeholder="e.g. Remote / Lagos, Nigeria"
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-xs font-mono text-muted-foreground">
              ROLE SUMMARY DESCRIPTION *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              defaultValue={initialData?.description || ''}
              placeholder="Describe core responsibilities and technical architectural scope..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground focus:border-primary focus:outline-none dark:bg-black/50 resize-y"
            />
          </div>

          {/* Dynamic Achievements Builder */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="block text-xs font-mono text-muted-foreground">
              ARCHITECTURAL ACHIEVEMENTS ({achievements.length}) *
            </label>

            <div className="space-y-1.5">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-muted/40 border border-border text-xs text-foreground dark:bg-white/[0.02]"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAchievement(idx)}
                    className="text-muted-foreground hover:text-red-500 min-h-[36px] min-w-[36px] flex items-center justify-center p-1 rounded-lg"
                    aria-label="Remove achievement"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addAchievement()
                  }
                }}
                placeholder="Add verifiable achievement bullet..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
              />
              <Button type="button" size="sm" variant="outline" onClick={addAchievement} className="min-h-[44px] sm:min-h-0">
                <Plus className="h-3.5 w-3.5 mr-1" />
                <span>Add</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div className="space-y-1.5">
              <label htmlFor="displayOrder" className="block text-xs font-mono text-muted-foreground">
                DISPLAY ORDER
              </label>
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                defaultValue={initialData?.display_order ?? 1}
                min={0}
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="isPublished" className="block text-xs font-mono text-muted-foreground">
                VISIBILITY STATUS
              </label>
              <select
                id="isPublished"
                name="isPublished"
                defaultValue={initialData?.is_published === false ? 'false' : 'true'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 min-h-[44px]"
              >
                <option value="true">Published (Live)</option>
                <option value="false">Draft (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="min-h-[44px]">
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="default" disabled={isSubmitting} className="min-h-[44px] gap-1.5">
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Entry' : 'Create Entry'}</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
