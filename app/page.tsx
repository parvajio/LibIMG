// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import ImageGallery from "@/components/ImageGallery";
import { Pagination, Stack } from "@mui/material";

export default function Home() {
  const [data, setData] = useState({
    images: [],
    total: 0,
    page: 1,
    totalPages: 1
  });
  const [loading, setLoading] = useState(true);

  const fetchImages = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/images?page=${page}`);
      const newData = await res.json();
      setData(newData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
      // Refresh current page after delete
      fetchImages(data.page);
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchImages(page);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="space-y-8">
        <FileUpload onUploadSuccess={() => fetchImages(data.page)} />
        
        {loading ? (
          <div className="text-center py-8">Loading images...</div>
        ) : (
          <>
            <ImageGallery images={data.images} onDelete={handleDelete} />
            {data.totalPages > 1 && (
              <Stack spacing={2} alignItems="center">
                <Pagination
                  count={data.totalPages}
                  page={data.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            )}
          </>
        )}
      </div>
    </main>
  );
}