
import { Link } from "react-router-dom";
import { TourCard } from "./TourCard";
import { Button } from "@/components/ui/button";

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

interface ToursSectionProps {
  tours: Tour[];
  showViewAll?: boolean;
}

export function ToursSection({ tours, showViewAll = true }: ToursSectionProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
      
      {showViewAll && (
        <div className="text-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/packages">View All Tours</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
