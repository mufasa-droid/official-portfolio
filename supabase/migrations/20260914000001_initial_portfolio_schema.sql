-- ==============================================================================
-- Portfolio CMS — Initial PostgreSQL Schema & Single-Owner RLS Architecture
-- Author: Abdulhammed Mustapha
-- Date: 2026-09-14
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Security helper function for Single-Owner authentication check
CREATE OR REPLACE FUNCTION is_portfolio_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.role() = 'authenticated' AND
    auth.jwt() ->> 'email' = 'Abdulhammedmustapha@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Automatic updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- TABLE 1: portfolio_profile
-- Public developer biography, contact details, and social links
-- ==============================================================================
CREATE TABLE IF NOT EXISTS portfolio_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Abdulhammed Mustapha',
    role TEXT NOT NULL DEFAULT 'Senior Frontend Developer & Architect',
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
    email TEXT NOT NULL DEFAULT 'Abdulhammedmustapha@gmail.com',
    phone TEXT NOT NULL DEFAULT '+234 915 7531 916',
    available_for_work BOOLEAN NOT NULL DEFAULT true,
    show_email BOOLEAN NOT NULL DEFAULT true,
    show_phone BOOLEAN NOT NULL DEFAULT true,
    socials JSONB NOT NULL DEFAULT '{"github": "https://github.com/mufasa-droid", "linkedin": "https://linkedin.com/in/abdulhammed-mustapha-37454634b", "twitter": "https://twitter.com/yourusername"}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_portfolio_profile_updated_at
BEFORE UPDATE ON portfolio_profile
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 2: projects
-- Case studies, architectural highlights, tech stacks, and metrics
-- ==============================================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legacy_id TEXT UNIQUE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    role TEXT NOT NULL,
    duration TEXT,
    team TEXT,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    impact JSONB NOT NULL DEFAULT '{"metric": "", "detail": ""}'::jsonb,
    tech TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    image TEXT NOT NULL,
    gallery TEXT[] NOT NULL DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published_order ON projects(is_published, display_order ASC);

CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 3: skill_categories
-- High-level capability domains (Frontend, Backend/Cloud/AI, DevOps/Standards)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Layout',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_skill_categories_updated_at
BEFORE UPDATE ON skill_categories
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 4: skills
-- Individual technologies grouped by category_id
-- ==============================================================================
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_category_order ON skills(category_id, display_order ASC);

CREATE TRIGGER set_skills_updated_at
BEFORE UPDATE ON skills
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 5: experiences
-- Career history, companies, timelines, and verifiable achievements
-- ==============================================================================
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    period TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Remote',
    description TEXT NOT NULL,
    achievements TEXT[] NOT NULL DEFAULT '{}',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experiences_published_order ON experiences(is_published, display_order ASC);

CREATE TRIGGER set_experiences_updated_at
BEFORE UPDATE ON experiences
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 6: current_work
-- Active sprint focus, current engineering challenges, and status progress
-- ==============================================================================
CREATE TABLE IF NOT EXISTS current_work (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'In Progress',
    progress INTEGER NOT NULL DEFAULT 75 CHECK (progress >= 0 AND progress <= 100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_current_work_updated_at
BEFORE UPDATE ON current_work
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- TABLE 7: contact_messages
-- Inbound inquiries submitted through the contact Server Action
-- ==============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created ON contact_messages(created_at DESC);

-- ==============================================================================
-- TABLE 8: site_settings
-- Private administrative settings, SEO overrides, and metadata
-- ==============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_email TEXT NOT NULL DEFAULT 'Abdulhammedmustapha@gmail.com',
    site_title TEXT NOT NULL DEFAULT 'Abdulhammed Mustapha — Senior Frontend Developer & Architect',
    site_description TEXT NOT NULL DEFAULT 'Senior Frontend Developer specializing in React, Next.js, and TypeScript architectures.',
    keywords TEXT[] NOT NULL DEFAULT '{"Abdulhammed Mustapha", "Senior Frontend Developer", "React", "Next.js", "TypeScript"}',
    og_image_url TEXT,
    canonical_url TEXT NOT NULL DEFAULT 'https://abdulhammedmustapha.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all 8 tables
ALTER TABLE portfolio_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE current_work ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 1. Public Read Access (Anonymous visitors can ONLY read published public data)
-- ------------------------------------------------------------------------------
CREATE POLICY "Public profiles are readable by everyone" 
  ON portfolio_profile FOR SELECT 
  USING (true);

CREATE POLICY "Public projects are readable by everyone" 
  ON projects FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Public skill categories are readable by everyone" 
  ON skill_categories FOR SELECT 
  USING (true);

CREATE POLICY "Public skills are readable by everyone" 
  ON skills FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Public experiences are readable by everyone" 
  ON experiences FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Public current work is readable by everyone" 
  ON current_work FOR SELECT 
  USING (is_active = true);

-- Note: contact_messages and site_settings have NO public read policies.

-- ------------------------------------------------------------------------------
-- 2. Owner-Only Full Access (CRUD for Abdulhammedmustapha@gmail.com ONLY)
-- ------------------------------------------------------------------------------
CREATE POLICY "Owner full access to portfolio_profile" 
  ON portfolio_profile FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to projects" 
  ON projects FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to skill_categories" 
  ON skill_categories FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to skills" 
  ON skills FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to experiences" 
  ON experiences FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to current_work" 
  ON current_work FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to contact_messages" 
  ON contact_messages FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());

CREATE POLICY "Owner full access to site_settings" 
  ON site_settings FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());
