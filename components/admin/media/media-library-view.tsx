'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  UploadCloud,
  Search,
  ExternalLink,
  AlertCircle,
  FileImage,
  Clock,
  HardDrive,
} from 'lucide-react'
import { deleteMedia, uploadMedia, type MediaFileItem } from '@/app/admin/actions/media'
import { MediaUploader } from './media-uploader'

interface MediaLibraryViewProps {
  initialFiles: MediaFileItem[]
}

export function MediaLibraryView({ initialFiles }: MediaLibraryViewProps) {
  const router = useRouter()
  const [files, setFiles] = useState<MediaFileItem[]>(initialFiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedName, setCopiedName] = useState<string | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleCopyUrl = (url: string, name: string) => {
    navigator.clipboard.writeText(url)
    setCopiedName(name)
    setTimeout(() => setCopiedName(null), 2000)
  }

  const handleDelete = (name: string) => {
    setError(null)
    startTransition(async () => {
      const res = await deleteMedia(name)
      if (res.success) {
        setFiles((prev) => prev.filter((f) => f.name !== name))
        setDeleteConfirmName(null)
        router.refresh()
      } else {
        setError(res.error || 'Failed to delete media asset.')
      }
    })
  }

  const handleUploadedNew = (url: string) => {
    router.refresh()
  }

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top Upload Banner */}
      <div className="p-6 rounded-2xl bg-card/60 backdrop-blur border border-border">
        <MediaUploader
          onChange={handleUploadedNew}
          label="Upload New Media Asset to Bucket"
          description="Drag and drop screenshot, icon, or diagram to upload to Supabase storage"
        />
      </div>

      {/* Library Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-3 sm:top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 sm:py-2 rounded-xl bg-card/60 backdrop-blur border border-border text-base sm:text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <HardDrive className="h-4 w-4" />
          <span>
            {files.length} {files.length === 1 ? 'Asset' : 'Assets'} in Storage
          </span>
        </div>
      </div>

      {/* Grid: Assets */}
      {filteredFiles.length === 0 ? (
        <div className="p-12 rounded-2xl bg-card/40 border border-border border-dashed text-center space-y-3">
          <FileImage className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="text-xs font-mono text-muted-foreground">
            {searchQuery
              ? 'No media assets match your search.'
              : 'No assets uploaded to the portfolio storage bucket yet. Use the upload box above to add project screenshots.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => {
            const isCopied = copiedName === file.name
            const isConfirmingDelete = deleteConfirmName === file.name

            return (
              <div
                key={file.name}
                className="rounded-2xl border border-border bg-card/60 overflow-hidden flex flex-col group hover:border-primary/40 transition-colors"
              >
                {/* Image Preview */}
                <div className="relative aspect-video bg-black/20 w-full overflow-hidden">
                  <Image
                    src={file.publicUrl}
                    alt={file.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(file.publicUrl, file.name)}
                      className="p-2 rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-mono flex items-center gap-1 shadow-md"
                      title="Copy Public URL"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span className="text-[11px]">{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={file.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-background text-foreground hover:bg-background/90 text-xs font-mono flex items-center gap-1 shadow-md"
                      title="Open full image in new tab"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Info Card Body */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-bold text-foreground truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>{formatFileSize(file.metadata?.size)}</span>
                      <span>
                        {file.created_at
                          ? new Date(file.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Recent'}
                      </span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(file.publicUrl, file.name)}
                      className="min-h-[40px] px-2 text-xs sm:text-[11px] font-mono text-primary hover:underline flex items-center gap-1.5"
                    >
                      {isCopied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{isCopied ? 'Copied URL' : 'Copy Link'}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <a
                        href={file.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm:hidden min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground"
                        title="View image"
                        aria-label={`View ${file.name}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      {isConfirmingDelete ? (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={isPending}
                            onClick={() => handleDelete(file.name)}
                            className="min-h-[36px] px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-mono font-bold hover:bg-red-700"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmName(null)}
                            className="min-h-[36px] px-2 py-1 rounded-lg border border-border text-xs font-mono text-muted-foreground"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmName(file.name)}
                          className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          aria-label={`Delete ${file.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
