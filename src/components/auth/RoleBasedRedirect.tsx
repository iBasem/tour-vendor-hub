
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function RoleBasedRedirect() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (user && profile) {
      // Get the intended destination from state or default based on role
      const from = location.state?.from?.pathname;
      
      let defaultPath = '/';
      if (profile.role === 'admin') {
        defaultPath = '/admin';
      } else if (profile.role === 'agency') {
        defaultPath = '/travel_agency';
      } else if (profile.role === 'traveler') {
        defaultPath = '/traveler/dashboard';
      }

      // If there's a specific destination and it's appropriate for the user's role, go there
      if (from) {
        if (profile.role === 'admin' && from.startsWith('/admin')) {
          navigate(from, { replace: true });
        } else if (profile.role === 'agency' && (from.startsWith('/travel_agency') || from.startsWith('/packages'))) {
          navigate(from, { replace: true });
        } else if (profile.role === 'traveler' && (from.startsWith('/traveler') || from === '/')) {
          navigate(from, { replace: true });
        } else {
          // Redirect to default if intended destination doesn't match role
          navigate(defaultPath, { replace: true });
        }
      } else {
        navigate(defaultPath, { replace: true });
      }
    }
  }, [user, profile, loading, navigate, location]);

  return null;
}
