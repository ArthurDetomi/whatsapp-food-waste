import { ConversationRepository } from "../../domain/ports/ConversationRepository.js";

export class InMemoryConversationRepository implements ConversationRepository {
  private readonly conversations = new Map<string, string>();

  async findLastInteractionId(phone: string): Promise<string | undefined> {
    return this.conversations.get(phone);
  }

  async saveLastInteractionId(
    phone: string,
    interactionId: string,
  ): Promise<void> {
    this.conversations.set(phone, interactionId);
  }

  async deleteConversation(phone: string): Promise<void> {
    this.conversations.delete(phone);
  }
}
