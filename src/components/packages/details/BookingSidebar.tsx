
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

interface BookingSidebarProps {
  currentPrice: number;
  originalPrice?: number;
  selectedTourType: string;
  availabilities: Array<{
    date: string;
    price: number;
    spotsLeft: number;
  }>;
  onBookNow: (date?: string) => void;
}

export function BookingSidebar({
  currentPrice,
  originalPrice,
  selectedTourType,
  availabilities,
  onBookNow
}: BookingSidebarProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {originalPrice && originalPrice > currentPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-3xl font-bold text-gray-900">
              ${currentPrice}
            </span>
          </div>
          <p className="text-sm text-gray-600">per person • {selectedTourType} tour</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => onBookNow()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          size="lg"
        >
          Request Booking
        </Button>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-3">Available Dates</h4>
          <div className="space-y-2">
            {availabilities.map((availability, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">
                    {new Date(availability.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {availability.spotsLeft} spots left
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${currentPrice}</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onBookNow(availability.date)}
                    className="mt-1"
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
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
