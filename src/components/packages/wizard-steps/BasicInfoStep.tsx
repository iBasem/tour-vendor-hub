
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface BasicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "",
    highlights: [],
    newHighlight: "",
    ...data
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addHighlight = () => {
    if (formData.newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, prev.newHighlight.trim()],
        newHighlight: ""
      }));
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Package Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g., Magical Vietnam Adventure"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination *</Label>
          <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vietnam">Vietnam</SelectItem>
              <SelectItem value="thailand">Thailand</SelectItem>
              <SelectItem value="japan">Japan</SelectItem>
              <SelectItem value="south-korea">South Korea</SelectItem>
              <SelectItem value="italy">Italy</SelectItem>
              <SelectItem value="france">France</SelectItem>
              <SelectItem value="spain">Spain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration *</Label>
          <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 Days</SelectItem>
              <SelectItem value="4-7">4-7 Days</SelectItem>
              <SelectItem value="8-14">8-14 Days</SelectItem>
              <SelectItem value="15-21">15-21 Days</SelectItem>
              <SelectItem value="22+">22+ Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxGroupSize">Max Group Size</Label>
          <Input
            id="maxGroupSize"
            type="number"
            value={formData.maxGroupSize}
            onChange={(e) => handleInputChange("maxGroupSize", e.target.value)}
            placeholder="e.g., 15"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="challenging">Challenging</SelectItem>
              <SelectItem value="strenuous">Strenuous</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your package in detail..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Package Highlights</Label>
        <div className="flex gap-2">
          <Input
            value={formData.newHighlight}
            onChange={(e) => handleInputChange("newHighlight", e.target.value)}
            placeholder="Add a highlight..."
            onKeyPress={(e) => e.key === "Enter" && addHighlight()}
          />
          <Button type="button" onClick={addHighlight} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.highlights.map((highlight: string, index: number) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {highlight}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => removeHighlight(index)}
              />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
