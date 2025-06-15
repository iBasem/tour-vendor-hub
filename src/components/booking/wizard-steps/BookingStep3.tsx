
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bed, Utensils, Shield, Car } from 'lucide-react';
import { BookingFormData } from '../BookingWizard';

interface BookingStep3Props {
  formData: BookingFormData;
  updateFormData: (updates: Partial<BookingFormData>) => void;
}

const DIETARY_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Halal',
  'Kosher',
  'Nut allergies',
  'Dairy-free',
  'Other'
];

export function BookingStep3({ formData, updateFormData }: BookingStep3Props) {
  const toggleDietaryRestriction = (restriction: string) => {
    const current = formData.dietaryRestrictions;
    const updated = current.includes(restriction)
      ? current.filter(r => r !== restriction)
      : [...current, restriction];
    
    updateFormData({ dietaryRestrictions: updated });
  };

  return (
    <div className="space-y-6">
      {/* Room Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bed className="w-5 h-5" />
            Room Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Preferred room type</Label>
              <Select
                value={formData.roomPreference}
                onValueChange={(value) => updateFormData({ roomPreference: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Room</SelectItem>
                  <SelectItem value="double">Double Room</SelectItem>
                  <SelectItem value="twin">Twin Beds</SelectItem>
                  <SelectItem value="family">Family Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Dietary Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Select any dietary restrictions or preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {DIETARY_OPTIONS.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${option}`}
                    checked={formData.dietaryRestrictions.includes(option)}
                    onCheckedChange={() => toggleDietaryRestriction(option)}
                  />
                  <Label
                    htmlFor={`dietary-${option}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Insurance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Travel Insurance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="travel-insurance"
                checked={formData.travelInsurance}
                onCheckedChange={(checked) => updateFormData({ travelInsurance: !!checked })}
              />
              <div className="space-y-1">
                <Label htmlFor="travel-insurance" className="cursor-pointer">
                  Add comprehensive travel insurance (+$49 per person)
                </Label>
                <p className="text-sm text-gray-600">
                  Covers trip cancellation, medical emergencies, and lost luggage
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Airport Transfer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Airport Transfer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="airport-transfer"
                checked={formData.airportTransfer}
                onCheckedChange={(checked) => updateFormData({ airportTransfer: !!checked })}
              />
              <div className="space-y-1">
                <Label htmlFor="airport-transfer" className="cursor-pointer">
                  Add round-trip airport transfer (+$35 per person)
                </Label>
                <p className="text-sm text-gray-600">
                  Private transfer from/to the airport for your convenience
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tour package ({formData.travelers} travelers)</span>
              <span>${formData.totalAmount}</span>
            </div>
            {formData.travelInsurance && (
              <div className="flex justify-between text-sm">
                <span>Travel insurance ({formData.travelers} × $49)</span>
                <span>+${49 * formData.travelers}</span>
              </div>
            )}
            {formData.airportTransfer && (
              <div className="flex justify-between text-sm">
                <span>Airport transfer ({formData.travelers} × $35)</span>
                <span>+${35 * formData.travelers}</span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total Estimated Cost</span>
              <span className="text-blue-600">
                ${formData.totalAmount + 
                  (formData.travelInsurance ? 49 * formData.travelers : 0) + 
                  (formData.airportTransfer ? 35 * formData.travelers : 0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
