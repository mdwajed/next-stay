import { NextRequest, NextResponse } from "next/server";
import Hotel from "@/models/Model";
import connectMongo from "@/lib/connectMongo";
import { auth } from "../../../../../../auth";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id).select("reviews");

    if (!hotel) {
      return NextResponse.json(
        { message: `Hotel ${params.id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ reviews: hotel.reviews });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectMongo();
    const session = await auth();
    console.log("Session data:", session);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, reviewText } = body;
    const userId = session.user.id; // Get the logged-in user's ID
    const reviewerName = session.user.name; // Get the logged-in user's name
    console.log("ID", userId, "Name", reviewerName);
    if (!rating || !reviewText) {
      return NextResponse.json(
        { message: "Rating and review text are required." },
        { status: 400 }
      );
    }
    // Find the hotel by ID
    const hotel = await Hotel.findById(params.id);
    console.log("hotel review :", hotel.reviews);
    if (!hotel) {
      return NextResponse.json(
        { message: `Hotel ${params.id} not found` },
        { status: 404 }
      );
    }

    // Prevent duplicate reviews by the same user
    // if (hotel.reviews.some((r) => r.userId && r.userId.toString() === userId)) {
    //   return NextResponse.json(
    //     { message: "You have already reviewed this hotel." },
    //     { status: 400 }
    //   );
    // }
    const existingReview = await Hotel.findOne({
      _id: params.id,
      "reviews.userId": userId,
    });

    if (existingReview) {
      return NextResponse.json(
        { message: "You have already reviewed this hotel." },
        { status: 400 }
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
    // hotel.reviews.push(newReview);

    // Update the average rating
    const totalRating = hotel.reviews.reduce((sum, r) => sum + r.rating, 0);
    hotel.averageRating = totalRating / hotel.reviews.length;

    // await hotel.save();
    await Hotel.updateOne(
      { _id: params.id },
      { $push: { reviews: newReview } }
    );
    return NextResponse.json({ review: newReview });
  } catch (error) {
    console.error("Error creating review:", error.message);
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
        { status: 404 }
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
