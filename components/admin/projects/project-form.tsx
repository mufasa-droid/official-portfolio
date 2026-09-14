'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Save,
  Sparkles,
  ExternalLink,
  Plus,
  X,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Cpu,
  Layers,
  Check,
} from 'lucide-react'
import { createProject, updateProject, type ProjectFormState } from '@/app/admin/actions/projects'
import { MediaUploader } from '@/components/admin/media/media-uploader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Database } from '@/types/database'

type ProjectRow = Database['public']['Tables']['projects']['Row']

interface ProjectFormProps {
  initialData?: ProjectRow | null
  isEditing?: boolean
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<ProjectFormState | null>(null)

  // Controlled form state
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialData?.slug))
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [isPublished, setIsPublished] = useState(initialData?.is_published ?? true)
  const [image, setImage] = useState(initialData?.image || '')

  // Tech tags list
  const [techList, setTechList] = useState<string[]>(initialData?.tech || ['React', 'Next.js', 'TypeScript'])
  const [techInput, setTechInput] = useState('')

  // Features list
  const [featuresList, setFeaturesList] = useState<string[]>(
    initialData?.features || [
      'Engineered sub-100ms response time pipeline with Next.js App Router',
      'Implemented deterministic state calculation engine with strict TypeScript types',
    ]
  )
  const [newFeatureInput, setNewFeatureInput] = useState('')

  // Gallery URLs list
  const [galleryList, setGalleryList] = useState<string[]>(initialData?.gallery || [])
  const [galleryInput, setGalleryInput] = useState('')

  // Auto-generate slug from title if not manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setTitle(val)
    if (!isSlugManuallyEdited) {
      const generated = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim()
      setSlug(generated)
    }
  }

  // Tag helper
  const addTechTag = () => {
    const trimmed = techInput.trim()
    if (trimmed && !techList.includes(trimmed)) {
      setTechList([...techList, trimmed])
      setTechInput('')
    }
  }

  const removeTechTag = (tag: string) => {
    setTechList(techList.filter((t) => t !== tag))
  }

  // Feature helper
  const addFeature = () => {
    const trimmed = newFeatureInput.trim()
    if (trimmed) {
      setFeaturesList([...featuresList, trimmed])
      setNewFeatureInput('')
    }
  }

  const removeFeature = (idx: number) => {
    setFeaturesList(featuresList.filter((_, i) => i !== idx))
  }

  // Gallery helper
  const addGalleryImage = () => {
    const trimmed = galleryInput.trim()
    if (trimmed && !galleryList.includes(trimmed)) {
      setGalleryList([...galleryList, trimmed])
      setGalleryInput('')
    }
  }

  const removeGalleryImage = (idx: number) => {
    setGalleryList(galleryList.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormState(null)

    const formData = new FormData(e.currentTarget)
    formData.set('tech', techList.join(','))
    formData.set('features', featuresList.join('\n'))
    formData.set('gallery', galleryList.join('\n'))
    formData.set('featured', String(featured))
    formData.set('isPublished', String(isPublished))

    try {
      let result: ProjectFormState
      if (isEditing && initialData?.id) {
        result = await updateProject(initialData.id, null, formData)
      } else {
        result = await createProject(null, formData)
      }

      setFormState(result)
      if (result.success) {
        router.push('/admin/projects')
        router.refresh()
      }
    } catch {
      setFormState({
        success: false,
        message: 'An unexpected server error occurred. Please verify your connection.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-mono">
              {isEditing ? `Edit: ${initialData?.title}` : 'Create New Case Study'}
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              {isEditing ? `ID // ${initialData?.id}` : 'Draft or Publish a Production Case Study'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            href="/admin/projects"
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial justify-center min-h-[44px]"
          >
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial justify-center min-h-[44px] gap-2"
          >
            {isSubmitting ? (
              <span>Saving Changes&hellip;</span>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEditing ? 'Update Case Study' : 'Publish Case Study'}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error / Feedback Banner */}
      <AnimatePresence>
        {formState && !formState.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-mono flex items-start gap-3"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{formState.message}</p>
              {formState.errors && (
                <ul className="mt-1 list-disc list-inside space-y-0.5 opacity-90">
                  {Object.entries(formState.errors).map(([k, errs]) =>
                    errs?.map((e, idx) => (
                      <li key={`${k}-${idx}`}>
                        <strong className="capitalize">{k}</strong>: {e}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Main Case Study Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Core Identification */}
          <div className="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border space-y-5 dark:border-white/[0.12]">
            <h2 className="text-sm font-bold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>1. Title & URL Routing</span>
            </h2>

            <div className="space-y-2">
              <label htmlFor="title" className="block text-xs font-mono text-muted-foreground">
                PROJECT TITLE *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. TraderMind — AI Trading Performance Coach"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-base sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans dark:bg-black/50 dark:border-white/[0.1]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-xs font-mono text-muted-foreground">
                URL SLUG (PERMALINK) *
              </label>
              <div className="flex rounded-xl overflow-hidden border border-border bg-background dark:bg-black/50 dark:border-white/[0.1]">
                <span className="px-3 py-3 bg-muted/60 text-xs font-mono text-muted-foreground border-r border-border shrink-0 select-none">
                  /projects/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManuallyEdited(true)
                    setSlug(e.target.value.toLowerCase().replace(/[^\w-]/g, ''))
                  }}
                  placeholder="tradermind-ai-trading-coach"
                  className="w-full px-4 py-3 bg-transparent text-base sm:text-sm font-mono text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="space-y-2">
                <label htmlFor="role" className="block text-xs font-mono text-muted-foreground">
                  ROLE ASSIGNED *
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  defaultValue={initialData?.role || 'Full-Stack Developer & Architect'}
                  placeholder="e.g. Lead Frontend Architect"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground focus:border-primary focus:outline-none font-mono dark:bg-black/50 dark:border-white/[0.1]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="block text-xs font-mono text-muted-foreground">
                  TIMELINE / DURATION
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  defaultValue={initialData?.duration || '6 weeks'}
                  placeholder="e.g. 6 weeks"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground focus:border-primary focus:outline-none font-mono dark:bg-black/50 dark:border-white/[0.1]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="team" className="block text-xs font-mono text-muted-foreground">
                  TEAM CONTEXT
                </label>
                <input
                  id="team"
                  name="team"
                  type="text"
                  defaultValue={initialData?.team || 'Solo Project'}
                  placeholder="e.g. Solo Project"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground focus:border-primary focus:outline-none font-mono dark:bg-black/50 dark:border-white/[0.1]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Technical Narrative (Problem & Solution) */}
          <div className="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border space-y-5 dark:border-white/[0.12]">
            <h2 className="text-sm font-bold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>2. Technical Narrative & Impact</span>
            </h2>

            <div className="space-y-2">
              <label htmlFor="problem" className="block text-xs font-mono text-muted-foreground">
                THE PROBLEM & CONSTRAINTS *
              </label>
              <textarea
                id="problem"
                name="problem"
                rows={3}
                required
                defaultValue={initialData?.problem || ''}
                placeholder="Describe the architectural challenge, user pain-point, or bottleneck..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-base sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans dark:bg-black/50 dark:border-white/[0.1] resize-y"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="solution" className="block text-xs font-mono text-muted-foreground">
                THE ENGINEERING SOLUTION *
              </label>
              <textarea
                id="solution"
                name="solution"
                rows={4}
                required
                defaultValue={initialData?.solution || ''}
                placeholder="Explain what was architected, why specific tools were selected, and how performance goals were achieved..."
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-base sm:text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-sans dark:bg-black/50 dark:border-white/[0.1] resize-y"
              />
            </div>

            <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3 dark:bg-white/[0.03]">
              <span className="text-xs font-mono font-bold text-foreground block">
                PRODUCTION IMPACT LEDGER
              </span>

              <div className="space-y-2">
                <label htmlFor="impactMetric" className="block text-xs font-mono text-muted-foreground">
                  IMPACT METRIC / HEADLINE *
                </label>
                <input
                  id="impactMetric"
                  name="impactMetric"
                  type="text"
                  required
                  defaultValue={initialData?.impact?.metric || ''}
                  placeholder="e.g. 11-feature behavioral engine"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="impactDetail" className="block text-xs font-mono text-muted-foreground">
                  IMPACT VERIFICATION DETAIL *
                </label>
                <textarea
                  id="impactDetail"
                  name="impactDetail"
                  rows={2}
                  required
                  defaultValue={initialData?.impact?.detail || ''}
                  placeholder="Describe verifiable business or technical outcomes..."
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground font-sans focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Technologies & Features Builders */}
          <div className="glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-border space-y-5 dark:border-white/[0.12]">
            <h2 className="text-sm font-bold font-mono text-primary uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>3. Tech Stack & Key Capabilities</span>
            </h2>

            {/* Dynamic Tech Chips */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono text-muted-foreground">
                TECHNOLOGIES EMPLOYED ({techList.length}) *
              </label>

              <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-muted/40 border border-border min-h-[50px] dark:bg-black/40">
                {techList.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-background border border-border text-foreground dark:bg-white/[0.06]"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTechTag(tag)}
                      className="text-muted-foreground hover:text-red-500"
                      aria-label={`Remove technology ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTechTag()
                    }
                  }}
                  placeholder="Add technology (e.g. Supabase, Tailwind CSS)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground font-mono focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
                />
                <Button type="button" size="sm" variant="outline" onClick={addTechTag} className="min-h-[42px]">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span>Add Tech</span>
                </Button>
              </div>
            </div>

            {/* Dynamic Features List */}
            <div className="space-y-2.5 pt-4 border-t border-border">
              <label className="block text-xs font-mono text-muted-foreground">
                ENGINEERED CAPABILITIES & FEATURES ({featuresList.length}) *
              </label>

              <div className="space-y-2">
                {featuresList.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-3 p-3 rounded-xl bg-muted/40 border border-border text-xs text-foreground dark:bg-white/[0.02]"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-muted-foreground hover:text-red-500 p-1"
                      aria-label={`Remove feature item ${idx + 1}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  rows={2}
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  placeholder="Describe a key capability or engineered feature..."
                  className="flex-1 px-4 py-2 rounded-xl bg-background border border-border text-base sm:text-xs text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
                />
                <Button type="button" size="sm" variant="outline" onClick={addFeature} className="sm:self-end min-h-[42px] justify-center">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span>Add Feature</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Media, URLs & Publishing Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 4: Publication & Flagship Status */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border space-y-4 dark:border-white/[0.12]">
            <h3 className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider">
              Visibility & Ordering
            </h3>

            {/* Published Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border dark:bg-white/[0.02]">
              <div>
                <span className="text-xs font-mono font-bold text-foreground block">
                  PUBLISH STATUS
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {isPublished ? 'Visible on public site' : 'Hidden draft in CMS'}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isPublished}
                onClick={() => setIsPublished(!isPublished)}
                className={`w-11 h-6 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isPublished ? 'bg-emerald-500' : 'bg-zinc-600'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    isPublished ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Featured Flagship Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border dark:bg-white/[0.02]">
              <div>
                <span className="text-xs font-mono font-bold text-foreground block">
                  FLAGSHIP SHOWCASE
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {featured ? 'Hero badge & highlight' : 'Standard case study'}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={featured}
                onClick={() => setFeatured(!featured)}
                className={`w-11 h-6 rounded-full transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  featured ? 'bg-primary' : 'bg-zinc-600'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    featured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Display Order */}
            <div className="space-y-2">
              <label htmlFor="displayOrder" className="block text-xs font-mono text-muted-foreground">
                DISPLAY ORDER (INTEGER)
              </label>
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                defaultValue={initialData?.display_order ?? 1}
                min={0}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
              />
            </div>
          </div>

          {/* Card 5: External URLs */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border space-y-4 dark:border-white/[0.12]">
            <h3 className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider">
              External Production Links
            </h3>

            <div className="space-y-2">
              <label htmlFor="liveUrl" className="block text-xs font-mono text-muted-foreground">
                LIVE APPLICATION URL
              </label>
              <input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={initialData?.live_url || ''}
                placeholder="https://trader-mind-kohl.vercel.app"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="githubUrl" className="block text-xs font-mono text-muted-foreground">
                GITHUB REPOSITORY URL
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={initialData?.github_url || ''}
                placeholder="https://github.com/mufasa-droid/TraderMind"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
              />
            </div>
          </div>

          {/* Card 6: Visual Media & Gallery */}
          <div className="glass-card p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-border space-y-4 dark:border-white/[0.12]">
            <h3 className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Hero Image & Gallery</span>
            </h3>

            {/* Hidden Input for Server Action */}
            <input type="hidden" name="image" value={image} />

            <MediaUploader
              value={image}
              onChange={(url) => setImage(url)}
              label="HERO COVER IMAGE *"
              description="Upload high-res screenshot (PNG, WebP, JPEG, max 5MB)"
              aspectRatio="video"
            />

            {/* Gallery Manager */}
            <div className="space-y-2 pt-3 border-t border-border">
              <label className="block text-xs font-mono text-muted-foreground">
                VISUAL GALLERY URLS ({galleryList.length})
              </label>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-base sm:text-xs font-mono text-foreground focus:border-primary focus:outline-none dark:bg-black/50 dark:border-white/[0.1]"
                />
                <Button type="button" size="sm" variant="outline" onClick={addGalleryImage} className="min-h-[42px]">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>

              {galleryList.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {galleryList.map((gUrl, idx) => (
                    <div
                      key={idx}
                      className="relative h-20 rounded-xl overflow-hidden border border-border group"
                    >
                      <Image src={gUrl} alt={`Gallery ${idx + 1}`} fill className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 p-1.5 rounded-md bg-black/70 text-white hover:bg-red-500 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
                        aria-label={`Remove gallery image ${idx + 1}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dedicated Bottom Save Bar (< 768px) */}
      <div className="block sm:hidden pt-4 pb-2">
        <Button
          type="submit"
          variant="default"
          disabled={isSubmitting}
          className="w-full justify-center min-h-[48px] gap-2 shadow-lg"
        >
          {isSubmitting ? (
            <span>Saving Changes&hellip;</span>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{isEditing ? 'Update Case Study' : 'Publish Case Study'}</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
