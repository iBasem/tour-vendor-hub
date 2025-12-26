-- First, drop the foreign key constraint on travel_agencies
ALTER TABLE public.travel_agencies DROP CONSTRAINT IF EXISTS travel_agencies_id_fkey;

-- Insert mock travel agencies (using UUIDs that don't need to exist in auth.users)
INSERT INTO public.travel_agencies (id, email, company_name, contact_person_first_name, contact_person_last_name, phone, city, country, company_description, is_verified, rating, total_reviews)
VALUES 
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'info@desertdreams.com', 'Desert Dreams Tours', 'Ahmed', 'Hassan', '+966-555-1234', 'Riyadh', 'Saudi Arabia', 'Premier desert safari and cultural tour operator specializing in authentic Arabian experiences.', true, 4.8, 245),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'contact@mountainescape.com', 'Mountain Escape Adventures', 'Sarah', 'Mitchell', '+1-555-2345', 'Denver', 'USA', 'Adventure travel specialists offering mountain trekking, camping, and outdoor experiences worldwide.', true, 4.6, 189),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'hello@oceanvoyages.com', 'Ocean Voyages Ltd', 'Maria', 'Santos', '+351-555-3456', 'Lisbon', 'Portugal', 'Luxury cruise and coastal tour experiences across the Mediterranean and Atlantic.', true, 4.9, 312)
ON CONFLICT (id) DO NOTHING;