import { ListPantryItemsUseCase } from "../../../application/use-cases/ListPantryItemsUseCase.js";
import { PantryContextRepository } from "../../ports/PantryContextRepository.js";
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
    private readonly pantryContextRepository: PantryContextRepository,
  ) {}

  async execute(_args: unknown, context: ToolContext): Promise<unknown> {
    const items = await this.listPantryItemsUseCase.execute({
      phone: context.phone,
    });

    const references: Record<string, string> = {};

    const result = items.map((item, index) => {
      const identifier = String(index + 1);

      references[identifier] = item.id!;

      return {
        identifier,
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        expirationDate: item.expirationDate,
      };
    });

    await this.pantryContextRepository.saveReferences(
      context.phone,
      references,
    );

    return result;
  }
}
