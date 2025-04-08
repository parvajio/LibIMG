"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, IconButton, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageGalleryProps {
    images: any[];
    onDelete: (id: string) => void;
    searchTerm?: string;
}

const ImageGallery = ({ images, onDelete, searchTerm }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [imageToDelete, setImageToDelete] = useState<any | null>(null);

    const handleDeleteConfirm = async () => {
        if (imageToDelete) {
            await onDelete(imageToDelete._id);
            setImageToDelete(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                    

                    <div key={image._id} className="relative border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {/* Image */}
                        <div
                            className="relative aspect-square cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image.url}
                                alt={image.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image Info */}
                        <div className="p-3 space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-medium">{image.name}</h3>
                                    {image.shortDescription && (
                                        <p className="text-sm text-gray-600 line-clamp-2">{image.shortDescription}</p>
                                    )}
                                </div>
                                {/* Delete Button - Top Right Corner */}
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImageToDelete(image);
                                    }}
                                    size="small"
                                    className="text-red-500 ml-2"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1">
                                {image.tags?.map((tag: string) => (
                                    <Chip key={tag} label={tag} size="small" />
                                ))}
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md" fullWidth>
                    <DialogContent>
                        <div className="space-y-4">
                            <div className="relative aspect-video">
                                <Image
                                    src={selectedImage.url}
                                    alt={selectedImage.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold">{selectedImage.name}</h2>
                                {selectedImage.shortDescription && (
                                    <p className="text-gray-700">{selectedImage.shortDescription}</p>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {selectedImage.tags?.map((tag: string) => (
                                        <Chip key={tag} label={tag} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Delete Confirmation Modal */}
            <Dialog open={!!imageToDelete} onClose={() => setImageToDelete(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete "{imageToDelete?.name}"?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setImageToDelete(null)}>Cancel</Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ImageGallery;