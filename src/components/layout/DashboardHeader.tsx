
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "./AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  const { user, profile, signOut } = useAuth();

  const getUserDisplayName = () => {
    if (!profile) return 'User';
    return profile.first_name ? `${profile.first_name} ${profile.last_name}`.trim() : profile.email;
  };

  const getUserRole = () => {
    if (!profile) return 'User';
    switch (profile.role) {
      case 'agency': return 'Travel Agency';
      case 'admin': return 'Admin';
      case 'traveler': return 'Traveler';
      default: return 'User';
    }
  };

  const getUserInitials = () => {
    if (!profile) return 'U';
    if (profile.first_name && profile.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (profile.first_name) return profile.first_name[0].toUpperCase();
    if (profile.email) return profile.email[0].toUpperCase();
    return 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-2 sm:py-3 lg:py-4">
        {/* Mobile menu and search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">
          {/* Mobile hamburger menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden p-1 sm:p-2">
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AppSidebar />
            </SheetContent>
          </Sheet>

          {/* Search bar - responsive */}
          <div className="relative flex-1 max-w-xs sm:max-w-md">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            <Input
              placeholder="Search anything"
              className="pl-7 sm:pl-10 bg-gray-50 border-0 h-8 sm:h-9 lg:h-10 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-1 sm:p-2">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-red-500 text-white text-[8px] sm:text-[10px] lg:text-xs rounded-full flex items-center justify-center">
              1
            </span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-0.5 sm:p-1 lg:p-2">
                <Avatar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="text-[10px] sm:text-xs lg:text-sm">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="text-xs sm:text-sm font-medium">{getUserDisplayName()}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{getUserRole()}</div>
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 sm:w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
