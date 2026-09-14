import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import {
  personalInfo as fallbackPersonalInfo,
  projects as fallbackProjects,
  experience as fallbackExperience,
  currentWork as fallbackCurrentWork,
} from '@/lib/data'
import type {
  PersonalInfo,
  Project,
  ExperienceItem,
  CurrentWork,
} from '@/types/portfolio'

export interface SkillCategoryWithSkills {
  id: string
  name: string
  slug: string
  description: string
  iconName: string
  skills: string[]
}

const fallbackSkillCategories: SkillCategoryWithSkills[] = [
  {
    id: 'cat-1',
    name: 'Frontend Systems & Core Web',
    slug: 'frontend',
    description: 'Architecting responsive, type-safe client architectures with sub-100ms perceived performance.',
    iconName: 'Layout',
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
    ],
  },
  {
    id: 'cat-2',
    name: 'Backend, Cloud & AI Systems',
    slug: 'backend',
    description: 'Building scalable serverless APIs, type-safe RPC layers, and low-latency LLM orchestration.',
    iconName: 'Database',
    skills: [
      'Supabase & PostgreSQL',
      'OpenAI GPT-4o API',
      'Next.js Server Actions',
      'Node.js Runtime',
      'RESTful API Design',
      'GraphQL',
      'MetaAPI Financial Feeds',
      'SQL Schema Design',
    ],
  },
  {
    id: 'cat-3',
    name: 'DevOps, Performance & Standards',
    slug: 'devops',
    description: 'Ensuring zero-drift deployments, WCAG accessibility, and pristine Core Web Vitals.',
    iconName: 'Wrench',
    skills: [
      'Vercel Edge Platform',
      'Git & GitHub Actions',
      'Docker',
      'Core Web Vitals (LCP/INP/CLS)',
      'Web Accessibility (WCAG AA)',
      'CI / CD Pipelines',
      'Figma to Pixel-Perfect Code',
    ],
  },
]

/**
 * Fetch personal profile data from Supabase with fallback to lib/data.ts
 */
export const getPortfolioProfile = unstable_cache(
  async (): Promise<PersonalInfo> => {
    try {
      const supabase = createClient()
      if (!supabase) return fallbackPersonalInfo

      const { data, error } = await supabase
        .from('portfolio_profile')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error || !data) return fallbackPersonalInfo

      return {
        name: data.name,
        role: data.role,
        tagline: data.tagline,
        description: data.description,
        location: data.location,
        email: data.email,
        phone: data.phone,
        availableForWork: data.available_for_work,
        socials: {
          github: data.socials?.github || fallbackPersonalInfo.socials.github,
          linkedin: data.socials?.linkedin || fallbackPersonalInfo.socials.linkedin,
          twitter: data.socials?.twitter || fallbackPersonalInfo.socials.twitter,
        },
      }
    } catch {
      return fallbackPersonalInfo
    }
  },
  ['portfolio-profile'],
  { tags: ['profile'], revalidate: 86400 }
)

/**
 * Fetch all published projects from Supabase with fallback to lib/data.ts
 */
export const getPublishedProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const supabase = createClient()
      if (!supabase) return fallbackProjects

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (error || !data || data.length === 0) return fallbackProjects

      return data.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        featured: row.featured,
        role: row.role,
        duration: row.duration || undefined,
        team: row.team || undefined,
        problem: row.problem,
        solution: row.solution,
        impact: {
          metric: row.impact?.metric || '',
          detail: row.impact?.detail || '',
        },
        tech: row.tech || [],
        features: row.features || [],
        image: row.image,
        gallery: row.gallery && row.gallery.length > 0 ? row.gallery : undefined,
        liveUrl: row.live_url || undefined,
        githubUrl: row.github_url || undefined,
      }))
    } catch {
      return fallbackProjects
    }
  },
  ['portfolio-projects'],
  { tags: ['projects'], revalidate: 86400 }
)

/**
 * Fetch a single published project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getPublishedProjects()
  return projects.find((p) => p.slug === slug) || null
}

/**
 * Fetch skill categories and their grouped skills
 */
export const getSkillCategoriesWithSkills = unstable_cache(
  async (): Promise<SkillCategoryWithSkills[]> => {
    try {
      const supabase = createClient()
      if (!supabase) return fallbackSkillCategories

      const { data: categories, error: catError } = await supabase
        .from('skill_categories')
        .select('*')
        .order('display_order', { ascending: true })

      if (catError || !categories || categories.length === 0) {
        return fallbackSkillCategories
      }

      const { data: skills, error: skillError } = await supabase
        .from('skills')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (skillError || !skills) {
        return fallbackSkillCategories
      }

      return categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        iconName: cat.icon_name,
        skills: skills
          .filter((s) => s.category_id === cat.id)
          .map((s) => s.name),
      }))
    } catch {
      return fallbackSkillCategories
    }
  },
  ['portfolio-skills'],
  { tags: ['skills'], revalidate: 86400 }
)

/**
 * Fetch experience history from Supabase with fallback to lib/data.ts
 */
export const getExperiences = unstable_cache(
  async (): Promise<ExperienceItem[]> => {
    try {
      const supabase = createClient()
      if (!supabase) return fallbackExperience

      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (error || !data || data.length === 0) return fallbackExperience

      return data.map((row) => ({
        company: row.company,
        role: row.role,
        period: row.period,
        location: row.location,
        description: row.description,
        achievements: row.achievements || [],
      }))
    } catch {
      return fallbackExperience
    }
  },
  ['portfolio-experience'],
  { tags: ['experience'], revalidate: 86400 }
)

/**
 * Fetch current work sprint status from Supabase with fallback to lib/data.ts
 */
export const getCurrentWork = unstable_cache(
  async (): Promise<CurrentWork> => {
    try {
      const supabase = createClient()
      if (!supabase) return fallbackCurrentWork

      const { data, error } = await supabase
        .from('current_work')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .maybeSingle()

      if (error || !data) return fallbackCurrentWork

      return {
        title: data.title,
        description: data.description,
        tech: data.tech || [],
        status: data.status,
        progress: data.progress,
      }
    } catch {
      return fallbackCurrentWork
    }
  },
  ['portfolio-current-work'],
  { tags: ['current-work'], revalidate: 86400 }
)
