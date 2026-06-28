import { useState } from "react";
import { AgentAction, ActionResult, createAgentAction } from "@mobileagentos/core";
import { useMobileAgentContext } from "../MobileAgentProvider";

export function useAgentActions() {
  const { agent } = useMobileAgentContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const availableActions: AgentAction[] = [
    createAgentAction(
      "create_plan",
      "Create Plan",
      "Create a new action plan",
      {},
      false,
      false
    ),
    createAgentAction(
      "save_memory",
      "Save Memory",
      "Save information to memory",
      {},
      false,
      false
    ),
    createAgentAction(
      "open_screen",
      "Open Screen",
      "Navigate to a different screen",
      {},
      false,
      false
    ),
    createAgentAction(
      "export_summary",
      "Export Summary",
      "Export a summary of the session",
      {},
      false,
      false
    ),
    createAgentAction(
      "request_confirmation",
      "Request Confirmation",
      "Ask user to confirm an action",
      {},
      true,
      false
    ),
  ];

  const executeAction = async (
    action: AgentAction
  ): Promise<ActionResult | null> => {
    if (!agent) {
      setError(new Error("Agent not initialized"));
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      await agent.run({
        input: `Execute action: ${action.name}`,
      });
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    availableActions,
    executeAction,
    loading,
    error,
  };
}