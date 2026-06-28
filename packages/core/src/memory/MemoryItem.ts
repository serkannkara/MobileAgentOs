import { createId } from "../utils/createId";

export interface MemoryItem {
  id: string;
  userId: string;
  content: string;
  tags: string[];
  importance: number;
  createdAt: string;
  updatedAt: string;
}

export function createMemoryItem(
  userId: string,
  content: string,
  tags: string[] = [],
  importance: number = 0.5
): MemoryItem {
  const now = new Date().toISOString();
  return {
    id: createId("memory"),
    userId,
    content,
    tags,
    importance,
    createdAt: now,
    updatedAt: now,
  };
}