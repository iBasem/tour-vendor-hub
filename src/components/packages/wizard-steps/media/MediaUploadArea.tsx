
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image, Video } from "lucide-react";

interface MediaUploadAreaProps {
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onAddSampleImages: () => void;
}

export function MediaUploadArea({
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddSampleImages
}: MediaUploadAreaProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload your photos and videos
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline">
              <Image className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
            <Button variant="outline">
              <Video className="w-4 h-4 mr-2" />
              Add Videos
            </Button>
            <Button onClick={onAddSampleImages} className="bg-blue-600 hover:bg-blue-700">
              Add Sample Images
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
