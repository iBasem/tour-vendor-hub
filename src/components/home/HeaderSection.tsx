import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Users, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Set document direction on mount and language change
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

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
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/packages" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.packages')}
            </Link>
            <Link to="/destinations" className="text-gray-600 hover:text-gray-900 transition-colors">
              {t('nav.destinations')}
            </Link>
          </nav>

          {/* Desktop Auth Buttons & Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/auth?type=traveler">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {t('common.traveler')}
              </Button>
            </Link>
            <Link to="/auth?type=agency">
              <Button size="sm" className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {t('common.agency')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
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
                {t('nav.home')}
              </Link>
              <Link
                to="/packages"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.packages')}
              </Link>
              <Link
                to="/destinations"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.destinations')}
              </Link>
              
              {/* Auth Buttons */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <Link to="/auth?type=traveler" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Users className="w-4 h-4 me-2" />
                    {t('nav.travelerLogin')}
                  </Button>
                </Link>
                <Link to="/auth?type=agency" onClick={() => setIsMenuOpen(false)}>
                  <Button size="sm" className="w-full justify-start">
                    <Building className="w-4 h-4 me-2" />
                    {t('nav.agencyLogin')}
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
