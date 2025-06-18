
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Heart,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react";
import { HeaderSection } from "@/components/home/HeaderSection";
import { FooterSection } from "@/components/home/FooterSection";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { usePublishedPackages } from "@/hooks/usePublishedPackages";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'relaxation', label: 'Relaxation' },
  { value: 'business', label: 'Business' },
  { value: 'family', label: 'Family' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'solo', label: 'Solo Travel' }
];

export default function PackagesList() {
  const { packages, loading, error } = usePublishedPackages();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || pkg.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All Levels" || pkg.difficulty_level === selectedDifficulty;
    const matchesPrice = pkg.base_price >= priceRange[0] && pkg.base_price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return Number(a.base_price) - Number(b.base_price);
      case "price-high": return Number(b.base_price) - Number(a.base_price);
      case "duration": return a.duration_days - b.duration_days;
      case "newest": return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
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
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Difficulty */}
      <div>
        <h3 className="font-semibold mb-3 text-sm">Difficulty</h3>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Levels">All Levels</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="challenging">Challenging</SelectItem>
            <SelectItem value="extreme">Extreme</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSection />
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
        <FooterSection />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSection />
        <div className="text-center py-8">
          <p className="text-red-600">Error loading packages: {error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSection />

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing Tours
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find and book the perfect tour from our curated selection
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search destinations, packages..."
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
                    setSelectedCategory("All Categories");
                    setSelectedDifficulty("All Levels");
                    setPriceRange([0, 5000]);
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
                    <SelectItem value="newest">Newest First</SelectItem>
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
            {sortedPackages.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedPackages.map((pkg) => {
                  const primaryImage = pkg.package_media?.find(m => m.is_primary) || pkg.package_media?.[0];
                  const imageUrl = primaryImage?.file_path || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop";
                  
                  return (
                    <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt={pkg.title}
                          className="w-full h-48 object-cover"
                        />
                        {pkg.featured && (
                          <Badge className="absolute top-3 left-3 bg-blue-500 text-white font-semibold">
                            FEATURED
                          </Badge>
                        )}
                        <Badge className="absolute top-3 right-3 bg-green-500 text-white font-semibold capitalize">
                          {pkg.category}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {/* Title */}
                          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                            {pkg.title}
                          </h3>
                          
                          {/* Details */}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {pkg.duration_days} days
                            </div>
                            {pkg.max_participants && (
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Max {pkg.max_participants}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {pkg.destination}
                            </div>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-medium">4.8</span>
                            </div>
                            <span className="text-gray-500 text-sm">(24 reviews)</span>
                          </div>
                          
                          {/* Difficulty */}
                          {pkg.difficulty_level && (
                            <Badge variant="secondary" className="text-xs capitalize">
                              {pkg.difficulty_level}
                            </Badge>
                          )}
                          
                          {/* Price */}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">
                                ${pkg.base_price}
                              </span>
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
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon="search"
                title="No tours found"
                description="Try adjusting your filters or search terms"
                action={{
                  label: "Clear All Filters",
                  onClick: () => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setSelectedDifficulty("All Levels");
                    setPriceRange([0, 5000]);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
