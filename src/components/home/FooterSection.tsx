import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";

export function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">travelle</span>
            </div>
            <p className="text-gray-400">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#about" className="hover:text-white">{t('footer.aboutUs')}</Link></li>
              <li><Link to="#careers" className="hover:text-white">{t('footer.careers')}</Link></li>
              <li><Link to="#press" className="hover:text-white">{t('footer.press')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#help" className="hover:text-white">{t('footer.helpCenter')}</Link></li>
              <li><Link to="#contact" className="hover:text-white">{t('footer.contactUs')}</Link></li>
              <li><Link to="#safety" className="hover:text-white">{t('footer.safety')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#terms" className="hover:text-white">{t('footer.termsOfService')}</Link></li>
              <li><Link to="#privacy" className="hover:text-white">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="#cookies" className="hover:text-white">{t('footer.cookiePolicy')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
