
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  MapPin, 
  Calendar,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const reviews = [
  {
    id: 1,
    tourTitle: "Costa Rica Quest",
    destination: "Costa Rica",
    rating: 5,
    date: "2024-01-25",
    title: "Amazing Adventure!",
    content: "This tour exceeded all my expectations. The guides were knowledgeable, the accommodations were comfortable, and the wildlife we saw was incredible. The zip-lining experience was a highlight!",
    helpful: 12,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    tourTitle: "Thailand Island Explorer",
    destination: "Thailand",
    rating: 4,
    date: "2023-12-10",
    title: "Beautiful beaches and culture",
    content: "Great tour with stunning beaches and rich cultural experiences. The food was amazing and our guide was very friendly. Only minor issue was the tight schedule on some days.",
    helpful: 8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    tourTitle: "European Classic Journey",
    destination: "Europe",
    rating: 5,
    date: "2023-11-15",
    title: "Perfect introduction to Europe",
    content: "As a first-time visitor to Europe, this tour was perfect. We covered all the major highlights and the pace was just right. The local guides in each city were fantastic.",
    helpful: 15,
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop"
  }
];

const pendingReviews = [
  {
    id: 4,
    tourTitle: "Best Of Vietnam in 14 Days",
    destination: "Vietnam",
    completedDate: "2024-03-20",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400&h=300&fit=crop"
  }
];

export default function TravelerReviews() {
  const [activeReviews, setActiveReviews] = useState(reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const startReview = (tour: any) => {
    setSelectedTour(tour);
    setShowReviewForm(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-gray-600">Share your travel experiences and help other travelers</p>
      </div>

      {/* Pending Reviews */}
      {pendingReviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Write a Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingReviews.map((tour) => (
              <div key={tour.id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <img 
                  src={tour.image} 
                  alt={tour.tourTitle}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{tour.tourTitle}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {tour.destination}
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    Completed {new Date(tour.completedDate).toLocaleDateString()}
                  </div>
                </div>
                <Button onClick={() => startReview(tour)}>
                  Write Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Review Form */}
      {showReviewForm && selectedTour && (
        <Card>
          <CardHeader>
            <CardTitle>Write Review for {selectedTour.tourTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-6 h-6 text-gray-300 hover:text-yellow-500 cursor-pointer" />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Give your review a title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea 
                className="min-h-32"
                placeholder="Share your experience..."
              />
            </div>
            <div className="flex gap-2">
              <Button>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Published Reviews */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Published Reviews</h2>
        {activeReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img 
                  src={review.image} 
                  alt={review.tourTitle}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{review.title}</h3>
                      <p className="text-gray-600">{review.tourTitle}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <MapPin className="w-4 h-4" />
                        {review.destination}
                        <span>•</span>
                        <Calendar className="w-4 h-4" />
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium">{review.rating}/5</span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {review.helpful} people found this helpful
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Reviewed on {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
