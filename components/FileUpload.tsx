"use client";

import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React, { useState } from "react";
import ImageForm from "./ImageForm";

const FileUpload = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <div>
      <CldUploadWidget
        signatureEndpoint={"/api/sign-image"}
        options={{ multiple: true }} // 🔥 Enable multiple uploads
        onSuccess={(result) => {
          // console.log(result)
          //   if (Array.isArray(result?.info)) {
          //     // If multiple files are returned
          //     const urls = result.info.map((file: CloudinaryUploadWidgetInfo) => file.secure_url);
          //     setImageUrls((prev) => [...prev, ...urls]);
          //   } else if (result?.info && typeof result.info === 'object' && 'secure_url' in result.info) {
          //     // If a single file is returned
          //     const info = result.info as CloudinaryUploadWidgetInfo;
          //     setImageUrls((prev) => [...prev, info.secure_url]);
          //   }

          if (
            result?.info &&
            typeof result.info === "object" &&
            "secure_url" in result.info
          ) {
            // If a single file is returned
            const info = result.info as CloudinaryUploadWidgetInfo;
            setImageUrls((prev) => [...prev, info.secure_url]);
          }
        }}
      >
        {({ open }) => (
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            onClick={() => open()}
            type="button"
          >
            Upload Images
          </button>
        )}
      </CldUploadWidget>

      {imageUrls.length > 0 && (
        <ImageForm imageUrls={imageUrls}></ImageForm>
      )}
    </div>
  );
};

export default FileUpload;
