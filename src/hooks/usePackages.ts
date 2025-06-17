
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/integrations/supabase/types';

type Package = Database['public']['Tables']['packages']['Row'];
type PackageInsert = Database['public']['Tables']['packages']['Insert'];
type PackageUpdate = Database['public']['Tables']['packages']['Update'];
type Itinerary = Database['public']['Tables']['itineraries']['Row'];
type ItineraryInsert = Database['public']['Tables']['itineraries']['Insert'];
type PackageMedia = Database['public']['Tables']['package_media']['Row'];

export interface PackageWithDetails extends Package {
  itineraries?: Itinerary[];
  media?: PackageMedia[];
}

export function usePackages() {
  const [packages, setPackages] = useState<PackageWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('packages')
        .select(`
          *,
          itineraries (*),
          package_media (*)
        `)
        .order('created_at', { ascending: false });

      // If user is an agency, show only their packages
      // If user is a traveler, show only published packages
      if (profile?.role === 'agency') {
        query = query.eq('agency_id', user?.id);
      } else {
        query = query.eq('status', 'published');
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching packages:', fetchError);
        setError(fetchError.message);
        return;
      }

      setPackages(data || []);
    } catch (err) {
      console.error('Exception fetching packages:', err);
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (packageData: any) => {
    if (!user || profile?.role !== 'agency') {
      throw new Error('Only agencies can create packages');
    }

    try {
      // Extract package basic info
      const packageInsert: PackageInsert = {
        agency_id: user.id,
        title: packageData.basicInfo.title || '',
        description: packageData.basicInfo.description || '',
        destination: packageData.basicInfo.destination || '',
        duration_days: parseInt(packageData.basicInfo.duration?.split(' ')[0]) || 1,
        duration_nights: parseInt(packageData.basicInfo.duration?.split(' ')[0]) - 1 || 0,
        base_price: parseFloat(packageData.pricing.basePrice) || 0,
        max_participants: parseInt(packageData.basicInfo.maxGroupSize) || 20,
        difficulty_level: packageData.basicInfo.difficulty || 'easy',
        category: packageData.basicInfo.packageType || 'cultural',
        status: packageData.isPublished ? 'published' : 'draft',
        inclusions: packageData.pricing.inclusions ? Object.keys(packageData.pricing.inclusions).filter(key => packageData.pricing.inclusions[key]) : [],
        exclusions: packageData.pricing.exclusions ? Object.keys(packageData.pricing.exclusions).filter(key => packageData.pricing.exclusions[key]) : []
      };

      const { data: packageResult, error: packageError } = await supabase
        .from('packages')
        .insert(packageInsert)
        .select()
        .single();

      if (packageError) {
        console.error('Package creation error:', packageError);
        throw new Error(packageError.message);
      }

      // Create itineraries
      if (packageData.itinerary && packageData.itinerary.length > 0) {
        const itineraries: ItineraryInsert[] = packageData.itinerary.map((day: any, index: number) => ({
          package_id: packageResult.id,
          day_number: index + 1,
          title: day.title || `Day ${index + 1}`,
          description: day.description || '',
          activities: day.activities?.filter((a: string) => a.trim()) || [],
          meals_included: day.meals || [],
          accommodation: day.accommodation || '',
          transportation: day.transportation || ''
        }));

        const { error: itineraryError } = await supabase
          .from('itineraries')
          .insert(itineraries);

        if (itineraryError) {
          console.error('Itinerary creation error:', itineraryError);
          // Don't throw here, package was created successfully
        }
      }

      await fetchPackages();
      return packageResult;
    } catch (err) {
      console.error('Exception creating package:', err);
      throw err;
    }
  };

  const updatePackage = async (packageId: string, updates: PackageUpdate) => {
    if (!user || profile?.role !== 'agency') {
      throw new Error('Only agencies can update packages');
    }

    try {
      const { data, error } = await supabase
        .from('packages')
        .update(updates)
        .eq('id', packageId)
        .eq('agency_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Package update error:', error);
        throw new Error(error.message);
      }

      await fetchPackages();
      return data;
    } catch (err) {
      console.error('Exception updating package:', err);
      throw err;
    }
  };

  const deletePackage = async (packageId: string) => {
    if (!user || profile?.role !== 'agency') {
      throw new Error('Only agencies can delete packages');
    }

    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', packageId)
        .eq('agency_id', user.id);

      if (error) {
        console.error('Package deletion error:', error);
        throw new Error(error.message);
      }

      await fetchPackages();
    } catch (err) {
      console.error('Exception deleting package:', err);
      throw err;
    }
  };

  const uploadPackageMedia = async (packageId: string, file: File) => {
    if (!user) {
      throw new Error('User must be authenticated to upload media');
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${packageId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('package-media')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Media upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('package-media')
        .getPublicUrl(filePath);

      // Save media record to database
      const { data, error: dbError } = await supabase
        .from('package_media')
        .insert({
          package_id: packageId,
          media_type: file.type.startsWith('image/') ? 'image' : 'video',
          file_path: publicUrl,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single();

      if (dbError) {
        console.error('Media database error:', dbError);
        throw new Error(dbError.message);
      }

      return data;
    } catch (err) {
      console.error('Exception uploading media:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      fetchPackages();
    }
  }, [user, profile]);

  return {
    packages,
    loading,
    error,
    createPackage,
    updatePackage,
    deletePackage,
    uploadPackageMedia,
    refetch: fetchPackages
  };
}
