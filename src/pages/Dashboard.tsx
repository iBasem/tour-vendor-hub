
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, TrendingUp, TrendingDown, Users, DollarSign, MapPin, MessageSquare, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { name: "Sun", value: 400 },
  { name: "Mon", value: 450 },
  { name: "Tue", value: 300 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 635 },
  { name: "Fri", value: 550 },
  { name: "Sat", value: 500 },
];

const destinationData = [
  { name: "Tokyo, Japan", value: 35, participants: 4391, color: "#3B82F6" },
  { name: "Sydney, Australia", value: 28, participants: 2458, color: "#06B6D4" },
  { name: "Paris, France", value: 22, participants: 1458, color: "#8B5CF6" },
  { name: "Venice, Italy", value: 15, participants: 2458, color: "#10B981" },
];

const upcomingTrips = [
  {
    id: 1,
    title: "Paris, France",
    subtitle: "Romantic Gateway",
    image: "/placeholder.svg",
    participants: ["P1", "P2", "P3"],
    duration: "5-10 July",
    type: "Romantic Gateway"
  },
  {
    id: 2,
    title: "Tokyo, Japan",
    subtitle: "Cultural Exploration",
    image: "/placeholder.svg",
    participants: ["T1", "T2", "T3"],
    duration: "15-20 July",
    type: "Cultural Exploration"
  },
  {
    id: 3,
    title: "Sydney, Australia",
    subtitle: "Adventure Tour",
    image: "/placeholder.svg",
    participants: ["S1", "S2"],
    duration: "25-28 July",
    type: "Adventure Tour"
  },
  {
    id: 4,
    title: "New York, USA",
    subtitle: "City Highlights",
    image: "/placeholder.svg",
    participants: ["N1", "N2", "N3"],
    duration: "29-2 July",
    type: "City Highlights"
  },
];

const messages = [
  {
    id: 1,
    name: "Europia Hotel",
    message: "Are we pleased to announce...",
    time: "11:00 AM",
    avatar: "/placeholder.svg",
    unread: true
  },
  {
    id: 2,
    name: "Global Travel Co",
    message: "We have updated our commission...",
    time: "8:59 AM",
    avatar: "/placeholder.svg",
    unread: true
  },
  {
    id: 3,
    name: "Kalendra Umbara",
    message: "Hi I need assistance with changing my...",
    time: "8:45 AM",
    avatar: "/placeholder.svg",
    unread: true
  },
];

const recentActivity = [
  {
    id: 1,
    user: "Alberto Cortez",
    action: "updated his profile and added a new payment method",
    time: "5:30 AM",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    user: "Camellia Swan",
    action: "booked the Venice Dreams package for June 25, 2024",
    time: "4:00 AM",
    avatar: "/placeholder.svg"
  },
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>July 2024</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Booking</CardTitle>
            <Calendar className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,200</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.5%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total New Customers</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              -1.4%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,890</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.7%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600">
                {selectedPeriod}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
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
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Destinations</CardTitle>
              <Button variant="outline" size="sm" className="bg-blue-600 text-white border-blue-600">
                This Month
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {destinationData.map((destination, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: destination.color }}
                    />
                    <span className="text-sm font-medium">{destination.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{destination.value}%</div>
                    <div className="text-xs text-gray-500">{destination.participants.toLocaleString()} Participants</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Travel Packages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Total Trips</CardTitle>
                <div className="text-2xl font-bold mt-1">1,200</div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>Done: 620</div>
                <div>Booked: 465</div>
                <div>Cancelled: 115</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <Button variant="ghost" size="sm">•••</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.avatar} />
                  <AvatarFallback>{message.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{message.name}</h4>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.message}</p>
                </div>
                {message.unread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Trips */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Trips</CardTitle>
              <Button variant="ghost" size="sm" className="bg-blue-600 text-white">•••</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="flex items-center gap-3">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium">{trip.title}</h4>
                  <p className="text-xs text-gray-500">{trip.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex -space-x-1">
                      {trip.participants.map((participant, idx) => (
                        <Avatar key={idx} className="w-4 h-4 border border-white">
                          <AvatarFallback className="text-xs">{participant}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">+{trip.participants.length}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{trip.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">•••</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
