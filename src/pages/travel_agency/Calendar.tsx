
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

export default function Calendar() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar & Scheduling</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Travel Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 text-gray-500">
            <div className="text-center">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Calendar view will be implemented here</p>
              <p className="text-sm">Show bookings, departures, and important dates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
