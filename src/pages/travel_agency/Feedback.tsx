
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";

export default function Feedback() {
  const feedbacks = [
    {
      id: 1,
      traveler: "John Smith",
      package: "Romantic Paris Getaway",
      rating: 5,
      comment: "Absolutely wonderful experience! Everything was perfectly organized.",
      date: "2024-03-20",
      status: "Published"
    },
    {
      id: 2,
      traveler: "Sarah Johnson",
      package: "Tokyo Adventure",
      rating: 4,
      comment: "Great trip overall, but the hotel could have been better.",
      date: "2024-04-15",
      status: "Published"
    },
    {
      id: 3,
      traveler: "Mike Wilson",
      package: "Bali Relaxation",
      rating: 5,
      comment: "Perfect vacation! The guide was amazing and very knowledgeable.",
      date: "2024-05-10",
      status: "Pending"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customer Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.8</div>
              <div className="flex justify-center mt-1">
                {renderStars(5)}
              </div>
              <p className="text-sm text-gray-600 mt-1">Average Rating</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">127</div>
              <p className="text-sm text-gray-600">Total Reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">3</div>
              <p className="text-sm text-gray-600">Pending Reviews</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{feedback.traveler}</p>
                    <p className="text-sm text-gray-600">{feedback.package}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{feedback.date}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {renderStars(feedback.rating)}
                  <span className="ml-2 text-sm text-gray-600">({feedback.rating}/5)</span>
                </div>
                <p className="text-gray-700">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
