"use client";

import React, { useState } from "react";

interface ImageData {
  url: string;
  name: string;
  shortDescription: string;
  isSaved: boolean;
}

const ImageForm = ({ imageUrls }: { imageUrls: string[] }) => {
  const [images, setImages] = useState<ImageData[]>(
    imageUrls.map(url => ({
      url,
      name: "",
      shortDescription: "",
      isSaved: false
    }))
  );

  const handleSave = async (index: number) => {
    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: images[index].url,
          name: images[index].name,
          shortDescription: images[index].shortDescription,
        }),
      });

      if (response.ok) {
        const updatedImages = [...images];
        updatedImages[index].isSaved = true;
        setImages(updatedImages);
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleInputChange = (index: number, field: "name" | "shortDescription", value: string) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <img
            src={image.url}
            alt={`Uploaded ${index + 1}`}
            className="max-w-full rounded shadow"
          />
          <div className="space-y-2 p-2">
            <input
              type="text"
              placeholder="Image Name"
              value={image.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Short Description"
              value={image.shortDescription}
              onChange={(e) => handleInputChange(index, "shortDescription", e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => handleSave(index)}
              disabled={image.isSaved}
              className={`w-full p-2 rounded ${
                image.isSaved
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {image.isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageForm;
