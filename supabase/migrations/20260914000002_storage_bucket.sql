-- ==============================================================================
-- Portfolio CMS — Supabase Storage Bucket & RLS Policies
-- Bucket: portfolio-assets
-- Author: Abdulhammed Mustapha
-- Date: 2026-09-14
-- ==============================================================================

-- 1. Create the portfolio-assets storage bucket if it does not exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-assets',
    'portfolio-assets',
    true,
    5242880, -- 5MB limit
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Storage RLS Policy: Public read access for portfolio assets
CREATE POLICY "Public Read Access on portfolio-assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

-- 3. Storage RLS Policy: Single Owner upload access (Abdulhammedmustapha@gmail.com)
CREATE POLICY "Owner Insert Access on portfolio-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'portfolio-assets' AND
    auth.jwt() ->> 'email' = 'Abdulhammedmustapha@gmail.com'
);

-- 4. Storage RLS Policy: Single Owner update access
CREATE POLICY "Owner Update Access on portfolio-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'portfolio-assets' AND
    auth.jwt() ->> 'email' = 'Abdulhammedmustapha@gmail.com'
);

-- 5. Storage RLS Policy: Single Owner delete access
CREATE POLICY "Owner Delete Access on portfolio-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'portfolio-assets' AND
    auth.jwt() ->> 'email' = 'Abdulhammedmustapha@gmail.com'
);
