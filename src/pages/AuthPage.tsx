
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AuthPage() {
  const { user, profile, signIn, signUp, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [userType, setUserType] = useState<'traveler' | 'agency'>('traveler')
  
  // Form data
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')

  // Redirect authenticated users to appropriate dashboard
  useEffect(() => {
    if (user && profile && !authLoading) {
      const redirectPath = profile.role === 'admin' ? '/admin' : 
                          profile.role === 'agency' ? '/travel_agency' : 
                          '/traveler/dashboard'
      
      const from = location.state?.from?.pathname || redirectPath
      navigate(from, { replace: true })
    }
  }, [user, profile, authLoading, navigate, location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters')
          return
        }

        const userData = {
          first_name: firstName,
          last_name: lastName,
          role: userType,
          ...(userType === 'agency' && { company_name: companyName })
        }

        const { error } = await signUp(email, password, userData)
        if (error) {
          if (error.message?.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.')
          } else {
            setError(error.message || 'Failed to create account')
          }
        } else {
          setSuccess('Account created successfully! Please check your email for a confirmation link.')
          // Clear form
          setEmail('')
          setPassword('')
          setConfirmPassword('')
          setFirstName('')
          setLastName('')
          setCompanyName('')
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          if (error.message?.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please check your credentials and try again.')
          } else {
            setError(error.message || 'Failed to sign in')
          }
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-600">travelle</span>
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </CardTitle>
            <CardDescription>
              {mode === 'signin' 
                ? 'Sign in to your account to continue' 
                : 'Join thousands of travelers and agencies'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <Tabs value={mode} onValueChange={(value) => {
              setMode(value as 'signin' | 'signup')
              setError('')
              setSuccess('')
            }} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="mt-4">
                <div className="mb-4">
                  <Label htmlFor="userType">Account Type</Label>
                  <Select value={userType} onValueChange={(value: 'traveler' | 'agency') => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traveler">Traveler</SelectItem>
                      <SelectItem value="agency">Travel Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {userType === 'agency' && (
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {mode === 'signup' && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                By continuing, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
