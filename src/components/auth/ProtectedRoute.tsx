
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    // Determine redirect URL based on required role
    const authType = requiredRole === 'agency' ? 'agency' : 'traveler'
    return <Navigate to={`/auth?type=${authType}`} state={{ from: location }} replace />
  }

  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = profile?.role === 'admin' ? '/admin' : 
                        profile?.role === 'agency' ? '/travel_agency' : 
                        '/traveler/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return <>{children}</>
}
