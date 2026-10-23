import { AgentTool, ToolContext } from "../../../domain/ai/AgentTool.js";

import { UpdatePantryItemUseCase } from "../../../application/use-cases/UpdatePantryItemUseCase.js";

import { PantryContextRepository } from "../../ports/PantryContextRepository.js";

interface UpdatePantryItemArguments {
  identifier: string;
  name?: string;
  quantity?: number;
  expirationDate?: string;
}

export class UpdatePantryItemTool implements AgentTool {
  readonly name = "update_pantry_item";

  readonly description =
    "Atualiza um alimento da despensa. Utilize o identifier retornado pela ferramenta de listagem para identificar o item.";

  readonly parameters = {
    type: "object",

    properties: {
      identifier: {
        type: "string",
        description:
          "Identificador do item retornado anteriormente pela listagem da despensa.",
      },

      name: {
        type: "string",
        description: "Novo nome do alimento, caso o usuário queira alterá-lo.",
      },

      quantity: {
        type: "number",
        description:
          "Nova quantidade do alimento, caso o usuário queira alterá-la.",
      },

      expirationDate: {
        type: "string",
        description:
          "Nova data de validade no formato YYYY-MM-DD, caso o usuário queira alterá-la.",
      },
    },

    required: ["identifier"],
  };

  constructor(
    private readonly updatePantryItemUseCase: UpdatePantryItemUseCase,
    private readonly pantryContextRepository: PantryContextRepository,
  ) {}

  async execute(args: unknown, context: ToolContext): Promise<unknown> {
    const input = args as UpdatePantryItemArguments;

    const itemId = await this.pantryContextRepository.findItemId(
      context.phone,
      input.identifier,
    );

    if (!itemId) {
      throw new Error(
        "Não foi possível encontrar o item associado ao identificador informado.",
      );
    }

    return this.updatePantryItemUseCase.execute({
      phone: context.phone,
      itemId,
      name: input.name,
      quantity: input.quantity,
      expirationDate: input.expirationDate,
    });
  }
}
