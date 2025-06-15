
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Heart, Share2 } from "lucide-react";

interface PackageHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  groupSize: string;
  rating: number;
  reviews: number;
  discount?: number;
  selectedTourType: string;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

export function PackageHeader({
  title,
  subtitle,
  duration,
  groupSize,
  rating,
  reviews,
  discount,
  selectedTourType,
  isWishlisted,
  onWishlistToggle
}: PackageHeaderProps) {
  const getTourTypeBadgeColor = (type: string) => {
    switch (type) {
      case "group": return "bg-blue-100 text-blue-800 border-blue-200";
      case "private": return "bg-purple-100 text-purple-800 border-purple-200";
      case "customizable": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {discount && discount > 0 && (
            <Badge className="bg-red-500 text-white">
              -{discount}% OFF
            </Badge>
          )}
          <Badge className={`capitalize ${getTourTypeBadgeColor(selectedTourType)}`}>
            {selectedTourType} tour
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-4">{subtitle}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {groupSize}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{rating}</span>
            <span>({reviews} reviews)</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={onWishlistToggle}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
