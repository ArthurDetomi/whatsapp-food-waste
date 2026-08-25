import mongoose from "mongoose";
import { MessageType } from "../../../../domain/entities/MessageType.js";
const mediaSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    type: {
        type: String,
        enum: Object.values(MessageType),
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: false,
    },
    objectKey: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
export const MediaModel = mongoose.model("Media", mediaSchema);
