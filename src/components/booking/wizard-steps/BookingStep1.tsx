
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Users, MapPin } from 'lucide-react';
import { BookingFormData } from '../BookingWizard';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t('booking.selectTravelDate')}
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
                      {availability.spotsLeft} {t('booking.spotsLeft')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${availability.price}</div>
                    <div className="text-sm text-gray-600">{t('common.perPerson')}</div>
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
            {t('booking.numberOfTravelers')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="travelers">{t('booking.howManyTraveling')}</Label>
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
                  <SelectValue placeholder={t('booking.selectNumberTravelers')} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? t('booking.travelerSingular') : t('booking.travelerPlural')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.selectedDate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t('booking.selectedDate')}: {formData.selectedDate}</div>
                    <div className="text-sm text-gray-600">{formData.travelers} {formData.travelers === 1 ? t('booking.travelerSingular') : t('booking.travelerPlural')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${formData.totalAmount}
                    </div>
                    <div className="text-sm text-gray-600">{t('booking.totalEstimatedCost')}</div>
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
            {t('booking.specialRequests')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="special-requests">
              {t('booking.specialRequestsOptional')}
            </Label>
            <Textarea
              id="special-requests"
              placeholder={t('booking.specialRequestsPlaceholder')}
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
