'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'
import type { Database } from '@/types/database'

type CurrentWorkInsert = Database['public']['Tables']['current_work']['Insert']

export async function updateCurrentWork(data: {
  id?: string
  title: string
  description: string
  tech: string[]
  status: string
  progress: number
  is_active: boolean
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

  if (!data.title.trim() || !data.description.trim()) {
    return {
      success: false,
      error: 'Title and Description are required fields.',
    }
  }

  const payload: CurrentWorkInsert = {
    title: data.title.trim(),
    description: data.description.trim(),
    tech: data.tech,
    status: data.status.trim() || 'In Progress',
    progress: Math.min(100, Math.max(0, data.progress)),
    is_active: data.is_active,
  }

  if (data.id && !data.id.startsWith('fallback-')) {
    const { error } = await supabase
      .from('current_work')
      .update(payload)
      .eq('id', data.id)

    if (error) return { success: false, error: error.message }
  } else {
    const { data: existingRows } = await supabase
      .from('current_work')
      .select('id')
      .limit(1)

    if (existingRows && existingRows.length > 0) {
      const { error } = await supabase
        .from('current_work')
        .update(payload)
        .eq('id', existingRows[0].id)

      if (error) return { success: false, error: error.message }
    } else {
      const { error } = await supabase.from('current_work').insert(payload)
      if (error) return { success: false, error: error.message }
    }
  }

  revalidateTag('current-work')
  revalidatePath('/', 'layout')
  revalidatePath('/admin', 'layout')
  revalidatePath('/admin/current-work')

  return { success: true }
}
