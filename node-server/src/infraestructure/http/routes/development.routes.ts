import express, { Router } from "express";
import path from "node:path";
import { makeDevChatController } from "../../devchat/factories/makeDevChatController.js";

const webhookDevelopmentRoute = Router();

const controller = makeDevChatController();

webhookDevelopmentRoute.post("/sendMessage", (req, res) => {
  return controller.handle(req, res);
});

const devchatPath = path.join(process.cwd(), "src", "public", "devchat");

webhookDevelopmentRoute.use("/", express.static(devchatPath));

export { webhookDevelopmentRoute };
