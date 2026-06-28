import { createId } from "../utils/createId";

export type FeedbackEventType =
  | "thumbs_up"
  | "thumbs_down"
  | "action_success"
  | "action_failed"
  | "memory_saved"
  | "privacy_redacted"
  | "session_completed";

export interface FeedbackEvent {
  id: string;
  type: FeedbackEventType;
  sessionId: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

export function createFeedbackEvent(
  type: FeedbackEventType,
  sessionId: string,
  data?: Record<string, unknown>
): FeedbackEvent {
  return {
    id: createId("feedback"),
    type,
    sessionId,
    data,
    timestamp: new Date().toISOString(),
  };
}