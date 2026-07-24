import { describe, it, expect } from "vitest";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";

import { FakeMessageSender } from "../../fakes/FakeMessageSender.js";
import { MessageType } from "../../../domain/entities/MessageType.js";
import { FakeFoodAssistant } from "../../fakes/FakeFoodAssistant.js";

describe("ReceiveMessageUseCase", () => {
  it("should send greeting message", async () => {
    const fakeSender = new FakeMessageSender();

    const fakeFoodAssistant = new FakeFoodAssistant();

    const useCase = new ReceiveMessageUseCase(fakeSender, fakeFoodAssistant);

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
