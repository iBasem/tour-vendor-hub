
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, X, DollarSign, Utensils, Bed, Car, Shield } from "lucide-react";

interface PricingStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function PricingStep({ data, onUpdate }: PricingStepProps) {
  const [formData, setFormData] = useState(() => {
    // Initialize with proper structure
    const defaultInclusions = {
      accommodation: { included: false, details: [] },
      meals: { included: false, details: [] },
      transportation: { included: false, details: [] },
      activities: { included: false, details: [] },
      guides: { included: false, details: [] },
      insurance: { included: false, details: [] },
      other: { included: false, details: [] }
    };

    return {
      currency: "USD",
      basePrice: "",
      originalPrice: "",
      discount: "",
      tourOptions: {
        group: {
          price: "",
          description: "Join a small group of like-minded travelers",
          minSize: 12,
          maxSize: 16,
          features: ["Fixed itinerary", "Group guide", "Shared experiences", "Best value"]
        },
        private: {
          price: "",
          description: "Exclusive tour just for you and your companions",
          minSize: 2,
          maxSize: 8,
          features: ["Private guide", "Flexible schedule", "Personalized service", "VIP treatment"]
        },
        customizable: {
          price: "",
          description: "Tailor the tour to your preferences",
          minSize: 4,
          maxSize: 12,
          features: ["Custom itinerary", "Choose activities", "Flexible dates", "Personal touches"]
        }
      },
      inclusions: defaultInclusions,
      additionalInclusions: [],
      exclusions: [],
      newInclusion: "",
      newExclusion: "",
      availabilities: [
        { date: "", price: "", spotsLeft: "" }
      ],
      // Merge with existing data, ensuring proper structure
      ...data,
      inclusions: data?.inclusions ? { ...defaultInclusions, ...data.inclusions } : defaultInclusions
    };
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTourOptionChange = (tourType: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      tourOptions: {
        ...prev.tourOptions,
        [tourType]: {
          ...prev.tourOptions[tourType],
          [field]: value
        }
      }
    }));
  };

  const handleInclusionToggle = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      inclusions: {
        ...prev.inclusions,
        [category]: {
          ...prev.inclusions[category],
          included: checked
        }
      }
    }));
  };

  const addInclusionDetail = (category: string, detail: string) => {
    if (detail.trim()) {
      setFormData(prev => ({
        ...prev,
        inclusions: {
          ...prev.inclusions,
          [category]: {
            ...prev.inclusions[category],
            details: [...prev.inclusions[category].details, detail.trim()]
          }
        }
      }));
    }
  };

  const removeInclusionDetail = (category: string, index: number) => {
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

  const addAdditionalInclusion = () => {
    if (formData.newInclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalInclusions: [...prev.additionalInclusions, prev.newInclusion.trim()],
        newInclusion: ""
      }));
    }
  };

  const addExclusion = () => {
    if (formData.newExclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...prev.exclusions, prev.newExclusion.trim()],
        newExclusion: ""
      }));
    }
  };

  const removeAdditionalInclusion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalInclusions: prev.additionalInclusions.filter((_, i) => i !== index)
    }));
  };

  const removeExclusion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index)
    }));
  };

  const addAvailability = () => {
    setFormData(prev => ({
      ...prev,
      availabilities: [...prev.availabilities, { date: "", price: "", spotsLeft: "" }]
    }));
  };

  const updateAvailability = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.map((avail, i) =>
        i === index ? { ...avail, [field]: value } : avail
      )
    }));
  };

  const removeAvailability = (index: number) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.filter((_, i) => i !== index)
    }));
  };

  const inclusionCategories = [
    { key: 'accommodation', label: 'Accommodation', icon: Bed },
    { key: 'meals', label: 'Meals', icon: Utensils },
    { key: 'transportation', label: 'Transportation', icon: Car },
    { key: 'activities', label: 'Activities & Tours', icon: Shield },
    { key: 'guides', label: 'Professional Guides', icon: Shield },
    { key: 'insurance', label: 'Travel Insurance', icon: Shield },
    { key: 'other', label: 'Other Services', icon: Shield }
  ];

  const mealOptions = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Welcome Dinner', 'Farewell Dinner'];
  const accommodationOptions = ['Hotels', 'Resorts', 'Guesthouses', 'Homestays', 'Cruise Ships'];
  const transportationOptions = ['Airport Transfers', 'Domestic Flights', 'Private Vehicle', 'Public Transport', 'Boat/Ferry'];

  return (
    <div className="space-y-6">
      {/* Base Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Base Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD (C$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Base Price</Label>
              <Input
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleInputChange("basePrice", e.target.value)}
                placeholder="899"
              />
            </div>
            <div className="space-y-2">
              <Label>Original Price (optional)</Label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                placeholder="1299"
              />
            </div>
            <div className="space-y-2">
              <Label>Discount % (optional)</Label>
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) => handleInputChange("discount", e.target.value)}
                placeholder="30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tour Options Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Tour Options & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(formData.tourOptions).map(([tourType, option]: [string, any]) => (
            <div key={tourType} className="border rounded-lg p-4">
              <h4 className="font-medium capitalize mb-3">{tourType} Tour</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={option.price}
                    onChange={(e) => handleTourOptionChange(tourType, "price", e.target.value)}
                    placeholder="899"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Min Group Size</Label>
                  <Input
                    type="number"
                    value={option.minSize}
                    onChange={(e) => handleTourOptionChange(tourType, "minSize", parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Group Size</Label>
                  <Input
                    type="number"
                    value={option.maxSize}
                    onChange={(e) => handleTourOptionChange(tourType, "maxSize", parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label>Description</Label>
                <Input
                  value={option.description}
                  onChange={(e) => handleTourOptionChange(tourType, "description", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* What's Included */}
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
                  checked={formData.inclusions[key]?.included || false}
                  onCheckedChange={(checked) => handleInclusionToggle(key, checked as boolean)}
                />
                <Label htmlFor={key} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </Label>
              </div>

              {formData.inclusions[key]?.included && (
                <div className="ml-6 space-y-2">
                  {key === 'meals' && (
                    <div className="grid grid-cols-3 gap-2">
                      {mealOptions.map((meal) => (
                        <Button
                          key={meal}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addInclusionDetail(key, meal)}
                          className="text-xs"
                        >
                          + {meal}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {key === 'accommodation' && (
                    <div className="grid grid-cols-3 gap-2">
                      {accommodationOptions.map((acc) => (
                        <Button
                          key={acc}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addInclusionDetail(key, acc)}
                          className="text-xs"
                        >
                          + {acc}
                        </Button>
                      ))}
                    </div>
                  )}

                  {key === 'transportation' && (
                    <div className="grid grid-cols-3 gap-2">
                      {transportationOptions.map((transport) => (
                        <Button
                          key={transport}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addInclusionDetail(key, transport)}
                          className="text-xs"
                        >
                          + {transport}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-2">
                    {(formData.inclusions[key]?.details || []).map((detail: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {detail}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeInclusionDetail(key, index)}
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

      {/* Additional Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Inclusions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={formData.newInclusion}
              onChange={(e) => handleInputChange("newInclusion", e.target.value)}
              placeholder="e.g., Professional photography session"
              onKeyPress={(e) => e.key === "Enter" && addAdditionalInclusion()}
            />
            <Button type="button" onClick={addAdditionalInclusion} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.additionalInclusions.map((inclusion: string, index: number) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {inclusion}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeAdditionalInclusion(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Not Included</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={formData.newExclusion}
              onChange={(e) => handleInputChange("newExclusion", e.target.value)}
              placeholder="e.g., International flights"
              onKeyPress={(e) => e.key === "Enter" && addExclusion()}
            />
            <Button type="button" onClick={addExclusion} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.exclusions.map((exclusion: string, index: number) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {exclusion}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => removeExclusion(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Dates */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Available Dates</CardTitle>
            <Button type="button" onClick={addAvailability} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Date
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.availabilities.map((availability: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={availability.date}
                  onChange={(e) => updateAvailability(index, "date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={availability.price}
                  onChange={(e) => updateAvailability(index, "price", e.target.value)}
                  placeholder="899"
                />
              </div>
              <div className="space-y-2">
                <Label>Spots Available</Label>
                <Input
                  type="number"
                  value={availability.spotsLeft}
                  onChange={(e) => updateAvailability(index, "spotsLeft", e.target.value)}
                  placeholder="12"
                />
              </div>
              <div>
                {formData.availabilities.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeAvailability(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
