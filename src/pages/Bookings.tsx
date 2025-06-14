
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const bookingData = [
  { name: "Jan", bookings: 1200, newCustomers: 2845, earnings: 14795 },
  { name: "Feb", bookings: 1300, newCustomers: 2900, earnings: 15200 },
  { name: "Mar", bookings: 1100, newCustomers: 2700, earnings: 13800 },
  { name: "Apr", bookings: 1400, newCustomers: 3100, earnings: 16500 },
  { name: "May", bookings: 1250, newCustomers: 2950, earnings: 15100 },
];

const recentBookings = [
  {
    id: 1,
    name: "Camellia Swan",
    package: "Venice Dreams",
    duration: "605N",
    date: "Jun 25 - Jun 30",
    price: "$1500",
    status: "Confirmed"
  },
  {
    id: 2,
    name: "Raphael Goodman",
    package: "Safari Adventure",
    duration: "607N",
    date: "Jun 25 - Jul 2",
    price: "$3200",
    status: "Pending"
  },
];

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,200</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +2.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              -1.4% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,795</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.7% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Trips Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Bookings"
                />
                <Line 
                  type="monotone" 
                  dataKey="newCustomers" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  name="New Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">View All</Button>
      </div>

      {/* Recent Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>{booking.package}</TableCell>
                  <TableCell>{booking.duration}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={booking.status === "Confirmed" ? "default" : "secondary"}
                      className={booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
