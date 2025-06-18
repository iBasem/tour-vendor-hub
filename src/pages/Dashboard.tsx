
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, TrendingUp, TrendingDown, Users, DollarSign, MapPin, MessageSquare, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";

export default function Dashboard() {
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
        <p className="text-red-600">Error loading dashboard: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  const revenueData = [
    { name: "Sun", value: Math.floor(stats.totalRevenue * 0.1) },
    { name: "Mon", value: Math.floor(stats.totalRevenue * 0.15) },
    { name: "Tue", value: Math.floor(stats.totalRevenue * 0.12) },
    { name: "Wed", value: Math.floor(stats.totalRevenue * 0.18) },
    { name: "Thu", value: Math.floor(stats.totalRevenue * 0.22) },
    { name: "Fri", value: Math.floor(stats.totalRevenue * 0.16) },
    { name: "Sat", value: Math.floor(stats.totalRevenue * 0.17) },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateGrowth = (current: number, category: string) => {
    // Simple growth calculation based on current values
    const growthRates = {
      bookings: current > 10 ? 2.5 : current > 5 ? 1.2 : 0,
      customers: current > 5 ? -1.4 : current > 2 ? 0.8 : 0,
      revenue: current > 1000 ? 3.7 : current > 500 ? 1.5 : 0
    };
    return growthRates[category as keyof typeof growthRates] || 0;
  };

  const bookingGrowth = calculateGrowth(stats.totalBookings, 'bookings');
  const customerGrowth = calculateGrowth(stats.totalCustomers, 'customers');
  const revenueGrowth = calculateGrowth(stats.totalRevenue, 'revenue');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <select className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
            <option>July 2024</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total Booking</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-2xl font-bold">{stats.totalBookings}</div>
            <div className={`flex items-center text-xs sm:text-sm ${bookingGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {bookingGrowth >= 0 ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
              {bookingGrowth > 0 ? '+' : ''}{bookingGrowth}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total New Customers</CardTitle>
            <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-2xl font-bold">{stats.totalCustomers}</div>
            <div className={`flex items-center text-xs sm:text-sm ${customerGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {customerGrowth >= 0 ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
              {customerGrowth > 0 ? '+' : ''}{customerGrowth}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total Earnings</CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="text-lg sm:text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className={`flex items-center text-xs sm:text-sm ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {revenueGrowth >= 0 ? <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> : <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
              {revenueGrowth > 0 ? '+' : ''}{revenueGrowth}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Overview */}
        <Card className="xl:col-span-2 bg-white border-gray-200">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <CardTitle className="text-base sm:text-lg">Revenue Overview</CardTitle>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600 text-xs sm:text-sm w-full sm:w-auto">
                Weekly
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            {stats.totalRevenue > 0 ? (
              <div className="h-48 sm:h-64 lg:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-48 sm:h-64 lg:h-80 flex items-center justify-center">
                <EmptyState
                  icon="chart-bar"
                  title="No revenue data"
                  description="Start getting bookings to see your revenue trends"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <Card className="bg-white border-gray-200">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg">Travel Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-600" />
                  <span className="text-xs sm:text-sm font-medium">Total Packages</span>
                </div>
                <span className="text-xs sm:text-sm font-bold">{stats.totalPackages}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-600" />
                  <span className="text-xs sm:text-sm font-medium">Active Bookings</span>
                </div>
                <span className="text-xs sm:text-sm font-bold">{stats.totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-600" />
                  <span className="text-xs sm:text-sm font-medium">Total Customers</span>
                </div>
                <span className="text-xs sm:text-sm font-bold">{stats.totalCustomers}</span>
              </div>
            </div>
            
            {stats.totalPackages === 0 && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-900">Get Started</span>
                </div>
                <p className="text-xs text-blue-700">Create your first travel package to start attracting customers.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {stats.totalPackages === 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
            <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Welcome to your dashboard!</h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-4 sm:mb-6 max-w-md">
              Start by creating your first travel package to begin attracting customers and tracking your business growth.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-4 sm:px-6">
              Create Your First Package
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
