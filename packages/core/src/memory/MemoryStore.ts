import { MemoryItem } from "./MemoryItem";

export interface MemoryStore {
  add(memory: MemoryItem): Promise<void>;
  retrieve(userId: string, query: string, limit?: number): Promise<MemoryItem[]>;
  list(userId: string): Promise<MemoryItem[]>;
  clear(userId: string): Promise<void>;
}
