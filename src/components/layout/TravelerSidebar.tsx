
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  BookOpen,
  Heart,
  Star,
  User,
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

export function TravelerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { title: t('dashboard.overview'), url: "/traveler/dashboard", icon: BarChart3 },
    { title: t('travelerDashboard.myBookings'), url: "/traveler/dashboard/bookings", icon: BookOpen },
    { title: t('travelerDashboard.myWishlist'), url: "/traveler/dashboard/wishlist", icon: Heart },
    { title: t('travelerDashboard.myReviews'), url: "/traveler/dashboard/reviews", icon: Star },
    { title: t('travelerDashboard.profile'), url: "/traveler/dashboard/profile", icon: User },
  ];

  const isActive = (path: string) => {
    if (path === "/traveler/dashboard") return location.pathname === "/traveler/dashboard";
    return location.pathname.startsWith(path);
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-blue-600">travelle</span>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/traveler/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">
                {t('travelerDashboard.planNextAdventure')}
              </h3>
              <NavLink to="/" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors block text-center">
                {t('travelerDashboard.browseTours')}
              </NavLink>
            </div>
          </div>
        )}
      </SidebarContent>
      
      <SidebarTrigger className="absolute -right-4 top-4 bg-white border border-gray-200 shadow-sm" />
    </Sidebar>
  );
}
