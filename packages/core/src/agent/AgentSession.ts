import { createId } from "../utils/createId";
import { AgentEvent } from "./AgentEvent";

export interface AgentSession {
  id: string;
  userId: string;
  startedAt: string;
  events: AgentEvent[];
}

export function createAgentSession(userId: string): AgentSession {
  return {
    id: createId("session"),
    userId,
    startedAt: new Date().toISOString(),
    events: [],
  };
}