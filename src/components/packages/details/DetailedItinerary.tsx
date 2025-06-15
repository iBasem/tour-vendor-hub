
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Activity, ChevronRight, Utensils, Bed, Star } from "lucide-react";

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
  highlights?: string[];
}

interface DetailedItineraryProps {
  itinerary: ItineraryItem[];
}

export function DetailedItinerary({ itinerary }: DetailedItineraryProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        Detailed Itinerary
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {itinerary.map((item, index) => (
          <AccordionItem key={index} value={`day-${item.day}`} className="border rounded-lg mb-3">
            <AccordionTrigger className="px-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="font-semibold text-blue-600">D{item.day}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4 mt-4">
                {/* Activities */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    Activities
                  </h5>
                  <ul className="space-y-1">
                    {item.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="flex items-start gap-2 text-sm text-gray-700">
                        <ChevronRight className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Meals */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-orange-600" />
                      Meals Included
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {item.meals.map((meal, mealIndex) => (
                        <Badge key={mealIndex} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                          {meal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Bed className="w-4 h-4 text-purple-600" />
                      Accommodation
                    </h5>
                    <p className="text-sm text-gray-700">{item.accommodation}</p>
                  </div>
                </div>

                {/* Highlights */}
                {item.highlights && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      Day Highlights
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {item.highlights.map((highlight, highlightIndex) => (
                        <Badge key={highlightIndex} variant="outline" className="text-xs border-yellow-200 text-yellow-700">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
