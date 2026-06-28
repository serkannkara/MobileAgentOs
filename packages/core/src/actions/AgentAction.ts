import { createId } from "../utils/createId";

export type ActionType =
  | "create_plan"
  | "save_memory"
  | "open_screen"
  | "export_summary"
  | "request_confirmation"
  | "custom";

export interface AgentAction {
  id: string;
  type: ActionType;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  requiresConfirmation: boolean;
  destructive: boolean;
}

export function createAgentAction(
  type: ActionType,
  name: string,
  description: string,
  parameters: Record<string, unknown> = {},
  requiresConfirmation: boolean = false,
  destructive: boolean = false
): AgentAction {
  return {
    id: createId("action"),
    type,
    name,
    description,
    parameters,
    requiresConfirmation,
    destructive,
  };
}