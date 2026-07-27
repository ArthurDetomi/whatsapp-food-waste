import { ConversationRepository } from "../../domain/ports/ConversationRepository.js";
import { redisClient } from "../redis/client.js";

import { CONVERSATION_TTL_SECONDS } from "../redis/constants.js";

export class RedisConversationRepository implements ConversationRepository {
  private getConversationKey(phone: string): string {
    return `conversation:last-interaction:${phone}`;
  }

  async findLastInteractionId(phone: string): Promise<string | undefined> {
    const interactionId = await redisClient.get(this.getConversationKey(phone));
    return interactionId ?? undefined;
  }

  async saveLastInteractionId(
    phone: string,
    interactionId: string,
  ): Promise<void> {
    await redisClient.set(this.getConversationKey(phone), interactionId, {
      expiration: { type: "EX", value: CONVERSATION_TTL_SECONDS },
    });
  }

  async deleteConversation(phone: string): Promise<void> {
    await redisClient.del(this.getConversationKey(phone));
  }
}
