
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const travelers = [
  {
    id: 1,
    name: "Camellia Swan",
    email: "camellia@email.com",
    phone: "+1234567890",
    bookings: "Venice Dreams Package Performance",
    status: "Active",
    joinDate: "Jun 2024",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Raphael Goodman",
    email: "raphael@email.com",
    phone: "+1234567891",
    bookings: "Safari Adventure",
    status: "Active",
    joinDate: "May 2024",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Ludwig Gonzalez",
    email: "ludwig@email.com",
    phone: "+1234567892",
    bookings: "Alpine Escape",
    status: "Inactive",
    joinDate: "Apr 2024",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    email: "maria@email.com",
    phone: "+1234567893",
    bookings: "Parisian Romance",
    status: "Active",
    joinDate: "Jun 2024",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "John Anderson",
    email: "john@email.com",
    phone: "+1234567894",
    bookings: "Tokyo Cultural Adventure",
    status: "Active",
    joinDate: "May 2024",
    avatar: "/placeholder.svg"
  }
];

export default function Travelers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTravelers = travelers.filter(traveler =>
    traveler.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    traveler.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Travelers</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Export List
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search travelers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Travelers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Travelers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Traveler</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Recent Booking</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTravelers.map((traveler) => (
                <TableRow key={traveler.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={traveler.avatar} />
                        <AvatarFallback>{traveler.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{traveler.name}</div>
                        <div className="text-sm text-gray-500">{traveler.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{traveler.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{traveler.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px]">
                      <div className="text-sm font-medium truncate">{traveler.bookings}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={traveler.status === "Active" ? "default" : "secondary"}
                      className={traveler.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {traveler.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{traveler.joinDate}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">124</div>
            <div className="text-sm text-gray-600">Total Travelers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">98</div>
            <div className="text-sm text-gray-600">Active Travelers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">26</div>
            <div className="text-sm text-gray-600">New This Month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
