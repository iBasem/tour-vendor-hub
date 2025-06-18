
import { Package, Search, Calendar } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon?: "package" | "search" | "calendar";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = "package", title, description, action }: EmptyStateProps) {
  const IconComponent = {
    package: Package,
    search: Search,
    calendar: Calendar
  }[icon];

  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <IconComponent className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
