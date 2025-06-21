
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  Calendar,
  Users,
  UserCheck,
  Images,
  MessageSquare,
  Tag,
  Star,
  BookOpen,
  MapPin
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/travel_agency", icon: BarChart3 },
  { title: "Packages", url: "/travel_agency/packages", icon: Package },
  { title: "Bookings", url: "/travel_agency/bookings", icon: BookOpen },
  { title: "Calendar", url: "/travel_agency/calendar", icon: Calendar },
  { title: "Travelers", url: "/travel_agency/travelers", icon: Users },
  { title: "Guides", url: "/travel_agency/guides", icon: UserCheck },
  { title: "Gallery", url: "/travel_agency/gallery", icon: Images },
  { title: "Messages", url: "/travel_agency/messages", icon: MessageSquare },
  { title: "Deals", url: "/travel_agency/deals", icon: Tag },
  { title: "Feedback", url: "/travel_agency/feedback", icon: Star },
];

export function DashboardHeader() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

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
              <div className="flex flex-col h-full bg-white">
                {/* Brand Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">Travelle</span>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="px-3 py-4 flex-1">
                  <div className="space-y-1">
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.url}
                        end={item.url === "/travel_agency"}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm w-full ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>

                {/* Upgrade Section */}
                <div className="mt-auto p-4 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                      Enhance Your Experience!
                    </h3>
                    <p className="text-xs text-blue-700 mb-3 opacity-90">
                      Unlock premium features
                    </p>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
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
