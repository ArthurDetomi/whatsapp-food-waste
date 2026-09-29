import { ListPantryItemsUseCase } from "../../../application/use-cases/ListPantryItemsUseCase.js";
import { AgentTool, ToolContext } from "../AgentTool.js";

export class ListPantryItemsTool implements AgentTool {
  readonly name = "list_pantry_items";

  readonly description =
    "Lista os alimentos atualmente cadastrados na despensa do usuário.";

  readonly parameters = {
    type: "object",
    properties: {},
  };

  constructor(
    private readonly listPantryItemsUseCase: ListPantryItemsUseCase,
  ) {}

  async execute(_args: unknown, context: ToolContext): Promise<unknown> {
    return this.listPantryItemsUseCase.execute({
      phone: context.phone,
    });
  }
}
