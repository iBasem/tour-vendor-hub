
import { Link } from "react-router-dom";
import { TourCard } from "./TourCard";
import { Button } from "@/components/ui/button";
import type { PackageWithMedia } from "@/hooks/usePublishedPackages";

interface ToursSectionProps {
  packages: PackageWithMedia[];
  showViewAll?: boolean;
}

export function ToursSection({ packages, showViewAll = true }: ToursSectionProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {packages.map((pkg) => (
          <TourCard key={pkg.id} package={pkg} />
        ))}
      </div>
      
      {showViewAll && packages.length > 0 && (
        <div className="text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/packages">View All Tours</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
