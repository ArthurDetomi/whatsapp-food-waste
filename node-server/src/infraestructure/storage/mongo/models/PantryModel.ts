// src/infraestructure/storage/mongo/models/PantryModel.ts

import mongoose from "mongoose";

const PantrySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    expirationDate: { type: Date, required: true },
  },
  { timestamps: true },
);

export const PantryModel = mongoose.model("PantryItem", PantrySchema);
