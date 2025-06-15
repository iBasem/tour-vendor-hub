
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Travelers() {
  const [searchTerm, setSearchTerm] = useState("");

  const travelers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      totalBookings: 3,
      lastTrip: "Paris Getaway - March 2024"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      totalBookings: 1,
      lastTrip: "Tokyo Adventure - April 2024"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 234 567 8902",
      totalBookings: 2,
      lastTrip: "Bali Relaxation - May 2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Travelers Management</h1>
        <Button>
          <Users className="w-4 h-4 mr-2" />
          Add Traveler
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search travelers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Traveler Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {travelers.map((traveler) => (
              <div key={traveler.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {traveler.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{traveler.name}</p>
                      <p className="text-sm text-gray-600">{traveler.email}</p>
                      <p className="text-sm text-gray-600">{traveler.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{traveler.totalBookings} bookings</p>
                  <p className="text-sm text-gray-600">{traveler.lastTrip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
