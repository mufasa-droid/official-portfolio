'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'
import type { Database } from '@/types/database'

type ProfileInsert = Database['public']['Tables']['portfolio_profile']['Insert']

export async function updateProfile(data: {
  id?: string
  name: string
  role: string
  tagline: string
  description: string
  location: string
  email: string
  phone: string
  available_for_work: boolean
  show_email: boolean
  show_phone: boolean
  socials: {
    github: string
    linkedin: string
    twitter: string
    [key: string]: string
  }
}) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return {
      success: false,
      error: 'Unauthorized. Owner session required.',
    }
  }

  const supabase = createClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client is offline or environment variables are missing.',
    }
  }

  // Basic validation
  if (!data.name.trim() || !data.role.trim() || !data.email.trim()) {
    return {
      success: false,
      error: 'Name, Role, and Email are required fields.',
    }
  }

  const payload: ProfileInsert = {
    name: data.name.trim(),
    role: data.role.trim(),
    tagline: data.tagline.trim(),
    description: data.description.trim(),
    location: data.location.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    available_for_work: data.available_for_work,
    show_email: data.show_email,
    show_phone: data.show_phone,
    socials: data.socials,
  }

  if (data.id && !data.id.startsWith('fallback-')) {
    const { error } = await supabase
      .from('portfolio_profile')
      .update(payload)
      .eq('id', data.id)

    if (error) {
      return { success: false, error: error.message }
    }
  } else {
    // If no row exists yet or using fallback ID, check if one exists or insert new
    const { data: existingRows } = await supabase
      .from('portfolio_profile')
      .select('id')
      .limit(1)

    if (existingRows && existingRows.length > 0) {
      const { error } = await supabase
        .from('portfolio_profile')
        .update(payload)
        .eq('id', existingRows[0].id)

      if (error) return { success: false, error: error.message }
    } else {
      const { error } = await supabase.from('portfolio_profile').insert(payload)
      if (error) return { success: false, error: error.message }
    }
  }

  revalidateTag('profile')
  revalidatePath('/', 'layout')
  revalidatePath('/admin', 'layout')
  revalidatePath('/admin/profile')

  return { success: true }
}
