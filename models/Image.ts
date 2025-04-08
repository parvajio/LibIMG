import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: String,
  name: String,
  shortDescription: String,
  createdAt: { type: Date, default: Date.now }
});

export const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);
