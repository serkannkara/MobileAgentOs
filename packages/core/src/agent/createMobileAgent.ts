import { AgentRuntime, AgentConfig } from "./AgentRuntime";
import { MemoryStore } from "../memory/MemoryStore";
import { createMemoryEngine } from "../memory/MemoryEngine";
import { PrivacyGuard } from "../privacy/PrivacyGuard";
import { ActionRouter } from "../actions/ActionRouter";
import { createContextEngine } from "../context/ContextEngine";

export interface CreateMobileAgentConfig {
  name: string;
  userId: string;
  memory?: MemoryStore;
  privacy?: PrivacyGuard;
  actions?: ActionRouter;
  enableContext?: boolean;
}

export function createMobileAgent(
  config: CreateMobileAgentConfig
): AgentRuntime {
  const agentConfig: AgentConfig = {
    name: config.name,
    userId: config.userId,
    context: config.enableContext ? createContextEngine() : undefined,
    memory: config.memory ? createMemoryEngine(config.memory) : undefined,
    privacy: config.privacy,
    actions: config.actions,
  };

  return new AgentRuntime(agentConfig);
}
