
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface BookingRequest {
  packageId: string;
  participants: number;
  bookingDate: string;
  specialRequests?: string;
}

export function usePackageBooking() {
  const [loading, setLoading] = useState(false);
  const { user, profile } = useAuth();

  const createBookingRequest = async (bookingData: BookingRequest) => {
    if (!user || !profile || profile.role !== 'traveler') {
      toast.error('You must be logged in as a traveler to make bookings');
      return { success: false, error: 'Authentication required' };
    }

    setLoading(true);
    try {
      // First get the package details to calculate total price
      const { data: packageData, error: packageError } = await supabase
        .from('packages')
        .select('base_price')
        .eq('id', bookingData.packageId)
        .single();

      if (packageError) {
        throw new Error('Package not found');
      }

      const totalPrice = packageData.base_price * bookingData.participants;

      const { data, error } = await supabase
        .from('package_bookings')
        .insert({
          package_id: bookingData.packageId,
          traveler_id: user.id,
          participants: bookingData.participants,
          booking_date: bookingData.bookingDate,
          total_price: totalPrice,
          special_requests: bookingData.specialRequests || null,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast.success('Booking request submitted successfully! The travel agency will review your request.');
      return { success: true, data };
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    createBookingRequest,
    loading
  };
}
