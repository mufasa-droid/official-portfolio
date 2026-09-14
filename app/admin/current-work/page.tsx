import { createClient } from '@/lib/supabase/server'
import { currentWork as fallbackWork } from '@/lib/data'
import { CurrentWorkForm } from '@/components/admin/current-work/current-work-form'
import type { Database } from '@/types/database'

type CurrentWorkRow = Database['public']['Tables']['current_work']['Row']

export default async function AdminCurrentWorkPage() {
  const supabase = createClient()
  let work: CurrentWorkRow | null = null

  if (supabase) {
    const { data } = await supabase
      .from('current_work')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (data) {
      work = data
    }
  }

  // Fallback defaults
  if (!work) {
    work = {
      id: 'fallback-current-work-1',
      title: fallbackWork.title,
      description: fallbackWork.description,
      tech: fallbackWork.tech,
      status: fallbackWork.status,
      progress: fallbackWork.progress,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          Current Work & Sprint Focus
        </h1>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
          Manage the public live status indicator, active technical initiatives, and progress meters.
        </p>
      </div>

      <CurrentWorkForm initialWork={work} />
    </div>
  )
}
