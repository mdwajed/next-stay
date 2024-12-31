import { model, models, Schema } from "mongoose";

const HotelSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    availableRooms: { type: Number, required: true, min: 0 },
    images: [{ type: String }], // Array of image URLs
    averageRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

const Hotel = models.Hotel || model("Hotel", HotelSchema);
export default Hotel;
