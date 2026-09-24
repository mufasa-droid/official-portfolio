'use client'

import { useState, useRef, useTransition } from 'react'
import Image from 'next/image'
import {
  UploadCloud,
  Image as ImageIcon,
  Check,
  Copy,
  Trash2,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  FolderOpen,
  X,
} from 'lucide-react'
import { uploadMedia, listMedia, type MediaFileItem } from '@/app/admin/actions/media'
import { Button } from '@/components/ui/button'

interface MediaUploaderProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  description?: string
  aspectRatio?: 'video' | 'square' | 'auto'
}

export function MediaUploader({
  value,
  onChange,
  label = 'Upload Image Asset',
  description = 'Drag & drop PNG, WebP, JPEG or SVG (max 5MB)',
  aspectRatio = 'auto',
}: MediaUploaderProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [useDirectUrl, setUseDirectUrl] = useState(false)
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [libraryFiles, setLibraryFiles] = useState<MediaFileItem[]>([])
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false)
  const [librarySearch, setLibrarySearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    startTransition(async () => {
      const res = await uploadMedia(formData)
      if (res.success && res.url) {
        onChange(res.url)
      } else {
        setError(res.error || 'Failed to upload image.')
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  const handleCopyUrl = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openLibrary = async () => {
    setShowLibraryModal(true)
    setIsLoadingLibrary(true)
    try {
      const res = await listMedia()
      if (res.success) {
        setLibraryFiles(res.files)
      } else {
        setError(res.error || 'Failed to fetch media assets.')
      }
    } catch {
      setError('Failed to fetch media assets from storage.')
    } finally {
      setIsLoadingLibrary(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-mono text-muted-foreground font-medium">
          {label}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openLibrary}
            className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors min-h-[36px]"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            <span>Browse Library</span>
          </button>
          <button
            type="button"
            onClick={() => setUseDirectUrl(!useDirectUrl)}
            className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 transition-colors min-h-[36px]"
          >
            <LinkIcon className="h-3.5 w-3.5" />
            <span>{useDirectUrl ? 'Switch to File Upload' : 'Paste External URL'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {useDirectUrl ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://images.unsplash.com/... or CDN link"
            className="w-full px-3.5 py-2.5 sm:py-2 rounded-xl bg-muted/40 border border-border text-base sm:text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ) : value ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl border border-border bg-card/60 overflow-hidden group">
          <div
            className={`relative w-full ${
              aspectRatio === 'video'
                ? 'aspect-video'
                : aspectRatio === 'square'
                ? 'aspect-square'
                : 'h-48'
            } bg-black/10 flex items-center justify-center`}
          >
            <Image
              src={value}
              alt="Media asset preview"
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Actions: Always visible on touch, hover on desktop */}
            <div className="absolute inset-0 bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-background/90 text-foreground hover:bg-background border border-border text-xs font-mono flex items-center gap-1.5 shadow-md font-medium"
                title="Copy public URL"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-mono flex items-center gap-1.5 shadow-md font-medium"
                title="Remove image"
              >
                <Trash2 className="h-4 w-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
          <div className="p-2.5 bg-muted/30 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground truncate">
            <span className="truncate pr-2">{value}</span>
            <span className="text-emerald-500 font-semibold shrink-0">Active</span>
          </div>
        </div>
      ) : (
        /* Drag and Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-2 ${
            isDragging
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 bg-card/40 hover:bg-card/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0])
                e.target.value = ''
              }
            }}
            className="hidden"
          />

          {isPending ? (
            <div className="flex flex-col items-center space-y-2 py-4">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs font-mono text-primary font-bold">
                Uploading to Storage Bucket...
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-1">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-xs font-mono font-bold text-foreground">
                Click to upload or drag & drop file
              </p>
              <p className="text-[11px] font-mono text-muted-foreground max-w-xs">
                {description}
              </p>
            </>
          )}
        </div>
      )}

      {/* Media Library Picker Modal */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-mono text-foreground flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  <span>Media Library Storage</span>
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  Select an asset to use as your image
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLibraryModal(false)}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3 border-b border-border bg-muted/30">
              <input
                type="text"
                placeholder="Filter assets by name..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              {isLoadingLibrary ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-2">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <p className="text-xs font-mono text-muted-foreground">Loading storage assets...</p>
                </div>
              ) : libraryFiles.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-muted-foreground">
                  No uploaded assets found in your storage bucket.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {libraryFiles
                    .filter((f) => f.name.toLowerCase().includes(librarySearch.toLowerCase()))
                    .map((file) => (
                      <div
                        key={file.id || file.name}
                        onClick={() => {
                          onChange(file.publicUrl)
                          setShowLibraryModal(false)
                        }}
                        className={`group relative rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                          value === file.publicUrl
                            ? 'border-primary ring-2 ring-primary/40'
                            : 'border-border hover:border-primary hover:scale-[1.02]'
                        }`}
                      >
                        <Image
                          src={file.publicUrl}
                          alt={file.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                          <span className="text-[10px] font-mono text-white truncate">
                            {file.name}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowLibraryModal(false)}
                className="font-mono text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
