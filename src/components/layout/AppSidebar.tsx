
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
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Packages", url: "/packages", icon: Package },
  { title: "Bookings", url: "/bookings", icon: BookOpen },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Travelers", url: "/travelers", icon: Users },
  { title: "Guides", url: "/guides", icon: UserCheck },
  { title: "Gallery", url: "/gallery", icon: Images },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Deals", url: "/deals", icon: Tag },
  { title: "Feedback", url: "/feedback", icon: Star },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gray-900">Travelle</span>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">
                Enhance Your Travelle Experience!
              </h3>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </SidebarContent>
      
      <SidebarTrigger className="absolute -right-4 top-4 bg-white border border-gray-200 shadow-sm" />
    </Sidebar>
  );
}
