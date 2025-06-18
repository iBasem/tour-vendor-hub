
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/travel_agency") return location.pathname === "/travel_agency";
    return location.pathname.startsWith(path);
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="w-64 lg:w-64" collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-200">
        {/* Brand Header */}
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">Travelle</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="px-2 sm:px-3 lg:px-4 py-3 sm:py-4 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5 sm:space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/travel_agency"}
                      className={({ isActive }) =>
                        `flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 lg:py-3 rounded-xl transition-all duration-200 text-xs sm:text-sm lg:text-base ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade Section - Only show when not collapsed */}
        {!isCollapsed && (
          <div className="mt-auto p-2 sm:p-3 lg:p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                Enhance Your Experience!
              </h3>
              <p className="text-[10px] sm:text-xs lg:text-sm text-blue-700 mb-2 sm:mb-3 opacity-90">
                Unlock premium features
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs lg:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
      
      <SidebarTrigger className="absolute -right-3 sm:-right-4 top-3 sm:top-4 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow w-6 h-6 sm:w-8 sm:h-8" />
    </Sidebar>
  );
}
