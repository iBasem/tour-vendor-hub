
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";

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
        accommodation: ""
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
      accommodation: ""
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
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex
        ? { ...day, activities: [...day.activities, ""] }
        : day
    );
    setItinerary(updatedItinerary);
  };

  const updateActivity = (dayIndex: number, activityIndex: number, value: string) => {
    const updatedItinerary = itinerary.map((day, index) =>
      index === dayIndex
        ? {
            ...day,
            activities: day.activities.map((activity, actIndex) =>
              actIndex === activityIndex ? value : activity
            )
          }
        : day
    );
    setItinerary(updatedItinerary);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Daily Itinerary</h3>
          <p className="text-gray-600">Plan each day of your tour</p>
        </div>
        <Button onClick={addDay}>
          <Plus className="w-4 h-4 mr-2" />
          Add Day
        </Button>
      </div>

      <div className="space-y-4">
        {itinerary.map((day, dayIndex) => (
          <Card key={dayIndex} className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Day {day.day}</CardTitle>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Day Title</Label>
                  <Input
                    value={day.title}
                    onChange={(e) => updateDay(dayIndex, "title", e.target.value)}
                    placeholder="e.g., Arrival in Ho Chi Minh City"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Accommodation</Label>
                  <Input
                    value={day.accommodation}
                    onChange={(e) => updateDay(dayIndex, "accommodation", e.target.value)}
                    placeholder="e.g., 4-star hotel in city center"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={day.description}
                  onChange={(e) => updateDay(dayIndex, "description", e.target.value)}
                  placeholder="Describe what happens on this day..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Activities</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addActivity(dayIndex)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Activity
                  </Button>
                </div>
                {day.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex gap-2">
                    <Input
                      value={activity}
                      onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                      placeholder="e.g., City walking tour"
                    />
                    {day.activities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeActivity(dayIndex, activityIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
