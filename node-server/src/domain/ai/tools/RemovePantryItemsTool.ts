import { RemovePantryItemsUseCase } from "../../../application/use-cases/RemovePantryItemsUseCase.js";
import { PantryContextRepository } from "../../ports/PantryContextRepository.js";
import { AgentTool, ToolContext } from "../AgentTool.js";

interface RemovePantryItemsArguments {
  identifiers: string[];
}

export class RemovePantryItemsTool implements AgentTool {
  readonly name = "remove_pantry_items";

  readonly description =
    "Remove um ou mais alimentos da despensa. Utilize os identifiers retornados pela ferramenta de listagem para identificar os itens que devem ser removidos.";

  readonly parameters = {
    type: "object",
    properties: {
      identifiers: {
        type: "array",
        description:
          "Lista de identificadores dos alimentos retornados pela ferramenta de listagem da despensa.",
        items: {
          type: "string",
        },
      },
    },
    required: ["identifiers"],
    additionalProperties: false,
  };

  constructor(
    private readonly removePantryItemsUseCase: RemovePantryItemsUseCase,
    private readonly pantryContextRepository: PantryContextRepository,
  ) {}

  async execute(args: unknown, context: ToolContext): Promise<unknown> {
    const input = args as RemovePantryItemsArguments;

    if (input.identifiers.length === 0) {
      throw new Error("Informe pelo menos um item para remover.");
    }

    const itemIds = await Promise.all(
      input.identifiers.map((identifier) =>
        this.pantryContextRepository.findItemId(context.phone, identifier),
      ),
    );

    if (itemIds.some((itemId) => !itemId)) {
      throw new Error(
        "Não foi possível encontrar um ou mais itens associados aos identificadores informados.",
      );
    }

    return this.removePantryItemsUseCase.execute({
      phone: context.phone,
      items: itemIds as string[],
    });
  }
}
