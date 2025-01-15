import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import connectMongo from "@/lib/connectMongo";
import { Property } from "@/models/Model";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const propertyData = await req.json();

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 },
      );
    }

    // Cast the userId to ObjectId
    const userId = new mongoose.Types.ObjectId(session.user.id);
    console.log("User ID:", session.user.id);
    await connectMongo();

    const newProperty = await Property.create({
      ...propertyData,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Property published successfully",
        // propertyId: result.insertedId,
        propertyId: newProperty._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error publishing property:", error);
    return NextResponse.json(
      { error: "Failed to publish property" },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    // Get user session

    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }
    await connectMongo();
    // Connect to MongoDB
    // client = new MongoClient(uri);
    // await client.connect();
    // const db = client.db(dbName);

    // Query properties created by the authenticated user
    // const properties = await db
    //   .collection("properties")
    //   .find({ userId })
    //   .toArray();
    // Fetch properties created by the authenticated user
    const properties = await Property.find({ userId });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 },
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Delete the property
    // const result = await db
    //   .collection("properties")
    //   .deleteOne({ _id: propertyId, userId });
    const result = await Property.deleteOne({ _id: propertyId, userId });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Property not found or unauthorized action" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Property deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    // Authenticate the user
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 },
      );
    }

    const userId = session.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);
    const propertyId = searchParams.get("id");

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 },
      );
    }

    const propertyUpdates = await req.json();

    // Connect to MongoDB
    await connectMongo();

    // Update the property
    // const result = await db.collection("properties").findOneAndUpdate(
    //   { _id: propertyId, userId },
    //   { $set: propertyUpdates },
    //   { new: true } // Return the updated document
    // );

    const updatedProperty = await Property.findOneAndUpdate(
      { _id: propertyId, userId },
      { $set: propertyUpdates },
      { new: true },
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { error: "Property not found or unauthorized action" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Property updated successfully", property: updatedProperty },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 },
    );
  }
}
