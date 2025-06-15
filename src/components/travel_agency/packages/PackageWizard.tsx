
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { BasicInfoStep } from "@/components/packages/wizard-steps/BasicInfoStep";
import { ItineraryStep } from "@/components/packages/wizard-steps/ItineraryStep";
import { PricingStep } from "@/components/packages/wizard-steps/PricingStep";
import { MediaStep } from "@/components/packages/wizard-steps/MediaStep";
import { ReviewStep } from "@/components/packages/wizard-steps/ReviewStep";

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

  const progress = (currentStep / steps.length) * 100;

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={formData.basicInfo}
            onUpdate={(data) => handleFormDataUpdate('basicInfo', data)}
          />
        );
      case 2:
        return (
          <ItineraryStep
            data={formData.itinerary}
            onUpdate={(data) => handleFormDataUpdate('itinerary', data)}
          />
        );
      case 3:
        return (
          <PricingStep
            data={formData.pricing}
            onUpdate={(data) => handleFormDataUpdate('pricing', data)}
          />
        );
      case 4:
        return (
          <MediaStep
            data={formData.media}
            onUpdate={(data) => handleFormDataUpdate('media', data)}
          />
        );
      case 5:
        return (
          <ReviewStep
            data={formData}
            onUpdate={(data) => setFormData(data)}
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
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Package</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {currentStep} of {steps.length}
                  </span>
                  <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Step Navigation */}
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? "text-blue-600"
                        : currentStep > step.id
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-colors ${
                        currentStep === step.id
                          ? "bg-blue-600 text-white"
                          : currentStep > step.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium">{step.title}</div>
                      <div className="text-xs">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Save as Draft
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Publish Package
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
