export interface ConversationRepository {
  findLastInteractionId(phone: string): Promise<string | undefined>;

  saveLastInteractionId(phone: string, interactionId: string): Promise<void>;

  deleteConversation(phone: string): Promise<void>;
}
