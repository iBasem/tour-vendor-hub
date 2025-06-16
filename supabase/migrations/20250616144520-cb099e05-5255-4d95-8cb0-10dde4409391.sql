
-- Drop existing objects to start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP TABLE IF EXISTS public.profiles;
DROP TYPE IF EXISTS public.user_role;

-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('traveler', 'agency', 'admin');

-- Create travelers table
CREATE TABLE public.travelers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  nationality TEXT,
  preferences JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create travel agencies table
CREATE TABLE public.travel_agencies (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_description TEXT,
  contact_person_first_name TEXT,
  contact_person_last_name TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  license_number TEXT,
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a unified profiles view for easier querying
CREATE VIEW public.profiles AS
SELECT 
  t.id,
  t.email,
  t.first_name,
  t.last_name,
  'traveler'::user_role as role,
  t.phone,
  t.avatar_url,
  NULL::TEXT as company_name,
  NULL::TEXT as company_description,
  t.is_verified,
  t.created_at,
  t.updated_at
FROM public.travelers t
UNION ALL
SELECT 
  ta.id,
  ta.email,
  ta.contact_person_first_name as first_name,
  ta.contact_person_last_name as last_name,
  'agency'::user_role as role,
  ta.phone,
  ta.avatar_url,
  ta.company_name,
  ta.company_description,
  ta.is_verified,
  ta.created_at,
  ta.updated_at
FROM public.travel_agencies ta;

-- Enable Row Level Security
ALTER TABLE public.travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_agencies ENABLE ROW LEVEL SECURITY;

-- RLS policies for travelers
CREATE POLICY "Travelers can view their own profile" ON public.travelers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Travelers can update their own profile" ON public.travelers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Travelers can insert their own profile" ON public.travelers
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS policies for travel agencies
CREATE POLICY "Agencies can view their own profile" ON public.travel_agencies
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Agencies can update their own profile" ON public.travel_agencies
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Agencies can insert their own profile" ON public.travel_agencies
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user is signing up as traveler or agency based on metadata
  IF COALESCE(new.raw_user_meta_data->>'role', 'traveler') = 'traveler' THEN
    INSERT INTO public.travelers (
      id, 
      email, 
      first_name, 
      last_name
    )
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'first_name', ''),
      COALESCE(new.raw_user_meta_data->>'last_name', '')
    );
  ELSIF COALESCE(new.raw_user_meta_data->>'role', 'traveler') = 'agency' THEN
    INSERT INTO public.travel_agencies (
      id, 
      email, 
      company_name,
      contact_person_first_name, 
      contact_person_last_name
    )
    VALUES (
      new.id,
      new.email,
      COALESCE(new.raw_user_meta_data->>'company_name', ''),
      COALESCE(new.raw_user_meta_data->>'first_name', ''),
      COALESCE(new.raw_user_meta_data->>'last_name', '')
    );
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp for travelers
CREATE OR REPLACE FUNCTION public.handle_travelers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to update updated_at timestamp for agencies
CREATE OR REPLACE FUNCTION public.handle_agencies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER handle_travelers_updated_at
  BEFORE UPDATE ON public.travelers
  FOR EACH ROW EXECUTE FUNCTION public.handle_travelers_updated_at();

CREATE TRIGGER handle_agencies_updated_at
  BEFORE UPDATE ON public.travel_agencies
  FOR EACH ROW EXECUTE FUNCTION public.handle_agencies_updated_at();
