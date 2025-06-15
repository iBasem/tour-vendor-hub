import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { HeaderSection } from "@/components/home/HeaderSection";
import { FooterSection } from "@/components/home/FooterSection";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Heart,
  Share2,
  Clock,
  Shield,
  Award,
  Camera,
  ArrowLeft
} from "lucide-react";

// Mock data for the package
const mockPackage = {
  id: 1,
  title: "Best Of Vietnam in 14 Days",
  subtitle: "An unforgettable journey through Vietnam's highlights",
  price: 899,
  originalPrice: 1998,
  discount: 55,
  rating: 4.8,
  reviews: 70,
  duration: "14 days",
  groupSize: "12-16 people",
  images: [
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
  ],
  highlights: [
    "Explore bustling Ho Chi Minh City",
    "Cruise through stunning Halong Bay",
    "Visit ancient temples in Hoi An",
    "Experience local markets and street food",
    "Meet friendly local communities"
  ],
  itinerary: [
    { day: 1, title: "Arrival in Ho Chi Minh City", description: "Welcome dinner and city orientation" },
    { day: 2, title: "Cu Chi Tunnels & City Tour", description: "Historical sites and local markets" },
    { day: 3, title: "Mekong Delta Adventure", description: "Boat trip and floating markets" },
    { day: 4, title: "Flight to Hanoi", description: "Capital city exploration" },
    { day: 5, title: "Halong Bay Cruise", description: "Overnight cruise through limestone karsts" }
  ],
  includes: [
    "13 nights accommodation",
    "All meals as per itinerary",
    "Professional English-speaking guide",
    "All entrance fees",
    "Domestic flights",
    "Airport transfers"
  ],
  availabilities: [
    { date: "2024-03-15", price: 899, spotsLeft: 8 },
    { date: "2024-04-20", price: 899, spotsLeft: 12 },
    { date: "2024-05-18", price: 999, spotsLeft: 6 },
    { date: "2024-06-22", price: 999, spotsLeft: 10 }
  ]
};

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleBookNow = (date?: string) => {
    setSelectedDate(date || "");
    setIsBookingWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSection 
        onAuthModalOpen={() => {}} 
        onAgencyAuthModalOpen={() => {}} 
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            to="/packages" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tours
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={mockPackage.images[selectedImage]}
                    alt={mockPackage.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    {mockPackage.discount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        -{mockPackage.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4">
                    {mockPackage.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative overflow-hidden rounded-lg ${
                          selectedImage === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockPackage.title}</CardTitle>
                    <p className="text-gray-600 mb-4">{mockPackage.subtitle}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {mockPackage.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mockPackage.groupSize}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{mockPackage.rating}</span>
                        <span>({mockPackage.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Highlights */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      Tour Highlights
                    </h3>
                    <ul className="space-y-2">
                      {mockPackage.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Itinerary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Sample Itinerary
                    </h3>
                    <div className="space-y-4">
                      {mockPackage.itinerary.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="font-semibold text-blue-600">D{item.day}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* What's Included */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {mockPackage.includes.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {mockPackage.originalPrice > mockPackage.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${mockPackage.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-gray-900">
                      ${mockPackage.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">per person</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => handleBookNow()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  Request Booking
                </Button>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Available Dates</h4>
                  <div className="space-y-2">
                    {mockPackage.availabilities.map((availability, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <div className="font-medium">
                            {new Date(availability.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-sm text-gray-600">
                            {availability.spotsLeft} spots left
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${availability.price}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookNow(availability.date)}
                            className="mt-1"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure booking</span>
                  </div>
                  <p>No payment required to reserve</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FooterSection />

      {/* Booking Wizard */}
      <BookingWizard
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        packageData={{
          id: mockPackage.id,
          title: mockPackage.title,
          price: mockPackage.price,
          availabilities: mockPackage.availabilities
        }}
        selectedDate={selectedDate}
      />
    </div>
  );
}
