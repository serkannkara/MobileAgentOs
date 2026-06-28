import { FeedbackEvent, FeedbackEventType, createFeedbackEvent } from "./FeedbackEvent";

export class FeedbackLoop {
  private events: FeedbackEvent[];
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
    this.events = [];
  }

  recordEvent(
    type: FeedbackEventType,
    data?: Record<string, unknown>
  ): FeedbackEvent {
    const event = createFeedbackEvent(type, this.sessionId, data);
    this.events.push(event);
    return event;
  }

  getEvents(): FeedbackEvent[] {
    return [...this.events];
  }

  getEventsByType(type: FeedbackEventType): FeedbackEvent[] {
    return this.events.filter((event) => event.type === type);
  }

  clearEvents(): void {
    this.events = [];
  }
}

export function createFeedbackLoop(sessionId: string): FeedbackLoop {
  return new FeedbackLoop(sessionId);
}
