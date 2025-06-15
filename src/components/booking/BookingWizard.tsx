
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingProgressBar } from './BookingProgressBar';
import { BookingNavigation } from './BookingNavigation';
import { BookingStep1 } from './wizard-steps/BookingStep1';
import { BookingStep2 } from './wizard-steps/BookingStep2';
import { BookingStep3 } from './wizard-steps/BookingStep3';
import { BookingStep4 } from './wizard-steps/BookingStep4';
import { toast } from 'sonner';

interface BookingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: number;
    title: string;
    price: number;
    availabilities: Array<{
      date: string;
      price: number;
      spotsLeft: number;
    }>;
    tourType?: string;
  };
  selectedDate?: string;
}

export interface BookingFormData {
  selectedDate: string;
  travelers: number;
  specialRequests: string;
  tourType: string;
  leadTraveler: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
  };
  additionalTravelers: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
  }>;
  roomPreference: string;
  dietaryRestrictions: string[];
  travelInsurance: boolean;
  airportTransfer: boolean;
  totalAmount: number;
  paymentMethod: string;
  termsAccepted: boolean;
}

export function BookingWizard({ isOpen, onClose, packageData, selectedDate }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    selectedDate: selectedDate || '',
    travelers: 1,
    specialRequests: '',
    tourType: packageData.tourType || 'group',
    leadTraveler: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: '',
    },
    additionalTravelers: [],
    roomPreference: 'double',
    dietaryRestrictions: [],
    travelInsurance: false,
    airportTransfer: false,
    totalAmount: packageData.price,
    paymentMethod: 'card',
    termsAccepted: false,
  });

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log('Booking submitted:', formData);
      toast.success('Booking request submitted successfully! We will contact you shortly to confirm your booking.');
      onClose();
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        selectedDate: '',
        travelers: 1,
        specialRequests: '',
        leadTraveler: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          nationality: '',
          passportNumber: '',
        },
        additionalTravelers: [],
        roomPreference: 'double',
        dietaryRestrictions: [],
        travelInsurance: false,
        airportTransfer: false,
        totalAmount: packageData.price,
        paymentMethod: 'card',
        termsAccepted: false,
      });
    } catch (error) {
      toast.error('Failed to submit booking request. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStep1
            formData={formData}
            updateFormData={updateFormData}
            packageData={packageData}
          />
        );
      case 2:
        return (
          <BookingStep2
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <BookingStep3
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <BookingStep4
            formData={formData}
            updateFormData={updateFormData}
            packageData={packageData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Request Booking - {packageData.title}
            {packageData.tourType && (
              <div className="text-sm font-normal text-gray-600 mt-1">
                {packageData.tourType.charAt(0).toUpperCase() + packageData.tourType.slice(1)} Tour
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <BookingProgressBar currentStep={currentStep} />

        <div className="mb-6">
          {renderStep()}
        </div>

        <BookingNavigation
          currentStep={currentStep}
          onNext={nextStep}
          onPrevious={prevStep}
          isLastStep={currentStep === 4}
        />
      </DialogContent>
    </Dialog>
  );
}
