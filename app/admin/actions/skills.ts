'use server'

import { z } from 'zod'
import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

const CategorySchema = z.object({
  name: z.string().min(2, 'Category name is required.').max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens.'),
  description: z.string().min(5, 'Description is required.').max(300),
  iconName: z.string().default('Layout'),
  displayOrder: z.coerce.number().int().min(0).default(0),
})

export interface SkillsActionState {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
}

/**
 * Server Action: Create skill category
 */
export async function createSkillCategory(
  prevState: SkillsActionState | null,
  formData: FormData
): Promise<SkillsActionState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return { success: false, message: 'Unauthorized.' }

  const rawData = {
    name: (formData.get('name') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim().toLowerCase(),
    description: (formData.get('description') as string)?.trim(),
    iconName: (formData.get('iconName') as string)?.trim() || 'Layout',
    displayOrder: formData.get('displayOrder') || 0,
  }

  const parseResult = CategorySchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Validation error.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) return { success: false, message: 'Database unavailable.' }

  const { error } = await supabase.from('skill_categories').insert({
    name: val.name,
    slug: val.slug,
    description: val.description,
    icon_name: val.iconName,
    display_order: val.displayOrder,
  })

  if (error) return { success: false, message: error.message }

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')

  return { success: true, message: 'Skill domain category created successfully!' }
}

/**
 * Server Action: Update skill category
 */
export async function updateSkillCategory(
  id: string,
  prevState: SkillsActionState | null,
  formData: FormData
): Promise<SkillsActionState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) return { success: false, message: 'Unauthorized.' }

  const rawData = {
    name: (formData.get('name') as string)?.trim(),
    slug: (formData.get('slug') as string)?.trim().toLowerCase(),
    description: (formData.get('description') as string)?.trim(),
    iconName: (formData.get('iconName') as string)?.trim() || 'Layout',
    displayOrder: formData.get('displayOrder') || 0,
  }

  const parseResult = CategorySchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Validation error.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createAdminClient() || createClient()
  if (!supabase) return { success: false, message: 'Database unavailable.' }

  const { error } = await supabase
    .from('skill_categories')
    .update({
      name: val.name,
      slug: val.slug,
      description: val.description,
      icon_name: val.iconName,
      display_order: val.displayOrder,
    })
    .eq('id', id)

  if (error) return { success: false, message: error.message }

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')

  return { success: true, message: 'Category updated successfully!' }
}

/**
 * Server Action: Delete skill category (cascades to child skills)
 */
export async function deleteSkillCategory(id: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase.from('skill_categories').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')
}

/**
 * Server Action: Add a skill item to a category
 */
export async function addSkillToCategory(categoryId: string, skillName: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const trimmed = skillName.trim()
  if (!trimmed) throw new Error('Skill name cannot be empty.')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase.from('skills').insert({
    category_id: categoryId,
    name: trimmed,
    display_order: 0,
    is_published: true,
  })

  if (error) throw new Error(error.message)

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')
}

/**
 * Server Action: Delete a skill item
 */
export async function deleteSkill(skillId: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase.from('skills').delete().eq('id', skillId)
  if (error) throw new Error(error.message)

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')
}

/**
 * Server Action: Toggle skill publication status
 */
export async function toggleSkillPublish(skillId: string, currentPublished: boolean) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) throw new Error('Unauthorized')

  const supabase = createAdminClient() || createClient()
  if (!supabase) throw new Error('Database client unavailable')

  const { error } = await supabase
    .from('skills')
    .update({ is_published: !currentPublished })
    .eq('id', skillId)

  if (error) throw new Error(error.message)

  revalidateTag('skills')
  revalidatePath('/')
  revalidatePath('/admin/skills')
}
