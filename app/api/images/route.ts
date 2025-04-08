// app/api/images/route.ts

import connectDB from "@/lib/mongoose";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const searchTerm = searchParams.get('search') || '';
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '12');
//     const skip = (page - 1) * limit;
    
//     let query = {};
//     if (searchTerm) {
//       query = {
//         $or: [
//           { name: { $regex: searchTerm, $options: 'i' } },
//           { shortDescription: { $regex: searchTerm, $options: 'i' } },
//           { tags: { $regex: searchTerm, $options: 'i' } }
//         ]
//       };
//     }

//     const [images, total] = await Promise.all([
//       Image.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       Image.countDocuments(query)
//     ]);

//     return NextResponse.json({
//       images,
//       total,
//       page,
//       totalPages: Math.ceil(total / limit)
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch images" },
//       { status: 500 }
//     );
//   }
// }

// POST new image

// app/api/images/route.ts

export async function GET(request: Request) {
    try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const searchTerm = searchParams.get('search') || '';
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '12');
      
      // First get the total count and all matching IDs for search
      let query = {};
      if (searchTerm) {
        query = {
          $or: [
            { name: { $regex: searchTerm, $options: 'i' } },
            { shortDescription: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } }
          ]
        };
      }
  
      // Get all matching IDs first (for consistent pagination with search)
      const allMatchingIds = await Image.find(query).select('_id');
      const total = allMatchingIds.length;
      
      // Then get paginated results
      const images = await Image.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      return NextResponse.json({
        images,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        allResultsCount: total
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch images" },
        { status: 500 }
      );
    }
  }

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newImage = new Image(body);
    await newImage.save();
    return NextResponse.json(newImage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save image" },
      { status: 500 }
    );
  }
}

// DELETE image
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    await Image.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}