import { WebHookController } from "../../http/controllers/WebHookController.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";
import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";

import { GeminiFoodAssistant } from "../../ai/gemini/GeminiFoodAssistant.js";
import { WhatsAppAIResponseFormatter } from "../WhatAppAIResponseFormatter.js";
import { RedisConversationRepository } from "../../conversation/RedisConverstationRepository.js";
import { MongoUserRepository } from "../../storage/mongo/repositories/MongoUserRepository.js";
import { MongoMediaRepository } from "../../storage/mongo/repositories/MongoMediaRepository.js";
import { MongoFoodRepository } from "../../storage/mongo/repositories/MongoFoodRepository.js";
import { FindOrCreateUserUseCase } from "../../../application/use-cases/FindOrCreateUserUseCase.js";
import { SaveMediaUseCase } from "../../../application/use-cases/SaveMediaUseCase.js";
import { SaveDetectedFoodsUseCase } from "../../../application/use-cases/SaveDetectedFoodsUseCase.js";
import { MongoPantryRepository } from "../../storage/mongo/repositories/MongoPantryRepository.js";
import { AddPantryItemsUseCase } from "../../../application/use-cases/AddPantryItemsUseCase.js";
import { ListPantryItemsUseCase } from "../../../application/use-cases/ListPantryItemsUseCase.js";
import { RemovePantryItemsUseCase } from "../../../application/use-cases/RemovePantryItemsUseCase.js";
import { UpdatePantryItemUseCase } from "../../../application/use-cases/UpdatePantryItemUseCase.js";
import { RedisPantryContextRepository } from "../../storage/redis/repository/RedisPantryContextRepository.js";
import { ListPantryItemsTool } from "../../../domain/ai/tools/ListPantryItemsTool.js";
import { AddPantryItemsTool } from "../../../domain/ai/tools/AddPantryItemsTool.js";
import { RemovePantryItemsTool } from "../../../domain/ai/tools/RemovePantryItemsTool.js";
import { UpdatePantryItemTool } from "../../../domain/ai/tools/UpdatePantryItemTool.js";
import { ToolRegistry } from "../../ai/gemini/ToolRegistry.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const conversationRepository = new RedisConversationRepository();

  const userRepository = new MongoUserRepository();

  const pantryRepository = new MongoPantryRepository();

  const addPantryItemUseCase = new AddPantryItemsUseCase(
    userRepository,
    pantryRepository,
  );

  const listPantryItemsUseCase = new ListPantryItemsUseCase(
    userRepository,
    pantryRepository,
  );

  const removePantryItemUseCase = new RemovePantryItemsUseCase(
    userRepository,
    pantryRepository,
  );

  const updatePantryItemUseCase = new UpdatePantryItemUseCase(
    userRepository,
    pantryRepository,
  );

  const pantryContextRepository = new RedisPantryContextRepository();

  const listPantryItemsTool = new ListPantryItemsTool(
    listPantryItemsUseCase,
    pantryContextRepository,
  );

  const addPantryItemTool = new AddPantryItemsTool(addPantryItemUseCase);

  const removePantryItemTool = new RemovePantryItemsTool(
    removePantryItemUseCase,
    pantryContextRepository,
  );

  const updatePantryItemTool = new UpdatePantryItemTool(
    updatePantryItemUseCase,
    pantryContextRepository,
  );

  const toolRegistry = new ToolRegistry([
    addPantryItemTool,
    listPantryItemsTool,
    removePantryItemTool,
    updatePantryItemTool,
  ]);

  const foodAssistant = new GeminiFoodAssistant(
    conversationRepository,
    toolRegistry,
  );
  const responseFormatter = new WhatsAppAIResponseFormatter();

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
