'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit, Trash2, ExternalLink, Sparkles, CheckCircle2, EyeOff, Loader2 } from 'lucide-react'
import {
  toggleProjectPublish,
  toggleProjectFeatured,
  deleteProject,
} from '@/app/admin/actions/projects'

interface ProjectRowActionsProps {
  id: string
  slug: string
  title: string
  featured: boolean
  isPublished: boolean
}

export function ProjectRowActions({
  id,
  slug,
  title,
  featured,
  isPublished,
}: ProjectRowActionsProps) {
  const [isPublishing, setIsPublishing] = useState(false)
  const [isFeaturing, setIsFeaturing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleTogglePublish = async () => {
    setIsPublishing(true)
    try {
      await toggleProjectPublish(id, isPublished)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleToggleFeatured = async () => {
    setIsFeaturing(true)
    try {
      await toggleProjectFeatured(id, featured)
    } finally {
      setIsFeaturing(false)
    }
  }

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to permanently delete "${title}"? This action cannot be undone.`)) {
      setIsDeleting(true)
      try {
        await deleteProject(id)
      } finally {
        setIsDeleting(false)
      }
    }
  }

  return (
    <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
      {/* Featured Toggle */}
      <button
        type="button"
        onClick={handleToggleFeatured}
        disabled={isFeaturing}
        title={featured ? 'Remove Flagship status' : 'Make Flagship case study'}
        aria-label={featured ? 'Remove Flagship status' : 'Make Flagship case study'}
        className={`min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl border transition-colors ${
          featured
            ? 'bg-primary/15 text-primary border-primary/30 hover:bg-primary/25'
            : 'text-muted-foreground border-transparent hover:border-border hover:text-foreground'
        }`}
      >
        {isFeaturing ? (
          <Loader2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        )}
      </button>

      {/* Published Status Toggle */}
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={isPublishing}
        title={isPublished ? 'Unpublish (hide from public site)' : 'Publish live'}
        aria-label={isPublished ? 'Unpublish (hide from public site)' : 'Publish live'}
        className={`min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl border transition-colors ${
          isPublished
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
            : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20 hover:bg-zinc-500/20'
        }`}
      >
        {isPublishing ? (
          <Loader2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 animate-spin" />
        ) : isPublished ? (
          <CheckCircle2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        ) : (
          <EyeOff className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        )}
      </button>

      {/* View Live Case Study Link */}
      <Link
        href={`/projects/${slug}`}
        target="_blank"
        title="View live case study"
        aria-label={`View live case study for ${title}`}
        className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-transparent hover:border-border transition-colors"
      >
        <ExternalLink className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
      </Link>

      {/* Edit Page Link */}
      <Link
        href={`/admin/projects/${id}`}
        title="Edit case study"
        aria-label={`Edit case study for ${title}`}
        className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-colors"
      >
        <Edit className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
      </Link>

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        title="Delete case study"
        aria-label={`Delete case study for ${title}`}
        className="min-h-[40px] min-w-[40px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 flex items-center justify-center rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 sm:h-3.5 sm:w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
        )}
      </button>
    </div>
  )
}
