import { describe, it, expect } from "vitest";
import { AgentRuntime } from "./AgentRuntime";
import { InMemoryStore } from "../memory/InMemoryStore";
import { createMemoryEngine } from "../memory/MemoryEngine";
import { createDefaultPrivacyGuard } from "../privacy/PrivacyGuard";

describe("AgentRuntime", () => {
  it("should process basic input", async () => {
    const runtime = new AgentRuntime({
      name: "TestAgent",
      userId: "test-user",
    });

    const result = await runtime.run({ input: "Hello" });
    expect(result.response).toBeDefined();
    expect(result.session).toBeDefined();
    expect(result.readinessScore).toBeGreaterThan(0);
  });

  it("should use privacy guard when configured", async () => {
    const runtime = new AgentRuntime({
      name: "TestAgent",
      userId: "test-user",
      privacy: createDefaultPrivacyGuard(),
    });

    const result = await runtime.run({
      input: "My email is test@example.com",
    });

    expect(result.response).toContain("[REDACTED_EMAIL]");
  });

  it("should track session events", async () => {
    const runtime = new AgentRuntime({
      name: "TestAgent",
      userId: "test-user",
    });

    await runtime.run({ input: "Test" });
    const session = runtime.getSession();

    expect(session.events.length).toBeGreaterThan(0);
    expect(session.events[0].type).toBe("input_received");
  });

  it("should calculate readiness score", async () => {
    const runtime = new AgentRuntime({
      name: "TestAgent",
      userId: "test-user",
      memory: createMemoryEngine(new InMemoryStore()),
      privacy: createDefaultPrivacyGuard(),
    });

    const result = await runtime.run({ input: "Test" });
    expect(result.readinessScore).toBeGreaterThan(50);
  });
});
