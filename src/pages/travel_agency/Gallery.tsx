
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image, Video } from "lucide-react";

export default function Gallery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Media Gallery</h1>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Photo Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center text-gray-500">
                <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Upload and manage your travel photos</p>
                <p className="text-sm">Support for JPG, PNG, WebP formats</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Video Gallery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center text-gray-500">
                <Video className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Upload and manage your travel videos</p>
                <p className="text-sm">Support for MP4, WebM formats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
