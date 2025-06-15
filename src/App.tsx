
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthPage from "@/pages/AuthPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import TravelerLayout from "./components/layout/TravelerLayout";
import AdminLayout from "./components/layout/AdminLayout";
import Home from "./pages/Home";
import PackagesList from "./pages/PackagesList";
import Destinations from "./pages/Destinations";
import Dashboard from "./pages/travel_agency/Dashboard";
import Packages from "./pages/travel_agency/Packages";
import CreatePackage from "./pages/travel_agency/CreatePackage";
import PackageDetails from "./pages/PackageDetails";
import Bookings from "./pages/travel_agency/Bookings";
import Calendar from "./pages/travel_agency/Calendar";
import Travelers from "./pages/travel_agency/Travelers";
import Guides from "./pages/travel_agency/Guides";
import Gallery from "./pages/travel_agency/Gallery";
import Messages from "./pages/travel_agency/Messages";
import Deals from "./pages/travel_agency/Deals";
import Feedback from "./pages/travel_agency/Feedback";
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
import TravelerDashboard from "./pages/traveler/TravelerDashboard";
import TravelerBookings from "./pages/traveler/TravelerBookings";
import TravelerWishlist from "./pages/traveler/TravelerWishlist";
import TravelerReviews from "./pages/traveler/TravelerReviews";
import TravelerProfile from "./pages/traveler/TravelerProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/packages" element={<PackagesList />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            
            {/* Protected Traveler Routes */}
            <Route path="/traveler/dashboard" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <TravelerLayout />
                </SidebarProvider>
              </ProtectedRoute>
            }>
              <Route index element={<TravelerDashboard />} />
              <Route path="bookings" element={<TravelerBookings />} />
              <Route path="wishlist" element={<TravelerWishlist />} />
              <Route path="reviews" element={<TravelerReviews />} />
              <Route path="profile" element={<TravelerProfile />} />
            </Route>
            
            {/* Protected Travel Agency Routes */}
            <Route path="/travel_agency" element={
              <ProtectedRoute requiredRole="agency">
                <SidebarProvider>
                  <DashboardLayout />
                </SidebarProvider>
              </ProtectedRoute>
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

            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <SidebarProvider>
                  <AdminLayout />
                </SidebarProvider>
              </ProtectedRoute>
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
            
            {/* Redirect legacy routes */}
            <Route path="/dashboard" element={<Navigate to="/travel_agency" replace />} />
            <Route path="/dashboard/*" element={<Navigate to="/travel_agency" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
