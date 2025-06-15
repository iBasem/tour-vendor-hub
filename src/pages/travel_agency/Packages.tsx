
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Package } from "lucide-react";
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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Travel Packages</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your travel packages and experiences</p>
        </div>
        <Button 
          onClick={() => navigate("/travel_agency/packages/create")}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 sm:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto border-gray-200 hover:bg-gray-50 text-sm sm:text-base px-4 sm:px-6">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200 hover:-translate-y-1 bg-white"
          >
            <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
              <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2">
                {pkg.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-sm text-gray-600">{pkg.duration}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">{pkg.price}</p>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  pkg.status === 'Active' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {pkg.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-600">
                  {pkg.bookings} booking{pkg.bookings !== 1 ? 's' : ''}
                </span>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no packages) */}
      {packages.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No packages yet</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Create your first travel package to get started</p>
          <Button onClick={() => navigate("/travel_agency/packages/create")} className="text-sm sm:text-base px-4 sm:px-6">
            <Plus className="w-4 h-4 mr-2" />
            Create Package
          </Button>
        </div>
      )}
    </div>
  );
}
