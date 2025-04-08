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
    const images = await Image.find().sort({ createdAt: -1 }).lean(); // Add .lean() to get plain objects
    // Convert MongoDB _id to string
    const serializedImages = images.map(image => ({
      ...image,
      _id: image._id.toString()
    }));
    return NextResponse.json({ success: true, images: serializedImages });
  } catch (error) {
    console.error("Error fetching images:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    console.error("Detailed error:", {
      message: errorMessage,
      stack: errorStack
    });
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch images",
      details: errorMessage 
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: "Image ID is required" }, { status: 400 });
    }

    const deletedImage = await Image.findByIdAndDelete(id);
    
    if (!deletedImage) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 });
  }
}

