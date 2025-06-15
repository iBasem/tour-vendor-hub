
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Heart, 
  Star, 
  MapPin, 
  Calendar,
  TrendingUp,
  Clock
} from "lucide-react";

const upcomingBookings = [
  {
    id: 1,
    title: "Best Of Vietnam in 14 Days",
    date: "March 15, 2024",
    status: "Confirmed",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "European Classic Journey",
    date: "April 22, 2024",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop"
  }
];

const recentlyViewed = [
  {
    id: 1,
    title: "Iceland Northern Lights",
    price: "$1,980",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Morocco Desert Experience",
    price: "$1,485",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73d0e?w=400&h=300&fit=crop"
  }
];

export default function TravelerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100 mb-4">Ready for your next adventure? Discover new destinations and manage your trips.</p>
        <Link to="/">
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Explore New Tours
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wishlist Items</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Reviews Given</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Countries Visited</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Upcoming Trips
            </CardTitle>
            <Link to="/traveler/dashboard/bookings">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={booking.image} 
                  alt={booking.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{booking.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {booking.date}
                  </p>
                </div>
                <Badge variant={booking.status === "Confirmed" ? "default" : "secondary"}>
                  {booking.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recently Viewed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recently Viewed
            </CardTitle>
            <Link to="/traveler/dashboard/wishlist">
              <Button variant="outline" size="sm">View Wishlist</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentlyViewed.map((tour) => (
              <div key={tour.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img 
                  src={tour.image} 
                  alt={tour.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{tour.title}</h4>
                  <p className="text-sm text-gray-600">From {tour.price}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
