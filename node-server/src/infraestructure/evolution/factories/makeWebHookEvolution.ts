import { WebHookController } from "../../http/controllers/WebHookController.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";
import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";

import { GeminiFoodAssistant } from "../../ai/gemini/GeminiFoodAssistant.js";
import { InMemoryConversationRepository } from "../../conversation/InMemoryConversationRepository.js";
import { WhatsAppAIResponseFormatter } from "../WhatAppAIResponseFormatter.js";
import { RedisConversationRepository } from "../../conversation/RedisConverstationRepository.js";
import { MongoUserRepository } from "../../storage/mongo/repositories/MongoUserRepository.js";
import { MongoMediaRepository } from "../../storage/mongo/repositories/MongoMediaRepository.js";
import { MongoFoodRepository } from "../../storage/mongo/repositories/MongoFoodRepository.js";
import { FindOrCreateUserUseCase } from "../../../application/use-cases/FindOrCreateUserUseCase.js";
import { SaveMediaUseCase } from "../../../application/use-cases/SaveMediaUseCase.js";
import { SaveDetectedFoodsUseCase } from "../../../application/use-cases/SaveDetectedFoodsUseCase.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const conversationRepository = new RedisConversationRepository();

  const foodAssistant = new GeminiFoodAssistant(conversationRepository);

  const responseFormatter = new WhatsAppAIResponseFormatter();

  const userRepository = new MongoUserRepository();
  const mediaRepository = new MongoMediaRepository();
  const foodRepository = new MongoFoodRepository();

  const findOrCreateUserUseCase = new FindOrCreateUserUseCase(userRepository);

  const saveMediaUseCase = new SaveMediaUseCase(mediaRepository);

  const saveDetectedFoodsUseCase = new SaveDetectedFoodsUseCase(foodRepository);

  const useCase = new ReceiveMessageUseCase(
    sender,
    foodAssistant,
    responseFormatter,
    findOrCreateUserUseCase,
    saveMediaUseCase,
    saveDetectedFoodsUseCase,
  );

  const mapper = new EvolutionWebhookMapper();

  return new WebHookController(useCase, mapper);
}
