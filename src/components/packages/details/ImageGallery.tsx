
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ImageGalleryProps {
  images: Array<{
    id: string;
    file_path: string;
    file_name: string;
    media_type: string;
    caption: string;
    is_primary: boolean;
    display_order: number;
  }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={images[selectedImage]?.file_path || '/placeholder.svg'}
            alt={images[selectedImage]?.caption || 'Package image'}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image.file_path}
                  alt={image.caption || `Gallery ${index + 1}`}
                  className="w-full h-16 sm:h-20 object-cover hover:opacity-80 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
