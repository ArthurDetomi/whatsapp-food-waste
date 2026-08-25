import { Media } from "../../domain/entities/Media.js";
export class SaveMediaUseCase {
    mediaRepository;
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async execute(input) {
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
