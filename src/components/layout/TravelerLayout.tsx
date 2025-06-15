
import { Outlet } from "react-router-dom";
import { TravelerSidebar } from "./TravelerSidebar";
import { TravelerHeader } from "./TravelerHeader";

const TravelerLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <TravelerSidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full lg:ml-0">
        <TravelerHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TravelerLayout;
