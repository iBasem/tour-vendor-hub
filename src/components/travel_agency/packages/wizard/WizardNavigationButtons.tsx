
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

interface WizardNavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  saving: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function WizardNavigationButtons({
  currentStep,
  totalSteps,
  saving,
  onPrevious,
  onNext,
  onSaveDraft,
  onPublish
}: WizardNavigationButtonsProps) {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || saving}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onSaveDraft}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : null}
          Save as Draft
        </Button>
        {currentStep < totalSteps ? (
          <Button onClick={onNext} disabled={saving}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={onPublish} 
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
  );
}
