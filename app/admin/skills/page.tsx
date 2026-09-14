import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SkillsView } from '@/components/admin/skills/skills-view'
import type { Database } from '@/types/database'

type CategoryRow = Database['public']['Tables']['skill_categories']['Row']
type SkillRow = Database['public']['Tables']['skills']['Row']

interface CategoryWithSkills extends CategoryRow {
  skills: SkillRow[]
}

export const metadata: Metadata = {
  title: 'Skills & Domains | Portfolio CMS',
  description: 'Manage developer skills, technical categories, and capability matrix.',
}

const fallbackStaticCategories: CategoryWithSkills[] = [
  {
    id: 'cat-1',
    name: 'Frontend Systems & Core Web',
    slug: 'frontend',
    description:
      'Architecting responsive, type-safe client architectures with sub-100ms perceived performance.',
    icon_name: 'Layout',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skills: [
      'TypeScript',
      'React 19 / 18',
      'Next.js (App Router)',
      'Tailwind CSS',
      'Framer Motion',
      'TanStack Query',
      'Zustand',
      'JavaScript (ES2024+)',
      'HTML5 Semantic DOM',
    ].map((name, idx) => ({
      id: `skill-front-${idx}`,
      category_id: 'cat-1',
      name,
      proficiency: null,
      display_order: idx,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  },
  {
    id: 'cat-2',
    name: 'Backend, Cloud & AI Systems',
    slug: 'backend',
    description:
      'Building scalable serverless APIs, type-safe RPC layers, and low-latency LLM orchestration.',
    icon_name: 'Database',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skills: [
      'Supabase & PostgreSQL',
      'OpenAI GPT-4o API',
      'Next.js Server Actions',
      'Node.js Runtime',
      'RESTful API Design',
      'GraphQL',
      'MetaAPI Financial Feeds',
      'SQL Schema Design',
    ].map((name, idx) => ({
      id: `skill-back-${idx}`,
      category_id: 'cat-2',
      name,
      proficiency: null,
      display_order: idx,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  },
  {
    id: 'cat-3',
    name: 'DevOps, Performance & Standards',
    slug: 'devops',
    description:
      'Ensuring zero-drift deployments, WCAG accessibility, and pristine Core Web Vitals.',
    icon_name: 'Wrench',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skills: [
      'Vercel Edge Platform',
      'Git & GitHub Actions',
      'Docker',
      'Core Web Vitals (LCP/INP/CLS)',
      'Web Accessibility (WCAG AA)',
      'CI / CD Pipelines',
      'Figma to Pixel-Perfect Code',
    ].map((name, idx) => ({
      id: `skill-devops-${idx}`,
      category_id: 'cat-3',
      name,
      proficiency: null,
      display_order: idx,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  },
]

export default async function AdminSkillsPage() {
  let categoriesWithSkills: CategoryWithSkills[] = []

  try {
    const supabase = createClient()
    if (supabase) {
      const { data: categories, error: catError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('display_order', { ascending: true })

      if (!catError && categories && categories.length > 0) {
        const { data: skills, error: skillError } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true })

        const allSkills = !skillError && skills ? skills : []

        categoriesWithSkills = categories.map((cat) => ({
          ...cat,
          skills: allSkills.filter((s) => s.category_id === cat.id),
        }))
      }
    }
  } catch (err) {
    console.error('Error loading skills for CMS:', err)
  }

  if (categoriesWithSkills.length === 0) {
    categoriesWithSkills = fallbackStaticCategories
  }

  return <SkillsView categories={categoriesWithSkills} />
}
