import { createClient } from '@/lib/supabase/server'
import { SeoForm } from '@/components/admin/seo/seo-form'
import type { Database } from '@/types/database'

type SiteSettingsRow = Database['public']['Tables']['site_settings']['Row']

export default async function AdminSeoPage() {
  const supabase = createClient()
  let settings: SiteSettingsRow | null = null

  if (supabase) {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (data) {
      settings = data
    }
  }

  // Fallback defaults
  if (!settings) {
    settings = {
      id: 'fallback-settings-1',
      admin_email: 'Abdulhammedmustapha@gmail.com',
      site_title: 'Abdulhammed Mustapha — Senior Frontend Developer & Architect',
      site_description:
        'Senior Frontend Developer specializing in React, Next.js, and TypeScript architectures.',
      keywords: [
        'Abdulhammed Mustapha',
        'Senior Frontend Developer',
        'React',
        'Next.js',
        'TypeScript',
      ],
      og_image_url: null,
      canonical_url: 'https://abdulhammedmustapha.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          SEO & Global Configuration
        </h1>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
          Configure search engine indexing, social card tags, canonical domains, and administrative alerts.
        </p>
      </div>

      <SeoForm initialSettings={settings} />
    </div>
  )
}
