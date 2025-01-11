import { model, models, Schema } from "mongoose";
const reviewSchema = new Schema({
  reviewerName: {
    type: String,
    required: true,
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
        ret.id = ret._id; // Create an `id` field as a copy of `_id`
        delete ret._id; // Remove the `_id` field
      },
    },
  }
);

const Hotel = models.Hotel || model("Hotel", HotelSchema);
export default Hotel;

const userSchema = new Schema(
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
        ret.id = ret._id; // Add `id` field
        delete ret._id; // Remove `_id`
      },
    },
  }
);
export const User = models.User || model("User", userSchema);
