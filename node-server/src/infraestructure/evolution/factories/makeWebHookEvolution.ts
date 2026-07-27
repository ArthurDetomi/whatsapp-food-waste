import { WebHookController } from "../../http/controllers/WebHookController.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";
import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";

import { GeminiFoodAssistant } from "../../ai/gemini/GeminiFoodAssistant.js";
import { InMemoryConversationRepository } from "../../conversation/InMemoryConversationRepository.js";
import { WhatsAppAIResponseFormatter } from "../WhatAppAIResponseFormatter.js";
import { RedisConversationRepository } from "../../conversation/RedisConverstationRepository.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const conversationRepository = new RedisConversationRepository();

  const foodAssistant = new GeminiFoodAssistant(conversationRepository);

  const responseFormatter = new WhatsAppAIResponseFormatter();

  const useCase = new ReceiveMessageUseCase(
    sender,
    foodAssistant,
    responseFormatter,
  );

  const mapper = new EvolutionWebhookMapper();

  return new WebHookController(useCase, mapper);
}
