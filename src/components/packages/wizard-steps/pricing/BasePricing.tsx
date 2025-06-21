
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";

interface BasePricingProps {
  data: {
    currency: string;
    basePrice: string;
    originalPrice?: string;
    discount?: string;
  };
  onUpdate: (field: string, value: string) => void;
}

export function BasePricing({ data, onUpdate }: BasePricingProps) {
  return (
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
            <Select value={data.currency} onValueChange={(value) => onUpdate("currency", value)}>
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
              value={data.basePrice}
              onChange={(e) => onUpdate("basePrice", e.target.value)}
              placeholder="899"
            />
          </div>
          <div className="space-y-2">
            <Label>Original Price (optional)</Label>
            <Input
              type="number"
              value={data.originalPrice || ""}
              onChange={(e) => onUpdate("originalPrice", e.target.value)}
              placeholder="1299"
            />
          </div>
          <div className="space-y-2">
            <Label>Discount % (optional)</Label>
            <Input
              type="number"
              value={data.discount || ""}
              onChange={(e) => onUpdate("discount", e.target.value)}
              placeholder="30"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
