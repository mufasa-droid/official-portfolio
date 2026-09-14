'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Plus,
  Award,
  ExternalLink,
  CheckCircle2,
  EyeOff,
  Edit,
  Trash2,
  Loader2,
  FileImage,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CertificateCard } from '@/components/admin/certificates/certificate-card'
import { CertificateFormModal } from '@/components/admin/certificates/certificate-form-modal'
import {
  toggleCertificateVisibility,
  deleteCertificate,
  reorderCertificates,
} from '@/app/admin/actions/certificates'
import type { Database } from '@/types/database'

type CertificateRow = Database['public']['Tables']['certificates']['Row']

interface CertificateListViewProps {
  initialCertificates: CertificateRow[]
}

export function CertificateListView({ initialCertificates }: CertificateListViewProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCert, setEditingCert] = useState<CertificateRow | null>(null)
  const [actionId, setActionId] = useState<string | null>(null)
  const [isReordering, setIsReordering] = useState(false)

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setActionId(id)
    try {
      await toggleCertificateVisibility(id, currentStatus)
    } finally {
      setActionId(null)
    }
  }

  const handleDelete = async (cert: CertificateRow) => {
    if (confirm(`Permanently delete certificate "${cert.title}"?`)) {
      setActionId(cert.id)
      try {
        await deleteCertificate(cert.id)
      } finally {
        setActionId(null)
      }
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === initialCertificates.length - 1)
    ) {
      return
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const currentList = [...initialCertificates]
    const temp = currentList[index]
    currentList[index] = currentList[targetIndex]
    currentList[targetIndex] = temp

    setIsReordering(true)
    try {
      const payload = currentList.map((item, idx) => ({
        id: item.id,
        display_order: idx + 1,
      }))
      await reorderCertificates(payload)
    } finally {
      setIsReordering(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <Award className="h-4 w-4" />
            <span>CREDENTIALS & ACCREDITATIONS</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            Certificates Matrix ({initialCertificates.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your verified certifications, professional licensures, and public carousel showcase.
          </p>
        </div>

        <Button
          size="default"
          variant="default"
          onClick={() => setIsCreateOpen(true)}
          className="gap-2 min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certificate</span>
        </Button>
      </div>

      {/* Dual Responsive Presentation */}
      <div className="glass-card rounded-3xl border border-border overflow-hidden shadow-xl dark:border-white/[0.12]">
        {/* Desktop Table View (>= 768px) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-muted/60 border-b border-border text-muted-foreground dark:bg-white/[0.04]">
              <tr>
                <th className="p-4 pl-6 font-semibold">ORDER</th>
                <th className="p-4 font-semibold">DOCUMENT</th>
                <th className="p-4 font-semibold">TITLE & ISSUER</th>
                <th className="p-4 font-semibold">ISSUE DATE</th>
                <th className="p-4 font-semibold">VERIFICATION</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 pr-6 text-right font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {initialCertificates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground font-mono">
                    No certificates recorded yet. Click &quot;Add Certificate&quot; to create your first entry.
                  </td>
                </tr>
              ) : (
                initialCertificates.map((cert, idx) => {
                  const isActing = actionId === cert.id
                  return (
                    <tr key={cert.id} className="hover:bg-muted/40 transition-colors">
                      {/* Order + Up/Down Controls */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-muted-foreground tabular-nums">
                            #{cert.display_order || idx + 1}
                          </span>
                          <div className="flex flex-col gap-0.5 ml-1">
                            <button
                              type="button"
                              onClick={() => handleMove(idx, 'up')}
                              disabled={idx === 0 || isReordering}
                              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                              title="Move up in order"
                              aria-label={`Move ${cert.title} up`}
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMove(idx, 'down')}
                              disabled={idx === initialCertificates.length - 1 || isReordering}
                              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                              title="Move down in order"
                              aria-label={`Move ${cert.title} down`}
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Thumbnail */}
                      <td className="p-4">
                        <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-border bg-muted/40 shrink-0">
                          {cert.image_url ? (
                            <Image
                              src={cert.image_url}
                              alt={cert.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <FileImage className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title & Issuer */}
                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-foreground truncate">{cert.title}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{cert.issuer}</p>
                      </td>

                      {/* Issue Date */}
                      <td className="p-4 text-muted-foreground whitespace-nowrap">
                        {cert.issue_date}
                      </td>

                      {/* Verification Link */}
                      <td className="p-4">
                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                            title="Verify external credential"
                          >
                            <span>Verify URL</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground/50">None</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleToggle(cert.id, cert.is_visible)}
                          disabled={isActing}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                            cert.is_visible
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20 hover:bg-zinc-500/20'
                          }`}
                        >
                          {isActing ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : cert.is_visible ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <EyeOff className="h-3 w-3" />
                          )}
                          <span>{cert.is_visible ? 'Live' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Row Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditingCert(cert)}
                            className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                            title="Edit certificate"
                            aria-label={`Edit ${cert.title}`}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cert)}
                            disabled={isActing}
                            className="p-1.5 rounded-lg border border-transparent hover:border-red-500/20 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                            title="Delete certificate"
                            aria-label={`Delete ${cert.title}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Dedicated Card View (< 768px) */}
        <div className="md:hidden divide-y divide-border">
          {initialCertificates.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground font-mono text-xs">
              No certificates recorded yet. Tap &quot;Add Certificate&quot; above.
            </div>
          ) : (
            initialCertificates.map((cert) => (
              <div key={cert.id} className="p-4">
                <CertificateCard certificate={cert} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Modal */}
      <CertificateFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* Edit Modal */}
      {editingCert && (
        <CertificateFormModal
          isOpen={Boolean(editingCert)}
          onClose={() => setEditingCert(null)}
          initialData={editingCert}
        />
      )}
    </div>
  )
}
