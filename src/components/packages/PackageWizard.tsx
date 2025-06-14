
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BasicInfoStep } from "./wizard-steps/BasicInfoStep";
import { ItineraryStep } from "./wizard-steps/ItineraryStep";
import { PricingStep } from "./wizard-steps/PricingStep";
import { MediaStep } from "./wizard-steps/MediaStep";
import { ReviewStep } from "./wizard-steps/ReviewStep";

const steps = [
  { id: 1, title: "Basic Info", description: "Package details and location" },
  { id: 2, title: "Itinerary", description: "Day-by-day activities" },
  { id: 3, title: "Pricing", description: "Costs and inclusions" },
  { id: 4, title: "Media", description: "Photos and videos" },
  { id: 5, title: "Review", description: "Final review and publish" }
];

export default function PackageWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {},
    itinerary: [],
    pricing: {},
    media: [],
    isPublished: false
  });
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate("/packages");
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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
          <p className="text-gray-600">Follow the steps below to create your travel package</p>
        </div>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>

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
            {steps.map((step, index) => (
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
          <Button variant="outline" onClick={handleCancel}>
            Save as Draft
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => navigate("/packages")} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-2" />
              Publish Package
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
