-- Drop and recreate the profiles view with SECURITY INVOKER
DROP VIEW IF EXISTS public.profiles;

CREATE VIEW public.profiles
WITH (security_invoker = true)
AS
SELECT 
    t.id,
    t.email,
    t.first_name,
    t.last_name,
    t.phone,
    t.avatar_url,
    'traveler'::TEXT AS role,
    NULL::TEXT AS company_name,
    NULL::TEXT AS company_description,
    t.created_at,
    t.updated_at
FROM public.travelers t
UNION ALL
SELECT 
    a.id,
    a.email,
    a.contact_person_first_name AS first_name,
    a.contact_person_last_name AS last_name,
    a.phone,
    a.avatar_url,
    'agency'::TEXT AS role,
    a.company_name,
    a.company_description,
    a.created_at,
    a.updated_at
FROM public.travel_agencies a;