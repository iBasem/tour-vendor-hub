
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Filter, TrendingUp, MessageSquare } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const ratingData = [
  { rating: "5 Stars", count: 234, color: "#10B981" },
  { rating: "4 Stars", count: 187, color: "#3B82F6" },
  { rating: "3 Stars", count: 89, color: "#F59E0B" },
  { rating: "2 Stars", count: 34, color: "#F97316" },
  { rating: "1 Star", count: 12, color: "#EF4444" },
];

const reviews = [
  {
    id: 1,
    customer: "Camellia Swan",
    avatar: "/placeholder.svg",
    rating: 5,
    tour: "Venice Dreams",
    date: "2 days ago",
    comment: "Absolutely amazing experience! The tour guide was knowledgeable and the itinerary was perfect. Would definitely recommend to anyone visiting Venice.",
    helpful: 12,
    status: "published"
  },
  {
    id: 2,
    customer: "Raphael Goodman",
    avatar: "/placeholder.svg",
    rating: 4,
    tour: "Safari Adventure",
    date: "1 week ago",
    comment: "Great safari experience with excellent wildlife viewing opportunities. The accommodation was comfortable and the guides were professional.",
    helpful: 8,
    status: "published"
  },
  {
    id: 3,
    customer: "Ludwig Gonzalez",
    avatar: "/placeholder.svg",
    rating: 5,
    tour: "Alpine Escape",
    date: "2 weeks ago",
    comment: "Breathtaking mountain views and perfectly organized hiking trails. The local cuisine was a delightful surprise. Highly recommended!",
    helpful: 15,
    status: "published"
  },
  {
    id: 4,
    customer: "Michael Smith",
    avatar: "/placeholder.svg",
    rating: 3,
    tour: "City Highlights",
    date: "3 weeks ago",
    comment: "Good tour overall but felt a bit rushed. Would have preferred more time at each location. The guide was friendly and informative though.",
    helpful: 5,
    status: "pending"
  },
  {
    id: 5,
    customer: "Emily Davis",
    avatar: "/placeholder.svg",
    rating: 5,
    tour: "Cultural Adventure",
    date: "1 month ago",
    comment: "An incredible journey through local culture and traditions. Every moment was educational and entertaining. Worth every penny!",
    helpful: 20,
    status: "published"
  }
];

export default function Feedback() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Feedback</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Export Reviews
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Positive Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {reviews.filter(r => r.status === "pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending Reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Review Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingData.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16">{item.rating}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${(item.count / Math.max(...ratingData.map(d => d.count))) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Based on {totalReviews} reviews
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customer Reviews</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <select 
                  value={filterRating} 
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback>{review.customer[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.customer}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{review.tour}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <Badge 
                          variant={review.status === "published" ? "default" : "secondary"}
                          className={review.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button className="hover:text-blue-600">
                        👍 Helpful ({review.helpful})
                      </button>
                      <button className="hover:text-blue-600">Reply</button>
                      {review.status === "pending" && (
                        <button className="hover:text-green-600">Approve</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
