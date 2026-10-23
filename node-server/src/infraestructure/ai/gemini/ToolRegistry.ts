import { AgentTool } from "../../../domain/ai/AgentTool.js";

export class ToolRegistry {
  constructor(private readonly tools: AgentTool[]) {}

  getDefinitions() {
    return this.tools.map((tool) => ({
      type: "function" as const,
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    }));
  }

  get(name: string): AgentTool | undefined {
    return this.tools.find((tool) => tool.name === name);
  }
}
