
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search } from "lucide-react";

export function HeroSection() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Book the Best Tours & Adventures</h1>
          <p className="text-xl opacity-90">Choose from thousands of Organized Adventures</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Where to?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10 h-12 text-gray-900"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="When?"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="pl-10 h-12 text-gray-900"
              />
            </div>
            <Button className="h-12 bg-blue-600 hover:bg-blue-700">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
