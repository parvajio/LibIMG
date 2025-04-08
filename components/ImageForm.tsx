"use client";

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

  console.log(url)
  console.log(images)

  const handleSave = async (index: number) => {
    try {
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
        images.isSaved = true;
        setImages(images);
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleInputChange = (
    field: "name" | "shortDescription",
    value: string
  ) => {
    setImages({
      ...images,
      [field]: value
    });
  };

  return (
    <div className="space-y-2">
      <img
        src={images.url}
        alt={`Uploaded `}
        className="max-w-full rounded shadow"
      />
      <div className="space-y-2 p-2">
        <input
          type="text"
          placeholder="Image Name"
          value={images.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Short Description"
          value={images.shortDescription}
          onChange={(e) => handleInputChange("shortDescription", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={() => handleSave(0)}
          disabled={images.isSaved}
          className={`w-full p-2 rounded ${
            images.isSaved
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {images.isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ImageForm;
