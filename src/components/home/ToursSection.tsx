
import { Button } from "@/components/ui/button";
import { TourCard } from "./TourCard";

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
  title: string;
  tours: Tour[];
  buttonText?: string;
  backgroundColor?: string;
}

export function ToursSection({ title, tours, buttonText, backgroundColor = "bg-white" }: ToursSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {buttonText && (
            <Button variant="outline" className="text-blue-600 border-blue-600">
              {buttonText}
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
