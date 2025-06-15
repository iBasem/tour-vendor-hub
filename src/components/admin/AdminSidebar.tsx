
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Users,
  Building2,
  Package,
  BookOpen,
  DollarSign,
  Settings,
  MapPin,
  FileText,
  TrendingUp
} from "lucide-react";

const adminMenuItems = [
  { title: "Dashboard", url: "/admin", icon: BarChart3 },
  { title: "Travelers", url: "/admin/travelers", icon: Users },
  { title: "Travel Agencies", url: "/admin/agencies", icon: Building2 },
  { title: "Tour Packages", url: "/admin/packages", icon: Package },
  { title: "Bookings", url: "/admin/bookings", icon: BookOpen },
  { title: "Financials", url: "/admin/financials", icon: DollarSign },
  { title: "Reports", url: "/admin/reports", icon: TrendingUp },
  { title: "Content", url: "/admin/content", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Brand Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Travelle</span>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-3 sm:px-4 py-4">
        <nav className="space-y-1">
          {adminMenuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              end={item.url === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 sm:py-3 rounded-xl transition-all duration-200 text-sm sm:text-base ${
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
        </nav>
      </div>

      {/* Upgrade Section */}
      <div className="mt-auto p-3 sm:p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">
            System Analytics
          </h3>
          <p className="text-xs sm:text-sm text-blue-700 mb-3 opacity-90">
            Monitor platform performance
          </p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
