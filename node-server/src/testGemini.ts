import { gemini } from "./infraestructure/ai/gemini/client.js";

const models = await gemini.models.list();

for await (const model of models) {
  console.log(model.name);
}
