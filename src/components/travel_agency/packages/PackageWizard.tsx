
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { WizardProgress } from "@/components/packages/wizard/WizardProgress";
import { WizardNavigation } from "@/components/packages/wizard/WizardNavigation";
import { WizardStepContent } from "@/components/packages/wizard/WizardStepContent";

const steps = [
  { id: 1, title: "Basic Info", description: "Package details and location" },
  { id: 2, title: "Itinerary", description: "Day-by-day activities" },
  { id: 3, title: "Pricing", description: "Costs and inclusions" },
  { id: 4, title: "Media", description: "Photos and videos" },
  { id: 5, title: "Review", description: "Final review and publish" }
];

interface PackageWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PackageWizard({ isOpen, onClose }: PackageWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    itinerary: [],
    pricing: {},
    media: [],
    isPublished: false
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const handleFormDataUpdate = (stepKey: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: data
    }));
  };

  const handlePublish = () => {
    console.log("Publishing package:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Package</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <WizardProgress
                steps={steps}
                currentStep={currentStep}
                onStepClick={handleStepClick}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <WizardStepContent
                currentStep={currentStep}
                formData={formData}
                onUpdate={handleFormDataUpdate}
                onFormDataUpdate={setFormData}
              />
            </CardContent>
          </Card>

          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onClose={onClose}
            onPublish={handlePublish}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
