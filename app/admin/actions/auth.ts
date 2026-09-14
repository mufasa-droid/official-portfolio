'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'Abdulhammedmustapha@gmail.com'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})

export interface AuthActionState {
  success: boolean
  message: string
  errors?: {
    email?: string
    password?: string
  }
}

/**
 * Server Action for single-owner admin authentication
 */
export async function loginAdmin(
  prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const rawData = {
    email: (formData.get('email') as string)?.trim(),
    password: (formData.get('password') as string)?.trim(),
  }

  const parseResult = LoginSchema.safeParse(rawData)
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors
    return {
      success: false,
      message: 'Invalid login details.',
      errors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    }
  }

  const { email, password } = parseResult.data

  // Enforce single-owner email verification before checking credentials
  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return {
      success: false,
      message: 'Unauthorized credentials for this portfolio CMS.',
    }
  }

  const supabase = createClient()
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase credentials are not configured in the server environment.',
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      message: error.message || 'Authentication failed. Please verify your password.',
    }
  }

  return {
    success: true,
    message: 'Authentication successful.',
  }
}

/**
 * Server Action to sign out and clear session cookies
 */
export async function logoutAdmin(): Promise<void> {
  const supabase = createClient()
  if (supabase) {
    await supabase.auth.signOut()
  }
  redirect('/admin/login')
}

/**
 * Helper to retrieve currently authenticated portfolio owner in Server Components
 */
export async function getAuthenticatedAdmin() {
  const supabase = createClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return null
  }

  return user
}
