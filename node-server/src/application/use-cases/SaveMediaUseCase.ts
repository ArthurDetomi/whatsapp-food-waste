import { Media } from "../../domain/entities/Media.js";
import { MediaRepository } from "../../domain/ports/MediaRepository.js";
import { UseCase } from "./UseCase.js";

export interface SaveMediaInput {
  userId: string;
  type: Media["type"];
  mimeType: string;
  data: string;
  fileName?: string;
}

export class SaveMediaUseCase implements UseCase<SaveMediaInput, Media> {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async execute(input: SaveMediaInput): Promise<Media> {
    const media = new Media({
      userId: input.userId,
      type: input.type,
      mimeType: input.mimeType,
      data: input.data,
      fileName: input.fileName,
    });

    return this.mediaRepository.save(media);
  }
}
