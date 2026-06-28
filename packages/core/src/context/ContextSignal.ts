export type ContextSignalType =
  | "user_goal"
  | "current_screen"
  | "recent_activity"
  | "device_state"
  | "permission_state"
  | "network_state";

export interface ContextSignal {
  type: ContextSignalType;
  key: string;
  value: unknown;
  confidence: number;
  timestamp: string;
}
