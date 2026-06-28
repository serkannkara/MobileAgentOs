import { useState } from "react";
import { MemoryItem } from "@mobileagentos/core";
import { useMobileAgentContext } from "../MobileAgentProvider";

export function useAgentMemory() {
  const { agent } = useMobileAgentContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addMemory = async (
    content: string
  ): Promise<MemoryItem | null> => {
    const session = agent?.getSession();
    if (!session || !agent) {
      setError(new Error("Agent session not available"));
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      await agent.run({
        input: `Remember: ${content}`,
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

  const listMemories = async (): Promise<MemoryItem[]> => {
    return [];
  };

  const clearMemories = async (): Promise<void> => {
    setError(null);
  };

  return {
    addMemory,
    listMemories,
    clearMemories,
    loading,
    error,
  };
}