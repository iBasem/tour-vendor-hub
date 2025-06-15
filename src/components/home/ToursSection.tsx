
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users } from "lucide-react";

const tours = [
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
    operator: "Intrepid Travel"
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
    operator: "G Adventures"
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
    operator: "On The Go Tours"
  }
];

export function ToursSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Tours</h2>
          <p className="text-gray-600">Discover our most popular adventures</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link to="/packages">See deals</Link>
          </Button>
          <Button asChild>
            <Link to="/packages">View all</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                -{tour.discount}% OFF
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <p className="text-sm text-blue-600 font-medium">{tour.operator}</p>
                <h3 className="font-semibold text-lg leading-tight">{tour.title}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tour.destination}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{tour.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({tour.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        ${tour.originalPrice}
                      </span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${tour.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to={`/packages/${tour.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
