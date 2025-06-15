
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Percent, Calendar } from "lucide-react";

export default function Deals() {
  const deals = [
    {
      id: 1,
      title: "Early Bird Special",
      description: "Book 3 months in advance and save 20%",
      discount: 20,
      type: "Percentage",
      validUntil: "2024-06-30",
      status: "Active",
      bookings: 45
    },
    {
      id: 2,
      title: "Summer Sale",
      description: "Limited time offer for summer packages",
      discount: 15,
      type: "Percentage",
      validUntil: "2024-08-31",
      status: "Active",
      bookings: 23
    },
    {
      id: 3,
      title: "Group Discount",
      description: "Special rates for groups of 6 or more",
      discount: 25,
      type: "Percentage",
      validUntil: "2024-12-31",
      status: "Draft",
      bookings: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Deals & Promotions</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Card key={deal.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{deal.title}</CardTitle>
                <Badge className={getStatusColor(deal.status)}>
                  {deal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{deal.description}</p>
                
                <div className="flex items-center space-x-2">
                  <Percent className="w-4 h-4 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">{deal.discount}%</span>
                  <span className="text-sm text-gray-600">OFF</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {deal.validUntil}</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">{deal.bookings} bookings used</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
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
