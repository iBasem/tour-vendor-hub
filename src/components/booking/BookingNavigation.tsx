
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
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>
      <Button onClick={onNext} className="w-full sm:w-auto">
        Next
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
