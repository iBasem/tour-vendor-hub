
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image, Video } from "lucide-react";

interface MediaStepProps {
  data: any[];
  onUpdate: (data: any[]) => void;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  isPrimary: boolean;
}

export function MediaStep({ data, onUpdate }: MediaStepProps) {
  const [media, setMedia] = useState<MediaItem[]>(data);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    onUpdate(media);
  }, [media, onUpdate]);

  // Mock media items for demonstration
  const mockImages = [
    "https://images.unsplash.com/photo-1539650116574-75c0c6c6178d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
  ];

  const addMockImages = () => {
    const newImages: MediaItem[] = mockImages.map((url, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      type: 'image' as const,
      url,
      caption: `Sample image ${index + 1}`,
      isPrimary: index === 0 && media.length === 0
    }));
    setMedia(prev => [...prev, ...newImages]);
  };

  const removeMedia = (id: string) => {
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  const setPrimary = (id: string) => {
    setMedia(prev => prev.map(item => ({
      ...item,
      isPrimary: item.id === id
    })));
  };

  const updateCaption = (id: string, caption: string) => {
    setMedia(prev => prev.map(item =>
      item.id === id ? { ...item, caption } : item
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // In a real app, you would handle file uploads here
    console.log("Files dropped:", e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Package Media</h3>
        <p className="text-gray-600">Upload photos and videos to showcase your package</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
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
              <Button onClick={addMockImages} className="bg-blue-600 hover:bg-blue-700">
                Add Sample Images
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Gallery */}
      {media.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Media ({media.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {media.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Video className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    {item.isPrimary && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Primary
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeMedia(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => updateCaption(item.id, e.target.value)}
                      placeholder="Add a caption..."
                      className="w-full text-sm border rounded px-2 py-1"
                    />
                    
                    {!item.isPrimary && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setPrimary(item.id)}
                        className="w-full"
                      >
                        Set as Primary
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Media Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Upload high-quality images (minimum 1200x800px)</li>
          <li>• The first image will be used as the primary package image</li>
          <li>• Supported formats: JPG, PNG, GIF, MP4, MOV</li>
          <li>• Maximum file size: 10MB per file</li>
        </ul>
      </div>
    </div>
  );
}
