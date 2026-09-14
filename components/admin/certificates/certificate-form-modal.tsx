'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Save, AlertCircle, Award, ExternalLink } from 'lucide-react'
import {
  createCertificate,
  updateCertificate,
  type CertificateFormState,
} from '@/app/admin/actions/certificates'
import { MediaUploader } from '@/components/admin/media/media-uploader'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type CertificateRow = Database['public']['Tables']['certificates']['Row']

interface CertificateFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: CertificateRow | null
}

export function CertificateFormModal({
  isOpen,
  onClose,
  initialData,
}: CertificateFormModalProps) {
  const isEditing = Boolean(initialData?.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<CertificateFormState | null>(null)
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image_url || '')
  const [isVisible, setIsVisible] = useState<boolean>(initialData?.is_visible ?? true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    formData.set('imageUrl', imageUrl)
    formData.set('isVisible', String(isVisible))

    try {
      let result: CertificateFormState
      if (isEditing && initialData?.id) {
        result = await updateCertificate(initialData.id, null, formData)
      } else {
        result = await createCertificate(null, formData)
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
        aria-hidden="true"
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
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-mono text-foreground">
                {isEditing ? 'Edit Certificate' : 'New Certificate Accreditation'}
              </h2>
              <p className="text-[11px] font-mono text-muted-foreground">
                {isEditing ? `ID: ${initialData?.id}` : 'Create a verified credential entry'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {formState && !formState.success && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{formState.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Issuer Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="cert-title" className="block text-xs font-mono text-muted-foreground">
                CERTIFICATE TITLE *
              </label>
              <input
                id="cert-title"
                name="title"
                type="text"
                required
                defaultValue={initialData?.title || ''}
                placeholder="e.g. Meta Frontend Developer"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
              {formState?.errors?.title && (
                <p className="text-[10px] text-red-500 font-mono">{formState.errors.title[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="cert-issuer" className="block text-xs font-mono text-muted-foreground">
                ISSUER ORGANIZATION *
              </label>
              <input
                id="cert-issuer"
                name="issuer"
                type="text"
                required
                defaultValue={initialData?.issuer || ''}
                placeholder="e.g. Meta / Coursera, AWS, Vercel"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
              {formState?.errors?.issuer && (
                <p className="text-[10px] text-red-500 font-mono">{formState.errors.issuer[0]}</p>
              )}
            </div>
          </div>

          {/* Issue Date & Display Order Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="cert-issue-date" className="block text-xs font-mono text-muted-foreground">
                ISSUE DATE *
              </label>
              <input
                id="cert-issue-date"
                name="issueDate"
                type="text"
                required
                defaultValue={initialData?.issue_date || ''}
                placeholder="e.g. 2024, Oct 2024"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
              {formState?.errors?.issueDate && (
                <p className="text-[10px] text-red-500 font-mono">{formState.errors.issueDate[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="cert-display-order" className="block text-xs font-mono text-muted-foreground">
                DISPLAY ORDER RANK
              </label>
              <input
                id="cert-display-order"
                name="displayOrder"
                type="number"
                min={0}
                defaultValue={initialData?.display_order ?? 0}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
              />
            </div>
          </div>

          {/* Credential URL */}
          <div className="space-y-2">
            <label htmlFor="cert-credential-url" className="block text-xs font-mono text-muted-foreground">
              VERIFICATION / CREDENTIAL URL (OPTIONAL)
            </label>
            <input
              id="cert-credential-url"
              name="credentialUrl"
              type="url"
              defaultValue={initialData?.credential_url || ''}
              placeholder="https://www.coursera.org/account/accomplishments/..."
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50"
            />
            {formState?.errors?.credentialUrl && (
              <p className="text-[10px] text-red-500 font-mono">{formState.errors.credentialUrl[0]}</p>
            )}
          </div>

          {/* Media Image Upload */}
          <div className="space-y-2 pt-2 border-t border-border">
            <MediaUploader
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              label="CERTIFICATE DOCUMENT IMAGE *"
              description="Upload high-res certificate image (PNG, WebP, JPEG, max 5MB)"
              aspectRatio="auto"
            />
            {!imageUrl && (
              <p className="text-[11px] text-amber-500 font-mono">
                * An image is required for the certificate card and public carousel.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="cert-desc" className="block text-xs font-mono text-muted-foreground">
              DESCRIPTION / CURRICULUM HIGHLIGHTS (OPTIONAL)
            </label>
            <textarea
              id="cert-desc"
              name="description"
              rows={3}
              defaultValue={initialData?.description || ''}
              placeholder="Brief summary of skills, architecture, or competencies evaluated..."
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none resize-none dark:bg-black/50"
            />
          </div>

          {/* Visibility Checkbox */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/40 border border-border dark:bg-white/[0.02]">
            <input
              id="cert-visibility"
              type="checkbox"
              checked={isVisible}
              onChange={(e) => setIsVisible(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-2"
            />
            <label htmlFor="cert-visibility" className="text-xs font-mono text-foreground cursor-pointer select-none">
              Publish live to public portfolio (uncheck to save as draft)
            </label>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting || !imageUrl}
              className="gap-2 min-h-[44px]"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Certificate' : 'Create Certificate'}</span>
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
