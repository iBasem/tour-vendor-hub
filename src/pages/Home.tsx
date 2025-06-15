
import { HeaderSection } from "@/components/home/HeaderSection";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { TourListingSection } from "@/components/home/TourListingSection";
import { FooterSection } from "@/components/home/FooterSection";
import { trendingAdventures, newAdventures, recentlyViewed } from "@/data/tours";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <HeroSection />
      
      <DestinationsSection />
      
      <TourListingSection
        title="Trending Adventures"
        description="Discover our most popular adventures"
        tours={trendingAdventures}
        showViewAll={true}
        backgroundClass="bg-gray-50"
      />
      
      <TourListingSection
        title="New Adventures"
        description="Explore our latest tour offerings"
        tours={newAdventures}
        showViewAll={true}
      />
      
      <TourListingSection
        title="Recently Viewed"
        description="Continue exploring these packages"
        tours={recentlyViewed}
        showViewAll={false}
        backgroundClass="bg-gray-50"
      />
      
      <FooterSection />
    </div>
  );
}
