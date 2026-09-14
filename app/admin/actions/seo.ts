'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'
import type { Database } from '@/types/database'

type SiteSettingsInsert = Database['public']['Tables']['site_settings']['Insert']

export async function updateSiteSettings(data: {
  id?: string
  site_title: string
  site_description: string
  keywords: string[]
  canonical_url: string
  og_image_url: string | null
  admin_email: string
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

  if (!data.site_title.trim() || !data.site_description.trim()) {
    return {
      success: false,
      error: 'Site Title and Meta Description are required.',
    }
  }

  const payload: SiteSettingsInsert = {
    site_title: data.site_title.trim(),
    site_description: data.site_description.trim(),
    keywords: data.keywords,
    canonical_url: data.canonical_url.trim(),
    og_image_url: data.og_image_url?.trim() || null,
    admin_email: data.admin_email.trim(),
  }

  if (data.id && !data.id.startsWith('fallback-')) {
    const { error } = await supabase
      .from('site_settings')
      .update(payload)
      .eq('id', data.id)

    if (error) return { success: false, error: error.message }
  } else {
    const { data: existingRows } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)

    if (existingRows && existingRows.length > 0) {
      const { error } = await supabase
        .from('site_settings')
        .update(payload)
        .eq('id', existingRows[0].id)

      if (error) return { success: false, error: error.message }
    } else {
      const { error } = await supabase.from('site_settings').insert(payload)
      if (error) return { success: false, error: error.message }
    }
  }

  revalidateTag('settings')
  revalidatePath('/', 'layout')
  revalidatePath('/sitemap.xml')
  revalidatePath('/robots.txt')
  revalidatePath('/admin/seo')

  return { success: true }
}
