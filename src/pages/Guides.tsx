
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Star, MapPin, Languages, Award } from "lucide-react";

const guides = [
  {
    id: 1,
    name: "Liam Parker",
    location: "Paris, France",
    specialties: ["City Tours", "Historical Sites"],
    languages: ["English", "French", "Spanish"],
    rating: 4.9,
    reviews: 127,
    experience: "5+ years",
    status: "Available",
    avatar: "/placeholder.svg",
    verified: true
  },
  {
    id: 2,
    name: "Emma Johnson",
    location: "Tokyo, Japan",
    specialties: ["Cultural Tours", "Food Tours"],
    languages: ["English", "Japanese"],
    rating: 4.8,
    reviews: 89,
    experience: "3+ years",
    status: "Busy",
    avatar: "/placeholder.svg",
    verified: true
  },
  {
    id: 3,
    name: "Noah Brown",
    location: "Sydney, Australia",
    specialties: ["Adventure Tours", "Nature Walks"],
    languages: ["English"],
    rating: 4.7,
    reviews: 156,
    experience: "7+ years",
    status: "Available",
    avatar: "/placeholder.svg",
    verified: false
  },
  {
    id: 4,
    name: "Ava Davis",
    location: "Venice, Italy",
    specialties: ["Romantic Tours", "Art History"],
    languages: ["English", "Italian", "German"],
    rating: 4.9,
    reviews: 203,
    experience: "8+ years",
    status: "Available",
    avatar: "/placeholder.svg",
    verified: true
  },
  {
    id: 5,
    name: "William Martinez",
    location: "Serengeti, Tanzania",
    specialties: ["Safari Tours", "Wildlife Photography"],
    languages: ["English", "Swahili"],
    rating: 4.8,
    reviews: 94,
    experience: "6+ years",
    status: "On Tour",
    avatar: "/placeholder.svg",
    verified: true
  }
];

export default function Guides() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuides = guides.filter(guide =>
    guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "On Tour":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Guides</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Guide
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search guides..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={guide.avatar} />
                    <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{guide.name}</h3>
                      {guide.verified && (
                        <Award className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {guide.location}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(guide.status)}>
                  {guide.status}
                </Badge>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{guide.rating}</span>
                </div>
                <span className="text-sm text-gray-600">({guide.reviews} reviews)</span>
              </div>

              {/* Specialties */}
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Languages className="w-4 h-4" />
                  {guide.languages.join(", ")}
                </div>
              </div>

              {/* Experience */}
              <div className="mb-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {guide.experience}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  disabled={guide.status !== "Available"}
                >
                  View Profile
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={guide.status !== "Available"}
                >
                  Book Tour
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{guides.length}</div>
            <div className="text-sm text-gray-600">Total Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {guides.filter(g => g.status === "Available").length}
            </div>
            <div className="text-sm text-gray-600">Available Now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {guides.filter(g => g.verified).length}
            </div>
            <div className="text-sm text-gray-600">Verified Guides</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
