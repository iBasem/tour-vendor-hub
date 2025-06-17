
import { useState, useEffect } from "react";
import { MediaUploadArea } from "./media/MediaUploadArea";
import { MediaGallery } from "./media/MediaGallery";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    toast.success("Sample images added successfully!");
  };

  const handleFileUpload = async (files: FileList) => {
    try {
      const newMediaItems: MediaItem[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Create a local URL for preview
        const url = URL.createObjectURL(file);
        
        const mediaItem: MediaItem = {
          id: Math.random().toString(36).substr(2, 9),
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url,
          caption: file.name,
          isPrimary: media.length === 0 && i === 0
        };
        
        newMediaItems.push(mediaItem);
      }
      
      setMedia(prev => [...prev, ...newMediaItems]);
      toast.success(`${newMediaItems.length} file(s) uploaded successfully!`);
    } catch (error) {
      console.error('File upload error:', error);
      toast.error("Failed to upload files");
    }
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
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Package Media</h3>
        <p className="text-gray-600">Upload photos and videos to showcase your package</p>
      </div>

      <div className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload your photos and videos
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop files here, or click to browse
              </p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <input
                type="file"
                id="photo-upload"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <label htmlFor="photo-upload">
                <Button type="button" variant="outline" asChild>
                  <span className="cursor-pointer">
                    Add Photos
                  </span>
                </Button>
              </label>
              
              <input
                type="file"
                id="video-upload"
                multiple
                accept="video/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <label htmlFor="video-upload">
                <Button type="button" variant="outline" asChild>
                  <span className="cursor-pointer">
                    Add Videos
                  </span>
                </Button>
              </label>
              
              <Button onClick={addMockImages} className="bg-blue-600 hover:bg-blue-700">
                Add Sample Images
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MediaGallery
        media={media}
        onRemoveMedia={removeMedia}
        onSetPrimary={setPrimary}
        onUpdateCaption={updateCaption}
      />

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
