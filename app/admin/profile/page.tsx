import { createClient } from '@/lib/supabase/server'
import { personalInfo as fallbackInfo } from '@/lib/data'
import { ProfileForm } from '@/components/admin/profile/profile-form'
import type { Database } from '@/types/database'

type ProfileRow = Database['public']['Tables']['portfolio_profile']['Row']

export default async function AdminProfilePage() {
  const supabase = createClient()
  let profile: ProfileRow | null = null

  if (supabase) {
    const { data } = await supabase
      .from('portfolio_profile')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (data) {
      profile = data
    }
  }

  // Fallback defaults
  if (!profile) {
    profile = {
      id: 'fallback-profile-1',
      name: fallbackInfo.name,
      role: fallbackInfo.role,
      tagline: fallbackInfo.tagline,
      description: fallbackInfo.description,
      location: fallbackInfo.location,
      email: fallbackInfo.email,
      phone: fallbackInfo.phone,
      available_for_work: fallbackInfo.availableForWork ?? true,
      show_email: true,
      show_phone: true,
      socials: {
        github: fallbackInfo.socials.github,
        linkedin: fallbackInfo.socials.linkedin,
        twitter: fallbackInfo.socials.twitter,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground">
          Profile & Bio Configuration
        </h1>
        <p className="text-xs sm:text-sm font-mono text-muted-foreground mt-1">
          Manage developer identity, biography, direct contact channels, and social profiles.
        </p>
      </div>

      <ProfileForm initialProfile={profile} />
    </div>
  )
}
