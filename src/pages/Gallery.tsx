
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Grid, List, Upload } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "Alpine Escape",
    image: "/placeholder.svg",
    category: "Nature",
    date: "1 - 30 June 24",
    participants: 5472
  },
  {
    id: 2,
    title: "Bali Beach Escape",
    image: "/placeholder.svg",
    category: "Beach",
    date: "15 - 30 June 24",
    participants: 3648
  },
  {
    id: 3,
    title: "Caribbean Cruise",
    image: "/placeholder.svg",
    category: "Cruise",
    date: "1 - 15 July 24",
    participants: 2856
  },
  {
    id: 4,
    title: "Greek Island Hopping",
    image: "/placeholder.svg",
    category: "Islands",
    date: "20 - 30 June 24",
    participants: 1947
  },
  {
    id: 5,
    title: "New York City Highlights",
    image: "/placeholder.svg",
    category: "City",
    date: "5 - 15 July 24",
    participants: 4521
  },
  {
    id: 6,
    title: "Parisian Romance",
    image: "/placeholder.svg",
    category: "Romance",
    date: "10 - 20 July 24",
    participants: 3214
  },
  {
    id: 7,
    title: "Safari Adventure",
    image: "/placeholder.svg",
    category: "Adventure",
    date: "25 June - 5 July 24",
    participants: 2856
  },
  {
    id: 8,
    title: "Seoul Cultural Exploration",
    image: "/placeholder.svg",
    category: "Culture",
    date: "15 - 25 July 24",
    participants: 1854
  },
  {
    id: 9,
    title: "Sydney Explorer",
    image: "/placeholder.svg",
    category: "City",
    date: "1 - 10 August 24",
    participants: 2147
  },
  {
    id: 10,
    title: "Tokyo Cultural Adventure",
    image: "/placeholder.svg",
    category: "Culture",
    date: "5 - 15 August 24",
    participants: 3658
  },
  {
    id: 11,
    title: "Tropical Paradise Resort",
    image: "/placeholder.svg",
    category: "Resort",
    date: "20 - 30 August 24",
    participants: 1523
  },
  {
    id: 12,
    title: "Venice Dreams",
    image: "/placeholder.svg",
    category: "Romance",
    date: "10 - 20 August 24",
    participants: 2741
  }
];

const categories = ["All", "Nature", "Beach", "Culture", "City", "Adventure", "Romance"];

export default function Gallery() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-blue-600" : ""}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-blue-600" : ""}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                  {item.category}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>{item.date}</div>
                  <div>{item.participants.toLocaleString()} participants</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">{item.date}</div>
                  </div>
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="text-sm text-gray-500">
                    {item.participants.toLocaleString()} participants
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upgrade Prompt */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-blue-900 mb-2">
            Enhance Your Travelle Experience!
          </h3>
          <p className="text-blue-700 mb-4">
            Upload unlimited photos and create stunning galleries
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Upgrade Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
