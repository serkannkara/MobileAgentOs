package ai.mobileagentos.compose.memory

class MemoryEngine(private val store: MemoryStore) {
    
    suspend fun addMemory(
        userId: String,
        content: String,
        tags: List<String> = emptyList(),
        importance: Float = 0.5f
    ): MemoryItem {
        val memory = MemoryItem.create(userId, content, tags, importance)
        store.add(memory)
        return memory
    }
    
    suspend fun retrieveMemories(
        userId: String,
        query: String,
        limit: Int = 5
    ): List<MemoryItem> {
        return store.retrieve(userId, query, limit)
    }
    
    suspend fun listMemories(userId: String): List<MemoryItem> {
        return store.list(userId)
    }
    
    suspend fun clearMemories(userId: String) {
        store.clear(userId)
    }
}