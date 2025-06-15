
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin, CreditCard, Check } from 'lucide-react';
import { BookingFormData } from '../BookingWizard';

interface BookingStep4Props {
  formData: BookingFormData;
  updateFormData: (updates: Partial<BookingFormData>) => void;
  packageData: {
    id: number;
    title: string;
    price: number;
  };
  onSubmit: () => void;
}

export function BookingStep4({ formData, updateFormData, packageData, onSubmit }: BookingStep4Props) {
  const totalCost = formData.totalAmount + 
    (formData.travelInsurance ? 49 * formData.travelers : 0) +
    (formData.airportTransfer ? 35 * formData.travelers : 0);

  const isFormValid = formData.termsAccepted && 
    formData.leadTraveler.firstName && 
    formData.leadTraveler.lastName && 
    formData.leadTraveler.email &&
    formData.selectedDate;

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">{packageData.title}</div>
                <div className="text-sm text-gray-600">Tour Package</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">{formData.selectedDate}</div>
                <div className="text-sm text-gray-600">Departure Date</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium">{formData.travelers} {formData.travelers === 1 ? 'Traveler' : 'Travelers'}</div>
                <div className="text-sm text-gray-600">
                  Lead: {formData.leadTraveler.firstName} {formData.leadTraveler.lastName}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Traveler Information */}
      <Card>
        <CardHeader>
          <CardTitle>Traveler Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">
                {formData.leadTraveler.firstName} {formData.leadTraveler.lastName} (Lead)
              </div>
              <div className="text-sm text-gray-600">{formData.leadTraveler.email}</div>
            </div>
            
            {formData.additionalTravelers.map((traveler, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">
                  {traveler.firstName} {traveler.lastName}
                </div>
                <div className="text-sm text-gray-600">Additional Traveler</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Services */}
      {(formData.travelInsurance || formData.airportTransfer || formData.dietaryRestrictions.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Room Preference:</span>
                <span className="capitalize">{formData.roomPreference} room</span>
              </div>
              
              {formData.dietaryRestrictions.length > 0 && (
                <div className="flex justify-between">
                  <span>Dietary Requirements:</span>
                  <span>{formData.dietaryRestrictions.join(', ')}</span>
                </div>
              )}
              
              {formData.travelInsurance && (
                <div className="flex justify-between">
                  <span>Travel Insurance:</span>
                  <span>Added (+${49 * formData.travelers})</span>
                </div>
              )}
              
              {formData.airportTransfer && (
                <div className="flex justify-between">
                  <span>Airport Transfer:</span>
                  <span>Added (+${35 * formData.travelers})</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Select payment method</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => updateFormData({ paymentMethod: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-800 mb-2">
                <strong>Payment Notice:</strong>
              </div>
              <div className="text-sm text-blue-700">
                A deposit of 25% is required to confirm your booking. The remaining balance will be due 30 days before departure.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Final Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Tour Package ({formData.travelers} × ${formData.totalAmount / formData.travelers})</span>
              <span>${formData.totalAmount}</span>
            </div>
            
            {formData.travelInsurance && (
              <div className="flex justify-between text-sm">
                <span>Travel Insurance ({formData.travelers} × $49)</span>
                <span>+${49 * formData.travelers}</span>
              </div>
            )}
            
            {formData.airportTransfer && (
              <div className="flex justify-between text-sm">
                <span>Airport Transfer ({formData.travelers} × $35)</span>
                <span>+${35 * formData.travelers}</span>
              </div>
            )}
            
            <hr className="my-3" />
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-600">${totalCost}</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Deposit Required (25%)</span>
              <span>${Math.round(totalCost * 0.25)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => updateFormData({ termsAccepted: !!checked })}
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="cursor-pointer text-sm">
                  I agree to the Terms & Conditions, Privacy Policy, and Cancellation Policy
                </Label>
                <p className="text-xs text-gray-500">
                  By checking this box, you acknowledge that you have read and agree to our terms and policies.
                </p>
              </div>
            </div>
            
            <Button
              onClick={onSubmit}
              disabled={!isFormValid}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Submit Booking Request
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              This is a booking request. We will contact you within 24 hours to confirm availability and process payment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
