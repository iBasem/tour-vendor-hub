
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star, User } from "lucide-react";

interface HeaderSectionProps {
  onAuthModalOpen: (mode: "signin" | "signup") => void;
  onAgencyAuthModalOpen: (mode: "signin" | "signup") => void;
}

export function HeaderSection({ onAuthModalOpen, onAgencyAuthModalOpen }: HeaderSectionProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-blue-600">travelle</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#destinations" className="text-gray-700 hover:text-blue-600">Destinations</Link>
            <Link to="#deals" className="text-gray-700 hover:text-blue-600">Deals</Link>
            <Link to="#contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Shop 2,500 operators</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm">4.5 stars</span>
          </div>
          <span className="text-sm text-gray-600">24/7 customer support</span>
          <Button 
            variant="ghost" 
            onClick={() => onAuthModalOpen("signin")}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Sign In
          </Button>
          <Button 
            variant="outline"
            onClick={() => onAgencyAuthModalOpen("signin")}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Travel Agency
          </Button>
        </div>
      </div>
    </header>
  );
}
