
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin } from "lucide-react";
import type { PackageWithMedia } from "@/hooks/usePublishedPackages";

interface TourCardProps {
  package: PackageWithMedia;
}

export function TourCard({ package: pkg }: TourCardProps) {
  const primaryImage = pkg.package_media?.find(m => m.is_primary) || pkg.package_media?.[0];
  const imageUrl = primaryImage?.file_path || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop";
  
  return (
    <Link to={`/packages/${pkg.id}`}>
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            {pkg.featured && (
              <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                FEATURED
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
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{pkg.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">{pkg.duration_days} days</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-gray-500">(24)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ${pkg.base_price}
                </span>
                <span className="text-sm text-gray-500 ml-1">per person</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
