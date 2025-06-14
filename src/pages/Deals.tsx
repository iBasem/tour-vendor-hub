
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Calendar, Percent, TrendingUp } from "lucide-react";

const deals = [
  {
    id: 1,
    title: "Summer Special",
    description: "25% off all beach destinations",
    discount: 25,
    validFrom: "Jun 1, 2024",
    validTo: "Aug 31, 2024",
    used: 45,
    total: 100,
    status: "Active",
    type: "Percentage"
  },
  {
    id: 2,
    title: "Early Bird Discount",
    description: "Book 3 months in advance and save $200",
    discount: 200,
    validFrom: "Jan 1, 2024",
    validTo: "Dec 31, 2024",
    used: 78,
    total: 150,
    status: "Active",
    type: "Fixed Amount"
  },
  {
    id: 3,
    title: "Group Booking Deal",
    description: "15% off for groups of 5 or more",
    discount: 15,
    validFrom: "Mar 1, 2024",
    validTo: "Nov 30, 2024",
    used: 23,
    total: 50,
    status: "Active",
    type: "Percentage"
  },
  {
    id: 4,
    title: "Weekend Getaway",
    description: "Special rates for weekend trips",
    discount: 30,
    validFrom: "May 1, 2024",
    validTo: "May 31, 2024",
    used: 34,
    total: 75,
    status: "Expired",
    type: "Percentage"
  }
];

export default function Deals() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Deals & Promotions</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Deal
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search deals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{deals.filter(d => d.status === "Active").length}</div>
                <div className="text-sm text-gray-600">Active Deals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {deals.reduce((sum, deal) => sum + deal.used, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Redemptions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">$12,450</div>
                <div className="text-sm text-gray-600">Total Savings Given</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(deals.reduce((sum, deal) => sum + getUsagePercentage(deal.used, deal.total), 0) / deals.length)}%
                </div>
                <div className="text-sm text-gray-600">Avg Usage Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{deal.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{deal.description}</p>
                </div>
                <Badge className={getStatusColor(deal.status)}>
                  {deal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Discount Info */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {deal.type === "Percentage" ? `${deal.discount}%` : `$${deal.discount}`}
                  </div>
                  <div className="text-sm text-blue-700">
                    {deal.type === "Percentage" ? "Discount" : "Off"}
                  </div>
                </div>
              </div>

              {/* Validity Period */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{deal.validFrom} - {deal.validTo}</span>
              </div>

              {/* Usage Stats */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Usage</span>
                  <span>{deal.used}/{deal.total} ({getUsagePercentage(deal.used, deal.total)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${getUsagePercentage(deal.used, deal.total)}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button 
                  variant={deal.status === "Active" ? "destructive" : "default"} 
                  size="sm" 
                  className="flex-1"
                >
                  {deal.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Deal Prompt */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-blue-900 mb-2">
            Boost Your Sales with Special Deals!
          </h3>
          <p className="text-blue-700 mb-4">
            Create attractive promotions to increase bookings and customer satisfaction
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create Your First Deal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
