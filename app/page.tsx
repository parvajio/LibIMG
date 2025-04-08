"use client";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import ImageGallery from "@/components/ImageGallery";
import { Pagination, Stack, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [data, setData] = useState({
    images: [],
    total: 0,
    page: 1,
    totalPages: 1,
    allResultsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchImages = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/images?page=${page}&search=${search}`);
      const newData = await res.json();
      setData(newData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(1, searchTerm);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
      fetchImages(data.page, searchTerm);
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchImages(page, searchTerm);
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <div className="space-y-8">
        <FileUpload onUploadSuccess={() => fetchImages(data.page, searchTerm)} />
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search all images..."
            className="w-full p-2 pl-10 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-3 top-3 text-gray-400" />
          {searchTerm && (
            <span className="absolute right-3 top-3 text-sm text-gray-500">
              {data.allResultsCount} results
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <CircularProgress />
          </div>
        ) : (
          <>
            <ImageGallery 
              images={data.images} 
              onDelete={handleDelete} 
              searchTerm={searchTerm}
            />
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