
import { Badge } from "@/components/ui/badge";

interface TourOption {
  price: number;
  description: string;
  minSize: number;
  maxSize: number;
  features: string[];
}

interface TourTypeSelectorProps {
  tourOptions: Record<string, TourOption>;
  selectedTourType: string;
  onTourTypeChange: (type: string) => void;
}

export function TourTypeSelector({ tourOptions, selectedTourType, onTourTypeChange }: TourTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Choose Your Tour Style</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(tourOptions).map(([type, option]) => (
          <button
            key={type}
            onClick={() => onTourTypeChange(type)}
            className={`p-4 border rounded-lg text-left transition-all ${
              selectedTourType === type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold capitalize">{type}</h4>
              <span className="text-lg font-bold text-blue-600">
                ${option.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
            <div className="flex flex-wrap gap-1">
              {option.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
