import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Image } from "@/models/Image";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }

    const images = await Image.find({
      name: { $regex: name, $options: "i" } // case-insensitive search
    });

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("Error searching images:", error);
    return NextResponse.json({ success: false, error: "Failed to search images" }, { status: 500 });
  }
}
