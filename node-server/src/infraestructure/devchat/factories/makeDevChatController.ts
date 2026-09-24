import { WebHookController } from "../../http/controllers/WebHookController.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { GeminiFoodAssistant } from "../../ai/gemini/GeminiFoodAssistant.js";
import { RedisConversationRepository } from "../../conversation/RedisConverstationRepository.js";
import { MongoUserRepository } from "../../storage/mongo/repositories/MongoUserRepository.js";
import { MongoMediaRepository } from "../../storage/mongo/repositories/MongoMediaRepository.js";
import { MongoFoodRepository } from "../../storage/mongo/repositories/MongoFoodRepository.js";
import { FindOrCreateUserUseCase } from "../../../application/use-cases/FindOrCreateUserUseCase.js";
import { SaveMediaUseCase } from "../../../application/use-cases/SaveMediaUseCase.js";
import { SaveDetectedFoodsUseCase } from "../../../application/use-cases/SaveDetectedFoodsUseCase.js";
import { FakeMessageSender } from "../../../tests/fakes/FakeMessageSender.js";
import { FakeResponseFormatter } from "../../../tests/fakes/formatters/FakeResponseFormatter.js";
import { DevChatMapper } from "../DevChatMapper.js";
import { FakeMediaRepository } from "../../../tests/fakes/repositories/FakeMediaRepository.js";
import { DevChatController } from "../../http/controllers/DevChatController.js";

export function makeDevChatController() {
  const sender = new FakeMessageSender();

  const conversationRepository = new RedisConversationRepository();

  const foodAssistant = new GeminiFoodAssistant(conversationRepository);

  const responseFormatter = new FakeResponseFormatter();

  const userRepository = new MongoUserRepository();
  const mediaRepository = new FakeMediaRepository();
  const foodRepository = new MongoFoodRepository();

  const findOrCreateUserUseCase = new FindOrCreateUserUseCase(userRepository);

  const saveMediaUseCase = new SaveMediaUseCase(mediaRepository);

  const saveDetectedFoodsUseCase = new SaveDetectedFoodsUseCase(foodRepository);

  const receiveMessageUseCase = new ReceiveMessageUseCase(
    sender,
    foodAssistant,
    responseFormatter,
    findOrCreateUserUseCase,
    saveMediaUseCase,
    saveDetectedFoodsUseCase,
  );

  const mapper = new DevChatMapper();

  return new DevChatController(receiveMessageUseCase, mapper);
}
