
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PricingStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function PricingStep({ data, onUpdate }: PricingStepProps) {
  const [formData, setFormData] = useState({
    basePrice: "",
    currency: "USD",
    seasonalPricing: false,
    highSeasonPrice: "",
    lowSeasonPrice: "",
    inclusions: {
      accommodation: false,
      meals: false,
      transportation: false,
      guides: false,
      activities: false,
      insurance: false
    },
    additionalInclusions: "",
    exclusions: "",
    bookingTerms: "",
    cancellationPolicy: "",
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInclusionChange = (inclusion: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      inclusions: {
        ...prev.inclusions,
        [inclusion]: checked
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Base Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Base Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleInputChange("basePrice", e.target.value)}
                placeholder="2100"
              />
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
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="seasonalPricing"
              checked={formData.seasonalPricing}
              onCheckedChange={(checked) => handleInputChange("seasonalPricing", checked)}
            />
            <Label htmlFor="seasonalPricing">Enable seasonal pricing</Label>
          </div>

          {formData.seasonalPricing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="highSeasonPrice">High Season Price</Label>
                <Input
                  id="highSeasonPrice"
                  type="number"
                  value={formData.highSeasonPrice}
                  onChange={(e) => handleInputChange("highSeasonPrice", e.target.value)}
                  placeholder="2500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lowSeasonPrice">Low Season Price</Label>
                <Input
                  id="lowSeasonPrice"
                  type="number"
                  value={formData.lowSeasonPrice}
                  onChange={(e) => handleInputChange("lowSeasonPrice", e.target.value)}
                  placeholder="1800"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inclusions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Included</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(formData.inclusions).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value as boolean}
                  onCheckedChange={(checked) => handleInclusionChange(key, checked as boolean)}
                />
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInclusions">Additional Inclusions</Label>
            <Textarea
              id="additionalInclusions"
              value={formData.additionalInclusions}
              onChange={(e) => handleInputChange("additionalInclusions", e.target.value)}
              placeholder="List any other items included in the package..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card>
        <CardHeader>
          <CardTitle>What's Not Included</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="exclusions">Exclusions</Label>
            <Textarea
              id="exclusions"
              value={formData.exclusions}
              onChange={(e) => handleInputChange("exclusions", e.target.value)}
              placeholder="List items not included in the package price..."
              className="min-h-[80px]"
            />
          </div>
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
