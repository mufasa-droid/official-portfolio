export interface SocialLinks {
  github: string
  linkedin: string
  twitter: string
}

export interface PersonalInfo {
  name: string
  role: string
  tagline: string
  description: string
  location: string
  email: string
  phone: string
  availableForWork: boolean
  socials: SocialLinks
}

export interface SkillItem {
  name: string
  level: number
  category?: string
  icon?: string
}

export interface SkillCategories {
  frontend: SkillItem[]
  backend: SkillItem[]
  tools: SkillItem[]
}

export interface ProjectImpact {
  metric: string
  detail: string
}

export interface Project {
  id: string
  title: string
  slug: string
  featured: boolean
  problem: string
  solution: string
  role: string
  duration?: string
  team?: string
  impact: ProjectImpact
  tech: string[]
  features: string[]
  image: string
  gallery?: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  description: string
  achievements: string[]
}

export interface TestimonialItem {
  name: string
  role: string
  company: string
  image: string
  text: string
}

export interface CurrentWork {
  title: string
  description: string
  tech: string[]
  status: string
  progress: number
}
