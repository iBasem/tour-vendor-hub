
import { useState } from "react";
import { PackageWizard } from "@/components/travel_agency/packages/PackageWizard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, MapPin, Users, DollarSign } from "lucide-react";

export default function CreatePackage() {
  const [showWizard, setShowWizard] = useState(false);

  const features = [
    {
      icon: Package,
      title: "Complete Package Builder",
      description: "Create detailed travel packages with itineraries, pricing, and media"
    },
    {
      icon: MapPin,
      title: "Destination Management",
      description: "Set destinations, difficulty levels, and duration for your packages"
    },
    {
      icon: Users,
      title: "Group Size Control",
      description: "Define maximum participants and manage bookings effectively"
    },
    {
      icon: DollarSign,
      title: "Flexible Pricing",
      description: "Set base prices, inclusions, exclusions, and cancellation policies"
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Travel Package</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use our comprehensive package builder to create amazing travel experiences for your customers.
          Add detailed itineraries, pricing information, and showcase your packages with beautiful media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <feature.icon className="w-6 h-6 text-blue-600" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Ready to create a new travel package?</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Our step-by-step wizard will guide you through creating a comprehensive travel package
            that your customers will love.
          </p>
          <Button 
            onClick={() => setShowWizard(true)} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Start Package Creation
          </Button>
        </div>
      </div>

      <PackageWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
      />
    </div>
  );
}
