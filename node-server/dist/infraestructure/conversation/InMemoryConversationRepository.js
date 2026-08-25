export class InMemoryConversationRepository {
    conversations = new Map();
    async findLastInteractionId(phone) {
        return this.conversations.get(phone);
    }
    async saveLastInteractionId(phone, interactionId) {
        this.conversations.set(phone, interactionId);
    }
    async deleteConversation(phone) {
        this.conversations.delete(phone);
    }
}
