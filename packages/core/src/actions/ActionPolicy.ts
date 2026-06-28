import { AgentAction, ActionType } from "./AgentAction";

export interface ActionPolicyConfig {
  allowedActions: ActionType[];
  requireConfirmationForDestructive: boolean;
  maxActionsPerSession: number;
}

export const defaultActionPolicy: ActionPolicyConfig = {
  allowedActions: [
    "create_plan",
    "save_memory",
    "open_screen",
    "export_summary",
    "request_confirmation",
    "custom",
  ],
  requireConfirmationForDestructive: true,
  maxActionsPerSession: 10,
};

export class ActionPolicy {
  private config: ActionPolicyConfig;

  constructor(config?: Partial<ActionPolicyConfig>) {
    this.config = { ...defaultActionPolicy, ...config };
  }

  isAllowed(action: AgentAction): boolean {
    return this.config.allowedActions.includes(action.type);
  }

  requiresConfirmation(action: AgentAction): boolean {
    if (action.requiresConfirmation) return true;
    if (this.config.requireConfirmationForDestructive && action.destructive) {
      return true;
    }
    return false;
  }
}
