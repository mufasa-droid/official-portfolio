'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

export async function markMessageRead(id: string, isRead: boolean) {
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

  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: isRead })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin', 'layout')
  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteMessage(id: string) {
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

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin', 'layout')
  revalidatePath('/admin/messages')
  return { success: true }
}
