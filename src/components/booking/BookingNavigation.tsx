
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingNavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export function BookingNavigation({ currentStep, onNext, onPrevious, isLastStep }: BookingNavigationProps) {
  if (isLastStep) return null;

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <Button onClick={onNext}>
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
