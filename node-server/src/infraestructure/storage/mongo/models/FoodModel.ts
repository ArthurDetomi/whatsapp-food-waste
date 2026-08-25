import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    estimatedExpiration: {
      type: String,
      required: false,
    },

    confidence: {
      type: Number,
      required: true,
    },

    observations: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const FoodModel = mongoose.model("Food", foodSchema);
