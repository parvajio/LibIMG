"use client";

import Image from "next/image";
import React, { useState } from "react";

// interface ImageData {
//   url: string;
//   name: string;
//   shortDescription: string;
//   isSaved: boolean;
// }

const ImageForm = ({ url }: { url: string }) => {
  const [images, setImages] = useState({
    url,
    name: "",
    shortDescription: "",
    isSaved: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving || images.isSaved) return;
    
    try {
      setIsSaving(true);
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: images.url,
          name: images.name,
          shortDescription: images.shortDescription,
        }),
      });

      if (response.ok) {
        setImages(prev => ({
          ...prev,
          isSaved: true
        }));
      } else {
        console.error("Failed to save image");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (
    field: "name" | "shortDescription",
    value: string
  ) => {
    setImages(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-2">
      <Image
        src={images.url}
        alt="Uploaded image"
        width={300}
        height={300}
        className="max-h-96 rounded-md shadow mx-auto"
      />
      <div className="space-y-4 p-4 bg-white rounded-lg shadow">
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="image-name"
            className="text-sm font-medium text-gray-700"
          >
            Image Name
          </label>
          <input
            id="image-name"
            type="text"
            placeholder="Enter image name"
            value={images.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={images.isSaved}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label
            htmlFor="short-description"
            className="text-sm font-medium text-gray-700"
          >
            Short Description
          </label>
          <input
            id="short-description"
            type="text"
            placeholder="Enter a short description"
            value={images.shortDescription}
            onChange={(e) => handleInputChange("shortDescription", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={images.isSaved}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={images.isSaved || isSaving || !images.name}
          className={`w-full p-2 rounded-md transition-all duration-200 ${
            images.isSaved
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isSaving
              ? "bg-blue-400 text-white cursor-wait"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isSaving ? "Saving..." : images.isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ImageForm;
