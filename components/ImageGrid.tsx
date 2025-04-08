"use client";
import React from "react";
import Card from "./Card";
import { Box } from "@mui/material";

interface ImageGridProps {
  images: Array<{
    _id: string;
    url: string;
    name: string;
    shortDescription: string;
  }>;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden"
      }}
    >
      {images.map((image) => (
        <Box key={image._id}>
          <Card
            url={image.url}
            name={image.name}
            shortDescription={image.shortDescription}
            id={image._id}
            onDelete={() => {
              window.location.reload();
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ImageGrid;