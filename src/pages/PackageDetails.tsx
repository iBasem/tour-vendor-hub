import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Calendar,
  Share2,
  Heart,
  ChevronLeft,
  Check,
  X,
  Utensils,
  Bed,
  Car,
  Camera,
  Shield,
  Award
} from "lucide-react";
import { toast } from "sonner";

// Mock data for a specific package
const packageData = {
  id: 1,
  title: "Seoul Cultural Explorer",
  subtitle: "Discover the heart of South Korea",
  location: "Seoul, South Korea",
  duration: "5 Days / 4 Nights",
  price: 2100,
  originalPrice: 2400,
  rating: 4.8,
  reviewCount: 127,
  images: [
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=500&fit=crop"
  ],
  highlights: [
    "Visit Gyeongbokgung Palace and witness the changing of the guard",
    "Explore vibrant Myeongdong shopping district",
    "Experience traditional Korean BBQ dinner",
    "Take a day trip to Jeju Island",
    "Discover Bukchon Hanok Village"
  ],
  included: [
    "4 nights accommodation in 4-star hotels",
    "Daily breakfast and 3 traditional dinners",
    "Private transportation throughout the tour",
    "Professional English-speaking guide",
    "All entrance fees and activities",
    "Travel insurance"
  ],
  notIncluded: [
    "International flights",
    "Lunch (except on day trips)",
    "Personal expenses and souvenirs",
    "Tips for guide and driver"
  ],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Seoul",
      description: "Arrive at Incheon Airport, transfer to hotel, welcome dinner",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner at local restaurant"]
    },
    {
      day: 2,
      title: "Historic Seoul",
      description: "Explore palaces and traditional districts",
      activities: ["Gyeongbokgung Palace tour", "Bukchon Hanok Village", "Insadong shopping"]
    },
    {
      day: 3,
      title: "Modern Seoul",
      description: "Experience contemporary Korean culture",
      activities: ["Gangnam district tour", "Lotte World Tower", "Myeongdong shopping"]
    },
    {
      day: 4,
      title: "Jeju Island Day Trip",
      description: "Fly to Jeju Island for natural wonders",
      activities: ["Seongsan Ilchulbong Peak", "Manjanggul Cave", "Jeju folk village"]
    },
    {
      day: 5,
      title: "Departure",
      description: "Last-minute shopping and departure",
      activities: ["Free morning", "Shopping at Dongdaemun", "Airport transfer"]
    }
  ],
  maxGroupSize: 16,
  minAge: 12,
  physicalRating: "Easy",
  availabilities: [
    { date: "2024-07-15", price: 2100, spotsLeft: 3 },
    { date: "2024-07-29", price: 2100, spotsLeft: 8 },
    { date: "2024-08-12", price: 2250, spotsLeft: 12 },
    { date: "2024-08-26", price: 2250, spotsLeft: 15 },
    { date: "2024-09-09", price: 2100, spotsLeft: 6 },
    { date: "2024-09-23", price: 2100, spotsLeft: 10 },
    { date: "2024-10-07", price: 2350, spotsLeft: 4 },
    { date: "2024-10-21", price: 2350, spotsLeft: 9 }
  ]
};

export default function PackageDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: packageData.title,
          text: packageData.subtitle,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/packages">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{packageData.title}</h1>
              <p className="text-gray-600">{packageData.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleWishlist}>
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={packageData.images[selectedImage]} 
                    alt={packageData.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {packageData.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-12 rounded border-2 overflow-hidden ${
                          selectedImage === index ? 'border-blue-500' : 'border-white'
                        }`}
                      >
                        <img 
                          src={packageData.images[index]} 
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">4-star accommodation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Breakfast + 3 dinners</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Private transportation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">English-speaking guide</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tour Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{packageData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{packageData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Max {packageData.maxGroupSize} people</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{packageData.rating}</span>
                    <span className="text-sm text-gray-600">({packageData.reviewCount} reviews)</span>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                    <TabsTrigger value="included">Included</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tour Highlights</h3>
                      <ul className="space-y-2">
                        {packageData.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Shield className="w-8 h-8 text-blue-500" />
                        <div>
                          <div className="font-medium">Safe & Secure</div>
                          <div className="text-sm text-gray-600">Fully insured tours</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Award className="w-8 h-8 text-green-500" />
                        <div>
                          <div className="font-medium">Expert Guides</div>
                          <div className="text-sm text-gray-600">Local professionals</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Camera className="w-8 h-8 text-purple-500" />
                        <div>
                          <div className="font-medium">Photo Spots</div>
                          <div className="text-sm text-gray-600">Instagram-worthy</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="itinerary" className="space-y-4">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                            {day.day}
                          </div>
                          <div>
                            <h4 className="font-semibold">{day.title}</h4>
                            <p className="text-sm text-gray-600">{day.description}</p>
                          </div>
                        </div>
                        <ul className="space-y-1 ml-11">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="text-sm text-gray-700 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="included" className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Check className="w-5 h-5 text-green-500" />
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {packageData.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-red-500" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {packageData.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{packageData.rating}</div>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{packageData.reviewCount} reviews</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Sample reviews */}
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            JD
                          </div>
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="flex items-center gap-1">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          "Amazing experience! The guide was knowledgeable and the itinerary was well-planned. 
                          Seoul is a fascinating city and this tour really helped us understand the culture."
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* All Availabilities - Show when more than 4 dates */}
            {packageData.availabilities.length > 4 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">All Availabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {packageData.availabilities.map((availability, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(availability.date)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          selectedDate === availability.date 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{availability.date}</div>
                            <div className="text-xs text-gray-600">{availability.spotsLeft} spots left</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">${availability.price}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">${packageData.price}</span>
                    <span className="text-lg text-gray-500 line-through">${packageData.originalPrice}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save ${packageData.originalPrice - packageData.price}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">per person</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Physical rating:</span>
                      <Badge variant="outline">{packageData.physicalRating}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Min age:</span>
                      <span>{packageData.minAge} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Group size:</span>
                      <span>Max {packageData.maxGroupSize}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Availabilities</h4>
                    <div className="space-y-2">
                      {packageData.availabilities.slice(0, 4).map((availability, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedDate(availability.date)}
                          className={`w-full p-3 border rounded-lg text-left transition-colors ${
                            selectedDate === availability.date 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{availability.date}</div>
                              <div className="text-sm text-gray-600">{availability.spotsLeft} spots left</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${availability.price}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {packageData.availabilities.length > 4 && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        {packageData.availabilities.length - 4} more dates available below
                      </p>
                    )}
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Booking
                  </Button>

                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
