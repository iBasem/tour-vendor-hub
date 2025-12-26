
import { useAuth } from '@/contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'traveler' | 'agency' | 'admin'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute - User:', user?.id, 'Profile:', profile?.role, 'Required:', requiredRole, 'Loading:', loading)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    // Admin has a separate, hidden login page
    if (requiredRole === 'admin') {
      console.log('No user for admin route, redirecting to admin login')
      return <Navigate to="/admin/login" state={{ from: location }} replace />
    }
    const authType = requiredRole === 'agency' ? 'agency' : 'traveler'
    console.log('No user, redirecting to auth with type:', authType)
    return <Navigate to={`/auth?type=${authType}`} state={{ from: location }} replace />
  }

  if (requiredRole && profile?.role !== requiredRole) {
    console.log('Role mismatch. User role:', profile?.role, 'Required role:', requiredRole)
    const redirectPath = profile?.role === 'admin' ? '/admin' : 
                        profile?.role === 'agency' ? '/travel_agency' : 
                        '/traveler/dashboard'
    console.log('Redirecting to:', redirectPath)
    return <Navigate to={redirectPath} replace />
  }

  console.log('Access granted, rendering children')
  return <>{children}</>
}
