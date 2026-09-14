'use client'

import { useState } from 'react'
import { Plus, Sparkles, Search, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CategoryCard } from './category-card'
import { CategoryFormModal } from './category-form-modal'
import type { Database } from '@/types/database'

type CategoryRow = Database['public']['Tables']['skill_categories']['Row']
type SkillRow = Database['public']['Tables']['skills']['Row']

interface CategoryWithSkills extends CategoryRow {
  skills: SkillRow[]
}

interface SkillsViewProps {
  categories: CategoryWithSkills[]
}

export function SkillsView({ categories }: SkillsViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: CategoryRow) => {
    setEditingCategory(cat)
    setIsModalOpen(true)
  }

  const filteredCategories = categories.filter((cat) => {
    const q = searchQuery.toLowerCase()
    const matchCat = cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)
    const matchSkills = cat.skills?.some((s) => s.name.toLowerCase().includes(q))
    return matchCat || matchSkills
  })

  const totalSkillsCount = categories.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0)

  return (
    <div className="space-y-8">
      {/* Header & Metric summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-mono mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Capability Matrix Management</span>
          </div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-foreground">
            Skills & Technical Domains
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            {categories.length} Technical Domains • {totalSkillsCount} Tracked Proficiencies
          </p>
        </div>

        <Button onClick={handleOpenAdd} className="gap-2 shrink-0">
          <Plus className="h-4 w-4" />
          <span>Add Domain Category</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain or skill name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-muted/30 border border-border text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none dark:bg-black/40"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-3xl bg-card/40 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-muted/40 border border-border flex items-center justify-center mx-auto text-muted-foreground">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-foreground">
              No technical domains found
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {searchQuery
                ? 'No skill domains match your filter query.'
                : 'Create your first skill category to populate the capability matrix.'}
            </p>
          </div>
          {!searchQuery && (
            <Button onClick={handleOpenAdd} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              <span>Create First Domain</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleOpenEdit}
            />
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingCategory}
      />
    </div>
  )
}
