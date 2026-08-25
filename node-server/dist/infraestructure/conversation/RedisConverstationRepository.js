import { redisClient } from "../storage/redis/client.js";
import { CONVERSATION_TTL_SECONDS } from "../storage/redis/constants.js";
export class RedisConversationRepository {
    getConversationKey(phone) {
        return `conversation:last-interaction:${phone}`;
    }
    async findLastInteractionId(phone) {
        const interactionId = await redisClient.get(this.getConversationKey(phone));
        return interactionId ?? undefined;
    }
    async saveLastInteractionId(phone, interactionId) {
        await redisClient.set(this.getConversationKey(phone), interactionId, {
            expiration: { type: "EX", value: CONVERSATION_TTL_SECONDS },
        });
    }
    async deleteConversation(phone) {
        await redisClient.del(this.getConversationKey(phone));
    }
}
