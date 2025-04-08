// components/ImageGallery.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const ImageGallery = ({ images, onDelete }: { images: any[], onDelete: (id: string) => void }) => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, description or tags..."
          className="w-full p-2 pl-10 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div key={image._id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square cursor-pointer" onClick={() => setSelectedImage(image)}>
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3 space-y-2">
              <h3 className="font-medium">{image.name}</h3>
              {image.shortDescription && (
                <p className="text-sm text-gray-600 line-clamp-2">{image.shortDescription}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {image.tags?.map((tag: string) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </div>
              <div className="flex justify-end">
                <IconButton onClick={() => onDelete(image._id)} size="small">
                  <DeleteIcon fontSize="small" className="text-red-500" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md" fullWidth>
          <DialogContent>
            <div className="space-y-4">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold">{selectedImage.name}</h2>
                {selectedImage.shortDescription && (
                  <p className="text-gray-700">{selectedImage.shortDescription}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags?.map((tag: string) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ImageGallery;