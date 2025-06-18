
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full lg:ml-0 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
