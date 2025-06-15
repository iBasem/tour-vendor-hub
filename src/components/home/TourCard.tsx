
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";

interface Tour {
  id: number;
  title: string;
  duration: string;
  rating: number;
  reviews: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  image: string;
  isNew?: boolean;
}

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Link to={`/packages/${tour.id}`}>
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={tour.image} 
              alt={tour.title}
              className="w-full h-48 object-cover"
            />
            {tour.isNew && (
              <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                NEW
              </Badge>
            )}
            {tour.discount > 0 && (
              <Badge className={`absolute top-2 ${tour.isNew ? 'right-12' : 'left-2'} bg-red-500 text-white`}>
                -{tour.discount}% OFF
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={(e) => e.preventDefault()}
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
    </Link>
  );
}
