'use server'

import { z } from 'zod'
import { revalidateTag, revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedAdmin } from '@/app/admin/actions/auth'

const CertificateSchema = z.object({
  title: z.string().min(2, 'Certificate title is required.').max(150),
  issuer: z.string().min(2, 'Issuer organization is required.').max(100),
  issueDate: z.string().min(2, 'Issue date is required (e.g. 2024 or Oct 2024).').max(50),
  credentialUrl: z
    .string()
    .url('Must be a valid web URL (e.g. https://...).')
    .or(z.literal(''))
    .optional(),
  imageUrl: z.string().min(1, 'Certificate document image is required.'),
  description: z.string().max(1000).optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
})

export interface CertificateFormState {
  success: boolean
  message: string
  errors?: Record<string, string[] | undefined>
}

/**
 * Server Action: Create new certificate entry
 */
export async function createCertificate(
  prevState: CertificateFormState | null,
  formData: FormData
): Promise<CertificateFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawData = {
    title: (formData.get('title') as string)?.trim(),
    issuer: (formData.get('issuer') as string)?.trim(),
    issueDate: (formData.get('issueDate') as string)?.trim(),
    credentialUrl: (formData.get('credentialUrl') as string)?.trim() || '',
    imageUrl: (formData.get('imageUrl') as string)?.trim(),
    description: (formData.get('description') as string)?.trim() || '',
    displayOrder: formData.get('displayOrder') || 0,
    isVisible: formData.get('isVisible') !== 'false',
  }

  const parseResult = CertificateSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please correct the validation errors below.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase.from('certificates').insert({
    title: val.title,
    issuer: val.issuer,
    issue_date: val.issueDate,
    credential_url: val.credentialUrl ? val.credentialUrl : null,
    image_url: val.imageUrl,
    description: val.description ? val.description : null,
    display_order: val.displayOrder,
    is_visible: val.isVisible,
  })

  if (error) {
    return { success: false, message: error.message || 'Failed to create certificate.' }
  }

  revalidateTag('certificates')
  revalidatePath('/')
  revalidatePath('/admin/certificates')
  revalidatePath('/admin')

  return { success: true, message: 'Certificate created successfully!' }
}

/**
 * Server Action: Update existing certificate entry
 */
export async function updateCertificate(
  id: string,
  prevState: CertificateFormState | null,
  formData: FormData
): Promise<CertificateFormState> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const rawData = {
    title: (formData.get('title') as string)?.trim(),
    issuer: (formData.get('issuer') as string)?.trim(),
    issueDate: (formData.get('issueDate') as string)?.trim(),
    credentialUrl: (formData.get('credentialUrl') as string)?.trim() || '',
    imageUrl: (formData.get('imageUrl') as string)?.trim(),
    description: (formData.get('description') as string)?.trim() || '',
    displayOrder: formData.get('displayOrder') || 0,
    isVisible: formData.get('isVisible') !== 'false',
  }

  const parseResult = CertificateSchema.safeParse(rawData)
  if (!parseResult.success) {
    return {
      success: false,
      message: 'Please correct the validation errors below.',
      errors: parseResult.error.flatten().fieldErrors,
    }
  }

  const val = parseResult.data
  const supabase = createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase
    .from('certificates')
    .update({
      title: val.title,
      issuer: val.issuer,
      issue_date: val.issueDate,
      credential_url: val.credentialUrl ? val.credentialUrl : null,
      image_url: val.imageUrl,
      description: val.description ? val.description : null,
      display_order: val.displayOrder,
      is_visible: val.isVisible,
    })
    .eq('id', id)

  if (error) {
    return { success: false, message: error.message || 'Failed to update certificate.' }
  }

  revalidateTag('certificates')
  revalidatePath('/')
  revalidatePath('/admin/certificates')
  revalidatePath('/admin')

  return { success: true, message: 'Certificate updated successfully!' }
}

/**
 * Server Action: Delete certificate
 */
export async function deleteCertificate(id: string): Promise<{ success: boolean; message: string }> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const supabase = createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase.from('certificates').delete().eq('id', id)
  if (error) {
    return { success: false, message: error.message || 'Failed to delete certificate.' }
  }

  revalidateTag('certificates')
  revalidatePath('/')
  revalidatePath('/admin/certificates')
  revalidatePath('/admin')

  return { success: true, message: 'Certificate deleted successfully.' }
}

/**
 * Server Action: Toggle visibility (Published Live vs Draft)
 */
export async function toggleCertificateVisibility(
  id: string,
  currentStatus: boolean
): Promise<{ success: boolean; message: string }> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const supabase = createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  const { error } = await supabase
    .from('certificates')
    .update({ is_visible: !currentStatus })
    .eq('id', id)

  if (error) {
    return { success: false, message: error.message || 'Failed to toggle visibility.' }
  }

  revalidateTag('certificates')
  revalidatePath('/')
  revalidatePath('/admin/certificates')
  revalidatePath('/admin')

  return { success: true, message: `Certificate is now ${!currentStatus ? 'Visible' : 'Hidden'}.` }
}

/**
 * Server Action: Reorder certificates
 */
export async function reorderCertificates(
  items: { id: string; display_order: number }[]
): Promise<{ success: boolean; message: string }> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    return { success: false, message: 'Unauthorized. Admin session required.' }
  }

  const supabase = createClient()
  if (!supabase) {
    return { success: false, message: 'Database client is unavailable.' }
  }

  for (const item of items) {
    await supabase
      .from('certificates')
      .update({ display_order: item.display_order })
      .eq('id', item.id)
  }

  revalidateTag('certificates')
  revalidatePath('/')
  revalidatePath('/admin/certificates')
  revalidatePath('/admin')

  return { success: true, message: 'Certificates reordered successfully.' }
}
