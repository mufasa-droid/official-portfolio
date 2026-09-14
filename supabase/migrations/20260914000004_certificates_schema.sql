-- ==============================================================================
-- Portfolio CMS — Certificates Schema & Single-Owner RLS
-- Author: Abdulhammed Mustapha
-- Date: 2026-09-14
-- ==============================================================================

CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT NOT NULL,
    credential_url TEXT,
    image_url TEXT NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_visible_order ON certificates(is_visible, display_order ASC);

CREATE TRIGGER set_certificates_updated_at
BEFORE UPDATE ON certificates
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access (only visible certificates)
CREATE POLICY "Public certificates are readable by everyone" 
  ON certificates FOR SELECT 
  USING (is_visible = true);

-- 2. Owner-Only Full Access (CRUD for Abdulhammedmustapha@gmail.com)
CREATE POLICY "Owner full access to certificates" 
  ON certificates FOR ALL 
  TO authenticated 
  USING (is_portfolio_owner()) 
  WITH CHECK (is_portfolio_owner());
