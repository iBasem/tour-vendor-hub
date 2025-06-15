
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      title: "Romantic Paris Getaway",
      duration: "5 days, 4 nights",
      price: "$2,499",
      status: "Active",
      bookings: 12
    },
    {
      id: 2,
      title: "Tokyo Adventure",
      duration: "7 days, 6 nights",
      price: "$3,299",
      status: "Active",
      bookings: 8
    },
    {
      id: 3,
      title: "Bali Relaxation",
      duration: "6 days, 5 nights",
      price: "$1,899",
      status: "Draft",
      bookings: 0
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Travel Packages</h1>
        <Button onClick={() => navigate("/dashboard/packages/create")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search packages..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{pkg.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{pkg.duration}</p>
                <p className="text-xl font-bold text-blue-600">{pkg.price}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pkg.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {pkg.status}
                  </span>
                  <span className="text-sm text-gray-600">{pkg.bookings} bookings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
