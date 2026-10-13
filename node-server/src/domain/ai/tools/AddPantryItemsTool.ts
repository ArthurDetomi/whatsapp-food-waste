import {
  AddPantryItemsInput,
  AddPantryItemsUseCase,
  PantryItemInput,
} from "../../../application/use-cases/AddPantryItemsUseCase.js";

import { AgentTool, ToolContext } from "../AgentTool.js";

interface AddPantryItemsArguments {
  items: PantryItemInput[];
}

export class AddPantryItemsTool implements AgentTool {
  readonly name = "add_pantry_items";

  readonly description =
    "Adiciona um ou mais alimentos à despensa do usuário. Utilize esta ferramenta quando o usuário solicitar o cadastro de alimentos identificados ou informados.";

  readonly parameters = {
    type: "object",
    properties: {
      items: {
        type: "array",
        description: "Lista de alimentos que serão adicionados à despensa.",
        items: {
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
              description:
                "Unidade da quantidade. Exemplo: kg, g, unidade, litro.",
            },
            expirationDate: {
              type: "string",
              description:
                "Data de validade no formato YYYY-MM-DD. Deve ser informada pelo usuário ou identificada com segurança; não invente datas.",
            },
          },
          required: ["name", "quantity", "unit", "expirationDate"],
          additionalProperties: false,
        },
      },
    },
    required: ["items"],
    additionalProperties: false,
  };

  constructor(private readonly addPantryItemsUseCase: AddPantryItemsUseCase) {}

  async execute(args: unknown, context: ToolContext): Promise<unknown> {
    const input = args as AddPantryItemsArguments;

    const data: AddPantryItemsInput = {
      phone: context.phone,
      items: input.items,
    };

    return this.addPantryItemsUseCase.execute(data);
  }
}
