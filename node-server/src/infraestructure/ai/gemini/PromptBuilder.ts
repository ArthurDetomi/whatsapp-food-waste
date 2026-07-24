import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";
import { expirationPrompt } from "../prompts/expirationPrompt.js";

export class PromptBuilder {
  build(message: IncomingMessage): string {
    return `
${expirationPrompt}

Mensagem do usuário:

${message.text ?? ""}
`;
  }
}
