
-- Add missing foreign key constraints safely
DO $$
BEGIN
    -- Add foreign key for packages -> travel_agencies (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_packages_agency_id'
    ) THEN
        ALTER TABLE packages 
        ADD CONSTRAINT fk_packages_agency_id 
        FOREIGN KEY (agency_id) REFERENCES travel_agencies(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for package_bookings -> packages (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_package_bookings_package_id'
    ) THEN
        ALTER TABLE package_bookings 
        ADD CONSTRAINT fk_package_bookings_package_id 
        FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for package_bookings -> travelers (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_package_bookings_traveler_id'
    ) THEN
        ALTER TABLE package_bookings 
        ADD CONSTRAINT fk_package_bookings_traveler_id 
        FOREIGN KEY (traveler_id) REFERENCES travelers(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for package_media -> packages (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_package_media_package_id'
    ) THEN
        ALTER TABLE package_media 
        ADD CONSTRAINT fk_package_media_package_id 
        FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE;
    END IF;

    -- Add foreign key for itineraries -> packages (if not exists)
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_itineraries_package_id'
    ) THEN
        ALTER TABLE itineraries 
        ADD CONSTRAINT fk_itineraries_package_id 
        FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add missing indexes for better performance
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_agency_id ON packages(agency_id);
CREATE INDEX IF NOT EXISTS idx_packages_featured ON packages(featured);
CREATE INDEX IF NOT EXISTS idx_package_bookings_traveler_id ON package_bookings(traveler_id);
CREATE INDEX IF NOT EXISTS idx_package_bookings_package_id ON package_bookings(package_id);
CREATE INDEX IF NOT EXISTS idx_package_media_package_id ON package_media(package_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_package_id ON itineraries(package_id);

-- Create or replace user role function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT AS $$
BEGIN
  -- Check if user exists in travelers table
  IF EXISTS (SELECT 1 FROM travelers WHERE id = user_id) THEN
    RETURN 'traveler';
  END IF;
  
  -- Check if user exists in travel_agencies table
  IF EXISTS (SELECT 1 FROM travel_agencies WHERE id = user_id) THEN
    RETURN 'agency';
  END IF;
  
  -- Default to traveler if not found
  RETURN 'traveler';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
