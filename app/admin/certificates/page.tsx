import { createClient } from '@/lib/supabase/server'
import { certificates as fallbackCertificates } from '@/lib/data'
import { CertificateListView } from '@/components/admin/certificates/certificate-list-view'
import type { Database } from '@/types/database'

type CertificateRow = Database['public']['Tables']['certificates']['Row']

export const metadata = {
  title: 'Certificates Matrix | CMS Control Center',
  description: 'Manage verified developer certifications, licensures, and public carousel showcase.',
}

export default async function AdminCertificatesPage() {
  const supabase = createClient()
  let certificatesList: CertificateRow[] = []

  if (supabase) {
    const { data } = await supabase
      .from('certificates')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && data.length > 0) {
      certificatesList = data
    }
  }

  // Fallback if database is empty or offline
  if (certificatesList.length === 0) {
    certificatesList = fallbackCertificates.map((cert, idx) => ({
      id: cert.id || `fallback-cert-${idx + 1}`,
      title: cert.title,
      issuer: cert.issuer,
      issue_date: cert.issueDate,
      credential_url: cert.credentialUrl || null,
      image_url: cert.imageUrl,
      description: cert.description || null,
      display_order: cert.displayOrder || idx + 1,
      is_visible: cert.isVisible ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  }

  return <CertificateListView initialCertificates={certificatesList} />
}
