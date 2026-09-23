'use server'

import { z } from 'zod'
import { revalidateTag, revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

const ProjectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.').max(150),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters.')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens (e.g. tradermind-ai-coach).'),
  role: z.string().min(2, 'Role is required (e.g. Full-Stack Architect).').max(100),
  duration: z.string().max(50).optional().nullable(),
  team: z.string().max(50).optional().nullable(),
  problem: z.string().min(10, 'Problem description must be at least 10 characters.'),
  solution: z.string().min(10, 'Solution description must be at least 10 characters.'),
  impactMetric: z.string().min(2, 'Impact metric is required (e.g. 11-feature engine).'),
  impactDetail: z.string().min(10, 'Impact detail explanation is required.'),
  tech: z.array(z.string()).min(1, 'At least one technology is required.'),
  features: z.array(z.string()).min(1, 'At least one feature bullet is required.'),
  image: z.string().url('A valid image URL is required.'),
  gallery: z.array(z.string().url('Gallery items must be valid URLs.')).optional(),
  liveUrl: z.string().url('Live URL must be a valid link.').optional().or(z.literal('')),
  githubUrl: z.string().url('GitHub URL must be a valid link.').optional().or(z.literal('')),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  displayOrder: z.coerce.number().int().min(0).default(0),
})

export interface ProjectFormState {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
  projectId?: string
}

/**
 * Server Action: Create a new project case study
 */
export async function createProject(
  prevState: ProjectFormState | null,
  formData: FormData
): Promise<ProjectFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawTech = (formData.get('tech') as string)?.split(',').map((t) => t.trim()).filter(Boolean) || []
  const rawFeatures = (formData.get('features') as string)?.split('\n').map((f) => f.trim()).filter(Boolean) || []
  const rawGallery = (formData.get('gallery') as string)?.split('\n').map((g) => g.trim()).filter(Boolean) || []

  const rawData = {
    title: (formData.get('title') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim().toLowerCase(),
    role: (formData.get('role') as string)?.trim(),
    duration: (formData.get('duration') as string)?.trim() || null,
    team: (formData.get('team') as string)?.trim() || null,
    problem: (formData.get('problem') as string)?.trim(),
    solution: (formData.get('solution') as string)?.trim(),
    impactMetric: (formData.get('impactMetric') as string)?.trim(),
    impactDetail: (formData.get('impactDetail') as string)?.trim(),
    tech: rawTech,
    features: rawFeatures,
    image: (formData.get('image') as string)?.trim(),
    gallery: rawGallery,
    liveUrl: (formData.get('liveUrl') as string)?.trim() || '',
    githubUrl: (formData.get('githubUrl') as string)?.trim() || '',
    featured: formData.get('featured') === 'true',
    isPublished: formData.get('isPublished') !== 'false',
    displayOrder: formData.get('displayOrder') || 0,
  }

  const parseResult = ProjectSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is not available.' }
  }

  // Check unique slug
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', val.slug)
    .maybeSingle()

  if (existing) {
    return {
      success: false,
      message: 'A case study with this slug already exists. Please choose a unique slug.',
      errors: { slug: ['Slug is already in use.'] },
    }
  }

  const { data: newProject, error } = await supabase
    .from('projects')
    .insert({
      title: val.title,
      slug: val.slug,
      role: val.role,
      duration: val.duration || null,
      team: val.team || null,
      problem: val.problem,
      solution: val.solution,
      impact: {
        metric: val.impactMetric,
        detail: val.impactDetail,
      },
      tech: val.tech,
      features: val.features,
      image: val.image,
      gallery: val.gallery || [],
      live_url: val.liveUrl || null,
      github_url: val.githubUrl || null,
      featured: val.featured,
      is_published: val.isPublished,
      display_order: val.displayOrder,
    })
    .select('id')
    .single()

  if (error || !newProject) {
    return {
      success: false,
      message: error?.message || 'Failed to create case study in database.',
    }
  }

  // Invalidate cache tags & paths
  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath(`/projects/${val.slug}`)
  revalidatePath('/admin')
  revalidatePath('/admin/projects')
  revalidatePath('/sitemap.xml')

  return {
    success: true,
    message: 'Case study created successfully!',
    projectId: newProject.id,
  }
}

