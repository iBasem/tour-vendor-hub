
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Users, Star, Image } from "lucide-react";

interface ReviewStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ReviewStep({ data, onUpdate }: ReviewStepProps) {
  const { basicInfo, itinerary, pricing, media } = data;

  const handlePublishToggle = (isPublished: boolean) => {
    onUpdate({ ...data, isPublished });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Review Your Package</h3>
        <p className="text-gray-600">Review all details before publishing your package</p>
      </div>

      {/* Package Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Package Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              {media.length > 0 ? (
                <img
                  src={media.find((m: any) => m.isPrimary)?.url || media[0]?.url}
                  alt={basicInfo.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Package Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{basicInfo.title || "Package Title"}</h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="capitalize">{basicInfo.destination || "Destination"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{basicInfo.duration || "Duration"}</span>
                </div>
                {basicInfo.maxGroupSize && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Max {basicInfo.maxGroupSize} people</span>
                  </div>
                )}
                {basicInfo.difficulty && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4" />
                    <Badge variant="outline" className="capitalize">
                      {basicInfo.difficulty}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="text-2xl font-bold text-blue-600">
                  {pricing.currency} {pricing.basePrice || "0"}
                </div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{basicInfo.description || "No description provided"}</p>
          </div>

          {/* Highlights */}
          {basicInfo.highlights && basicInfo.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {basicInfo.highlights.map((highlight: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{itinerary.length}</div>
            <div className="text-sm text-gray-600">Days</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{media.length}</div>
            <div className="text-sm text-gray-600">Media Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.values(pricing.inclusions || {}).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">Inclusions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {pricing.currency} {pricing.basePrice || "0"}
            </div>
            <div className="text-sm text-gray-600">Base Price</div>
          </CardContent>
        </Card>
      </div>

      {/* Publishing Options */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="publish"
              checked={data.isPublished}
              onCheckedChange={handlePublishToggle}
            />
            <Label htmlFor="publish">Publish package immediately</Label>
          </div>
          
          <div className="text-sm text-gray-600">
            {data.isPublished ? (
              <p>✓ Your package will be published and visible to customers immediately.</p>
            ) : (
              <p>Your package will be saved as a draft. You can publish it later from the packages list.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
