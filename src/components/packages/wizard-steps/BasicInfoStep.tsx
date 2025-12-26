
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

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
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Basic Package Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t('packageWizard.basicPackageInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('packageWizard.packageTitle')} *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={t('packageWizard.packageTitlePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">{t('packageWizard.packageSubtitle')}</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder={t('packageWizard.packageSubtitlePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">{t('packageWizard.destination')} *</Label>
              <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('packageWizard.selectDestination')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vietnam">{t('packageWizard.vietnam')}</SelectItem>
                  <SelectItem value="thailand">{t('packageWizard.thailand')}</SelectItem>
                  <SelectItem value="japan">{t('packageWizard.japan')}</SelectItem>
                  <SelectItem value="south-korea">{t('packageWizard.southKorea')}</SelectItem>
                  <SelectItem value="italy">{t('packageWizard.italy')}</SelectItem>
                  <SelectItem value="france">{t('packageWizard.france')}</SelectItem>
                  <SelectItem value="spain">{t('packageWizard.spain')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('packageWizard.category')} *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('packageWizard.selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adventure">{t('packageWizard.adventure')}</SelectItem>
                  <SelectItem value="cultural">{t('packageWizard.cultural')}</SelectItem>
                  <SelectItem value="relaxation">{t('packageWizard.relaxation')}</SelectItem>
                  <SelectItem value="family">{t('packageWizard.family')}</SelectItem>
                  <SelectItem value="luxury">{t('packageWizard.luxury')}</SelectItem>
                  <SelectItem value="budget">{t('packageWizard.budget')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_days">{t('packageWizard.durationDays')} *</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) => handleInputChange("duration_days", parseInt(e.target.value) || 1)}
                placeholder="14"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_nights">{t('packageWizard.durationNights')}</Label>
              <Input
                id="duration_nights"
                type="number"
                min="0"
                value={formData.duration_nights}
                onChange={(e) => handleInputChange("duration_nights", parseInt(e.target.value) || 0)}
                placeholder="13"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_participants">{t('packageWizard.maxParticipants')}</Label>
              <Input
                id="max_participants"
                type="number"
                min="1"
                value={formData.max_participants}
                onChange={(e) => handleInputChange("max_participants", parseInt(e.target.value) || 20)}
                placeholder="16"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty_level">{t('packageWizard.difficultyLevel')}</Label>
              <Select value={formData.difficulty_level} onValueChange={(value) => handleInputChange("difficulty_level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('packageWizard.selectDifficulty')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">{t('packageWizard.easy')}</SelectItem>
                  <SelectItem value="moderate">{t('packageWizard.moderate')}</SelectItem>
                  <SelectItem value="challenging">{t('packageWizard.challenging')}</SelectItem>
                  <SelectItem value="expert">{t('packageWizard.expert')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('packageWizard.description')} *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={t('packageWizard.descriptionPlaceholder')}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Package Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>{t('packageWizard.packageHighlights')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Input
              value={formData.newHighlight}
              onChange={(e) => handleInputChange("newHighlight", e.target.value)}
              placeholder={t('packageWizard.addHighlight')}
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
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MapPin className="w-5 h-5" />
            {t('packageWizard.citiesYoullVisit')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t('packageWizard.cityName')}</Label>
              <Input
                value={formData.newCity.name}
                onChange={(e) => handleCityChange("name", e.target.value)}
                placeholder={t('packageWizard.cityNamePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('packageWizard.cityDescription')}</Label>
              <Input
                value={formData.newCity.description}
                onChange={(e) => handleCityChange("description", e.target.value)}
                placeholder={t('packageWizard.cityDescriptionPlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('packageWizard.imageUrlOptional')}</Label>
              <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
                  <div className={`flex justify-between items-start mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
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
