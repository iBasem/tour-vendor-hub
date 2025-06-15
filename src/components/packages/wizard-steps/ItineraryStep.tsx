
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical, Utensils, Bed, Activity, Star, ChevronRight } from "lucide-react";

interface ItineraryStepProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
  highlights: string[];
  newActivity: string;
  newHighlight: string;
}

export function ItineraryStep({ data, onUpdate }: ItineraryStepProps) {
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    data.length > 0 ? data : [
      {
        day: 1,
        title: "",
        description: "",
        activities: [""],
        meals: [],
        accommodation: "",
        highlights: [],
        newActivity: "",
        newHighlight: ""
      }
    ]
  );

  useEffect(() => {
    onUpdate(itinerary);
  }, [itinerary, onUpdate]);

  const addDay = () => {
    const newDay: ItineraryDay = {
      day: itinerary.length + 1,
      title: "",
      description: "",
      activities: [""],
      meals: [],
      accommodation: "",
      highlights: [],
      newActivity: "",
      newHighlight: ""
    };
    setItinerary([...itinerary, newDay]);
  };

  const removeDay = (dayIndex: number) => {
    const updatedItinerary = itinerary
      .filter((_, index) => index !== dayIndex)
      .map((day, index) => ({ ...day, day: index + 1 }));
    setItinerary(updatedItinerary);
  };

  const updateDay = (dayIndex: number, field: keyof ItineraryDay, value: any) => {
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex ? { ...day, [field]: value } : day
    );
    setItinerary(updatedItinerary);
  };

  const addActivity = (dayIndex: number) => {
    const day = itinerary[dayIndex];
    if (day.newActivity.trim()) {
      const updatedItinerary = itinerary.map((d, index) =>
        index === dayIndex
          ? { ...d, activities: [...d.activities.filter(a => a.trim()), d.newActivity.trim()], newActivity: "" }
          : d
      );
      setItinerary(updatedItinerary);
    }
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            activities: day.activities.filter((_, actIndex) => actIndex !== activityIndex)
          }
        : day
    );
    setItinerary(updatedItinerary);
  };

  const addHighlight = (dayIndex: number) => {
    const day = itinerary[dayIndex];
    if (day.newHighlight.trim()) {
      const updatedItinerary = itinerary.map((d, index) =>
        index === dayIndex
          ? { ...d, highlights: [...d.highlights, d.newHighlight.trim()], newHighlight: "" }
          : d
      );
      setItinerary(updatedItinerary);
    }
  };

  const removeHighlight = (dayIndex: number, highlightIndex: number) => {
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            highlights: day.highlights.filter((_, hIndex) => hIndex !== highlightIndex)
          }
        : day
    );
    setItinerary(updatedItinerary);
  };

  const toggleMeal = (dayIndex: number, meal: string) => {
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            meals: day.meals.includes(meal)
              ? day.meals.filter(m => m !== meal)
              : [...day.meals, meal]
          }
        : day
    );
    setItinerary(updatedItinerary);
  };

  const mealOptions = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Daily Itinerary</h3>
          <p className="text-gray-600">Plan each day of your tour with detailed activities, meals, and highlights</p>
        </div>
        <Button onClick={addDay}>
          <Plus className="w-4 h-4 mr-2" />
          Add Day
        </Button>
      </div>

      <div className="space-y-6">
        {itinerary.map((day, dayIndex) => (
          <Card key={dayIndex} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="font-semibold text-blue-600">D{day.day}</span>
                </div>
                <div className="flex-1">
                  <Input
                    value={day.title}
                    onChange={(e) => updateDay(dayIndex, "title", e.target.value)}
                    placeholder="e.g., Arrival in Ho Chi Minh City"
                    className="font-medium text-lg border-none px-0 focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                {itinerary.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeDay(dayIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <Label>Day Description</Label>
                <Textarea
                  value={day.description}
                  onChange={(e) => updateDay(dayIndex, "description", e.target.value)}
                  placeholder="Describe what happens on this day..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activities */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <Label className="font-medium">Activities</Label>
                  </div>
                  
                  <div className="space-y-2">
                    {day.activities.filter(a => a.trim()).map((activity, activityIndex) => (
                      <div key={activityIndex} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                        <span className="text-sm flex-1">{activity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(dayIndex, activityIndex)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={day.newActivity}
                      onChange={(e) => updateDay(dayIndex, "newActivity", e.target.value)}
                      placeholder="Add new activity..."
                      onKeyPress={(e) => e.key === "Enter" && addActivity(dayIndex)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addActivity(dayIndex)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Accommodation */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-purple-600" />
                    <Label className="font-medium">Accommodation</Label>
                  </div>
                  <Input
                    value={day.accommodation}
                    onChange={(e) => updateDay(dayIndex, "accommodation", e.target.value)}
                    placeholder="e.g., 4-star hotel in city center"
                  />
                </div>
              </div>

              {/* Meals */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-orange-600" />
                  <Label className="font-medium">Meals Included</Label>
                </div>
                <div className="flex gap-4">
                  {mealOptions.map((meal) => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${dayIndex}-${meal}`}
                        checked={day.meals.includes(meal)}
                        onCheckedChange={() => toggleMeal(dayIndex, meal)}
                      />
                      <Label htmlFor={`${dayIndex}-${meal}`} className="text-sm">
                        {meal}
                      </Label>
                    </div>
                  ))}
                </div>
                {day.meals.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {day.meals.map((meal, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                        {meal}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Day Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <Label className="font-medium">Day Highlights</Label>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {day.highlights.map((highlight, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-yellow-200 text-yellow-700 flex items-center gap-1">
                      {highlight}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeHighlight(dayIndex, index)}
                      />
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={day.newHighlight}
                    onChange={(e) => updateDay(dayIndex, "newHighlight", e.target.value)}
                    placeholder="Add day highlight..."
                    onKeyPress={(e) => e.key === "Enter" && addHighlight(dayIndex)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addHighlight(dayIndex)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
