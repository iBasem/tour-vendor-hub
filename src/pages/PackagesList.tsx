import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Heart,
  ChevronDown,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react";
import { HeaderSection } from "@/components/home/HeaderSection";
import { FooterSection } from "@/components/home/FooterSection";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for packages
const packages = [
  {
    id: 1,
    title: "Best of Vietnam in 14 Days",
    destination: "Vietnam",
    duration: "14 days",
    price: 899,
    originalPrice: 1998,
    discount: 55,
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop",
    operator: "Intrepid Travel",
    difficulty: "Easy",
    groupSize: "12-16",
    includes: ["Accommodation", "Some meals", "Transport", "Guide"],
    features: ["Small Groups", "Cultural", "Adventure"]
  },
  {
    id: 2,
    title: "Turkey Adventure - 12 Days",
    destination: "Turkey",
    duration: "12 days",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop",
    operator: "G Adventures",
    difficulty: "Moderate",
    groupSize: "16-20",
    includes: ["Accommodation", "Most meals", "Transport", "Guide"],
    features: ["Cultural", "Historical", "Food"]
  },
  {
    id: 3,
    title: "Morocco Desert Experience",
    destination: "Morocco",
    duration: "8 days",
    price: 756,
    originalPrice: 1200,
    discount: 37,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
    operator: "On The Go Tours",
    difficulty: "Easy",
    groupSize: "8-12",
    includes: ["Accommodation", "Some meals", "Transport", "Guide"],
    features: ["Desert", "Cultural", "Small Groups"]
  },
  {
    id: 4,
    title: "Japan Highlights Tour",
    destination: "Japan",
    duration: "10 days",
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    operator: "Trafalgar",
    difficulty: "Easy",
    groupSize: "20-25",
    includes: ["Accommodation", "Most meals", "Transport", "Guide"],
    features: ["Cultural", "Temples", "Modern Cities"]
  },
  {
    id: 5,
    title: "Peru Inca Trail Adventure",
    destination: "Peru",
    duration: "15 days",
    price: 1499,
    originalPrice: 2199,
    discount: 32,
    rating: 4.8,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
    operator: "Intrepid Travel",
    difficulty: "Challenging",
    groupSize: "12-16",
    includes: ["Accommodation", "Most meals", "Transport", "Guide"],
    features: ["Adventure", "Hiking", "Ancient Sites"]
  },
  {
    id: 6,
    title: "Italian Highlights",
    destination: "Italy",
    duration: "9 days",
    price: 1189,
    originalPrice: 1599,
    discount: 26,
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop",
    operator: "Cosmos",
    difficulty: "Easy",
    groupSize: "35-40",
    includes: ["Accommodation", "Some meals", "Transport", "Guide"],
    features: ["Cultural", "Food", "Art"]
  }
];

const destinations = ["All Destinations", "Vietnam", "Turkey", "Morocco", "Japan", "Peru", "Italy"];
const operators = ["All Operators", "Intrepid Travel", "G Adventures", "On The Go Tours", "Trafalgar", "Cosmos"];
const difficulties = ["All Levels", "Easy", "Moderate", "Challenging"];
const features = ["Small Groups", "Cultural", "Adventure", "Desert", "Historical", "Food", "Temples", "Modern Cities", "Hiking", "Ancient Sites", "Art"];

export default function PackagesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All Destinations");
  const [selectedOperator, setSelectedOperator] = useState("All Operators");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = selectedDestination === "All Destinations" || pkg.destination === selectedDestination;
    const matchesOperator = selectedOperator === "All Operators" || pkg.operator === selectedOperator;
    const matchesDifficulty = selectedDifficulty === "All Levels" || pkg.difficulty === selectedDifficulty;
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.some(feature => pkg.features.includes(feature));

    return matchesSearch && matchesDestination && matchesOperator && 
           matchesDifficulty && matchesPrice && matchesFeatures;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "duration": return parseInt(a.duration) - parseInt(b.duration);
      default: return 0;
    }
  });

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Destination</h3>
        <Select value={selectedDestination} onValueChange={setSelectedDestination}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {destinations.map(dest => (
              <SelectItem key={dest} value={dest}>{dest}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tour Operator */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Tour Operator</h3>
        <Select value={selectedOperator} onValueChange={setSelectedOperator}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {operators.map(op => (
              <SelectItem key={op} value={op}>{op}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Difficulty Level</h3>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(diff => (
              <SelectItem key={diff} value={diff}>{diff}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Tour Features</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {features.map(feature => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
              />
              <label htmlFor={feature} className="text-sm cursor-pointer">
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSection 
        onAuthModalOpen={() => {}} 
        onAgencyAuthModalOpen={() => {}} 
      />

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find and book the perfect tour from thousands of options worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search destinations, tours, or activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedDestination("All Destinations");
                    setSelectedOperator("All Operators");
                    setSelectedDifficulty("All Levels");
                    setPriceRange([0, 3000]);
                    setSelectedFeatures([]);
                  }}>
                    Clear All
                  </Button>
                </div>
                <FilterSidebar />
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{sortedPackages.length}</span> tours found
                </p>
                
                {/* Mobile Filter Button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filter Tours</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Package Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="relative">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 text-white font-semibold">
                        -{pkg.discount}% OFF
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Operator */}
                      <p className="text-sm text-blue-600 font-medium">{pkg.operator}</p>
                      
                      {/* Title */}
                      <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                        {pkg.title}
                      </h3>
                      
                      {/* Details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {pkg.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {pkg.groupSize}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {pkg.destination}
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{pkg.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">({pkg.reviews} reviews)</span>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-1">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 line-through">
                              ${pkg.originalPrice}
                            </span>
                            <span className="text-2xl font-bold text-gray-900">
                              ${pkg.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">per person</p>
                        </div>
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                          <Link to={`/packages/${pkg.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {sortedPackages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedDestination("All Destinations");
                  setSelectedOperator("All Operators");
                  setSelectedDifficulty("All Levels");
                  setPriceRange([0, 3000]);
                  setSelectedFeatures([]);
                }}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {sortedPackages.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Tours
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
