"use client";
import { useState } from "react";
import Image from "next/image";
import { Chip, TextField } from "@mui/material";

const ImageForm = ({ url, onSave }: { url: string; onSave: (data: any) => Promise<void> }) => {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    tags: [] as string[],
    tagInput: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        url,
        name: formData.name,
        shortDescription: formData.shortDescription,
        tags: formData.tags
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ""
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <Image
        src={url}
        alt="Uploaded image"
        width={300}
        height={300}
        className="max-h-96 rounded-md shadow mx-auto"
      />
      
      <TextField
        fullWidth
        label="Image Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Short Description"
        multiline
        rows={3}
        value={formData.shortDescription}
        onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
        margin="normal"
      />
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <TextField
            fullWidth
            label="Add Tag"
            value={formData.tagInput}
            onChange={(e) => setFormData(prev => ({ ...prev, tagInput: e.target.value }))}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
            margin="none"
            size="small"
          />
          <button 
            onClick={handleAddTag}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
            />
          ))}
        </div>
      </div>
      
      <button
        onClick={handleSave}
        disabled={isSaving || !formData.name}
        className={`w-full p-2 rounded-md ${isSaving ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
      >
        {isSaving ? 'Saving...' : 'Save Image'}
      </button>
    </div>
  );
};

export default ImageForm;