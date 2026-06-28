import { ContextSignal } from "./ContextSignal";

export interface ContextSnapshot {
  userId: string;
  timestamp: string;
  signals: ContextSignal[];
}
