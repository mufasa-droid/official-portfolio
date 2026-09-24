import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { projects as fallbackProjects } from '@/lib/data'
import { ProjectForm } from '@/components/admin/projects/project-form'
import { isUUID } from '@/lib/utils'
import type { Database } from '@/types/database'

type ProjectRow = Database['public']['Tables']['projects']['Row']

interface EditProjectPageProps {
  params: { id: string }
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const supabase = createClient()
  let project: ProjectRow | null = null

  if (supabase) {
    let query = supabase.from('projects').select('*')
    if (isUUID(params.id)) {
      query = query.eq('id', params.id)
    } else {
      query = query.or(`legacy_id.eq.${params.id},slug.eq.${params.id}`)
    }

    const { data } = await query.maybeSingle()

    if (data) {
      project = data
    }
  }

  // Fallback if not found in database or database unconfigured (checking fallback array by id or legacy id)
  if (!project) {
    const fallbackMatch = fallbackProjects.find(
      (p) => p.id === params.id || p.slug === params.id
    )

    if (fallbackMatch) {
      project = {
        id: fallbackMatch.id,
        legacy_id: fallbackMatch.id,
        title: fallbackMatch.title,
        slug: fallbackMatch.slug,
        featured: fallbackMatch.featured,
        is_published: true,
        display_order: 1,
        role: fallbackMatch.role,
        duration: fallbackMatch.duration || null,
        team: fallbackMatch.team || null,
        problem: fallbackMatch.problem,
        solution: fallbackMatch.solution,
        impact: {
          metric: fallbackMatch.impact.metric,
          detail: fallbackMatch.impact.detail,
        },
        tech: fallbackMatch.tech,
        features: fallbackMatch.features,
        image: fallbackMatch.image,
        gallery: fallbackMatch.gallery || [],
        live_url: fallbackMatch.liveUrl || null,
        github_url: fallbackMatch.githubUrl || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  }

  if (!project) {
    notFound()
  }

  return <ProjectForm initialData={project} isEditing />
}
