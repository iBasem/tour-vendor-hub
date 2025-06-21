
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Bed, Utensils, Car, Shield } from "lucide-react";

interface InclusionsManagerProps {
  inclusions: any;
  onToggle: (category: string, checked: boolean) => void;
  onAddDetail: (category: string, detail: string) => void;
  onRemoveDetail: (category: string, index: number) => void;
}

const inclusionCategories = [
  { key: 'accommodation', label: 'Accommodation', icon: Bed },
  { key: 'meals', label: 'Meals', icon: Utensils },
  { key: 'transportation', label: 'Transportation', icon: Car },
  { key: 'activities', label: 'Activities & Tours', icon: Shield },
  { key: 'guides', label: 'Professional Guides', icon: Shield },
  { key: 'insurance', label: 'Travel Insurance', icon: Shield },
  { key: 'other', label: 'Other Services', icon: Shield }
];

const presetOptions = {
  meals: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Welcome Dinner', 'Farewell Dinner'],
  accommodation: ['Hotels', 'Resorts', 'Guesthouses', 'Homestays', 'Cruise Ships'],
  transportation: ['Airport Transfers', 'Domestic Flights', 'Private Vehicle', 'Public Transport', 'Boat/Ferry']
};

export function InclusionsManager({ inclusions, onToggle, onAddDetail, onRemoveDetail }: InclusionsManagerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What's Included</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {inclusionCategories.map(({ key, label, icon: Icon }) => (
          <div key={key} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={inclusions[key]?.included || false}
                onCheckedChange={(checked) => onToggle(key, checked as boolean)}
              />
              <Label htmlFor={key} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </Label>
            </div>

            {inclusions[key]?.included && (
              <div className="ml-6 space-y-2">
                {presetOptions[key as keyof typeof presetOptions] && (
                  <div className="grid grid-cols-3 gap-2">
                    {presetOptions[key as keyof typeof presetOptions].map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onAddDetail(key, option)}
                        className="text-xs"
                      >
                        + {option}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mt-2">
                  {(inclusions[key]?.details || []).map((detail: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {detail}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => onRemoveDetail(key, index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
