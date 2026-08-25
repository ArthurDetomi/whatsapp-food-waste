import { randomUUID } from "node:crypto";

import { Media } from "../../../../domain/entities/Media.js";
import { MediaRepository } from "../../../../domain/ports/MediaRepository.js";

import { MediaModel } from "../models/MediaModel.js";

import { uploadObject } from "../../oracle/ObjectStorageClient.js";

export class MongoMediaRepository implements MediaRepository {
  async save(media: Media): Promise<Media> {
    const objectKey = `users/${media.userId}/media/${randomUUID()}`;

    const data = Buffer.from(media.data, "base64");

    await uploadObject(objectKey, data, media.mimeType);

    const document = await MediaModel.create({
      userId: media.userId,
      type: media.type,
      mimeType: media.mimeType,
      fileName: media.fileName,
      objectKey,
    });

    return new Media({
      id: document._id.toString(),
      userId: document.userId,
      type: document.type,
      mimeType: document.mimeType,
      fileName: document.fileName ?? "",
      data: media.data,
    });
  }
}