/**
 * Server Action: Update an existing project case study
 */
export async function updateProject(
  id: string,
  prevState: ProjectFormState | null,
  formData: FormData
): Promise<ProjectFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawTech = (formData.get('tech') as string)?.split(',').map((t) => t.trim()).filter(Boolean) || []
  const rawFeatures = (formData.get('features') as string)?.split('\n').map((f) => f.trim()).filter(Boolean) || []
  const rawGallery = (formData.get('gallery') as string)?.split('\n').map((g) => g.trim()).filter(Boolean) || []

  const rawData = {
    title: (formData.get('title') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim().toLowerCase(),
    role: (formData.get('role') as string)?.trim(),
    duration: (formData.get('duration') as string)?.trim() || null,
    team: (formData.get('team') as string)?.trim() || null,
    problem: (formData.get('problem') as string)?.trim(),
    solution: (formData.get('solution') as string)?.trim(),
    impactMetric: (formData.get('impactMetric') as string)?.trim(),
    impactDetail: (formData.get('impactDetail') as string)?.trim(),
    tech: rawTech,
    features: rawFeatures,
    image: (formData.get('image') as string)?.trim(),
    gallery: rawGallery,
    liveUrl: (formData.get('liveUrl') as string)?.trim() || '',
    githubUrl: (formData.get('githubUrl') as string)?.trim() || '',
    featured: formData.get('featured') === 'true',
    isPublished: formData.get('isPublished') !== 'false',
    displayOrder: formData.get('displayOrder') || 0,
  }

  const parseResult = ProjectSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is not available.' }
  }

  // Check unique slug on other projects
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', val.slug)
    .neq('id', id)
    .maybeSingle()

  if (existing) {
    return {
      success: false,
      message: 'Another case study already uses this slug.',
      errors: { slug: ['Slug is already in use by another project.'] },
    }
  }

  const { error } = await supabase
    .from('projects')
    .update({
      title: val.title,
      slug: val.slug,
      role: val.role,
      duration: val.duration || null,
      team: val.team || null,
      problem: val.problem,
      solution: val.solution,
      impact: {
        metric: val.impactMetric,
        detail: val.impactDetail,
      },
      tech: val.tech,
      features: val.features,
      image: val.image,
      gallery: val.gallery || [],
      live_url: val.liveUrl || null,
      github_url: val.githubUrl || null,
      featured: val.featured,
      is_published: val.isPublished,
      display_order: val.displayOrder,
    })
    .eq('id', id)

  if (error) {
    return {
      success: false,
      message: error.message || 'Failed to update case study in database.',
    }
  }

  // Invalidate cache tags & paths
  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath(`/projects/${val.slug}`)
  revalidatePath('/admin')
  revalidatePath('/admin/projects')
  revalidatePath('/sitemap.xml')

  return {
    success: true,
    message: 'Case study updated successfully!',
    projectId: id,
  }
}

/**
 * Server Action: Quick Toggle Project Publication Status
 */
export async function toggleProjectPublish(id: string, currentPublished: boolean) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase
    .from('projects')
    .update({ is_published: !currentPublished })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath('/admin/projects')
  revalidatePath('/sitemap.xml')
}

/**
 * Server Action: Quick Toggle Flagship/Featured Status
 */
export async function toggleProjectFeatured(id: string, currentFeatured: boolean) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase
    .from('projects')
    .update({ featured: !currentFeatured })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath('/admin/projects')
}

/**
 * Server Action: Delete a case study
 */
export async function deleteProject(id: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidateTag('projects')
  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/projects')
  revalidatePath('/sitemap.xml')
}
