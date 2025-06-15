
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Calendar, User } from "lucide-react";

export default function Bookings() {
  const bookings = [
    {
      id: "BK001",
      traveler: "John Smith",
      package: "Romantic Paris Getaway",
      date: "2024-03-15",
      status: "Confirmed",
      amount: "$2,499"
    },
    {
      id: "BK002", 
      traveler: "Sarah Johnson",
      package: "Tokyo Adventure",
      date: "2024-04-20",
      status: "Pending",
      amount: "$3,299"
    },
    {
      id: "BK003",
      traveler: "Mike Wilson", 
      package: "Bali Relaxation",
      date: "2024-05-10",
      status: "Confirmed",
      amount: "$1,899"
    }
  ];

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

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage customer bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">24</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">3</p>
              </div>
              <User className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">18</p>
              </div>
              <Eye className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">$52K</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-2 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900">{booking.traveler}</p>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {booking.id}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{booking.package}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-3 sm:mt-0">
                  <div className="flex items-center justify-between sm:flex-col sm:items-end">
                    <p className="font-bold text-lg text-gray-900">{booking.amount}</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  
                  <Badge className={`${getStatusColor(booking.status)} border font-medium`}>
                    {booking.status}
                  </Badge>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50">
                      <Eye className="w-4 h-4" />
                      <span className="sr-only sm:not-sr-only sm:ml-2">View</span>
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-200 hover:bg-gray-50">
                      <MessageSquare className="w-4 h-4" />
                      <span className="sr-only sm:not-sr-only sm:ml-2">Message</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
