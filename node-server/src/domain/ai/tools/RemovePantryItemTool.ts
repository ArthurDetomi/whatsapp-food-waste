import { RemovePantryItemUseCase } from "../../../application/use-cases/RemovePantryItemUseCase.js";
import { PantryContextRepository } from "../../ports/PantryContextRepository.js";
import { AgentTool, ToolContext } from "../AgentTool.js";

interface RemovePantryItemArguments {
  identifier: string;
}

export class RemovePantryItemTool implements AgentTool {
  readonly name = "remove_pantry_item";

  readonly description =
    "Remove um alimento da despensa. Utilize o identifier retornado pela ferramenta de listagem para identificar o item.";

  readonly parameters = {
    type: "object",

    properties: {
      identifier: {
        type: "string",
        description:
          "Identificador do item retornado anteriormente pela listagem da despensa.",
      },
    },

    required: ["identifier"],
  };

  constructor(
    private readonly removePantryItemUseCase: RemovePantryItemUseCase,
    private readonly pantryContextRepository: PantryContextRepository,
  ) {}

  async execute(args: unknown, context: ToolContext): Promise<unknown> {
    const input = args as RemovePantryItemArguments;

    const itemId = await this.pantryContextRepository.findItemId(
      context.phone,
      input.identifier,
    );

    if (!itemId) {
      throw new Error(
        "Não foi possível encontrar o item associado ao identificador informado.",
      );
    }

    return this.removePantryItemUseCase.execute({
      phone: context.phone,
      itemId,
    });
  }
}
