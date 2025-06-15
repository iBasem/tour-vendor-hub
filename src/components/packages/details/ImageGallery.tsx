
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={images[selectedImage]}
            alt={title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-20 object-cover hover:opacity-80 transition-opacity"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
