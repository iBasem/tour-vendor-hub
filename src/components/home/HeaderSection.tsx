
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star, User, LogOut, Menu } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export function HeaderSection() {
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">travelle</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/packages" className="text-gray-700 hover:text-blue-600 font-medium">
              Tours
            </Link>
            <Link to="/destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
            <Link to="/packages" className="text-gray-700 hover:text-blue-600">Deals</Link>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Navigation Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4 mt-8">
                <Link 
                  to="/packages" 
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tours
                </Link>
                <Link 
                  to="/destinations" 
                  className="text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Destinations
                </Link>
                <Link 
                  to="/packages" 
                  className="text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <a 
                  href="#contact" 
                  className="text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Info Items */}
          <span className="text-xs sm:text-sm text-gray-600 hidden xl:block">Shop 2,500 operators</span>
          <div className="items-center gap-1 hidden md:flex">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
            <span className="text-xs sm:text-sm">4.5 stars</span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600 hidden xl:block">24/7 customer support</span>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-1 sm:p-2">
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="text-xs sm:text-sm">
                      {profile?.first_name?.[0] || profile?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">{getUserDisplayName()}</span>
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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm">
                <Link to="/auth" className="flex items-center gap-1 sm:gap-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                <Link to="/auth" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  <span className="hidden sm:inline">Travel Agency</span>
                  <span className="sm:hidden">Agency</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
