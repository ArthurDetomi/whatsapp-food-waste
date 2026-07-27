import app from "./app.js";

import { PORT } from "./config/config.js";

import { redisClient } from "./infraestructure/redis/client.js";

async function bootstrap(): Promise<void> {
  try {
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

void bootstrap();
