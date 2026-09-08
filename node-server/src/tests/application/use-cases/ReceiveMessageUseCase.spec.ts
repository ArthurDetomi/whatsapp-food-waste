import { describe, it, expect } from "vitest";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";

import { FakeMessageSender } from "../../fakes/FakeMessageSender.js";
import { MessageType } from "../../../domain/entities/MessageType.js";
import { FakeFoodAssistant } from "../../fakes/FakeFoodAssistant.js";
import { FakeFoodRepository } from "../../fakes/repositories/FakeFoodRepository.js";
import { FakeMediaRepository } from "../../fakes/repositories/FakeMediaRepository.js";
import { FakeResponseFormatter } from "../../fakes/formatters/FakeResponseFormatter.js";
import { FindOrCreateUserUseCase } from "../../../application/use-cases/FindOrCreateUserUseCase.js";
import { FakeUserRepository } from "../../fakes/repositories/FakeUserRepository.js";
import { SaveMediaUseCase } from "../../../application/use-cases/SaveMediaUseCase.js";
import { SaveDetectedFoodsUseCase } from "../../../application/use-cases/SaveDetectedFoodsUseCase.js";

describe("ReceiveMessageUseCase", () => {
  it("should send greeting message", async () => {
    const fakeSender = new FakeMessageSender();

    const fakeFoodAssistant = new FakeFoodAssistant();

    const foodRepository = new FakeFoodRepository();
    const mediaRepository = new FakeMediaRepository();
    const userRepository = new FakeUserRepository();

    const findOrCreateUserUseCase = new FindOrCreateUserUseCase(userRepository);
    const saveMediaUseCase = new SaveMediaUseCase(mediaRepository);
    const saveDetectedFoodsUseCase = new SaveDetectedFoodsUseCase(
      foodRepository,
    );

    const responseFormatter = new FakeResponseFormatter();

    const useCase = new ReceiveMessageUseCase(
      fakeSender,
      fakeFoodAssistant,
      responseFormatter,
      findOrCreateUserUseCase,
      saveMediaUseCase,
      saveDetectedFoodsUseCase,
    );

    const message = new IncomingMessage({
      name: "Arthur",
      phone: "553299390279",
      text: "Olá",
      fromMe: false,
      type: MessageType.TEXT,
    });

    await useCase.execute(message);

    expect(fakeSender.messages[0]).toEqual({
      phone: "553299390279",
      message: "Olá Arthur, em que posso ajudá-lo?",
    });
  });
});
