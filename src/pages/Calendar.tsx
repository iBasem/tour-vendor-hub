
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const calendarEvents = [
  {
    id: 1,
    title: "Romantic Gateway",
    type: "Adventure Tour",
    date: "Jul 17",
    time: "10:00 AM",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Cultural Exploration",
    type: "City Highlights",
    date: "Jul 21",
    time: "9:00 AM",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Adventure Tour",
    type: "Venice Dreams",
    date: "Jul 23",
    time: "8:00 AM",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Romantic Gateway",
    type: "Agra Group",
    date: "Jul 25",
    time: "11:00 AM",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "Parisian Romance",
    type: "Tokyo Cultural Adventure",
    date: "Jul 29",
    time: "10:00 AM",
    color: "bg-pink-500"
  }
];

const scheduleDetails = [
  {
    id: 1,
    title: "City Highlights",
    location: "New York, USA",
    duration: "4 Day / 5 Nights",
    date: "Jun 25 - Jul 2",
    participants: ["P1", "P2", "P3", "P4"],
    status: "Scheduled"
  }
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 1)); // July 2024
  const [selectedDate, setSelectedDate] = useState(19);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="p-2"></div>
              ))}
              
              {days.map((day) => {
                const hasEvent = calendarEvents.some(event => 
                  parseInt(event.date.split(' ')[1]) === day
                );
                const isSelected = day === selectedDate;
                const isToday = day === 19; // Highlighting 19th as today
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      p-2 text-sm rounded-lg hover:bg-gray-100 relative
                      ${isSelected ? "bg-blue-600 text-white" : ""}
                      ${isToday && !isSelected ? "bg-blue-100 text-blue-600 font-semibold" : ""}
                    `}
                  >
                    {day}
                    {hasEvent && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Schedule Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Schedule Details</CardTitle>
              <Button variant="ghost" size="sm">•••</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduleDetails.map((detail) => (
              <div key={detail.id} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                <h3 className="font-semibold text-lg mb-2">{detail.title}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{detail.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{detail.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>{detail.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <div className="flex -space-x-1">
                      {detail.participants.map((participant, idx) => (
                        <div key={idx} className="w-6 h-6 bg-gray-300 rounded-full border border-white text-xs flex items-center justify-center">
                          {participant}
                        </div>
                      ))}
                    </div>
                    <span>+{detail.participants.length}</span>
                  </div>
                </div>
                <Badge className="mt-3 bg-orange-100 text-orange-800">
                  {detail.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-3 h-12 rounded-full ${event.color}`}></div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.type}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{event.date}</div>
                  <div>{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
