import { NextResponse } from "next/server";
import Hotel from "@/models/Model";
import connectMongo from "@/lib/connectMongo";

export async function GET(_, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);
    if (hotel) {
      return NextResponse.json({ hotel });
    }
    return NextResponse.json(
      { message: `Hotel ${params.id} not found` },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);
    if (hotel) {
      const body = await req.json();
      if (body.name) {
        hotel.name = body.name;
      }
      if (body.price) {
        hotel.name = body.price;
      }
      if (body.description) {
        hotel.name = body.description;
      }
      hotel.save();
      return NextResponse.json({ hotel });
    }
    return NextResponse.json(
      { message: `Hotel ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    await connectMongo();
    const hotel = await Hotel.findById(params.id);
    if (hotel) {
      await Hotel.findByIdAndDelete(hotel._id);
      return NextResponse.json({
        message: `Hotel ${params.id} has been deleted`,
      });
    }
    return NextResponse.json(
      { message: `Hotel ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
