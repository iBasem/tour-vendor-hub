import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, X } from "lucide-react";

interface PricingStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const MEAL_CATEGORIES = {
  breakfast: ["Continental Breakfast", "American Breakfast", "Local Breakfast"],
  lunch: ["Buffet Lunch", "Set Menu Lunch", "Street Food Tour", "Picnic Lunch"],
  dinner: ["Fine Dining", "Local Restaurant", "Hotel Dinner", "Cultural Dinner Show"]
};

const ACCOMMODATION_CATEGORIES = {
  luxury: ["5-Star Hotels", "Luxury Resorts", "Boutique Hotels"],
  standard: ["4-Star Hotels", "Standard Hotels", "Local Guesthouses"],
  budget: ["3-Star Hotels", "Hostels", "Budget Accommodations"]
};

const TRANSPORTATION_CATEGORIES = {
  private: ["Private Car", "Private Van", "Private Bus"],
  shared: ["Shared Bus", "Public Transport", "Group Transport"],
  premium: ["First Class Train", "Business Class Flight", "Luxury Coach"]
};

export function PricingStep({ data, onUpdate }: PricingStepProps) {
  const [formData, setFormData] = useState({
    basePrice: "",
    packageType: "group",
    groupPrice: "",
    privatePrice: "",
    customizablePrice: "",
    currency: "USD",
    seasonalPricing: false,
    highSeasonMultiplier: "1.2",
    lowSeasonMultiplier: "0.8",
    highSeasonPrice: "",
    lowSeasonPrice: "",
    inclusions: {
      accommodation: { enabled: false, category: "", details: [] },
      meals: { enabled: false, types: [], details: [] },
      transportation: { enabled: false, category: "", details: [] },
      guides: { enabled: false, details: ["Professional English-speaking guide"] },
      activities: { enabled: false, details: [] },
      insurance: { enabled: false, details: ["Basic travel insurance"] }
    },
    additionalInclusions: [],
    exclusions: [],
    cities: [],
    bookingTerms: "50% deposit required upon booking. Full payment due 30 days before departure.",
    cancellationPolicy: "Free cancellation up to 30 days before departure. 50% refund for cancellations 15-30 days before departure.",
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInclusionChange = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      inclusions: {
        ...prev.inclusions,
        [category]: {
          ...prev.inclusions[category],
          [field]: value
        }
      }
    }));
  };

  const addToList = (listName: string, item: string) => {
    if (item.trim()) {
      setFormData(prev => ({
        ...prev,
        [listName]: [...prev[listName], item.trim()]
      }));
    }
  };

  const removeFromList = (listName: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const addDetailToInclusion = (category: string, detail: string) => {
    if (detail.trim()) {
      setFormData(prev => ({
        ...prev,
        inclusions: {
          ...prev.inclusions,
          [category]: {
            ...prev.inclusions[category],
            details: [...(prev.inclusions[category].details || []), detail.trim()]
          }
        }
      }));
    }
  };

  const removeDetailFromInclusion = (category: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      inclusions: {
        ...prev.inclusions,
        [category]: {
          ...prev.inclusions[category],
          details: prev.inclusions[category].details.filter((_, i) => i !== index)
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Package Type & Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Package Type & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groupPrice">Group Tour Price *</Label>
              <Input
                id="groupPrice"
                type="number"
                value={formData.groupPrice}
                onChange={(e) => handleInputChange("groupPrice", e.target.value)}
                placeholder="1200"
              />
              <p className="text-xs text-gray-500">Per person (12-16 people)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="privatePrice">Private Tour Price *</Label>
              <Input
                id="privatePrice"
                type="number"
                value={formData.privatePrice}
                onChange={(e) => handleInputChange("privatePrice", e.target.value)}
                placeholder="1800"
              />
              <p className="text-xs text-gray-500">Per person (2-8 people)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customizablePrice">Customizable Price *</Label>
              <Input
                id="customizablePrice"
                type="number"
                value={formData.customizablePrice}
                onChange={(e) => handleInputChange("customizablePrice", e.target.value)}
                placeholder="1500"
              />
              <p className="text-xs text-gray-500">Per person (4-12 people)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="seasonalPricing"
              checked={formData.seasonalPricing}
              onCheckedChange={(checked) => handleInputChange("seasonalPricing", checked)}
            />
            <Label htmlFor="seasonalPricing">Enable seasonal pricing adjustments</Label>
          </div>

          {formData.seasonalPricing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="highSeasonMultiplier">High Season Multiplier</Label>
                <Input
                  id="highSeasonMultiplier"
                  type="number"
                  step="0.1"
                  value={formData.highSeasonMultiplier}
                  onChange={(e) => handleInputChange("highSeasonMultiplier", e.target.value)}
                  placeholder="1.2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowSeasonMultiplier">Low Season Multiplier</Label>
                <Input
                  id="lowSeasonMultiplier"
                  type="number"
                  step="0.1"
                  value={formData.lowSeasonMultiplier}
                  onChange={(e) => handleInputChange("lowSeasonMultiplier", e.target.value)}
                  placeholder="0.8"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cities Included */}
      <Card>
        <CardHeader>
          <CardTitle>Cities Included</CardTitle>
        </CardHeader>
        <CardContent>
          <CityManager 
            cities={formData.cities}
            onAdd={(city) => addToList("cities", city)}
            onRemove={(index) => removeFromList("cities", index)}
          />
        </CardContent>
      </Card>

      {/* Smart Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Included</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Accommodation */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="accommodation"
                checked={formData.inclusions.accommodation.enabled}
                onCheckedChange={(checked) => handleInclusionChange("accommodation", "enabled", checked)}
              />
              <Label htmlFor="accommodation" className="text-base font-medium">Accommodation</Label>
            </div>
            {formData.inclusions.accommodation.enabled && (
              <div className="ml-6 space-y-3">
                <Select
                  value={formData.inclusions.accommodation.category}
                  onValueChange={(value) => handleInclusionChange("accommodation", "category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(ACCOMMODATION_CATEGORIES).map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Hotels
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DetailManager
                  items={formData.inclusions.accommodation.details}
                  onAdd={(detail) => addDetailToInclusion("accommodation", detail)}
                  onRemove={(index) => removeDetailFromInclusion("accommodation", index)}
                  placeholder="Add accommodation detail..."
                />
              </div>
            )}
          </div>

          {/* Meals */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="meals"
                checked={formData.inclusions.meals.enabled}
                onCheckedChange={(checked) => handleInclusionChange("meals", "enabled", checked)}
              />
              <Label htmlFor="meals" className="text-base font-medium">Meals</Label>
            </div>
            {formData.inclusions.meals.enabled && (
              <div className="ml-6 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(MEAL_CATEGORIES).map(mealType => (
                    <div key={mealType} className="flex items-center space-x-2">
                      <Checkbox
                        id={mealType}
                        checked={formData.inclusions.meals.types?.includes(mealType)}
                        onCheckedChange={(checked) => {
                          const currentTypes = formData.inclusions.meals.types || [];
                          const newTypes = checked 
                            ? [...currentTypes, mealType]
                            : currentTypes.filter(t => t !== mealType);
                          handleInclusionChange("meals", "types", newTypes);
                        }}
                      />
                      <Label htmlFor={mealType} className="capitalize">{mealType}</Label>
                    </div>
                  ))}
                </div>
                <DetailManager
                  items={formData.inclusions.meals.details}
                  onAdd={(detail) => addDetailToInclusion("meals", detail)}
                  onRemove={(index) => removeDetailFromInclusion("meals", index)}
                  placeholder="Add meal detail..."
                />
              </div>
            )}
          </div>

          {/* Transportation */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="transportation"
                checked={formData.inclusions.transportation.enabled}
                onCheckedChange={(checked) => handleInclusionChange("transportation", "enabled", checked)}
              />
              <Label htmlFor="transportation" className="text-base font-medium">Transportation</Label>
            </div>
            {formData.inclusions.transportation.enabled && (
              <div className="ml-6 space-y-3">
                <Select
                  value={formData.inclusions.transportation.category}
                  onValueChange={(value) => handleInclusionChange("transportation", "category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transportation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(TRANSPORTATION_CATEGORIES).map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)} Transport
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DetailManager
                  items={formData.inclusions.transportation.details}
                  onAdd={(detail) => addDetailToInclusion("transportation", detail)}
                  onRemove={(index) => removeDetailFromInclusion("transportation", index)}
                  placeholder="Add transportation detail..."
                />
              </div>
            )}
          </div>

          {/* Other inclusions */}
          {["guides", "activities", "insurance"].map(category => (
            <div key={category} className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={formData.inclusions[category].enabled}
                  onCheckedChange={(checked) => handleInclusionChange(category, "enabled", checked)}
                />
                <Label htmlFor={category} className="text-base font-medium capitalize">{category}</Label>
              </div>
              {formData.inclusions[category].enabled && (
                <div className="ml-6">
                  <DetailManager
                    items={formData.inclusions[category].details}
                    onAdd={(detail) => addDetailToInclusion(category, detail)}
                    onRemove={(index) => removeDetailFromInclusion(category, index)}
                    placeholder={`Add ${category} detail...`}
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Additional Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Inclusions</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailManager
            items={formData.additionalInclusions}
            onAdd={(item) => addToList("additionalInclusions", item)}
            onRemove={(index) => removeFromList("additionalInclusions", index)}
            placeholder="Add additional inclusion..."
          />
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Not Included</CardTitle>
        </CardHeader>
        <CardContent>
          <DetailManager
            items={formData.exclusions}
            onAdd={(item) => addToList("exclusions", item)}
            onRemove={(index) => removeFromList("exclusions", index)}
            placeholder="Add exclusion..."
          />
        </CardContent>
      </Card>

      {/* Terms & Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Policies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingTerms">Booking Terms</Label>
            <Textarea
              id="bookingTerms"
              value={formData.bookingTerms}
              onChange={(e) => handleInputChange("bookingTerms", e.target.value)}
              placeholder="Describe booking requirements, deposit terms, etc..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cancellationPolicy">Cancellation Policy</Label>
            <Textarea
              id="cancellationPolicy"
              value={formData.cancellationPolicy}
              onChange={(e) => handleInputChange("cancellationPolicy", e.target.value)}
              placeholder="Describe cancellation terms and refund policy..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for managing lists of details
function DetailManager({ items, onAdd, onRemove, placeholder }: {
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}) {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem);
      setNewItem("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span className="text-sm">{item}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Helper component for managing cities
function CityManager({ cities, onAdd, onRemove }: {
  cities: string[];
  onAdd: (city: string) => void;
  onRemove: (index: number) => void;
}) {
  const [newCity, setNewCity] = useState("");

  const handleAdd = () => {
    if (newCity.trim()) {
      onAdd(newCity);
      setNewCity("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Add city (e.g., Bangkok, Chiang Mai)"
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((city, index) => (
          <div key={index} className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            <span className="text-sm">{city}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(index)}
              className="h-auto p-0 w-4 h-4"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
