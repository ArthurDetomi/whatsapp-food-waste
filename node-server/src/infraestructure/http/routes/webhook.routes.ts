import { Router } from "express";

import { makeWebHookEvolution } from "../../evolution/factories/makeWebHookEvolution.js";
const webhookRoutes = Router();

const controller = makeWebHookEvolution();

webhookRoutes.post("/webhook", (req, res) => {
  return controller.handle(req, res);
});

export { webhookRoutes };
