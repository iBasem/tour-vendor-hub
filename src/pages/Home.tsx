
import { HeaderSection } from "@/components/home/HeaderSection";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { TourListingSection } from "@/components/home/TourListingSection";
import { FooterSection } from "@/components/home/FooterSection";
import { useFeaturedPackages } from "@/hooks/useFeaturedPackages";
import { usePublishedPackages } from "@/hooks/usePublishedPackages";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Home() {
  const { packages: featuredPackages, loading: featuredLoading } = useFeaturedPackages(4);
  const { packages: allPackages, loading: allLoading } = usePublishedPackages();

  // Get latest packages (non-featured)
  const latestPackages = allPackages
    .filter(pkg => !pkg.featured)
    .slice(0, 4);

  // Get recently added packages
  const recentPackages = allPackages
    .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
    .slice(0, 4);

  if (featuredLoading || allLoading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderSection />
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <HeroSection />
      
      <DestinationsSection />
      
      <TourListingSection
        title="Featured Adventures"
        description="Discover our most popular adventures"
        packages={featuredPackages}
        showViewAll={true}
        backgroundClass="bg-gray-50"
      />
      
      <TourListingSection
        title="Latest Adventures"
        description="Explore our newest tour offerings"
        packages={latestPackages}
        showViewAll={true}
      />
      
      <TourListingSection
        title="Recently Added"
        description="Fresh travel experiences await"
        packages={recentPackages}
        showViewAll={false}
        backgroundClass="bg-gray-50"
      />
      
      <FooterSection />
    </div>
  );
}
