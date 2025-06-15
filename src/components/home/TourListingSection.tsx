
import { ToursSection } from "./ToursSection";

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

interface TourListingSectionProps {
  title: string;
  description: string;
  tours: Tour[];
  showViewAll?: boolean;
  backgroundClass?: string;
}

export function TourListingSection({ 
  title, 
  description, 
  tours, 
  showViewAll = true, 
  backgroundClass = "" 
}: TourListingSectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-6 py-16 ${backgroundClass}`}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <ToursSection tours={tours} showViewAll={showViewAll} />
    </section>
  );
}
