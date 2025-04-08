// import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';

// // Define the image schema
// const imageSchema = new mongoose.Schema({
//   url: String,
//   name: String,
//   shortDescription: String,
//   createdAt: { type: Date, default: Date.now }
// });

// // Create the model if it doesn't exist
// const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

// // Connect to MongoDB
// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) return;
//   await mongoose.connect(process.env.MONGODB_URI as string);
// };

// export async function POST(request: Request) {
//   try {
//     await connectDB();
//     const body = await request.json();
    
//     const image = new Image({
//       url: body.url,
//       name: body.name,
//       shortDescription: body.shortDescription
//     });
    
//     await image.save();
    
//     return NextResponse.json({ success: true, image });
//   } catch (error) {
//     console.error('Error saving image:', error);
//     return NextResponse.json({ success: false, error: 'Failed to save image' }, { status: 500 });
//   }
// } 

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Image } from "@/models/Image";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const image = new Image(body);
    await image.save();

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error("Error saving image:", error);
    return NextResponse.json({ success: false, error: "Failed to save image" }, { status: 500 });
  }
}

// get

export async function GET() {
  try {
    await connectDB();
    const images = await Image.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch images" }, { status: 500 });
  }
}

