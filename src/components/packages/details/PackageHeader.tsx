
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Heart, Share2 } from "lucide-react";
import { PackageDetails } from "@/hooks/usePackageDetails";

interface PackageHeaderProps {
  packageData: PackageDetails;
}

export function PackageHeader({ packageData }: PackageHeaderProps) {
  const getTourTypeBadgeColor = (type: string) => {
    switch (type) {
      case "group": return "bg-blue-100 text-blue-800 border-blue-200";
      case "private": return "bg-purple-100 text-purple-800 border-purple-200";
      case "customizable": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {packageData.featured && (
            <Badge className="bg-red-500 text-white text-xs">
              FEATURED
            </Badge>
          )}
          <Badge className={`capitalize text-xs ${getTourTypeBadgeColor(packageData.category)}`}>
            {packageData.category} tour
          </Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{packageData.title}</h1>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">{packageData.description}</p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{packageData.duration_days} days, {packageData.duration_nights} nights</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Max {packageData.max_participants} people</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
            <span className="font-medium">4.8</span>
            <span className="hidden sm:inline">(124 reviews)</span>
            <span className="sm:hidden">(124)</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 self-start">
        <Button
          variant="secondary"
          size="sm"
          className="w-8 h-8 sm:w-10 sm:h-10 p-0"
        >
          <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-8 h-8 sm:w-10 sm:h-10 p-0"
        >
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
}
