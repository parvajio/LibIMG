// models/Image.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  url: string;
  name: string;
  shortDescription: string;
  tags: string[];
  createdAt: Date;
}

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  shortDescription: { type: String, required: false },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);