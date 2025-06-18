
import { ToursSection } from "./ToursSection";
import { EmptyState } from "@/components/ui/empty-state";
import type { PackageWithMedia } from "@/hooks/usePublishedPackages";

interface TourListingSectionProps {
  title: string;
  description: string;
  packages: PackageWithMedia[];
  showViewAll?: boolean;
  backgroundClass?: string;
}

export function TourListingSection({ 
  title, 
  description, 
  packages, 
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
      
      {packages.length > 0 ? (
        <ToursSection packages={packages} showViewAll={showViewAll} />
      ) : (
        <EmptyState
          icon="package"
          title="No packages available"
          description="Check back soon for new travel experiences"
        />
      )}
    </section>
  );
}
