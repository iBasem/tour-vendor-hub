
import { AuthModal } from "@/components/auth/AuthModal";
import { HeaderSection } from "@/components/home/HeaderSection";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { TourListingSection } from "@/components/home/TourListingSection";
import { FooterSection } from "@/components/home/FooterSection";
import { useAuthModal } from "@/hooks/useAuthModal";
import { trendingAdventures, newAdventures, recentlyViewed } from "@/data/tours";

export default function Home() {
  const {
    isAuthModalOpen,
    isAgencyAuthModalOpen,
    authMode,
    openAuthModal,
    openAgencyAuthModal,
    closeAuthModal,
    closeAgencyAuthModal,
  } = useAuthModal();

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection 
        onAuthModalOpen={openAuthModal}
        onAgencyAuthModalOpen={openAgencyAuthModal}
      />
      
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
        userType="traveler"
      />
      
      <AuthModal
        isOpen={isAgencyAuthModalOpen}
        onClose={closeAgencyAuthModal}
        initialMode={authMode}
        userType="agency"
      />
    </div>
  );
}
