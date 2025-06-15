
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeaderSection() {
  const { user, profile, signOut } = useAuth();

  const getDashboardLink = () => {
    if (!profile) return '/auth';
    switch (profile.role) {
      case 'admin': return '/admin';
      case 'agency': return '/travel_agency';
      case 'traveler': return '/traveler/dashboard';
      default: return '/auth';
    }
  };

  const getUserDisplayName = () => {
    if (!profile) return 'User';
    return profile.first_name ? `${profile.first_name} ${profile.last_name}`.trim() : profile.email;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">travelle</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/packages" className="text-gray-700 hover:text-blue-600 font-medium">
              Tours
            </Link>
            <Link to="/destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
            <Link to="/packages" className="text-gray-700 hover:text-blue-600">Deals</Link>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden lg:block">Shop 2,500 operators</span>
          <div className="flex items-center gap-1 hidden sm:flex">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm">4.5 stars</span>
          </div>
          <span className="text-sm text-gray-600 hidden lg:block">24/7 customer support</span>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback>
                      {profile?.first_name?.[0] || profile?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{getUserDisplayName()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardLink()}>Dashboard</Link>
                </DropdownMenuItem>
                {profile?.role === 'traveler' && (
                  <DropdownMenuItem asChild>
                    <Link to="/traveler/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/auth" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Travel Agency
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
