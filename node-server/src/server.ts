import app from "./app.js";

import { PORT } from "./config/config.js";

import { redisClient } from "./infraestructure/storage/redis/client.js";

import { connectMongo } from "./infraestructure/storage/mongo/client.js";

import { makeConnectionMonitor } from "./infraestructure/factories/makeConnectionMonitor.js";

async function bootstrap(): Promise<void> {
  try {
    await redisClient.connect();

    await connectMongo();

    const connectionMonitor = makeConnectionMonitor();

    connectionMonitor.start();

    app.listen(PORT, () => {
      console.log(`Server rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
}

void bootstrap();
