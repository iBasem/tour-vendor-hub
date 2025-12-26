-- First, update the profiles view to prioritize admin role
DROP VIEW IF EXISTS public.profiles;

CREATE VIEW public.profiles AS
SELECT 
  COALESCE(t.id, ta.id) AS id,
  COALESCE(t.email, ta.email) AS email,
  COALESCE(t.first_name, ta.contact_person_first_name) AS first_name,
  COALESCE(t.last_name, ta.contact_person_last_name) AS last_name,
  COALESCE(t.phone, ta.phone) AS phone,
  COALESCE(t.avatar_url, ta.avatar_url) AS avatar_url,
  ta.company_name,
  ta.company_description,
  COALESCE(t.created_at, ta.created_at) AS created_at,
  COALESCE(t.updated_at, ta.updated_at) AS updated_at,
  -- Prioritize admin role over other roles
  CASE 
    WHEN EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = COALESCE(t.id, ta.id) AND ur.role = 'admin') THEN 'admin'::text
    WHEN ta.id IS NOT NULL THEN 'agency'::text
    ELSE 'traveler'::text
  END AS role
FROM travelers t
FULL OUTER JOIN travel_agencies ta ON t.id = ta.id;