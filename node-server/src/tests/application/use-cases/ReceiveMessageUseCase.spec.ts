import { describe, it, expect } from "vitest";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";

import { FakeMessageSender } from "../../fakes/FakeMessageSender.js";

describe("ReceiveMessageUseCase", () => {
  it("should send greeting message", async () => {
    const fakeSender = new FakeMessageSender();

    const useCase = new ReceiveMessageUseCase(fakeSender);

    const message = new IncomingMessage("Arthur", "553299390279", "Olá", false);

    await useCase.execute(message);

    expect(fakeSender.messages[0]).toEqual({
      phone: "553299390279",
      message: "Olá Arthur, em que posso ajudá-lo?",
    });
  });
});
