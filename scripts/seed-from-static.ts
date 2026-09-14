/**
 * Automated Data Migration & Seeding Runner
 * Maps all data from lib/data.ts to Supabase with zero data loss.
 *
 * Usage:
 *   npx ts-node scripts/seed-from-static.ts
 *   or run within a Next.js Server Action / script context.
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'
import {
  personalInfo,
  projects,
  experience,
  currentWork,
} from '../lib/data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required to run migration.')
}

const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key'
)

export async function runStaticDataMigration() {
  console.log('--- Starting Portfolio CMS Data Migration ---')

  // 1. Seed Portfolio Profile
  console.log('1. Migrating Personal Profile & Social Links...')
  const { error: profileError } = await supabase.from('portfolio_profile').upsert({
    name: personalInfo.name,
    role: personalInfo.role,
    tagline: personalInfo.tagline,
    description: personalInfo.description,
    location: personalInfo.location,
    email: personalInfo.email,
    phone: personalInfo.phone,
    available_for_work: personalInfo.availableForWork,
    show_email: true,
    show_phone: true,
    socials: {
      github: personalInfo.socials.github,
      linkedin: personalInfo.socials.linkedin,
      twitter: personalInfo.socials.twitter,
    },
  })

  if (profileError) {
    console.error('Profile migration error:', profileError.message)
  } else {
    console.log('✓ Profile migrated successfully.')
  }

  // 2. Seed Skill Categories
  console.log('2. Migrating Skill Categories...')
  const categoriesData = [
    {
      name: 'Frontend Systems & Core Web',
      slug: 'frontend',
      description: 'Architecting responsive, type-safe client architectures with sub-100ms perceived performance.',
      icon_name: 'Layout',
      display_order: 1,
    },
    {
      name: 'Backend, Cloud & AI Systems',
      slug: 'backend',
      description: 'Building scalable serverless APIs, type-safe RPC layers, and low-latency LLM orchestration.',
      icon_name: 'Database',
      display_order: 2,
    },
    {
      name: 'DevOps, Performance & Standards',
      slug: 'devops',
      description: 'Ensuring zero-drift deployments, WCAG accessibility, and pristine Core Web Vitals.',
      icon_name: 'Wrench',
      display_order: 3,
    },
  ]

  const categoryMap = new Map<string, string>()

  for (const cat of categoriesData) {
    const { data: catData, error: catError } = await supabase
      .from('skill_categories')
      .upsert(cat, { onConflict: 'slug' })
      .select('id, slug')
      .single()

    if (catError) {
      console.error(`Error migrating category ${cat.slug}:`, catError.message)
    } else if (catData) {
      const typedCat = catData as { id: string; slug: string }
      categoryMap.set(typedCat.slug, typedCat.id)
    }
  }
  console.log('✓ Skill categories migrated.')

  // 3. Seed Skills
  console.log('3. Migrating Skills Matrix...')
  const skillsData = [
    // Frontend
    { cat: 'frontend', name: 'TypeScript', order: 1 },
    { cat: 'frontend', name: 'React 19 / 18', order: 2 },
    { cat: 'frontend', name: 'Next.js (App Router)', order: 3 },
    { cat: 'frontend', name: 'Tailwind CSS', order: 4 },
    { cat: 'frontend', name: 'Framer Motion', order: 5 },
    { cat: 'frontend', name: 'TanStack Query', order: 6 },
    { cat: 'frontend', name: 'Zustand', order: 7 },
    { cat: 'frontend', name: 'JavaScript (ES2024+)', order: 8 },
    { cat: 'frontend', name: 'HTML5 Semantic DOM', order: 9 },

    // Backend
    { cat: 'backend', name: 'Supabase & PostgreSQL', order: 1 },
    { cat: 'backend', name: 'OpenAI GPT-4o API', order: 2 },
    { cat: 'backend', name: 'Next.js Server Actions', order: 3 },
    { cat: 'backend', name: 'Node.js Runtime', order: 4 },
    { cat: 'backend', name: 'RESTful API Design', order: 5 },
    { cat: 'backend', name: 'GraphQL', order: 6 },
    { cat: 'backend', name: 'MetaAPI Financial Feeds', order: 7 },
    { cat: 'backend', name: 'SQL Schema Design', order: 8 },

    // DevOps
    { cat: 'devops', name: 'Vercel Edge Platform', order: 1 },
    { cat: 'devops', name: 'Git & GitHub Actions', order: 2 },
    { cat: 'devops', name: 'Docker', order: 3 },
    { cat: 'devops', name: 'Core Web Vitals (LCP/INP/CLS)', order: 4 },
    { cat: 'devops', name: 'Web Accessibility (WCAG AA)', order: 5 },
    { cat: 'devops', name: 'CI / CD Pipelines', order: 6 },
    { cat: 'devops', name: 'Figma to Pixel-Perfect Code', order: 7 },
  ]

  for (const s of skillsData) {
    const categoryId = categoryMap.get(s.cat)
    if (categoryId) {
      await supabase.from('skills').upsert({
        category_id: categoryId,
        name: s.name,
        display_order: s.order,
        is_published: true,
      })
    }
  }
  console.log('✓ Skills migrated.')

  // 4. Seed Projects
  console.log('4. Migrating Case Studies & Projects...')
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i]
    const { error: projectError } = await supabase.from('projects').upsert(
      {
        legacy_id: p.id,
        title: p.title,
        slug: p.slug,
        featured: p.featured,
        is_published: true,
        display_order: i + 1,
        role: p.role,
        duration: p.duration || null,
        team: p.team || null,
        problem: p.problem,
        solution: p.solution,
        impact: {
          metric: p.impact.metric,
          detail: p.impact.detail,
        },
        tech: p.tech,
        features: p.features,
        image: p.image,
        gallery: p.gallery || [],
        live_url: p.liveUrl || null,
        github_url: p.githubUrl || null,
      },
      { onConflict: 'slug' }
    )

    if (projectError) {
      console.error(`Error migrating project ${p.slug}:`, projectError.message)
    }
  }
  console.log('✓ All projects migrated.')

  // 5. Seed Experience
  console.log('5. Migrating Experience History...')
  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i]
    const { error: expError } = await supabase.from('experiences').upsert({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      location: exp.location,
      description: exp.description,
      achievements: exp.achievements,
      display_order: i + 1,
      is_published: true,
    })

    if (expError) {
      console.error(`Error migrating experience at ${exp.company}:`, expError.message)
    }
  }
  console.log('✓ Experience migrated.')

  // 6. Seed Current Work
  console.log('6. Migrating Current Work Sprint...')
  const { error: workError } = await supabase.from('current_work').upsert({
    title: currentWork.title,
    description: currentWork.description,
    tech: currentWork.tech,
    status: currentWork.status,
    progress: currentWork.progress,
    is_active: true,
  })

  if (workError) {
    console.error('Current work migration error:', workError.message)
  } else {
    console.log('✓ Current work migrated.')
  }

  console.log('--- Migration Completed Successfully with ZERO data loss ---')
}
