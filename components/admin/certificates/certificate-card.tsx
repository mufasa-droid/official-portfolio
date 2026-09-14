'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Award,
  Calendar,
  ExternalLink,
  CheckCircle2,
  EyeOff,
  Edit,
  Trash2,
  Loader2,
  FileImage,
} from 'lucide-react'
import {
  toggleCertificateVisibility,
  deleteCertificate,
} from '@/app/admin/actions/certificates'
import { CertificateFormModal } from '@/components/admin/certificates/certificate-form-modal'
import { Badge } from '@/components/ui/badge'
import type { Database } from '@/types/database'

type CertificateRow = Database['public']['Tables']['certificates']['Row']

interface CertificateCardProps {
  certificate: CertificateRow
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleTogglePublish = async () => {
    setIsPublishing(true)
    try {
      await toggleCertificateVisibility(certificate.id, certificate.is_visible)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Permanently delete certificate "${certificate.title}" issued by ${certificate.issuer}?`)) {
      setIsDeleting(true)
      try {
        await deleteCertificate(certificate.id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <>
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-border space-y-4 dark:border-white/[0.12] relative group">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-start gap-3.5 min-w-0 flex-1">
            {/* Thumbnail Preview */}
            <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-border bg-muted/40 shrink-0">
              {certificate.image_url ? (
                <Image
                  src={certificate.image_url}
                  alt={certificate.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <FileImage className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="mono" className="text-[10px]">
                  #{certificate.display_order}
                </Badge>
                <h3 className="text-base font-bold text-foreground font-mono truncate">
                  {certificate.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">
                {certificate.issuer}
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span>{certificate.issue_date}</span>
                </span>
                {certificate.credential_url && (
                  <>
                    <span>•</span>
                    <a
                      href={certificate.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 min-h-[32px]"
                      title="Verify credential"
                    >
                      <span>Verify</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs shrink-0">
            {/* Visibility toggle */}
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPublishing}
              title={certificate.is_visible ? 'Hide from public portfolio' : 'Publish live'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 rounded-xl border transition-colors ${
                certificate.is_visible
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                  : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20 hover:bg-zinc-500/20'
              }`}
              aria-label={certificate.is_visible ? 'Unpublish certificate' : 'Publish certificate'}
            >
              {isPublishing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : certificate.is_visible ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
              <span>{certificate.is_visible ? 'Live' : 'Draft'}</span>
            </button>

            {/* Edit Button */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl border border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
              title="Edit certificate"
              aria-label="Edit certificate"
            >
              <Edit className="h-4 w-4" />
            </button>

            {/* Delete Button */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl border border-transparent hover:border-red-500/20 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
              title="Delete certificate"
              aria-label="Delete certificate"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Description / Highlights */}
        {certificate.description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {certificate.description}
          </p>
        )}
      </div>

      {/* Edit Modal */}
      <CertificateFormModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialData={certificate}
      />
    </>
  )
}
