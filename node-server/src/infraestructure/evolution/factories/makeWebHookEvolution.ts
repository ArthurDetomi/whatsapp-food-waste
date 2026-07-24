import { WebHookController } from "../../http/controllers/WebHookController.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";
import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";

import { GeminiFoodAssistant } from "../../ai/gemini/GeminiFoodAssistant.js";
import { InMemoryConversationRepository } from "../../conversation/InMemoryConversationRepository.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const conversationRepository = new InMemoryConversationRepository();

  const foodAssistant = new GeminiFoodAssistant(conversationRepository);

  const useCase = new ReceiveMessageUseCase(sender, foodAssistant);

  const mapper = new EvolutionWebhookMapper();

  return new WebHookController(useCase, mapper);
}
