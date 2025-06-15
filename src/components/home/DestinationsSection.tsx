
import { Card, CardContent } from "@/components/ui/card";

const destinationCards = [
  {
    id: 1,
    title: "Europe",
    subtitle: "Cultural Journeys",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop",
    color: "bg-green-50"
  },
  {
    id: 2,
    title: "Asia",
    subtitle: "Adventure Tours",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    color: "bg-orange-50"
  },
  {
    id: 3,
    title: "Americas",
    subtitle: "Wild Expeditions",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop",
    color: "bg-red-50"
  },
  {
    id: 4,
    title: "Africa",
    subtitle: "Safari Adventures",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop",
    color: "bg-yellow-50"
  },
  {
    id: 5,
    title: "Oceania",
    subtitle: "Island Escapes",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    color: "bg-blue-50"
  }
];

export function DestinationsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
        <p className="text-gray-600">Discover amazing places around the world</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {destinationCards.map((destination) => (
          <Card key={destination.id} className={`overflow-hidden cursor-pointer hover:shadow-lg transition-shadow ${destination.color}`}>
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.title}
                  className="w-full h-32 object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900">{destination.title}</h3>
                <p className="text-sm text-gray-600">{destination.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
