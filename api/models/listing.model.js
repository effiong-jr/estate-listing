import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      lowercase: true,
      required: true,
      enum: {
        values: ["rent", "sale"],
        message: "{VALUE} is not supported",
      },
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
