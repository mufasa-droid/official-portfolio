'use client'

import { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExperienceCard } from '@/components/admin/experience/experience-card'
import { ExperienceFormModal } from '@/components/admin/experience/experience-form-modal'
import type { Database } from '@/types/database'

type ExperienceRow = Database['public']['Tables']['experiences']['Row']

interface ExperienceListViewProps {
  initialExperiences: ExperienceRow[]
}

export function ExperienceListView({ initialExperiences }: ExperienceListViewProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold">
            <Briefcase className="h-4 w-4" />
            <span>CAREER TRACK RECORD & PRODUCTION IMPACT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono">
            Experience History ({initialExperiences.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your employment history, client consulting, and verifiable engineering achievements.
          </p>
        </div>

        <Button
          size="default"
          variant="default"
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Career Entry</span>
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {initialExperiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>

      {/* Create Modal */}
      <ExperienceFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
