import { Media } from "../entities/Media.js";

export interface MediaRepository {
  save(media: Media): Promise<Media>;
}
