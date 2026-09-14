import { createClient } from '@/lib/supabase/server'
import { experience as fallbackExperience } from '@/lib/data'
import { ExperienceListView } from '@/components/admin/experience/experience-list-view'
import type { Database } from '@/types/database'

type ExperienceRow = Database['public']['Tables']['experiences']['Row']

export default async function AdminExperiencePage() {
  const supabase = createClient()
  let experiencesList: ExperienceRow[] = []

  if (supabase) {
    const { data } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && data.length > 0) {
      experiencesList = data
    }
  }

  // Fallback if database is empty or offline
  if (experiencesList.length === 0) {
    experiencesList = fallbackExperience.map((exp, idx) => ({
      id: `fallback-exp-${idx + 1}`,
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      achievements: exp.achievements,
      display_order: idx + 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  }

  return <ExperienceListView initialExperiences={experiencesList} />
}
