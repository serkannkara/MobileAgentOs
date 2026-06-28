import { createId } from "../utils/createId";

export type AgentEventType =
  | "input_received"
  | "context_captured"
  | "memory_retrieved"
  | "privacy_checked"
  | "response_generated"
  | "action_suggested"
  | "feedback_recorded";

export interface AgentEvent {
  id: string;
  type: AgentEventType;
  sessionId: string;
  data?: unknown;
  timestamp: string;
}

export function createAgentEvent(
  type: AgentEventType,
  sessionId: string,
  data?: unknown
): AgentEvent {
  return {
    id: createId("event"),
    type,
    sessionId,
    data,
    timestamp: new Date().toISOString(),
  };
}