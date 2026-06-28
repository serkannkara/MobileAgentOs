import { ContextSignal, ContextSignalType } from "./ContextSignal";
import { ContextSnapshot } from "./ContextSnapshot";

export class ContextEngine {
  private signals: Map<string, ContextSignal>;

  constructor() {
    this.signals = new Map();
  }

  addSignal(signal: ContextSignal): void {
    const key = `${signal.type}:${signal.key}`;
    this.signals.set(key, signal);
  }

  getSignal(type: ContextSignalType, key: string): ContextSignal | undefined {
    return this.signals.get(`${type}:${key}`);
  }

  snapshot(userId: string): ContextSnapshot {
    return {
      userId,
      timestamp: new Date().toISOString(),
      signals: Array.from(this.signals.values()),
    };
  }

  clear(): void {
    this.signals.clear();
  }
}

export function createContextEngine(): ContextEngine {
  return new ContextEngine();
}
