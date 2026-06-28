import { useState } from "react";
import { AgentInput, AgentOutput } from "@mobileagentos/core";
import { useMobileAgentContext } from "../MobileAgentProvider";

export function useAgent() {
  const { agent } = useMobileAgentContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const run = async (input: AgentInput): Promise<AgentOutput | null> => {
    if (!agent) {
      setError(new Error("Agent not initialized"));
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await agent.run(input);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSession = () => {
    return agent?.getSession() || null;
  };

  const getFeedback = () => {
    return agent?.getFeedback() || null;
  };

  return {
    run,
    getSession,
    getFeedback,
    loading,
    error,
  };
}
