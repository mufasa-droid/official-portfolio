'use client'

import { useState, useTransition } from 'react'
import {
  Edit3,
  Trash2,
  Plus,
  X,
  Layout,
  Database as DbIcon,
  Wrench,
  Cpu,
  Terminal,
  Cloud,
  Sparkles,
  Layers,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react'
import {
  addSkillToCategory,
  deleteSkill,
  toggleSkillPublish,
  deleteSkillCategory,
} from '@/app/admin/actions/skills'
import type { Database } from '@/types/database'

type CategoryRow = Database['public']['Tables']['skill_categories']['Row']
type SkillRow = Database['public']['Tables']['skills']['Row']

interface CategoryWithSkills extends CategoryRow {
  skills: SkillRow[]
}

interface CategoryCardProps {
  category: CategoryWithSkills
  onEdit: (cat: CategoryRow) => void
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layout,
  Database: DbIcon,
  Wrench,
  Cpu,
  Terminal,
  Cloud,
  Sparkles,
  Layers,
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const [newSkillName, setNewSkillName] = useState('')
  const [isPending, startTransition] = useTransition()
  const [actionSkillId, setActionSkillId] = useState<string | null>(null)

  const IconComponent = ICON_MAP[category.icon_name || 'Layout'] || Layers

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkillName.trim()) return

    const nameToAdd = newSkillName.trim()
    setNewSkillName('')
    startTransition(async () => {
      try {
        await addSkillToCategory(category.id, nameToAdd)
      } catch (err) {
        console.error('Failed to add skill:', err)
      }
    })
  }

  const handleTogglePublish = (skill: SkillRow) => {
    setActionSkillId(skill.id)
    startTransition(async () => {
      try {
        await toggleSkillPublish(skill.id, skill.is_published)
      } catch (err) {
        console.error('Failed to toggle skill:', err)
      } finally {
        setActionSkillId(null)
      }
    })
  }

  const handleDeleteSkill = (skillId: string) => {
    setActionSkillId(skillId)
    startTransition(async () => {
      try {
        await deleteSkill(skillId)
      } catch (err) {
        console.error('Failed to delete skill:', err)
      } finally {
        setActionSkillId(null)
      }
    })
  }

  const handleDeleteCategory = () => {
    if (
      !confirm(
        `Are you sure you want to delete domain "${category.name}" and all its skills?`
      )
    ) {
      return
    }

    startTransition(async () => {
      try {
        await deleteSkillCategory(category.id)
      } catch (err) {
        console.error('Failed to delete category:', err)
      }
    })
  }

  return (
    <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
      {/* Category Header */}
      <div>
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
                {category.name}
              </h3>
              <p className="text-[11px] font-mono text-muted-foreground">
                slug: <span className="text-foreground">{category.slug}</span> • order: {category.display_order}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(category)}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              title="Edit domain metadata"
            >
              <Edit3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleDeleteCategory}
              disabled={isPending}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"
              title="Delete domain and all skills"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-sans">
          {category.description}
        </p>

        {/* Skills Chips Matrix */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Skills ({category.skills?.length || 0})
            </span>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-2xl bg-muted/20 border border-border/60">
            {(!category.skills || category.skills.length === 0) && (
              <span className="text-xs font-mono text-muted-foreground italic py-1">
                No skills added yet to this domain.
              </span>
            )}

            {category.skills?.map((skill) => {
              const isActing = actionSkillId === skill.id && isPending
              return (
                <div
                  key={skill.id}
                  className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                    skill.is_published
                      ? 'bg-card border-border text-foreground'
                      : 'bg-muted/40 border-border/40 text-muted-foreground/60 line-through opacity-60'
                  }`}
                >
                  {isActing ? (
                    <Loader2 className="h-3 w-3 animate-spin text-primary" />
                  ) : null}
                  <span>{skill.name}</span>

                  <div className="flex items-center gap-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(skill)}
                      className="text-muted-foreground hover:text-foreground"
                      title={skill.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {skill.is_published ? (
                        <Eye className="h-3 w-3" />
                      ) : (
                        <EyeOff className="h-3 w-3" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-muted-foreground hover:text-red-500"
                      title="Remove skill"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Add Skill Form */}
      <form onSubmit={handleAddSkill} className="pt-3 border-t border-border flex gap-2">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Add skill (e.g. Next.js 14)..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-muted/40 border border-border text-xs font-mono text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none dark:bg-black/50"
        />
        <button
          type="submit"
          disabled={!newSkillName.trim() || isPending}
          className="px-3 py-2 rounded-xl bg-foreground text-background text-xs font-mono font-medium hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-1 shrink-0"
        >
          {isPending && !actionSkillId ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          <span>Add</span>
        </button>
      </form>
    </div>
  )
}
