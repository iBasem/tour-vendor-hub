
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, MapPin } from 'lucide-react';
import { BookingFormData } from '../BookingWizard';

interface BookingStep1Props {
  formData: BookingFormData;
  updateFormData: (updates: Partial<BookingFormData>) => void;
  packageData: {
    id: number;
    title: string;
    price: number;
    availabilities: Array<{
      date: string;
      price: number;
      spotsLeft: number;
    }>;
  };
}

export function BookingStep1({ formData, updateFormData, packageData }: BookingStep1Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Travel Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packageData.availabilities.map((availability, index) => (
              <button
                key={index}
                onClick={() => updateFormData({ 
                  selectedDate: availability.date,
                  totalAmount: availability.price * formData.travelers
                })}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  formData.selectedDate === availability.date
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{availability.date}</div>
                    <div className="text-sm text-gray-600">
                      {availability.spotsLeft} spots left
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${availability.price}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Number of Travelers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="travelers">How many people will be traveling?</Label>
              <Select
                value={formData.travelers.toString()}
                onValueChange={(value) => {
                  const travelers = parseInt(value);
                  const selectedAvailability = packageData.availabilities.find(
                    a => a.date === formData.selectedDate
                  );
                  const pricePerPerson = selectedAvailability?.price || packageData.price;
                  
                  updateFormData({ 
                    travelers,
                    totalAmount: pricePerPerson * travelers
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Traveler' : 'Travelers'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.selectedDate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Selected Date: {formData.selectedDate}</div>
                    <div className="text-sm text-gray-600">{formData.travelers} travelers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${formData.totalAmount}
                    </div>
                    <div className="text-sm text-gray-600">Total estimated cost</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Special Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="special-requests">
              Any special requests or requirements? (Optional)
            </Label>
            <Textarea
              id="special-requests"
              placeholder="e.g., dietary restrictions, accessibility needs, celebration occasions..."
              value={formData.specialRequests}
              onChange={(e) => updateFormData({ specialRequests: e.target.value })}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
