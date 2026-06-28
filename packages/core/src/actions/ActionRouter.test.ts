import { describe, it, expect } from "vitest";
import { ActionRouter } from "./ActionRouter";
import { createAgentAction } from "./AgentAction";

describe("ActionRouter", () => {
  it("should execute allowed actions", async () => {
    const router = new ActionRouter();
    router.registerHandler("create_plan", async () => "Plan created");

    const action = createAgentAction(
      "create_plan",
      "Create Plan",
      "Create a new plan"
    );

    const result = await router.execute(action);
    expect(result.success).toBe(true);
    expect(result.result).toBe("Plan created");
  });

  it("should reject actions without handlers", async () => {
    const router = new ActionRouter();
    const action = createAgentAction("custom", "Custom", "Custom action");

    const result = await router.execute(action);
    expect(result.success).toBe(false);
    expect(result.error).toContain("No handler registered");
  });

  it("should require confirmation for destructive actions", async () => {
    const router = new ActionRouter();
    const action = createAgentAction(
      "create_plan",
      "Delete All",
      "Delete everything",
      {},
      false,
      true
    );

    const result = await router.execute(action);
    expect(result.success).toBe(false);
    expect(result.error).toContain("requires confirmation");
  });

  it("should track action history", async () => {
    const router = new ActionRouter();
    router.registerHandler("create_plan", async () => "Done");

    const action = createAgentAction(
      "create_plan",
      "Test",
      "Test action"
    );

    await router.execute(action);
    const history = router.getHistory();
    expect(history.length).toBe(1);
  });

  it("should handle action errors gracefully", async () => {
    const router = new ActionRouter();
    router.registerHandler("create_plan", async () => {
      throw new Error("Action failed");
    });

    const action = createAgentAction(
      "create_plan",
      "Test",
      "Test action"
    );

    const result = await router.execute(action);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Action failed");
  });
});
