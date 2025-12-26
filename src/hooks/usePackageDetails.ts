
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PackageDetails {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  duration_nights: number;
  base_price: number;
  max_participants: number;
  difficulty_level: string;
  category: string;
  inclusions: string[];
  exclusions: string[];
  requirements: string[];
  cancellation_policy: string;
  terms_conditions: string;
  featured: boolean;
  status: string;
  agency_id: string;
  available_from: string;
  available_to: string;
  created_at: string;
  updated_at: string;
  package_media?: Array<{
    id: string;
    file_path: string;
    file_name: string;
    media_type: string;
    caption: string;
    is_primary: boolean;
    display_order: number;
  }>;
  itineraries?: Array<{
    id: string;
    day_number: number;
    title: string;
    description: string;
    activities: string[];
    meals_included: string[];
    accommodation: string;
    transportation: string;
  }>;
  travel_agencies?: {
    company_name: string;
    contact_person_first_name: string;
    contact_person_last_name: string;
    email: string;
    phone: string;
  };
}

export function usePackageDetails(packageId: string | undefined) {
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!packageId) {
      setLoading(false);
      setError('No package ID provided');
      return;
    }

    const fetchPackageDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('packages')
          .select(`
            *,
            package_media (
              id,
              file_path,
              file_name,
              media_type,
              caption,
              is_primary,
              display_order
            ),
            itineraries (
              id,
              day_number,
              title,
              description,
              activities,
              meals_included,
              accommodation,
              transportation
            ),
            travel_agencies (
              company_name,
              contact_person_first_name,
              contact_person_last_name,
              email,
              phone
            )
          `)
          .eq('id', packageId)
          .eq('status', 'published')
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        setPackageDetails(data);
      } catch (err) {
        console.error('Error fetching package details:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch package details');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [packageId]);

  return { packageDetails, loading, error };
}
