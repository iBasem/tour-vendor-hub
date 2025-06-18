
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Users, Building } from "lucide-react";
import { Link } from "react-router-dom";

export function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">travelle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link to="/packages" className="text-gray-600 hover:text-gray-900 transition-colors">
              Packages
            </Link>
            <Link to="/destinations" className="text-gray-600 hover:text-gray-900 transition-colors">
              Destinations
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/auth?type=traveler">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Traveler
              </Button>
            </Link>
            <Link to="/auth?type=agency">
              <Button size="sm" className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                Agency
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-3">
              {/* Navigation Links */}
              <Link
                to="/"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/packages"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Packages
              </Link>
              <Link
                to="/destinations"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              
              {/* Auth Buttons */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link to="/auth?type=traveler" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Traveler Login
                  </Button>
                </Link>
                <Link to="/auth?type=agency" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start">
                    <Building className="w-4 h-4 mr-2" />
                    Agency Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
