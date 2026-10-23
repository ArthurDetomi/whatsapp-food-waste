export interface ToolContext {
  phone: string;
}

export interface AgentTool {
  name: string;

  description: string;

  parameters: Record<string, unknown>;

  execute(args: unknown, context: ToolContext): Promise<unknown>;
}
