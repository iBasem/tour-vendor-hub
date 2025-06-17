
-- Create packages table
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID NOT NULL REFERENCES public.travel_agencies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  destination TEXT NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 1,
  duration_nights INTEGER NOT NULL DEFAULT 0,
  base_price DECIMAL(10,2) NOT NULL,
  max_participants INTEGER DEFAULT 20,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging', 'extreme')),
  category TEXT NOT NULL CHECK (category IN ('adventure', 'cultural', 'relaxation', 'business', 'family', 'romantic', 'solo')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT FALSE,
  available_from DATE,
  available_to DATE,
  inclusions TEXT[],
  exclusions TEXT[],
  requirements TEXT[],
  cancellation_policy TEXT,
  terms_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create itinerary table
CREATE TABLE public.itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activities TEXT[],
  meals_included TEXT[],
  accommodation TEXT,
  transportation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create package media table
CREATE TABLE public.package_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  caption TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create package bookings table (for future use)
CREATE TABLE public.package_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  traveler_id UUID NOT NULL REFERENCES public.travelers(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for package media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('package-media', 'package-media', true);

-- Enable RLS on all tables
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for packages
CREATE POLICY "Agencies can manage their own packages" ON public.packages
  FOR ALL USING (agency_id = auth.uid());

CREATE POLICY "Everyone can view published packages" ON public.packages
  FOR SELECT USING (status = 'published');

-- RLS policies for itineraries
CREATE POLICY "Agencies can manage itineraries for their packages" ON public.itineraries
  FOR ALL USING (
    package_id IN (SELECT id FROM public.packages WHERE agency_id = auth.uid())
  );

CREATE POLICY "Everyone can view itineraries for published packages" ON public.itineraries
  FOR SELECT USING (
    package_id IN (SELECT id FROM public.packages WHERE status = 'published')
  );

-- RLS policies for package media
CREATE POLICY "Agencies can manage media for their packages" ON public.package_media
  FOR ALL USING (
    package_id IN (SELECT id FROM public.packages WHERE agency_id = auth.uid())
  );

CREATE POLICY "Everyone can view media for published packages" ON public.package_media
  FOR SELECT USING (
    package_id IN (SELECT id FROM public.packages WHERE status = 'published')
  );

-- RLS policies for bookings
CREATE POLICY "Travelers can view their own bookings" ON public.package_bookings
  FOR SELECT USING (traveler_id = auth.uid());

CREATE POLICY "Travelers can create their own bookings" ON public.package_bookings
  FOR INSERT WITH CHECK (traveler_id = auth.uid());

CREATE POLICY "Agencies can view bookings for their packages" ON public.package_bookings
  FOR SELECT USING (
    package_id IN (SELECT id FROM public.packages WHERE agency_id = auth.uid())
  );

CREATE POLICY "Agencies can update bookings for their packages" ON public.package_bookings
  FOR UPDATE USING (
    package_id IN (SELECT id FROM public.packages WHERE agency_id = auth.uid())
  );

-- Storage policies for package media
CREATE POLICY "Anyone can view package media" ON storage.objects
  FOR SELECT USING (bucket_id = 'package-media');

CREATE POLICY "Authenticated users can upload package media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'package-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own package media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'package-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own package media" ON storage.objects
  FOR DELETE USING (bucket_id = 'package-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_packages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_packages_updated_at
  BEFORE UPDATE ON public.packages
  FOR EACH ROW EXECUTE FUNCTION public.handle_packages_updated_at();

CREATE TRIGGER handle_bookings_updated_at
  BEFORE UPDATE ON public.package_bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_bookings_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_packages_agency_id ON public.packages(agency_id);
CREATE INDEX idx_packages_status ON public.packages(status);
CREATE INDEX idx_packages_category ON public.packages(category);
CREATE INDEX idx_packages_destination ON public.packages(destination);
CREATE INDEX idx_packages_featured ON public.packages(featured);
CREATE INDEX idx_itineraries_package_id ON public.itineraries(package_id);
CREATE INDEX idx_package_media_package_id ON public.package_media(package_id);
CREATE INDEX idx_package_bookings_package_id ON public.package_bookings(package_id);
CREATE INDEX idx_package_bookings_traveler_id ON public.package_bookings(traveler_id);
