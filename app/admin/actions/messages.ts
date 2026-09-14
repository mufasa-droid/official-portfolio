'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function markMessageRead(id: string, isRead: boolean) {
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
