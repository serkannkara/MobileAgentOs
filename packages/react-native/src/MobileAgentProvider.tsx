import React, { createContext, useContext, ReactNode } from "react";
import { AgentRuntime } from "@mobileagentos/core";

interface MobileAgentContextValue {
  agent: AgentRuntime | null;
}

const MobileAgentContext = createContext<MobileAgentContextValue>({
  agent: null,
});

export interface MobileAgentProviderProps {
  agent: AgentRuntime;
  children: ReactNode;
}

export function MobileAgentProvider({
  agent,
  children,
}: MobileAgentProviderProps) {
  return (
    <MobileAgentContext.Provider value={{ agent }}>
      {children}
    </MobileAgentContext.Provider>
  );
}

export function useMobileAgentContext(): MobileAgentContextValue {
  const context = useContext(MobileAgentContext);
  if (!context) {
    throw new Error(
      "useMobileAgentContext must be used within MobileAgentProvider"
    );
  }
  return context;
}
