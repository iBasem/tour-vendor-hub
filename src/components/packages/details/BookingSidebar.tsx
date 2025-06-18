
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";
import { PackageDetails } from "@/hooks/usePackageDetails";

interface BookingSidebarProps {
  packageData: PackageDetails;
}

export function BookingSidebar({ packageData }: BookingSidebarProps) {
  const handleBookNow = () => {
    console.log('Booking requested for package:', packageData.id);
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              ${packageData.base_price}
            </span>
          </div>
          <p className="text-sm text-gray-600">per person • {packageData.category} tour</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={handleBookNow}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Request Booking
        </Button>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-3">Package Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span>{packageData.duration_days} days, {packageData.duration_nights} nights</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Max Participants:</span>
              <span>{packageData.max_participants}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty:</span>
              <span className="capitalize">{packageData.difficulty_level || 'Moderate'}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-center text-sm text-gray-600">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield className="w-4 h-4" />
            <span>Secure booking</span>
          </div>
          <p>No payment required to reserve</p>
        </div>
      </CardContent>
    </Card>
  );
}
