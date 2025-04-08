// app/page.tsx
"use client";
import FileUpload from "@/components/FileUpload";
import ImageGallery from "@/components/ImageGallery";
import { useState, useEffect } from "react";

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images');
        const data = await res.json();
        setImages(data);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
      setImages(images.filter(img => img._id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="space-y-8">
        <FileUpload />
        {loading ? (
          <div className="text-center py-8">Loading images...</div>
        ) : (
          <ImageGallery images={images} onDelete={handleDelete} />
        )}
      </div>
    </main>
  );
}