'use server'

import { z } from 'zod'
import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

const ExperienceSchema = z.object({
  company: z.string().min(2, 'Company name is required.').max(100),
  role: z.string().min(2, 'Role is required.').max(100),
  period: z.string().min(2, 'Timeline period is required (e.g. 2023 - Present).').max(60),
  location: z.string().min(2, 'Location is required (e.g. Remote / Lagos).').max(60),
  description: z.string().min(10, 'Description narrative must be at least 10 characters.'),
  achievements: z.array(z.string()).min(1, 'At least one architectural achievement is required.'),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
})

export interface ExperienceFormState {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
}

/**
 * Server Action: Create career experience entry
 */
export async function createExperience(
  prevState: ExperienceFormState | null,
  formData: FormData
): Promise<ExperienceFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawAchievements = (formData.get('achievements') as string)
    ?.split('\n')
    .map((a) => a.trim())
    .filter(Boolean) || []

  const rawData = {
    company: (formData.get('company') as string)?.trim(),
    role: (formData.get('role') as string)?.trim(),
    period: (formData.get('period') as string)?.trim(),
    location: (formData.get('location') as string)?.trim() || 'Remote',
    description: (formData.get('description') as string)?.trim(),
    achievements: rawAchievements,
    displayOrder: formData.get('displayOrder') || 0,
    isPublished: formData.get('isPublished') !== 'false',
  }

  const parseResult = ExperienceSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please correct the validation errors.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase.from('experiences').insert({
    company: val.company,
    role: val.role,
    period: val.period,
    location: val.location,
    description: val.description,
    achievements: val.achievements,
    display_order: val.displayOrder,
    is_published: val.isPublished,
  })

  if (error) {
    return { success: false, message: error.message || 'Failed to create experience entry.' }
  }

  revalidateTag('experience')
  revalidatePath('/')
  revalidatePath('/admin/experience')
  revalidatePath('/admin')

  return { success: true, message: 'Experience record created successfully!' }
}

/**
 * Server Action: Update career experience entry
 */
export async function updateExperience(
  id: string,
  prevState: ExperienceFormState | null,
  formData: FormData
): Promise<ExperienceFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawAchievements = (formData.get('achievements') as string)
    ?.split('\n')
    .map((a) => a.trim())
    .filter(Boolean) || []

  const rawData = {
    company: (formData.get('company') as string)?.trim(),
    role: (formData.get('role') as string)?.trim(),
    period: (formData.get('period') as string)?.trim(),
    location: (formData.get('location') as string)?.trim() || 'Remote',
    description: (formData.get('description') as string)?.trim(),
    achievements: rawAchievements,
    displayOrder: formData.get('displayOrder') || 0,
    isPublished: formData.get('isPublished') !== 'false',
  }

  const parseResult = ExperienceSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please correct the validation errors.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase
    .from('experiences')
    .update({
      company: val.company,
      role: val.role,
      period: val.period,
      location: val.location,
      description: val.description,
      achievements: val.achievements,
      display_order: val.displayOrder,
      is_published: val.isPublished,
    })
    .eq('id', id)

  if (error) {
    return { success: false, message: error.message || 'Failed to update experience entry.' }
  }

  revalidateTag('experience')
  revalidatePath('/')
  revalidatePath('/admin/experience')
  revalidatePath('/admin')

  return { success: true, message: 'Experience record updated successfully!' }
}

/**
 * Server Action: Toggle Experience Published Status
 */
export async function toggleExperiencePublish(id: string, currentPublished: boolean) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase
    .from('experiences')
    .update({ is_published: !currentPublished })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidateTag('experience')
  revalidatePath('/')
  revalidatePath('/admin/experience')
}

/**
 * Server Action: Delete Experience Entry
 */
export async function deleteExperience(id: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase.from('experiences').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidateTag('experience')
  revalidatePath('/')
  revalidatePath('/admin/experience')
  revalidatePath('/admin')
}
