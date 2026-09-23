-- ==============================================================================
-- Portfolio CMS — Fix Case Sensitivity in is_portfolio_owner and Storage RLS
-- Author: Abdulhammed Mustapha
-- Date: 2026-09-23
-- ==============================================================================

-- 1. Fix case sensitivity in is_portfolio_owner() helper function
CREATE OR REPLACE FUNCTION is_portfolio_owner()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.role() = 'authenticated' AND
    LOWER(auth.jwt() ->> 'email') = LOWER('Abdulhammedmustapha@gmail.com')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update Storage RLS policies on portfolio-assets to be case-insensitive
DROP POLICY IF EXISTS "Owner Insert Access on portfolio-assets" ON storage.objects;
CREATE POLICY "Owner Insert Access on portfolio-assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'portfolio-assets' AND
    LOWER(auth.jwt() ->> 'email') = LOWER('Abdulhammedmustapha@gmail.com')
);

DROP POLICY IF EXISTS "Owner Update Access on portfolio-assets" ON storage.objects;
CREATE POLICY "Owner Update Access on portfolio-assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'portfolio-assets' AND
    LOWER(auth.jwt() ->> 'email') = LOWER('Abdulhammedmustapha@gmail.com')
);

DROP POLICY IF EXISTS "Owner Delete Access on portfolio-assets" ON storage.objects;
CREATE POLICY "Owner Delete Access on portfolio-assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'portfolio-assets' AND
    LOWER(auth.jwt() ->> 'email') = LOWER('Abdulhammedmustapha@gmail.com')
);
