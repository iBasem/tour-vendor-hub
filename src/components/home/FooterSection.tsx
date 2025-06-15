
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export function FooterSection() {
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
            <p className="text-gray-400">Discover amazing adventures around the world</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#about" className="hover:text-white">About Us</Link></li>
              <li><Link to="#careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="#press" className="hover:text-white">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#help" className="hover:text-white">Help Center</Link></li>
              <li><Link to="#contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link to="#safety" className="hover:text-white">Safety</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="#privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="#cookies" className="hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Trav elle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
