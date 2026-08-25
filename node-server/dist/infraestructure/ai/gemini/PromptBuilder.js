import { expirationPrompt } from "../prompts/expirationPrompt.js";
export class PromptBuilder {
    build(message) {
        return `
${expirationPrompt}

Mensagem do usuário:

${message.text ?? ""}
`;
    }
}
