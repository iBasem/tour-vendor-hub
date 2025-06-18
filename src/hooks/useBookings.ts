
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Booking {
  id: string;
  package_id: string;
  traveler_id: string;
  booking_date: string;
  participants: number;
  total_price: number;
  status: string;
  special_requests: string;
  created_at: string;
  updated_at: string;
  packages?: {
    title: string;
    destination: string;
    duration_days: number;
  };
  travelers?: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
}

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('package_bookings')
          .select(`
            *,
            packages (
              title,
              destination,
              duration_days
            ),
            travelers (
              first_name,
              last_name,
              email,
              phone
            )
          `)
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setBookings(data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('package_bookings')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));

      return { success: true };
    } catch (err) {
      console.error('Error updating booking status:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update booking' };
    }
  };

  return { bookings, loading, error, updateBookingStatus };
}
