import express from "express";

const app = express();

import { webhookRoutes } from "./infraestructure/http/routes/webhook.routes.js";

app.use(
  express.json({
    limit: "20mb",
  }),
);
app.use(webhookRoutes);

export default app;
