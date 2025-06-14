
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/layout/DashboardLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Packages from "./pages/Packages";
import CreatePackage from "./pages/CreatePackage";
import PackageDetails from "./pages/PackageDetails";
import Bookings from "./pages/Bookings";
import Calendar from "./pages/Calendar";
import Travelers from "./pages/Travelers";
import Guides from "./pages/Guides";
import Gallery from "./pages/Gallery";
import Messages from "./pages/Messages";
import Deals from "./pages/Deals";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TravelerManagement from "./pages/admin/TravelerManagement";
import AgencyManagement from "./pages/admin/AgencyManagement";
import AdminPackageManagement from "./pages/admin/AdminPackageManagement";
import AdminBookingManagement from "./pages/admin/AdminBookingManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import ReportsPage from "./pages/admin/ReportsPage";
import ContentManagement from "./pages/admin/ContentManagement";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Homepage */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <SidebarProvider>
              <DashboardLayout />
            </SidebarProvider>
          }>
            <Route index element={<Dashboard />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/create" element={<CreatePackage />} />
            <Route path="packages/:id" element={<PackageDetails />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="travelers" element={<Travelers />} />
            <Route path="guides" element={<Guides />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="messages" element={<Messages />} />
            <Route path="deals" element={<Deals />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <SidebarProvider>
              <AdminLayout />
            </SidebarProvider>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="travelers" element={<TravelerManagement />} />
            <Route path="agencies" element={<AgencyManagement />} />
            <Route path="packages" element={<AdminPackageManagement />} />
            <Route path="bookings" element={<AdminBookingManagement />} />
            <Route path="financials" element={<FinancialManagement />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
