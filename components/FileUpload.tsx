"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import ImageForm from "./ImageForm";

interface FileUploadProps {
  onUploadSuccess?: () => void; 
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleSaveImage = async (imageData: any) => {
    const response = await fetch('/api/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });

    if (response.ok) {
      setUploadedUrls(prev => prev.filter(url => url !== imageData.url));
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    }
  };

  return (
    <div className="space-y-6">
      <CldUploadWidget
        signatureEndpoint="/api/sign-image"
        options={{ multiple: true }}
        onSuccess={(result) => {
          if (result?.info && typeof result.info === "object" && "secure_url" in result.info) {
            const info = result.info as any;
            setUploadedUrls(prev => [...prev, info.secure_url]);
          }
        }}
      >
        {({ open }) => (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => open()}
            type="button"
          >
            Upload Images
          </button>
        )}
      </CldUploadWidget>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {uploadedUrls.map(url => (
          <ImageForm key={url} url={url} onSave={handleSaveImage} />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;