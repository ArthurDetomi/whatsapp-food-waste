import express from "express";

import { NODE_ENV } from "./config/config.js";

const app = express();

import { webhookRoutes } from "./infraestructure/http/routes/webhook.routes.js";

import { webhookDevelopmentRoute } from "./infraestructure/http/routes/development.routes.js";

app.use(
  express.json({
    limit: "20mb",
  }),
);

let message;

if (NODE_ENV == "production") {
  message = "INFO: Server rodando no modo produção";

  app.use(webhookRoutes);
} else if (NODE_ENV == "development") {
  message = "INFO: Server rodando no modo desenvolvimento";

  app.use(webhookDevelopmentRoute);
} else {
  message = "INFO: NODE_ENV not found, rotas indisponíveis!";
}

console.log(message);

export default app;
