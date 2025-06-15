
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  onPublish: () => void;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onClose,
  onPublish
}: WizardNavigationProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          Save as Draft
        </Button>
        {currentStep < totalSteps ? (
          <Button onClick={onNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={onPublish} className="bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4 mr-2" />
            Publish Package
          </Button>
        )}
      </div>
    </div>
  );
}
