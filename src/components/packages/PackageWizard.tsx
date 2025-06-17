
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { BasicInfoStep } from "./wizard-steps/BasicInfoStep";
import { ItineraryStep } from "./wizard-steps/ItineraryStep";
import { PricingStep } from "./wizard-steps/PricingStep";
import { MediaStep } from "./wizard-steps/MediaStep";
import { ReviewStep } from "./wizard-steps/ReviewStep";
import { usePackages } from "@/hooks/usePackages";

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
    pricing: { currency: 'USD', basePrice: '' },
    media: [],
    isPublished: false
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { createPackage } = usePackages();

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
    console.log(`Updating ${stepKey} with:`, data);
    setFormData(prev => ({
      ...prev,
      [stepKey]: data
    }));
  };

  const handleCancel = () => {
    navigate("/travel_agency/packages");
  };

  const validateFormData = () => {
    if (!formData.basicInfo?.title) {
      toast.error("Please provide a package title");
      setCurrentStep(1);
      return false;
    }
    
    if (!formData.pricing?.basePrice) {
      toast.error("Please set a base price for the package");
      setCurrentStep(3);
      return false;
    }
    
    return true;
  };

  const handleSaveDraft = async () => {
    if (!validateFormData()) return;
    
    try {
      setSaving(true);
      console.log('Saving as draft with data:', formData);
      
      const draftData = { ...formData, isPublished: false };
      const result = await createPackage(draftData);
      
      console.log('Draft saved successfully:', result);
      toast.success("Package saved as draft successfully!");
      navigate("/travel_agency/packages");
    } catch (error) {
      console.error('Save draft error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to save draft");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!validateFormData()) return;
    
    try {
      setSaving(true);
      console.log('Publishing package with data:', formData);
      
      const publishData = { ...formData, isPublished: true };
      const result = await createPackage(publishData);
      
      console.log('Package published successfully:', result);
      toast.success("Package published successfully!");
      navigate("/travel_agency/packages");
    } catch (error) {
      console.error('Publish error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to publish package");
    } finally {
      setSaving(false);
    }
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
        <Button variant="outline" onClick={handleCancel} disabled={saving}>
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
          disabled={currentStep === 1 || saving}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSaveDraft}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Save as Draft
          </Button>
          {currentStep < steps.length ? (
            <Button onClick={handleNext} disabled={saving}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handlePublish} 
              className="bg-green-600 hover:bg-green-700"
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              Publish Package
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
