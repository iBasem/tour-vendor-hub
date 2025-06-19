
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WizardStepContent } from "@/components/packages/wizard/WizardStepContent";
import { useCreatePackage } from "@/hooks/useCreatePackage";

interface PackageWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PackageWizard({ isOpen, onClose }: PackageWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      description: '',
      destination: '',
      category: '',
      difficulty_level: 'moderate',
      duration_days: 1,
      duration_nights: 0,
      max_participants: 20,
      featured: false
    },
    itinerary: [],
    pricing: {
      base_price: 0,
      inclusions: [],
      exclusions: [],
      cancellation_policy: '',
      terms_conditions: ''
    },
    media: []
  });

  const { createPackage, loading } = useCreatePackage();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (stepKey: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: data
    }));
  };

  const handleFormDataUpdate = (data: any) => {
    setFormData(data);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const result = await createPackage(formData);
    if (result.success) {
      onClose();
      // Reset form
      setCurrentStep(1);
      setFormData({
        basicInfo: {
          title: '',
          description: '',
          destination: '',
          category: '',
          difficulty_level: 'moderate',
          duration_days: 1,
          duration_nights: 0,
          max_participants: 20,
          featured: false
        },
        itinerary: [],
        pricing: {
          base_price: 0,
          inclusions: [],
          exclusions: [],
          cancellation_policy: '',
          terms_conditions: ''
        },
        media: []
      });
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Basic Information";
      case 2: return "Itinerary";
      case 3: return "Pricing & Policies";
      case 4: return "Media & Photos";
      case 5: return "Review & Publish";
      default: return "";
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.basicInfo.title && formData.basicInfo.destination && 
               formData.basicInfo.category && formData.basicInfo.duration_days > 0;
      case 2:
        return true; // Itinerary is optional
      case 3:
        return formData.pricing.base_price > 0;
      case 4:
        return true; // Media is optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Package - {getStepTitle(currentStep)}
          </DialogTitle>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </DialogHeader>

        <div className="mb-6">
          <WizardStepContent
            currentStep={currentStep}
            formData={formData}
            onUpdate={updateFormData}
            onFormDataUpdate={handleFormDataUpdate}
          />
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            
            {currentStep === totalSteps ? (
              <Button 
                onClick={handleSubmit} 
                disabled={loading || !isStepValid(currentStep)}
              >
                {loading ? 'Creating...' : 'Create Package'}
              </Button>
            ) : (
              <Button 
                onClick={nextStep} 
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
