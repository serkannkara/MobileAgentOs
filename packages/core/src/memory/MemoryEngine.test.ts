import { describe, it, expect, beforeEach } from "vitest";
import { MemoryEngine } from "./MemoryEngine";
import { InMemoryStore } from "./InMemoryStore";

describe("MemoryEngine", () => {
  let engine: MemoryEngine;
  const userId = "test-user";

  beforeEach(() => {
    engine = new MemoryEngine(new InMemoryStore());
  });

  it("should add memory", async () => {
    const memory = await engine.addMemory(userId, "Test memory", ["test"], 0.8);
    expect(memory.content).toBe("Test memory");
    expect(memory.userId).toBe(userId);
    expect(memory.importance).toBe(0.8);
  });

  it("should retrieve memories by query", async () => {
    await engine.addMemory(userId, "I like coffee", ["preference"], 0.9);
    await engine.addMemory(userId, "I prefer tea", ["preference"], 0.7);
    await engine.addMemory(userId, "Morning routine", ["routine"], 0.6);

    const memories = await engine.retrieveMemories(userId, "coffee");
    expect(memories.length).toBeGreaterThan(0);
    expect(memories[0].content).toContain("coffee");
  });

  it("should list all memories", async () => {
    await engine.addMemory(userId, "Memory 1", [], 0.5);
    await engine.addMemory(userId, "Memory 2", [], 0.5);

    const memories = await engine.listMemories(userId);
    expect(memories.length).toBe(2);
  });

  it("should clear memories", async () => {
    await engine.addMemory(userId, "Memory 1", [], 0.5);
    await engine.clearMemories(userId);

    const memories = await engine.listMemories(userId);
    expect(memories.length).toBe(0);
  });
});
