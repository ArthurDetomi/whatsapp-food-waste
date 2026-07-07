import { Router } from "express";
import { WebHookController } from "../controllers/WebHookController.js";

import { EvolutionMessageSender } from "../../evolution/EvolutionMessageSender.js";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

const webhookRoutes = Router();

const evolutionMessageSender = new EvolutionMessageSender();

const receiveMessageUseCase = new ReceiveMessageUseCase(evolutionMessageSender);

const controller = new WebHookController(receiveMessageUseCase);

webhookRoutes.post("/webhook", (req, res) => {
  return controller.handle(req, res);
});

export { webhookRoutes };
