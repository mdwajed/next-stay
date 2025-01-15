import { NextResponse } from "next/server";
import Hotel from "@/models/Model";
import connectMongo from "@/lib/connectMongo";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);
    if (!hotel) {
      return NextResponse.json(
        { message: `Hotel ${params.id} not found` },
        { status: 404 },
      );
    }

    // Include reviews, rating, and reviews count in the response
    return NextResponse.json({
      hotel,
      reviews: hotel.reviews || [],
      rating: hotel.rating || 0,
      reviewsNo: hotel.reviews?.length || 0,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);

    if (!hotel) {
      return NextResponse.json(
        { message: `Hotel ${params.id} not found` },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { reviewerName, rating, reviewText, userId } = body;

    // Check if the user has already submitted a review
    if (hotel.reviews.some((r) => r.userId === userId)) {
      return NextResponse.json(
        { message: "User has already reviewed this hotel." },
        { status: 400 },
      );
    }

    // Create and add the new review
    const newReview = {
      reviewerName,
      rating,
      reviewText,
      userId,
      date: new Date(),
    };

    hotel.reviews = [...(hotel.reviews || []), newReview];

    // Recalculate the average rating
    const totalRating = hotel.reviews.reduce((sum, r) => sum + r.rating, 0);
    hotel.rating = totalRating / hotel.reviews.length;

    await hotel.save();

    return NextResponse.json({
      message: "Review added successfully.",
      reviews: hotel.reviews,
      rating: hotel.rating,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);

    if (!hotel) {
      return NextResponse.json(
        { message: `Hotel ${params.id} not found` },
        { status: 404 },
      );
    }

    await Hotel.findByIdAndDelete(hotel._id);

    return NextResponse.json({
      message: `Hotel ${params.id} has been deleted`,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
