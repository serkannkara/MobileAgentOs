import { MemoryItem, createMemoryItem } from "./MemoryItem";
import { MemoryStore } from "./MemoryStore";

export class MemoryEngine {
  constructor(private store: MemoryStore) {}

  async addMemory(
    userId: string,
    content: string,
    tags: string[] = [],
    importance: number = 0.5
  ): Promise<MemoryItem> {
    const memory = createMemoryItem(userId, content, tags, importance);
    await this.store.add(memory);
    return memory;
  }

  async retrieveMemories(
    userId: string,
    query: string,
    limit?: number
  ): Promise<MemoryItem[]> {
    return await this.store.retrieve(userId, query, limit);
  }

  async listMemories(userId: string): Promise<MemoryItem[]> {
    return await this.store.list(userId);
  }

  async clearMemories(userId: string): Promise<void> {
    await this.store.clear(userId);
  }
}

export function createMemoryEngine(store: MemoryStore): MemoryEngine {
  return new MemoryEngine(store);
}
