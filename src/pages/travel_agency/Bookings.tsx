
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Calendar, User, Phone, Mail } from "lucide-react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

export default function Bookings() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm sm:text-base">Error loading bookings: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  // Sample bookings for demonstration - in a real app this would come from Supabase
  const sampleBookings = stats.totalBookings > 0 ? [
    {
      id: "BK001",
      traveler: "John Smith",
      package: "Romantic Paris Getaway",
      date: "2024-03-15",
      status: "Confirmed",
      amount: "$2,499",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: "BK002", 
      traveler: "Sarah Johnson",
      package: "Tokyo Adventure",
      date: "2024-04-20",
      status: "Pending",
      amount: "$3,299",
      email: "sarah.j@email.com", 
      phone: "+1 (555) 987-6543"
    },
    {
      id: "BK003",
      traveler: "Mike Wilson", 
      package: "Bali Relaxation",
      date: "2024-05-10",
      status: "Confirmed",
      amount: "$1,899",
      email: "mike.wilson@email.com",
      phone: "+1 (555) 456-7890"
    }
  ].slice(0, stats.totalBookings) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const pendingBookings = sampleBookings.filter(b => b.status === "Pending").length;
  const confirmedBookings = sampleBookings.filter(b => b.status === "Confirmed").length;

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">Track and manage customer bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-yellow-600">{pendingBookings}</p>
              </div>
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-600">{confirmedBookings}</p>
              </div>
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-600">
                  ${new Intl.NumberFormat('en-US', { 
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0 
                  }).format(stats.totalRevenue)}
                </p>
              </div>
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="p-3 sm:p-4 lg:p-6">
          <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
          {sampleBookings.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {sampleBookings.map((booking) => (
                <div key={booking.id} className="flex flex-col gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    {/* Left section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm sm:text-base text-gray-900">{booking.traveler}</p>
                          <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                            {booking.id}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{booking.package}</p>
                      <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right section */}
                    <div className="flex flex-col sm:items-end gap-2 sm:gap-3">
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-1">
                        <div className="text-right">
                          <p className="font-bold text-base sm:text-lg text-gray-900">{booking.amount}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{booking.date}</p>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} border font-medium text-xs`}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 text-xs px-2 py-1">
                          <Eye className="w-3 h-3" />
                          <span className="sr-only sm:not-sr-only sm:ml-1">View</span>
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50 text-xs px-2 py-1">
                          <MessageSquare className="w-3 h-3" />
                          <span className="sr-only sm:not-sr-only sm:ml-1">Message</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile contact info */}
                  <div className="sm:hidden flex flex-col gap-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="calendar"
              title="No bookings yet"
              description="Bookings will appear here once customers start booking your packages"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
