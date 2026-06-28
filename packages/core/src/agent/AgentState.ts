export type AgentState = "idle" | "processing" | "waiting_confirmation" | "error";

export interface AgentStatus {
  state: AgentState;
  message?: string;
  timestamp: string;
}
