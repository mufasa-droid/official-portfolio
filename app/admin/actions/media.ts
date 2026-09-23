'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

const BUCKET_NAME = 'portfolio-assets'
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

export interface MediaFileItem {
  name: string
  id: string
  created_at: string
  updated_at: string
  last_accessed_at: string
  metadata: {
    size: number
    mimetype: string
    [key: string]: unknown
  }
  publicUrl: string
}

export async function uploadMedia(formData: FormData) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return {
      success: false,
      error: 'Unauthorized. Owner session required.',
    }
  }

  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client is offline or environment variables are missing.',
    }
  }

  const file = formData.get('file') as File | null
  if (!file) {
    return { success: false, error: 'No file was provided for upload.' }
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      success: false,
      error: `Unsupported file format (${file.type}). Allowed formats: PNG, JPEG, WebP, GIF, SVG.`,
    }
  }

  // Validate File Size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)}MB).`,
    }
  }

  // Sanitize filename
  const cleanName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-')
  const uniqueFilename = `${Date.now()}-${cleanName}`

  // Convert File to Buffer for Supabase Storage
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(uniqueFilename, buffer, {
      contentType: file.type,
      cacheControl: '31536000', // 1 year cache
      upsert: false,
    })

  if (uploadError) {
    return { success: false, error: uploadError.message }
  }

  // Resolve public CDN URL
  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(uniqueFilename)

  revalidatePath('/admin/media')

  return {
    success: true,
    url: publicUrlData.publicUrl,
    name: uniqueFilename,
  }
}

export async function deleteMedia(filename: string) {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return {
      success: false,
      error: 'Unauthorized. Owner session required.',
    }
  }

  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase client is offline or environment variables are missing.',
    }
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filename])
  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/media')
  return { success: true }
}

export async function listMedia(): Promise<{
  success: boolean
  files: MediaFileItem[]
  error?: string
}> {
  const supabase = createAdminClient() || createClient()
  if (!supabase) {
    return {
      success: false,
      files: [],
      error: 'Supabase client is offline.',
    }
  }

  const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  if (error) {
    return { success: false, files: [], error: error.message }
  }

  const files: MediaFileItem[] = (data || [])
    // Filter out .emptyFolderPlaceholder if created by Supabase
    .filter((f) => f.name && !f.name.startsWith('.'))
    .map((f) => {
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(f.name)
      return {
        ...f,
        publicUrl: urlData.publicUrl,
      } as MediaFileItem
    })

  return { success: true, files }
}
