
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, MapPin, Star } from "lucide-react";

export default function Guides() {
  const guides = [
    {
      id: 1,
      name: "Marie Dubois",
      location: "Paris, France",
      rating: 4.9,
      reviews: 127,
      languages: ["French", "English", "Spanish"],
      specialties: ["Historical Tours", "Art & Culture"]
    },
    {
      id: 2,
      name: "Hiroshi Tanaka",
      location: "Tokyo, Japan",
      rating: 4.8,
      reviews: 89,
      languages: ["Japanese", "English"],
      specialties: ["City Tours", "Food Experience"]
    },
    {
      id: 3,
      name: "Kadek Sari",
      location: "Bali, Indonesia",
      rating: 4.9,
      reviews: 156,
      languages: ["Indonesian", "English"],
      specialties: ["Nature Tours", "Cultural Experience"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tour Guides</h1>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">
                    {guide.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <CardTitle className="text-lg">{guide.name}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {guide.location}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{guide.rating}</span>
                  <span className="text-sm text-gray-600">({guide.reviews} reviews)</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Languages:</p>
                  <p className="text-sm text-gray-600">{guide.languages.join(", ")}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {guide.specialties.map((specialty) => (
                      <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
