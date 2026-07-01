package ai.mobileagentos.compose.memory

interface MemoryStore {
    suspend fun add(item: MemoryItem)
    suspend fun retrieve(userId: String, query: String, limit: Int = 5): List<MemoryItem>
    suspend fun list(userId: String): List<MemoryItem>
    suspend fun clear(userId: String)
}