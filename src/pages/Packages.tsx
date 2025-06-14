
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreHorizontal, Copy, Edit, Archive } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const packages = [
  {
    id: 1,
    title: "Seoul, South Korea",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=300&fit=crop",
    duration: "5 Days / 4 Nights",
    price: "$2,100",
    period: "per person",
    status: "active"
  },
  {
    id: 2,
    title: "Venice, Italy",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    duration: "4 Days / 3 Nights",
    price: "$1,500",
    period: "per person",
    status: "active"
  },
  {
    id: 3,
    title: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
    duration: "6 Days / 5 Nights",
    price: "$3,200",
    period: "per person",
    status: "active"
  }
];

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Travel Packages</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Sort by: Latest
        </Button>
        <Button variant="outline">View All</Button>
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={pkg.image} 
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{pkg.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{pkg.duration}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-blue-600">{pkg.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{pkg.period}</span>
                </div>
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600" asChild>
                  <Link to={`/packages/${pkg.id}`}>
                    See Detail
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Package Creation Prompt */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-blue-900 mb-2">
            Enhance Your Travelle Experience!
          </h3>
          <p className="text-blue-700 mb-4">
            Create amazing travel packages to attract more customers
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
