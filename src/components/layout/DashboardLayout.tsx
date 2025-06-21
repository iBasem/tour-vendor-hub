
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const DashboardLayout = () => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  console.log('DashboardLayout - User:', user?.id, 'Profile:', profile?.role, 'Path:', location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log('DashboardLayout - No user, redirecting to auth');
    return <Navigate to="/auth?type=agency" replace />;
  }

  if (profile?.role !== 'agency') {
    console.log('DashboardLayout - Wrong role, redirecting');
    const redirectPath = profile?.role === 'admin' ? '/admin' : '/traveler/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader />
          <main className="flex-1 p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
