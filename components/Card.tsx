"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface CardProps {
  url: string;
  name: string;
  shortDescription: string;
  id: string;
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({ url, name, shortDescription, id, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/images?id=${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        onDelete?.();
      } else {
        console.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <MuiCard
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 400,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
          },
          position: "relative",
        }}
        onClick={handleOpen}
      >
        <IconButton
          onClick={handleDeleteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
            zIndex: 1,
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <Box sx={{ position: "relative", width: "100%", height: 320 }}>
          {!imageError ? (
            <Image
              src={url}
              alt={name}
              fill
              style={{
                objectFit: "cover",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
              priority
              onError={handleImageError}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.200",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <Typography color="text.secondary">Image not available</Typography>
            </Box>
          )}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {shortDescription}
          </Typography>
        </CardContent>
      </MuiCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal"
        aria-describedby="image-modal-description"
      >
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              width: {
                xs: "90vw",
                sm: "80vw",
                md: "70vw",
              },
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "auto",
              boxShadow: 24,
              p: 2,
            }}
          >
            <Box sx={{ position: "relative", width: "100%", height: "60vh" }}>
              {!imageError ? (
                <Image
                  src={url}
                  alt={name}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  priority
                  onError={handleImageError}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.200",
                  }}
                >
                  <Typography color="text.secondary">Image not available</Typography>
                </Box>
              )}
            </Box>

            <Typography variant="h6" sx={{ mt: 2 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shortDescription}
            </Typography>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this image? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Card;
