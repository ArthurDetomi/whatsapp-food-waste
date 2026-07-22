import { WebHookController } from "../../http/controllers/WebHookController.js";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionMessageSender } from "../EvolutionMessageSender.js";

import { EvolutionWebhookMapper } from "../EvolutionWebhookMapper.js";
import { GeminiAnalyzer } from "../../ai/gemini/GeminiAnalyzer.js";

export function makeWebHookEvolution() {
  const sender = new EvolutionMessageSender();

  const geminiAnalyzer = new GeminiAnalyzer();

  const useCase = new ReceiveMessageUseCase(sender, geminiAnalyzer);

  const mapper = new EvolutionWebhookMapper();

  return new WebHookController(useCase, mapper);
}
