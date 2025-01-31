import { NextResponse } from "next/server";
import Hotel from "@/models/Model";
import connectMongo from "@/lib/connectMongo";

export async function GET(req) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const search = searchParams.get("search") || "";

    // Build query
    const query = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};
    // Fetch hotels with pagination and filtering
    const hotels = await Hotel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Hotel.countDocuments(query);

    return NextResponse.json({
      data: hotels,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Error fetching hotels" },
      { status: 500 },
    );
  }
}
