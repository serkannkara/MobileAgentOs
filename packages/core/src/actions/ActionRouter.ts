import { AgentAction } from "./AgentAction";
import { ActionResult, createActionResult } from "./ActionResult";
import { ActionPolicy } from "./ActionPolicy";

type ActionHandler = (action: AgentAction) => Promise<unknown>;

export class ActionRouter {
  private handlers: Map<string, ActionHandler>;
  private policy: ActionPolicy;
  private actionHistory: ActionResult[];

  constructor(policy?: ActionPolicy) {
    this.handlers = new Map();
    this.policy = policy || new ActionPolicy();
    this.actionHistory = [];
  }

  registerHandler(actionType: string, handler: ActionHandler): void {
    this.handlers.set(actionType, handler);
  }

  async execute(action: AgentAction): Promise<ActionResult> {
    if (!this.policy.isAllowed(action)) {
      const result = createActionResult(
        action.id,
        false,
        undefined,
        "Action not allowed by policy"
      );
      this.actionHistory.push(result);
      return result;
    }

    if (this.policy.requiresConfirmation(action)) {
      const result = createActionResult(
        action.id,
        false,
        undefined,
        "Action requires confirmation"
      );
      this.actionHistory.push(result);
      return result;
    }

    const handler = this.handlers.get(action.type);
    if (!handler) {
      const result = createActionResult(
        action.id,
        false,
        undefined,
        `No handler registered for action type: ${action.type}`
      );
      this.actionHistory.push(result);
      return result;
    }

    try {
      const handlerResult = await handler(action);
      const result = createActionResult(action.id, true, handlerResult);
      this.actionHistory.push(result);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const result = createActionResult(
        action.id,
        false,
        undefined,
        errorMessage
      );
      this.actionHistory.push(result);
      return result;
    }
  }

  getHistory(): ActionResult[] {
    return [...this.actionHistory];
  }

  clearHistory(): void {
    this.actionHistory = [];
  }
}

export function createDefaultActionRouter(): ActionRouter {
  return new ActionRouter();
}
