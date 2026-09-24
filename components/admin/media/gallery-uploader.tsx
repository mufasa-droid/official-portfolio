'use client'

import { useState, useRef, useTransition, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  UploadCloud,
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  X,
  Sparkles,
} from 'lucide-react'
import { uploadMultipleMedia, listMedia, type MediaFileItem } from '@/app/admin/actions/media'
import { Button } from '@/components/ui/button'

interface GalleryUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  onSetAsCover?: (url: string) => void
  label?: string
  description?: string
}

export function GalleryUploader({
  images = [],
  onChange,
  onSetAsCover,
  label = 'VISUAL GALLERY & SCREENSHOTS',
  description = 'Drag & drop multiple screenshots or click to browse (PNG, WebP, JPEG, SVG max 5MB each)',
}: GalleryUploaderProps) {
  const [isPending, startTransition] = useTransition()
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [libraryFiles, setLibraryFiles] = useState<MediaFileItem[]>([])
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false)
  const [librarySearch, setLibrarySearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle uploading files
  const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return
    setError(null)

    const fileArray = Array.from(files)
    const formData = new FormData()
    fileArray.forEach((f) => formData.append('files', f))

    startTransition(async () => {
      try {
        const res = await uploadMultipleMedia(formData)
        if (res.urls && res.urls.length > 0) {
          // Append newly uploaded URLs
          onChange([...images, ...res.urls])
        }

        if (res.errors && res.errors.length > 0) {
          setError(res.errors.join(' | '))
        } else if (!res.success && (!res.urls || res.urls.length === 0)) {
          setError('Failed to upload selected images.')
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Upload failed'
        setError(msg)
      }
    })
  }

  // Drag and drop event handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Check if leaving the dropzone boundary
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  // Direct URL addition
  const handleAddUrl = () => {
    const trimmed = urlInput.trim()
    if (!trimmed) return

    try {
      new URL(trimmed)
    } catch {
      setError('Please provide a valid, fully qualified image URL (e.g. https://...).')
      return
    }

    if (images.includes(trimmed)) {
      setError('This image is already in the gallery.')
      return
    }

    onChange([...images, trimmed])
    setUrlInput('')
    setError(null)
  }

  // Remove image
  const handleRemove = (index: number) => {
    onChange(images.filter((_, idx) => idx !== index))
  }

  // Reorder images
  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= images.length) return

    const updated = [...images]
    const [moved] = updated.splice(index, 1)
    updated.splice(targetIndex, 0, moved)
    onChange(updated)
  }

  // Copy URL
  const handleCopyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url)
    setCopiedIdx(index)
    setTimeout(() => setCopiedIdx(null), 1800)
  }

  // Open Media Library Modal
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

  const handleSelectFromLibrary = (url: string) => {
    if (!images.includes(url)) {
      onChange([...images, url])
    }
  }

  return (
    <div className="space-y-3">
      {/* Header with quick action toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-xs font-mono text-muted-foreground font-medium">
          {label} ({images.length})
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
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 transition-colors min-h-[36px]"
          >
            <LinkIcon className="h-3 w-3" />
            <span>{showUrlInput ? 'Hide URL Input' : 'Add via URL'}</span>
          </button>
        </div>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 min-w-0">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="truncate">{error}</span>
            </div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="p-1 hover:bg-red-500/20 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-5 sm:p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center text-center select-none ${
          isDragging
            ? 'border-primary bg-primary/10 scale-[1.01]'
            : 'border-border hover:border-primary/50 bg-card/30 hover:bg-card/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files)
              e.target.value = ''
            }
          }}
          className="hidden"
        />

        {isPending ? (
          <div className="flex flex-col items-center space-y-2 py-2">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
            <p className="text-xs font-mono text-primary font-bold">
              Uploading images to storage...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-1.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isDragging
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary border border-primary/20'
              }`}
            >
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="text-xs font-mono font-bold text-foreground">
              {isDragging ? 'Drop images here to upload' : 'Click to browse or drag & drop images'}
            </p>
            <p className="text-[11px] font-mono text-muted-foreground max-w-xs">
              {description}
            </p>
          </div>
        )}
      </div>

      {/* Direct URL Input Row */}
      {showUrlInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex gap-2 pt-1"
        >
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddUrl()
              }
            }}
            placeholder="Paste public image URL (https://...)"
            className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddUrl}
            className="min-h-[40px] px-3 font-mono text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>Add</span>
          </Button>
        </motion.div>
      )}

      {/* Gallery Image Grid */}
      {images.length > 0 ? (
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-2.5">
            {images.map((gUrl, idx) => {
              const isFirst = idx === 0
              const isLast = idx === images.length - 1

              return (
                <div
                  key={`${gUrl}-${idx}`}
                  className="relative group rounded-xl overflow-hidden border border-border bg-card/60 aspect-video flex items-center justify-center shadow-sm"
                >
                  <Image
                    src={gUrl}
                    alt={`Gallery asset ${idx + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-200"
                    unoptimized
                  />

                  {/* Top Badges */}
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                    <span className="px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur text-[10px] font-mono text-white/90 font-bold border border-white/10 select-none">
                      #{idx + 1}
                    </span>
                    {idx === 0 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-primary/90 text-primary-foreground text-[9px] font-mono font-bold select-none">
                        Main
                      </span>
                    )}
                  </div>

                  {/* Reorder and Delete Controls Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 z-20">
                    {/* Top action row */}
                    <div className="flex items-center justify-end gap-1">
                      {onSetAsCover && (
                        <button
                          type="button"
                          onClick={() => onSetAsCover(gUrl)}
                          className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-primary transition-colors text-[10px] font-mono flex items-center gap-1 min-h-[32px] px-2"
                          title="Set as Hero Cover Image"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span className="hidden sm:inline">Set Cover</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(gUrl, idx)}
                        className="p-1.5 rounded-lg bg-black/60 text-white hover:bg-white/20 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                        title="Copy image URL"
                        aria-label={`Copy URL for image ${idx + 1}`}
                      >
                        {copiedIdx === idx ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                        title="Remove from gallery"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Bottom reorder row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={isFirst}
                          onClick={() => handleMove(idx, 'left')}
                          className="p-1 rounded-md bg-black/60 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
                          title="Move earlier"
                          aria-label={`Move image ${idx + 1} earlier`}
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={isLast}
                          onClick={() => handleMove(idx, 'right')}
                          className="p-1 rounded-md bg-black/60 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors min-w-[28px] min-h-[28px] flex items-center justify-center"
                          title="Move later"
                          aria-label={`Move image ${idx + 1} later`}
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-300 truncate max-w-[120px]">
                        {gUrl.split('/').pop()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-muted-foreground">
              {images.length} {images.length === 1 ? 'screenshot' : 'screenshots'} in visual gallery
            </span>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-[11px] font-mono text-red-500 hover:underline min-h-[32px] px-1"
            >
              Clear All
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
          <p className="text-[11px] font-mono text-muted-foreground">
            No gallery screenshots added yet. Upload files above or add image links.
          </p>
        </div>
      )}

      {/* Media Library Picker Modal */}
      <AnimatePresence>
        {showLibraryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-mono text-foreground flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    <span>Media Library Storage</span>
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Click any previously uploaded asset to add it to your gallery
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

              {/* Search Bar */}
              <div className="p-3 border-b border-border bg-muted/30">
                <input
                  type="text"
                  placeholder="Filter assets by name..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Modal Body */}
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
                      .map((file) => {
                        const isAlreadyAdded = images.includes(file.publicUrl)

                        return (
                          <div
                            key={file.id || file.name}
                            onClick={() => {
                              if (!isAlreadyAdded) {
                                handleSelectFromLibrary(file.publicUrl)
                              }
                            }}
                            className={`group relative rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                              isAlreadyAdded
                                ? 'border-primary ring-2 ring-primary/40 opacity-70 cursor-default'
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
                              {isAlreadyAdded && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-bold">
                                  <Check className="h-2.5 w-2.5" /> Added
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-border flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLibraryModal(false)}
                  className="font-mono text-xs"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
