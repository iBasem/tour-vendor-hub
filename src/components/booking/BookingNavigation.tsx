
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BookingNavigationProps {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
}

export function BookingNavigation({ currentStep, onNext, onPrevious, isLastStep }: BookingNavigationProps) {
  const { t } = useTranslation();
  
  if (isLastStep) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
        {t('common.previous')}
      </Button>
      <Button onClick={onNext} className="w-full sm:w-auto">
        {t('common.next')}
        <ChevronRight className="w-4 h-4 ltr:ml-2 rtl:mr-2" />
      </Button>
    </div>
  );
}
