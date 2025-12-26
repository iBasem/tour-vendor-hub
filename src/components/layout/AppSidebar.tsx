import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const menuItems = [
    { title: t('dashboard.overview'), url: "/travel_agency", icon: BarChart3 },
    { title: t('dashboard.packages'), url: "/travel_agency/packages", icon: Package },
    { title: t('dashboard.bookings'), url: "/travel_agency/bookings", icon: BookOpen },
    { title: t('dashboard.calendar'), url: "/travel_agency/calendar", icon: Calendar },
    { title: t('dashboard.travelers'), url: "/travel_agency/travelers", icon: Users },
    { title: t('dashboard.guides'), url: "/travel_agency/guides", icon: UserCheck },
    { title: t('dashboard.gallery'), url: "/travel_agency/gallery", icon: Images },
    { title: t('dashboard.messages'), url: "/travel_agency/messages", icon: MessageSquare },
    { title: t('dashboard.deals'), url: "/travel_agency/deals", icon: Tag },
    { title: t('dashboard.feedback'), url: "/travel_agency/feedback", icon: Star },
  ];

  console.log('AppSidebar - Current path:', location.pathname, 'Sidebar state:', state);

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className="hidden lg:flex border-gray-200" 
      collapsible="icon"
      side={isRTL ? "right" : "left"}
    >
      <SidebarContent className="bg-white">
        {/* Brand Header */}
        <div className="p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-900">Travelle</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="px-3 py-4 flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/travel_agency"}
                      className={({ isActive }) => {
                        console.log(`NavLink ${item.title} - isActive:`, isActive, 'URL:', item.url, 'Current:', location.pathname);
                        return `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm w-full ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${
                          isActive
                            ? `bg-blue-50 text-blue-700 font-semibold shadow-sm ${isRTL ? 'border-r-4 border-blue-600' : 'border-l-4 border-blue-600'}`
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`;
                      }}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
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
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="font-semibold text-blue-900 mb-2 text-sm">
                {t('agencyDashboard.enhanceExperience')}
              </h3>
              <p className="text-xs text-blue-700 mb-3 opacity-90">
                {t('agencyDashboard.unlockPremium')}
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm">
                {t('agencyDashboard.upgradeNow')}
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}