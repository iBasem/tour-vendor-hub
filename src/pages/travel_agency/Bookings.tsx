
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";

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
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bookings Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{booking.traveler}</p>
                      <p className="text-sm text-gray-600">{booking.package}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{booking.amount}</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4" />
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
