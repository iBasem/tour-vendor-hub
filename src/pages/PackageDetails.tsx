import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  ArrowLeft,
  ChevronRight,
  Utensils,
  Bed,
  Activity
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
  tourType: "group", // group, private, customizable
  images: [
    "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
  ],
  cities: [
    {
      name: "Ho Chi Minh City",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=300&h=200&fit=crop",
      description: "Vietnam's bustling commercial hub"
    },
    {
      name: "Hanoi",
      image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&h=200&fit=crop",
      description: "The charming capital city"
    },
    {
      name: "Halong Bay",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=300&h=200&fit=crop",
      description: "UNESCO World Heritage site"
    },
    {
      name: "Hoi An",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      description: "Ancient town with lantern-lit streets"
    }
  ],
  highlights: [
    "Explore bustling Ho Chi Minh City",
    "Cruise through stunning Halong Bay",
    "Visit ancient temples in Hoi An",
    "Experience local markets and street food",
    "Meet friendly local communities"
  ],
  tourOptions: {
    group: {
      price: 899,
      description: "Join a small group of like-minded travelers",
      minSize: 12,
      maxSize: 16,
      features: ["Fixed itinerary", "Group guide", "Shared experiences", "Best value"]
    },
    private: {
      price: 1499,
      description: "Exclusive tour just for you and your companions",
      minSize: 2,
      maxSize: 8,
      features: ["Private guide", "Flexible schedule", "Personalized service", "VIP treatment"]
    },
    customizable: {
      price: 1299,
      description: "Tailor the tour to your preferences",
      minSize: 4,
      maxSize: 12,
      features: ["Custom itinerary", "Choose activities", "Flexible dates", "Personal touches"]
    }
  },
  itinerary: [
    { 
      day: 1, 
      title: "Arrival in Ho Chi Minh City", 
      description: "Welcome to Vietnam! Upon arrival at Tan Son Nhat Airport, you'll be transferred to your hotel in the heart of Ho Chi Minh City.",
      activities: [
        "Airport pickup and hotel transfer",
        "Welcome dinner at a traditional Vietnamese restaurant",
        "Evening orientation meeting with your guide"
      ],
      meals: ["Dinner"],
      accommodation: "4-star hotel in District 1",
      highlights: ["First taste of Vietnamese cuisine", "Meet your fellow travelers"]
    },
    { 
      day: 2, 
      title: "Cu Chi Tunnels & City Tour", 
      description: "Discover the fascinating history of the Cu Chi Tunnels and explore the vibrant streets of Ho Chi Minh City.",
      activities: [
        "Morning visit to Cu Chi Tunnels historical site",
        "Lunch at local restaurant",
        "Afternoon city tour including Reunification Palace",
        "Visit Ben Thanh Market for shopping",
        "Evening free time to explore"
      ],
      meals: ["Breakfast", "Lunch"],
      accommodation: "4-star hotel in District 1",
      highlights: ["Historical tunnel system", "Local market experience"]
    },
    { 
      day: 3, 
      title: "Mekong Delta Adventure", 
      description: "Journey to the fertile Mekong Delta, known as Vietnam's rice bowl, for a unique boat trip experience.",
      activities: [
        "Early morning departure to Mekong Delta",
        "Boat cruise through narrow waterways",
        "Visit traditional craft villages",
        "Local lunch with Mekong specialties",
        "Return to Ho Chi Minh City in evening"
      ],
      meals: ["Breakfast", "Lunch"],
      accommodation: "4-star hotel in District 1",
      highlights: ["Floating markets", "Traditional handicrafts"]
    },
    { 
      day: 4, 
      title: "Flight to Hanoi", 
      description: "Travel north to Vietnam's capital city and begin exploring the cultural heart of the country.",
      activities: [
        "Morning flight to Hanoi",
        "Check-in at hotel in Old Quarter",
        "Afternoon walking tour of Hanoi Old Quarter",
        "Visit Hoan Kiem Lake and Ngoc Son Temple",
        "Traditional water puppet show in evening"
      ],
      meals: ["Breakfast", "Dinner"],
      accommodation: "Boutique hotel in Old Quarter",
      highlights: ["Historic Old Quarter", "Water puppet performance"]
    },
    { 
      day: 5, 
      title: "Halong Bay Cruise", 
      description: "Embark on an unforgettable overnight cruise through the mystical limestone karsts of Halong Bay.",
      activities: [
        "Morning departure to Halong Bay",
        "Board traditional junk boat",
        "Cruise through limestone formations",
        "Kayaking in hidden lagoons",
        "Sunset viewing from deck",
        "Fresh seafood dinner onboard"
      ],
      meals: ["Breakfast", "Lunch", "Dinner"],
      accommodation: "Overnight on cruise boat",
      highlights: ["UNESCO World Heritage site", "Kayaking adventure"]
    }
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
  const [selectedTourType, setSelectedTourType] = useState<"group" | "private" | "customizable">("group");

  const currentTourOption = mockPackage.tourOptions[selectedTourType];
  const currentPrice = currentTourOption.price;

  const handleBookNow = (date?: string) => {
    setSelectedDate(date || "");
    setIsBookingWizardOpen(true);
  };

  const getTourTypeBadgeColor = (type: string) => {
    switch (type) {
      case "group": return "bg-blue-100 text-blue-800 border-blue-200";
      case "private": return "bg-purple-100 text-purple-800 border-purple-200";
      case "customizable": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
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
                  <div className="absolute top-4 left-4 flex gap-2">
                    {mockPackage.discount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        -{mockPackage.discount}% OFF
                      </Badge>
                    )}
                    <Badge className={`capitalize ${getTourTypeBadgeColor(selectedTourType)}`}>
                      {selectedTourType} tour
                    </Badge>
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
                        {currentTourOption.minSize}-{currentTourOption.maxSize} people
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
                {/* Tour Type Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Choose Your Tour Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(mockPackage.tourOptions).map(([type, option]) => (
                      <button
                        key={type}
                        onClick={() => setSelectedTourType(type as any)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          selectedTourType === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold capitalize">{type}</h4>
                          <span className="text-lg font-bold text-blue-600">
                            ${option.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {option.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-6 mt-6">
                  {/* Cities Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Cities You'll Visit
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mockPackage.cities.map((city, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="relative overflow-hidden rounded-lg mb-2">
                            <img
                              src={city.image}
                              alt={city.name}
                              className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-2 left-2 text-white">
                              <h4 className="font-medium text-sm">{city.name}</h4>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 text-center">{city.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Current Tour Option Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      {selectedTourType.charAt(0).toUpperCase() + selectedTourType.slice(1)} Tour Features
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {currentTourOption.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

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

                  {/* Detailed Itinerary */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      Detailed Itinerary
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {mockPackage.itinerary.map((item, index) => (
                        <AccordionItem key={index} value={`day-${item.day}`} className="border rounded-lg mb-3">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-4 text-left">
                              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="font-semibold text-blue-600">D{item.day}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="space-y-4 mt-4">
                              {/* Activities */}
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                  <Activity className="w-4 h-4 text-green-600" />
                                  Activities
                                </h5>
                                <ul className="space-y-1">
                                  {item.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                      <ChevronRight className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Meals */}
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Utensils className="w-4 h-4 text-orange-600" />
                                    Meals Included
                                  </h5>
                                  <div className="flex flex-wrap gap-1">
                                    {item.meals.map((meal, mealIndex) => (
                                      <Badge key={mealIndex} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                                        {meal}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Accommodation */}
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Bed className="w-4 h-4 text-purple-600" />
                                    Accommodation
                                  </h5>
                                  <p className="text-sm text-gray-700">{item.accommodation}</p>
                                </div>
                              </div>

                              {/* Highlights */}
                              {item.highlights && (
                                <div>
                                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-600" />
                                    Day Highlights
                                  </h5>
                                  <div className="flex flex-wrap gap-1">
                                    {item.highlights.map((highlight, highlightIndex) => (
                                      <Badge key={highlightIndex} variant="outline" className="text-xs border-yellow-200 text-yellow-700">
                                        {highlight}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
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
                    {mockPackage.originalPrice > currentPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${mockPackage.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-gray-900">
                      ${currentPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">per person • {selectedTourType} tour</p>
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
                          <div className="font-semibold">${currentPrice}</div>
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
          price: currentPrice,
          availabilities: mockPackage.availabilities.map(a => ({ ...a, price: currentPrice })),
          tourType: selectedTourType
        }}
        selectedDate={selectedDate}
      />
    </div>
  );
}
