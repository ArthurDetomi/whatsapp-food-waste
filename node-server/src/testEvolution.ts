import { EvolutionMessageSender } from "./infraestructure/evolution/EvolutionMessageSender.js";

async function test() {
  const sender = new EvolutionMessageSender();

  await sender.send("553299390279", "Olá, teste da minha aplicação");

  console.log("Mensagem enviada");
}

test();
