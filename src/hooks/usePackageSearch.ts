
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Package = Database['public']['Tables']['packages']['Row'];
type PackageMedia = Database['public']['Tables']['package_media']['Row'];

export interface PackageWithMedia extends Package {
  package_media?: PackageMedia[];
}

interface SearchFilters {
  destination?: string;
  category?: string;
  maxPrice?: number;
  minPrice?: number;
  duration?: string;
  difficulty?: string;
}

export function usePackageSearch() {
  const [packages, setPackages] = useState<PackageWithMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  const fetchPublishedPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('packages')
        .select(`
          *,
          package_media (*)
        `)
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

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

  const filteredPackages = useMemo(() => {
    let filtered = packages;

    // Text search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pkg =>
        pkg.title.toLowerCase().includes(term) ||
        pkg.description?.toLowerCase().includes(term) ||
        pkg.destination.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.destination) {
      filtered = filtered.filter(pkg =>
        pkg.destination.toLowerCase().includes(filters.destination!.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(pkg => pkg.category === filters.category);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.base_price <= filters.maxPrice!);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(pkg => pkg.base_price >= filters.minPrice!);
    }

    if (filters.duration) {
      const days = parseInt(filters.duration);
      filtered = filtered.filter(pkg => pkg.duration_days === days);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(pkg => pkg.difficulty_level === filters.difficulty);
    }

    return filtered;
  }, [packages, searchTerm, filters]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  useEffect(() => {
    fetchPublishedPackages();
  }, []);

  return {
    packages: filteredPackages,
    allPackages: packages,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchPublishedPackages
  };
}
