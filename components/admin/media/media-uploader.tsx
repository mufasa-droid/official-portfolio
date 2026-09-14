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
} from 'lucide-react'
import { uploadMedia } from '@/app/admin/actions/media'

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
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleCopyUrl = () => {
    if (!value) return
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono text-muted-foreground font-medium">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setUseDirectUrl(!useDirectUrl)}
          className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{useDirectUrl ? 'Switch to File Upload' : 'Paste External URL'}</span>
        </button>
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
            className="w-full px-3.5 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
              <button
                type="button"
                onClick={handleCopyUrl}
                className="p-2 rounded-xl bg-background/90 text-foreground hover:bg-background border border-border text-xs font-mono flex items-center gap-1.5 shadow-md"
                title="Copy public URL"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-mono flex items-center gap-1.5 shadow-md"
                title="Remove image"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="text-[11px]">Remove</span>
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
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
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
    </div>
  )
}
