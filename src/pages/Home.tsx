import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Search, Heart, Star, User } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const featuredDestinations = [
  {
    id: 1,
    title: "New on Travelle",
    subtitle: "Latest Adventures",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    isNew: true,
    color: "bg-blue-50"
  },
  {
    id: 2,
    title: "Travelle Curated",
    subtitle: "Handpicked Tours",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop",
    isNew: false,
    color: "bg-purple-50"
  },
  {
    id: 3,
    title: "Europe",
    subtitle: "Cultural Journeys",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    isNew: false,
    color: "bg-green-50"
  },
  {
    id: 4,
    title: "Asia",
    subtitle: "Adventure Tours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    isNew: false,
    color: "bg-orange-50"
  },
  {
    id: 5,
    title: "Americas",
    subtitle: "Wild Expeditions",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
    isNew: false,
    color: "bg-red-50"
  }
];

const recentlyViewed = [
  {
    id: 1,
    title: "Adventure in Costa Rica",
    duration: "9 days",
    rating: 4.8,
    reviews: 50,
    originalPrice: 1770,
    currentPrice: 1682,
    discount: 5,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "European Classic Journey",
    duration: "12 days",
    rating: 4.5,
    reviews: 804,
    originalPrice: 2670,
    currentPrice: 2165,
    discount: 19,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Thailand Island Explorer",
    duration: "9 days",
    rating: 5.0,
    reviews: 2,
    originalPrice: 2330,
    currentPrice: 609,
    discount: 70,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Mediterranean Cruise",
    duration: "8 days",
    rating: 4.7,
    reviews: 30,
    originalPrice: 1479,
    currentPrice: 1479,
    discount: 0,
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop"
  }
];

const trendingAdventures = [
  {
    id: 1,
    title: "Best Of Vietnam in 14 Days",
    duration: "14 days",
    rating: 4.8,
    reviews: 70,
    originalPrice: 1998,
    currentPrice: 899,
    discount: 55,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Costa Rica Quest",
    duration: "9 days",
    rating: 4.8,
    reviews: 290,
    originalPrice: 1209,
    currentPrice: 1104,
    discount: 10,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Spanish Wonder (End Barcelona, 9 Days)",
    duration: "9 days",
    rating: 4.6,
    reviews: 27,
    originalPrice: 2750,
    currentPrice: 2475,
    discount: 10,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Europe Taste",
    duration: "7 days",
    rating: 4.5,
    reviews: 302,
    originalPrice: 1655,
    currentPrice: 927,
    discount: 44,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop"
  }
];

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("All adventures");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-600">travelle</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
              <Link to="/styles" className="text-gray-700 hover:text-blue-600">Adventure Styles</Link>
              <Link to="/deals" className="text-gray-700 hover:text-blue-600">Deals</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Shop 2,500 operators</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm">4.5 stars</span>
            </div>
            <span className="text-sm text-gray-600">247 customer support</span>
            <Button 
              variant="ghost" 
              onClick={() => openAuthModal("signin")}
              className="flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => openAuthModal("signup")}
            >
              Get app
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Book the Best Tours & Adventures</h1>
            <p className="text-xl opacity-90">Choose from thousands of Organized Adventures</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Where to?"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="When?"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="All adventures"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="pl-10 h-12 text-gray-900"
                />
              </div>
              <Button className="h-12 bg-blue-600 hover:bg-blue-700">
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {featuredDestinations.map((destination) => (
            <Card key={destination.id} className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${destination.color}`}>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={destination.image} 
                    alt={destination.title}
                    className="w-full h-32 object-cover"
                  />
                  {destination.isNew && (
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white">NEW</Badge>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900">{destination.title}</h3>
                  <p className="text-sm text-gray-600">{destination.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {recentlyViewed.map((tour) => (
            <Card key={tour.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={tour.image} 
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  {tour.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      -{tour.discount}% OFF
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{tour.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-600">{tour.duration}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                      <span className="text-sm text-gray-500">({tour.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {tour.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          From ${tour.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        ${tour.currentPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Adventures */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Adventures</h2>
            <Button variant="outline" className="text-blue-600 border-blue-600">
              See deals
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {trendingAdventures.map((tour) => (
              <Card key={tour.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={tour.image} 
                      alt={tour.title}
                      className="w-full h-48 object-cover"
                    />
                    {tour.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        -{tour.discount}% OFF
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{tour.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">{tour.duration}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{tour.rating}</span>
                        <span className="text-sm text-gray-500">({tour.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {tour.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through mr-2">
                            From ${tour.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-lg font-bold text-gray-900">
                          ${tour.currentPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">travelle</span>
              </div>
              <p className="text-gray-400">Discover amazing adventures around the world</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/press" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Travelle. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
