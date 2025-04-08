"use client";

import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const FileUpload = () => {
  return (
    <div>
      <CldUploadWidget signatureEndpoint={"/api/sign-image"}>
        {({ open }) => {
          return (
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default FileUpload;
