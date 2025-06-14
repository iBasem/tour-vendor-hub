
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Building2, 
  Package, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

const revenueData = [
  { name: "Jan", bookings: 145, revenue: 12400 },
  { name: "Feb", bookings: 168, revenue: 15200 },
  { name: "Mar", bookings: 192, revenue: 18900 },
  { name: "Apr", bookings: 158, revenue: 14800 },
  { name: "May", bookings: 210, revenue: 22100 },
  { name: "Jun", bookings: 234, revenue: 26500 },
];

const pendingActions = [
  {
    id: 1,
    type: "Agency Approval",
    title: "Dream Vacations Ltd.",
    description: "New travel agency pending verification",
    priority: "high",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "Tour Review",
    title: "Bali Adventure Package",
    description: "Tour package needs content review",
    priority: "medium",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "Refund Request",
    title: "Booking #TB-2024-1456",
    description: "Customer requesting full refund",
    priority: "high",
    time: "6 hours ago"
  }
];

const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "completed booking for Tokyo Explorer",
    time: "10 minutes ago",
    type: "booking"
  },
  {
    id: 2,
    user: "Adventure Tours Co.",
    action: "listed new package: Mountain Trek Nepal",
    time: "1 hour ago",
    type: "listing"
  },
  {
    id: 3,
    user: "Mike Chen",
    action: "registered as new traveler",
    time: "2 hours ago",
    type: "registration"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your Travelle marketplace</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Export Report</Button>
          <Button>Quick Actions</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,542</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Travel Agencies</CardTitle>
            <Building2 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8 new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
            <BookOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,367</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,892</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +24.8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue & Bookings Trend</CardTitle>
              <Button variant="outline" size="sm">Last 6 months</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="bookings" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    name="Bookings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Actions</CardTitle>
              <Badge variant="destructive">3</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {action.type}
                    </Badge>
                    <span className="text-xs text-gray-500">{action.time}</span>
                  </div>
                  <h4 className="font-medium text-sm mt-1">{action.title}</h4>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </div>
            ))}
            <Button className="w-full" size="sm">View All Actions</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
