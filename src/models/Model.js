import { model, models, Schema, Types } from "mongoose";

const propertySchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  roomsAvailable: {
    type: Number,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    required: false,
    default: "https://placehold.co/600x400",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Property = models.Property || model("Property", propertySchema);

// Review Schema

const reviewSchema = new Schema({
  reviewerName: {
    type: String, // Use ObjectId type
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Hotel Schema

const HotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    availableRooms: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    averageRating: { type: Number, default: 5 },
    reviews: [reviewSchema],
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

const Hotel = models.Hotel || model("Hotel", HotelSchema);
export default Hotel;

const userSchema = new Schema(
  // {
  //   userId: {
  //     // Add a userId field for UUID
  //     type: String, // You can store UUID as a string
  //     required: true,
  //     unique: true,
  //   },
  // },
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);
export const User = models.User || model("User", userSchema);
