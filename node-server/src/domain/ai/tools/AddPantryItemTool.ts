import {
  AddPantryItemInput,
  AddPantryItemUseCase,
} from "../../../application/use-cases/AddPantryItemUseCase.js";
import { AgentTool, ToolContext } from "../AgentTool.js";

interface AddPantryItemArguments {
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

export class AddPantryItemTool implements AgentTool {
  readonly name = "add_pantry_item";

  readonly description = "Adiciona um item à despensa do usuário.";

  readonly parameters = {
    type: "object",

    properties: {
      name: {
        type: "string",
        description: "Nome do alimento. Exemplo: arroz.",
      },

      quantity: {
        type: "number",
        description: "Quantidade do alimento.",
      },

      unit: {
        type: "string",
        description: "Unidade da quantidade. Exemplo: kg, g, unidade, litro.",
      },

      expirationDate: {
        type: "string",
        description: "Data de validade do alimento no formato YYYY-MM-DD.",
      },
    },

    required: ["name", "quantity", "unit"],
  };

  constructor(private readonly addPantryItemUseCase: AddPantryItemUseCase) {}

  async execute(args: unknown, context: ToolContext): Promise<unknown> {
    const input = args as AddPantryItemArguments;

    const data: AddPantryItemInput = {
      phone: context.phone,
      name: input.name,
      quantity: input.quantity,
      unit: input.unit,
      expirationDate: input.expirationDate,
    };

    const result = await this.addPantryItemUseCase.execute(data);

    return result;
  }
}
