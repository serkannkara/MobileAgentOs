package ai.mobileagentos.compose.memory

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

class InMemoryStore : MemoryStore {
    private val memories: MutableList<MemoryItem> = mutableListOf()
    private val mutex = Mutex()
    
    override suspend fun add(item: MemoryItem): Unit = mutex.withLock {
        memories.add(item)
    }
    
    override suspend fun retrieve(
        userId: String,
        query: String,
        limit: Int
    ): List<MemoryItem> = mutex.withLock {
        memories
            .filter { it.userId == userId }
            .filter { memory ->
                memory.content.contains(query, ignoreCase = true) ||
                memory.tags.any { tag -> tag.contains(query, ignoreCase = true) }
            }
            .sortedByDescending { it.importance }
            .take(limit)
    }
    
    override suspend fun list(userId: String): List<MemoryItem> = mutex.withLock {
        memories
            .filter { it.userId == userId }
            .sortedByDescending { it.timestamp }
    }
    
    override suspend fun clear(userId: String): Unit = mutex.withLock {
        memories.removeAll { it.userId == userId }
    }
}