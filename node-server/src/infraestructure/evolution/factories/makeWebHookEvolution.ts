import { WebHookController } from "../../http/controllers/WebHookController.js";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";

import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const useCase = new ReceiveMessageUseCase(sender);

  const mapper = new EvolutionWebhookMapper();

  return new WebHookController(useCase, mapper);
}
