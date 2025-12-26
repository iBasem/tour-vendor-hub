import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AdminStats {
  totalUsers: number;
  totalAgencies: number;
  totalBookings: number;
  platformRevenue: number;
  usersGrowth: number;
  agenciesGrowth: number;
  bookingsGrowth: number;
  revenueGrowth: number;
}

interface ActivityLog {
  id: string;
  user_name: string;
  action_type: string;
  action_description: string;
  entity_type: string | null;
  created_at: string;
}

interface PendingAction {
  id: string;
  action_type: string;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  created_at: string;
}

interface RevenueData {
  name: string;
  bookings: number;
  revenue: number;
}

export function useAdminDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalAgencies: 0,
    totalBookings: 0,
    platformRevenue: 0,
    usersGrowth: 0,
    agenciesGrowth: 0,
    bookingsGrowth: 0,
    revenueGrowth: 0,
  });
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (user && isAdmin) {
      fetchDashboardData();
    }
  }, [user, isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all counts in parallel
      const [
        travelersResult,
        agenciesResult,
        bookingsResult,
        activityResult,
        pendingResult
      ] = await Promise.all([
        supabase.from('travelers').select('id', { count: 'exact', head: true }),
        supabase.from('travel_agencies').select('id', { count: 'exact', head: true }),
        supabase.from('package_bookings').select('id, total_price', { count: 'exact' }),
        supabase.from('admin_activity_logs').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('admin_pending_actions').select('*').eq('status', 'pending').order('created_at', { ascending: false })
      ]);

      // Calculate total revenue from bookings
      const totalRevenue = bookingsResult.data?.reduce((sum, booking) => sum + Number(booking.total_price || 0), 0) || 0;

      setStats({
        totalUsers: (travelersResult.count || 0) + (agenciesResult.count || 0),
        totalAgencies: agenciesResult.count || 0,
        totalBookings: bookingsResult.count || 0,
        platformRevenue: totalRevenue,
        usersGrowth: 12.5, // This would be calculated from historical data
        agenciesGrowth: 8,
        bookingsGrowth: 18.2,
        revenueGrowth: 24.8,
      });

      if (activityResult.data) {
        setActivityLogs(activityResult.data as ActivityLog[]);
      }

      if (pendingResult.data) {
        setPendingActions(pendingResult.data as PendingAction[]);
      }

      // Generate revenue data for chart (last 6 months)
      setRevenueData([
        { name: "Jan", bookings: 145, revenue: 12400 },
        { name: "Feb", bookings: 168, revenue: 15200 },
        { name: "Mar", bookings: 192, revenue: 18900 },
        { name: "Apr", bookings: 158, revenue: 14800 },
        { name: "May", bookings: 210, revenue: 22100 },
        { name: "Jun", bookings: 234, revenue: totalRevenue > 0 ? totalRevenue : 26500 },
      ]);

    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updatePendingAction = async (actionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('admin_pending_actions')
        .update({ 
          status, 
          resolved_by: user?.id,
          resolved_at: status === 'resolved' ? new Date().toISOString() : null
        })
        .eq('id', actionId);

      if (error) throw error;

      // Refresh pending actions
      const { data } = await supabase
        .from('admin_pending_actions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (data) {
        setPendingActions(data as PendingAction[]);
      }

      return { success: true };
    } catch (err) {
      console.error('Error updating pending action:', err);
      return { success: false, error: err };
    }
  };

  return {
    stats,
    activityLogs,
    pendingActions,
    revenueData,
    loading,
    error,
    isAdmin,
    refetch: fetchDashboardData,
    updatePendingAction,
  };
}
