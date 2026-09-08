import { Media } from "../../../domain/entities/Media.js";
import { MediaRepository } from "../../../domain/ports/MediaRepository.js";

export class FakeMediaRepository implements MediaRepository {
  private medias: Media[] = [];

  async save(media: Media): Promise<Media> {
    this.medias.push(media);
    return media;
  }
}
