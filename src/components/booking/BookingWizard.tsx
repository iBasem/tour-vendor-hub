
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  };
  selectedDate?: string;
}

export interface BookingFormData {
  // Step 1 - Travel Details
  selectedDate: string;
  travelers: number;
  specialRequests: string;
  
  // Step 2 - Traveler Information
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
  
  // Step 3 - Additional Services
  roomPreference: string;
  dietaryRestrictions: string[];
  travelInsurance: boolean;
  airportTransfer: boolean;
  
  // Step 4 - Review & Payment
  totalAmount: number;
  paymentMethod: string;
  termsAccepted: boolean;
}

const STEPS = [
  { id: 1, title: 'Travel Details', description: 'Select dates and travelers' },
  { id: 2, title: 'Traveler Info', description: 'Personal information' },
  { id: 3, title: 'Add-ons', description: 'Additional services' },
  { id: 4, title: 'Review & Book', description: 'Confirm and pay' },
];

export function BookingWizard({ isOpen, onClose, packageData, selectedDate }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    selectedDate: selectedDate || '',
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

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
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
      // Here you would typically send the booking data to your backend
      console.log('Booking submitted:', formData);
      
      toast.success('Booking request submitted successfully! We will contact you shortly to confirm your booking.');
      onClose();
      
      // Reset form for next use
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

  const progress = (currentStep / STEPS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Request Booking - {packageData.title}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step.id}
                </div>
                <div className="text-xs font-medium text-center">
                  <div>{step.title}</div>
                  <div className="text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
