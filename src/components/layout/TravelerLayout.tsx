import { Outlet } from "react-router-dom";
import { TravelerSidebar } from "./TravelerSidebar";
import { TravelerHeader } from "./TravelerHeader";
import { useTranslation } from "react-i18next";
import { SidebarProvider } from "@/components/ui/sidebar";

const TravelerLayout = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <TravelerSidebar />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col w-full">
          <TravelerHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TravelerLayout;
