-- ==============================================================================
-- Portfolio CMS — Migration 0003: Public Inbound Contact Message RLS Policy
-- Author: Abdulhammed Mustapha
-- Date: 2026-09-14
-- ==============================================================================

-- 1. Enable RLS on contact_messages if not already enabled
ALTER TABLE IF EXISTS contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Allow anonymous and authenticated public visitors to INSERT contact inquiries
CREATE POLICY "Allow public anonymous insert to contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 3. Maintain strict single-owner access for reading, updating, and deleting inquiries
-- Only Abdulhammedmustapha@gmail.com can view or manage inbound contact inquiries
DROP POLICY IF EXISTS "Owner full access to contact_messages" ON contact_messages;

CREATE POLICY "Owner full access to contact_messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (is_portfolio_owner())
  WITH CHECK (is_portfolio_owner());
