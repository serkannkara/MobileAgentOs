import { MemoryItem } from "./MemoryItem";
import { MemoryStore } from "./MemoryStore";

export class InMemoryStore implements MemoryStore {
  private memories: Map<string, MemoryItem[]>;

  constructor() {
    this.memories = new Map();
  }

  async add(memory: MemoryItem): Promise<void> {
    const userMemories = this.memories.get(memory.userId) || [];
    userMemories.push(memory);
    this.memories.set(memory.userId, userMemories);
  }

  async retrieve(
    userId: string,
    query: string,
    limit: number = 10
  ): Promise<MemoryItem[]> {
    const userMemories = this.memories.get(userId) || [];
    const queryLower = query.toLowerCase();

    const matches = userMemories
      .filter((memory) => {
        const contentMatch = memory.content.toLowerCase().includes(queryLower);
        const tagMatch = memory.tags.some((tag) =>
          tag.toLowerCase().includes(queryLower)
        );
        return contentMatch || tagMatch;
      })
      .sort((a, b) => b.importance - a.importance)
      .slice(0, limit);

    return matches;
  }

  async list(userId: string): Promise<MemoryItem[]> {
    return this.memories.get(userId) || [];
  }

  async clear(userId: string): Promise<void> {
    this.memories.delete(userId);
  }
}
