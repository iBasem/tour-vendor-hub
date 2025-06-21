
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, MapPin } from "lucide-react";

interface BasicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    destination: "",
    duration: "",
    maxGroupSize: "",
    packageType: "group",
    highlights: [],
    newHighlight: "",
    cities: [],
    newCity: { name: "", description: "", image: "" },
    rating: 4.5,
    category: "",
    difficulty_level: "moderate",
    duration_days: 1,
    duration_nights: 0,
    max_participants: 20,
    featured: false,
    ...data
  });

  useEffect(() => {
    console.log('BasicInfoStep formData updated:', formData);
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    console.log(`Updating field ${field} with value:`, value);
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

  const addCity = () => {
    if (formData.newCity.name.trim() && formData.newCity.description.trim()) {
      setFormData(prev => ({
        ...prev,
        cities: [...prev.cities, { ...prev.newCity }],
        newCity: { name: "", description: "", image: "" }
      }));
    }
  };

  const removeCity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cities: prev.cities.filter((_, i) => i !== index)
    }));
  };

  const handleCityChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      newCity: { ...prev.newCity, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Basic Package Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Package Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Package Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Best Of Vietnam in 14 Days"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Package Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="e.g., An unforgettable journey through Vietnam's highlights"
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
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventure">Adventure</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="relaxation">Relaxation</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_days">Duration (Days) *</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) => handleInputChange("duration_days", parseInt(e.target.value) || 1)}
                placeholder="e.g., 14"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_nights">Duration (Nights)</Label>
              <Input
                id="duration_nights"
                type="number"
                min="0"
                value={formData.duration_nights}
                onChange={(e) => handleInputChange("duration_nights", parseInt(e.target.value) || 0)}
                placeholder="e.g., 13"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) => handleInputChange("max_participants", parseInt(e.target.value) || 20)}
                placeholder="e.g., 16"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty_level">Difficulty Level</Label>
              <Select value={formData.difficulty_level} onValueChange={(value) => handleInputChange("difficulty_level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="challenging">Challenging</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
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
        </CardContent>
      </Card>

      {/* Package Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Package Highlights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Cities to Visit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Cities You'll Visit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>City Name</Label>
              <Input
                value={formData.newCity.name}
                onChange={(e) => handleCityChange("name", e.target.value)}
                placeholder="e.g., Ho Chi Minh City"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={formData.newCity.description}
                onChange={(e) => handleCityChange("description", e.target.value)}
                placeholder="e.g., Vietnam's bustling commercial hub"
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  value={formData.newCity.image}
                  onChange={(e) => handleCityChange("image", e.target.value)}
                  placeholder="https://..."
                />
                <Button type="button" onClick={addCity} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {formData.cities.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {formData.cities.map((city: any, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{city.name}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCity(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{city.description}</p>
                  {city.image && (
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-20 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
