
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Packages from "./pages/Packages";
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

// Create QueryClient outside component to avoid recreating on each render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="packages" element={<Packages />} />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
