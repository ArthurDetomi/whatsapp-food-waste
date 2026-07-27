import { createClient } from "redis";

import { REDIS_URL } from "../../config/config.js";

export const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("Erro no cliente Redis:", error);
});

redisClient.on("connect", () => {
  console.log("Conectando ao Redis...");
});

redisClient.on("ready", () => {
  console.log("Redis conectado e pronto para uso.");
});

redisClient.on("reconnecting", () => {
  console.log("Reconectando ao Redis...");
});
