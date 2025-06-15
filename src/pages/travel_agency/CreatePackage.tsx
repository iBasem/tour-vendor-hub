
import { useState } from "react";
import { PackageWizard } from "@/components/travel_agency/packages/PackageWizard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreatePackage() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create New Package</h1>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Ready to create a new travel package?</h2>
          <p className="text-gray-600 mb-6">Use our step-by-step wizard to create amazing travel experiences</p>
          <Button onClick={() => setShowWizard(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Start Package Creation
          </Button>
        </div>
      </div>

      <PackageWizard
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
      />
    </div>
  );
}
