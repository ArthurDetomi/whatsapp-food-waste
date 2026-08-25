import mongoose from "mongoose";

import { MONGODB_URI, MONGODB_DATABASE } from "../../../config/config.js";

export async function connectMongo() {
  await mongoose.connect(MONGODB_URI!, {
    dbName: MONGODB_DATABASE,
  });

  console.log("MongoDb conectado!");
}
