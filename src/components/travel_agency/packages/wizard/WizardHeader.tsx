
import { Button } from "@/components/ui/button";

interface WizardHeaderProps {
  onCancel: () => void;
  saving: boolean;
}

export function WizardHeader({ onCancel, saving }: WizardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
        <p className="text-gray-600">Follow the steps below to create your travel package</p>
      </div>
      <Button variant="outline" onClick={onCancel} disabled={saving}>
        Cancel
      </Button>
    </div>
  );
}
