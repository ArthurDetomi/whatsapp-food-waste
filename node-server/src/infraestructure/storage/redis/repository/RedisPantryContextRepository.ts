import { PantryContextRepository } from "../../../../domain/ports/PantryContextRepository.js";
import { redisClient } from "../client.js";

export class RedisPantryContextRepository implements PantryContextRepository {
  private getConversationKey(phone: string): string {
    return `pantry:references:${phone}`;
  }

  async saveReferences(
    phone: string,
    references: Record<string, string>,
  ): Promise<void> {
    const key = this.getConversationKey(phone);

    await redisClient.set(key, JSON.stringify(references), {
      expiration: { type: "EX", value: 60 * 30 },
    });
  }

  async findItemId(
    phone: string,
    identifier: string,
  ): Promise<string | undefined> {
    const key = this.getConversationKey(phone);

    const data = await redisClient.get(key);

    if (!data) {
      return undefined;
    }

    const references = JSON.parse(data) as Record<string, string>;

    return references[identifier];
  }
}
