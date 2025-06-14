
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
