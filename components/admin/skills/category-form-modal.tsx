'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Layers, AlertCircle } from 'lucide-react'
import { createSkillCategory, updateSkillCategory, type SkillsActionState } from '@/app/admin/actions/skills'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type CategoryRow = Database['public']['Tables']['skill_categories']['Row']

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: CategoryRow | null
}

const AVAILABLE_ICONS = ['Layout', 'Database', 'Wrench', 'Cpu', 'Terminal', 'Cloud', 'Sparkles', 'Layers']

export function CategoryFormModal({
  isOpen,
  onClose,
  initialData,
}: CategoryFormModalProps) {
  const isEditing = Boolean(initialData?.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<SkillsActionState | null>(null)
  const [slug, setSlug] = useState(initialData?.slug || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    try {
      let result: SkillsActionState
      if (isEditing && initialData?.id) {
        result = await updateSkillCategory(initialData.id, null, formData)
      } else {
        result = await createSkillCategory(null, formData)
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
        className="relative w-full max-w-lg bg-background border border-border rounded-3xl p-6 sm:p-8 shadow-2xl z-10"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-mono text-foreground">
                {isEditing ? 'Edit Skill Domain' : 'Add Skill Domain'}
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                Capability Matrix Category
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground border border-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {formState && !formState.success && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{formState.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-mono text-muted-foreground">
              DOMAIN NAME *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={initialData?.name || ''}
              onChange={(e) => {
                if (!isEditing) {
                  setSlug(e.target.value.toLowerCase().replace(/[^\w-]/g, '').replace(/\s+/g, '-'))
                }
              }}
              placeholder="e.g. Frontend Systems & Core Web"
              className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="slug" className="block text-xs font-mono text-muted-foreground">
              SLUG IDENTIFIER *
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              placeholder="frontend"
              className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="description" className="block text-xs font-mono text-muted-foreground">
              DOMAIN DESCRIPTION *
            </label>
            <textarea
              id="description"
              name="description"
              rows={2}
              required
              defaultValue={initialData?.description || ''}
              placeholder="Architecting responsive, type-safe client architectures..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-muted/40 border border-border text-xs text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="iconName" className="block text-xs font-mono text-muted-foreground">
                LUCIDE ICON
              </label>
              <select
                id="iconName"
                name="iconName"
                defaultValue={initialData?.icon_name || 'Layout'}
                className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              >
                {AVAILABLE_ICONS.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>

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
                className="w-full px-3 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="default" disabled={isSubmitting} className="gap-1.5">
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Domain' : 'Create Domain'}</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
