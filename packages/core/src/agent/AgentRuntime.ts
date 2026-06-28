import { ContextEngine } from "../context/ContextEngine";
import { MemoryEngine } from "../memory/MemoryEngine";
import { PrivacyGuard } from "../privacy/PrivacyGuard";
import { ActionRouter } from "../actions/ActionRouter";
import { FeedbackLoop } from "../feedback/FeedbackLoop";
import { MobileAIReadiness } from "../readiness/MobileAIReadiness";
import { AgentSession, createAgentSession } from "./AgentSession";
import { createAgentEvent } from "./AgentEvent";
import { AgentAction } from "../actions/AgentAction";

export interface AgentConfig {
  name: string;
  userId: string;
  context?: ContextEngine;
  memory?: MemoryEngine;
  privacy?: PrivacyGuard;
  actions?: ActionRouter;
}

export interface AgentInput {
  input: string;
}

export interface AgentOutput {
  response: string;
  actions: AgentAction[];
  readinessScore: number;
  session: AgentSession;
}

export class AgentRuntime {
  private config: AgentConfig;
  private session: AgentSession;
  private feedback: FeedbackLoop;
  private readiness: MobileAIReadiness;

  constructor(config: AgentConfig) {
    this.config = config;
    this.session = createAgentSession(config.userId);
    this.feedback = new FeedbackLoop(this.session.id);
    this.readiness = new MobileAIReadiness();
  }

  async run(input: AgentInput): Promise<AgentOutput> {
    const event1 = createAgentEvent("input_received", this.session.id, input);
    this.session.events.push(event1);

    let processedInput = input.input;

    if (this.config.context) {
      const contextSnapshot = this.config.context.snapshot(this.config.userId);
      const event2 = createAgentEvent(
        "context_captured",
        this.session.id,
        contextSnapshot
      );
      this.session.events.push(event2);
    }

    if (this.config.memory) {
      const memories = await this.config.memory.retrieveMemories(
        this.config.userId,
        input.input,
        5
      );
      const event3 = createAgentEvent(
        "memory_retrieved",
        this.session.id,
        memories
      );
      this.session.events.push(event3);
    }

    if (this.config.privacy) {
      const privacyResult = this.config.privacy.redact(input.input);
      processedInput = privacyResult.redactedText;
      const event4 = createAgentEvent(
        "privacy_checked",
        this.session.id,
        privacyResult
      );
      this.session.events.push(event4);

      if (!privacyResult.safe) {
        this.feedback.recordEvent("privacy_redacted", {
          redactions: privacyResult.redactions.length,
        });
      }
    }

    const response = `Processed: ${processedInput}`;
    const event5 = createAgentEvent("response_generated", this.session.id, {
      response,
    });
    this.session.events.push(event5);

    const actions: AgentAction[] = [];

    const readinessScore = this.readiness.calculateReadiness({
      contextEnabled: !!this.config.context,
      memoryEnabled: !!this.config.memory,
      privacyEnabled: !!this.config.privacy,
      actionsEnabled: !!this.config.actions,
      offlineSupport: "partial",
      uxContinuity: "good",
      appStoreReadiness: "review_needed",
    });

    return {
      response,
      actions,
      readinessScore: readinessScore.overall,
      session: this.session,
    };
  }

  getSession(): AgentSession {
    return this.session;
  }

  getFeedback(): FeedbackLoop {
    return this.feedback;
  }
}
